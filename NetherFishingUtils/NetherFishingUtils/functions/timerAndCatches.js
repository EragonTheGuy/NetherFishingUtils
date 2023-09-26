import Settings, {Sounds} from "../configOne/config";
import {nonPingScs, lavaScs, waterScs, allScs, scMessages, lsScs} from "../scsLists";
import { data } from "../guiCoords"

let catches = 0;
let scs = 0;
let lastClicked = Date.now();
let seconds = 1;
let minutes = parseInt(Settings.minutes);
let runTimer = false;
let catchesPerMin = 0;
let minutesPassed = 1;
let secondsPassed = 0;
let scsPerMin = 0;
let isFishing = false;
let timerBind = new KeyBind('fishing timer', Keyboard.KEY_L, 'NFU');
let resetTimerBind = new KeyBind('reset fishing timer', Keyboard.KEY_R, 'NFU');
let resetCatches = new KeyBind('reset catches', Keyboard.KEY_P, 'NFU');
let resetScs = new KeyBind('reset scs (sea creature counter)', Keyboard.KEY_N, 'NFU');

timerBind.registerKeyPress(() => {
    runTimer = !runTimer;
})

resetCatches.registerKeyPress(() => {
    catches = 0;
    catchesPerMin = 0;
    minutesPassed = 0;
    secondsPassed = 0;

})

resetScs.registerKeyPress(() => {
    scs = 0;
    scsPerMin = 0;
    minutesPassed = 0;
    secondsPassed = 0;
})

resetTimerBind.registerKeyPress(() => {
    minutes = parseInt(Settings.minutes);
    seconds = 1;
    catches = 0;
    catchesPerMin = 0;
    runTimer = false;
    minutesPassed = 0;
})

Settings.registerListener('fishing timer config', newTime => {
    minutes = newTime;
    seconds = 1;
});

register('step', () => {
    if(!World.isLoaded()) return

    if(Player.getPlayer().field_71104_cf) {
        isFishing = true;
    } else {
        isFishing = false;
    }

    if(Settings.timer && runTimer) {
        seconds--;
        if(seconds == 0) {
            minutes--;
            seconds = 60;
        }
    
        if(minutes == 0) {
            minutes = parseInt(Settings.minutes);
            runTimer = false;
            seconds = 1;
            minutesPassed = 0;
        }
    }

    if(Settings.catchesPerMin || Settings.scsPerMin) {
        secondsPassed++;

        if(secondsPassed == 60) {
            minutesPassed++;
            secondsPassed = 0;
        }
    }
}).setDelay(1)

register('clicked', (x, y, button, isPressed) => {
    if(button == 1 && isPressed && isFishing) { 
        if(Date.now() - lastClicked <= 1500) return //yes, this is just so people don't spam.
        lastClicked = Date.now();
        catches++;
        if(!Settings.fishingTimer) return
        runTimer = true;
    }
});

register('chat', (message) => {
    if(!message) return

    nonPingScs.forEach(sc => {
        if(message.includes(sc)) doubleHook = false;
    })

    if(Settings.scs || Settings.scsPerMin) {
        allScs.forEach(sc => {
            if(message.includes(sc)) {
                scs++;
            }
        })
        
        if(message.includes('Double Hook')) {
            scs++;
        }
        scsPerMin = Math.round(scs / minutesPassed);
    }
}).setCriteria("${message}")


register("renderOverlay", () => {
    if(Settings.catches) {
        catches.toString();
        Renderer.drawString("catches: " + catches, data.catches.x, data.catches.y);
    }

    if(Settings.catchesPerMin) {
        catchesPerMin = Math.round(catches / minutesPassed);
        catchesPerMin.toString();
        Renderer.drawString("catches per minute: " + catchesPerMin, data.catchesPerMin.x, data.catchesPerMin.y);
    }

    if(Settings.scs) {
        scs.toString();
        Renderer.drawString("scs: " + scs, data.scsText.x, data.scsText.y);
    }

    if(Settings.scsPerMin) {
        scsPerMin.toString();
        Renderer.drawString("scs per minute: " + scsPerMin, data.scsPerMinText.x, data.scsPerMinText.y);
    }

    if(Settings.timer) {
        Renderer.drawString(minutes.toString() + ":" + seconds.toString(), data.fishingTimer.x, data.fishingTimer.y)
    }
})