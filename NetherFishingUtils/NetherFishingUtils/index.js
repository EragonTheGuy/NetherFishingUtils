/// <reference types="../CTAutocomplete" />
import Settings, {Sounds} from "./configOne/config";
import Settings2 from "./configTwo/config2";

import Skyblock from "../BloomCore/Skyblock";
import { data } from "./guiCoords"
import {EntityArmorStand, EntityItem} from "./const"  

import "./functions/timerAndCatches"
import "./functions/blacklist"
import "./functions/worm"
import "./functions/bobber"
import "./functions/guiMove"
import "./functions/bait"
import "./functions/statsCalc"
import {nonPingScs, lavaScs, waterScs, allScs, scMessages, lsScs} from "./scsLists";
import "./functions/richPresence"


let soundWarning = true;
const offButton = new TextComponent("&6&l[Turn off warning]")
        .setHoverValue("turns off the nfu sound warning")
        .setClickAction("run_command")
        .setClickValue("/turnOffSoundWarning")



//barn variables
let entityCounter = 0;
let doubleHook = true;

let prewarningTriggered = false;
let warningTriggered = false;
let dieing = false;

let hp;
let scToDraw
let currentBossBars = 0;
let currentLsScs = 0;
let currentScs = [];

let lastName


let totemTime;
let totemOwner;
let totem;

let titleRendered = false;
let titleToRender;

const Loader = Java.type("net.minecraftforge.fml.common.Loader");


register("worldLoad", () => {
    Client.showTitle("", "", 1, 1, 1); //fixes bug with titles not showing the first time
    if(soundWarning) {
        if(!Sounds.length) {
            Sounds.push("hi")
            ChatLib.chat("&r&c--------------------------------------------")
            ChatLib.chat("&r&c[NFU] PLEASE ADD SOUND FILES BEFORE USING ANY SOUND-RELATED FEATURES")
            ChatLib.chat("&r&c--------------------------------------------")
            ChatLib.chat(offButton)
        } else if (Sounds.length == 1 && Sounds[0] == "hi") {
            ChatLib.chat("&r&c--------------------------------------------")
            ChatLib.chat("&r&c[NFU] PLEASE ADD SOUND FILES BEFORE USING ANY SOUND-RELATED FEATURES")
            ChatLib.chat("&r&c--------------------------------------------")
            ChatLib.chat(offButton)
        }
    }
})

let doubleHookMsg = ["It's a Double Hook! Woot woot!", "It's a Double Hook!", "Double Hook!"]
//settings/config
register("command", () => Settings.openGUI()).setName("nfu").setAliases("netherfishingutils");
register("command", () => Settings2.openGUI()).setName("nfutext").setAliases("netherfishingutilstext");


//SBE check 
/*
if (Loader.isModLoaded("SkyblockExtras")) {
    Settings.jawbusText = false;
    Settings.jawbusPing = false;
} else {
    Settings.jawbusText = true;
    Settings.jawbusPing = true;
}
*/
//visual/audio ---------------------------------------------------------------------

Object.keys(scMessages).forEach(messageKey => {
    // Setting the value of this key
    const message = scMessages[messageKey]

    // Register chat this message
    register("chat", () => {
        if (Settings[`${messageKey}Ping`]) {
            new Sound({source: Sounds[Settings[`${messageKey}Sound`]], priority: true}).setVolume(0.5).play()
        }

        if (Settings2[`${messageKey}Title`]) {
            titleRendered = true;
            if(Settings2.dhCustom && doubleHook) {
                Client.showTitle(Settings2[`${messageKey}Text`], Settings2[`dhSubtext`], 1, Settings2.stTime * 200, 1);
            } else {
                Client.showTitle(Settings2[`${messageKey}Text`], Settings2[`${messageKey}Subtext`], 1, Settings2.stTime * 200, 1);
            }

            titleToRender = Settings2[`${messageKey}Text`]
        }
        doubleHook = false;
        
        setTimeout(() => {
            titleRendered = false;
        }, Settings2.stTime * 10000)
    }).setCriteria(message)
})

doubleHookMsg.forEach(message => {
    register("chat", () => {
        if (Settings.dhPing) {
            new Sound({source: Sounds[Settings.dhSound], priority: true}).play()
        }
    
        if(Settings2.dhTitle) {
            titleRendered = true;
            Client.showTitle(Settings2.dhText, Settings2.dhSubtext, 1, Settings2.stTime * 200, 1)
            setTimeout(() => {
                titleRendered = false;
            }, Settings2.stTime * 10000)
        
            if(Settings2.dhText) titleToRender = Settings2.dhText
            if(!Settings2.dhText && Settings2.dhSubtext) titleToRender = Settings2.dhSubtext
        }

        doubleHook = true;
    }).setCriteria(message)
})

register('chat', () => {
    if(Settings2.vialText) {
        Client.showTitle(Settings2.vialText, Settings2.vialSubtext, 1, Settings2.stTime * 100, 1)
    }
    
    if(Settings.vialPing) {
        new Sound({source: Sounds[Settings.vialSound], priority: true}).play()
    }
}).setCriteria('RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)')

//party ---------------------------------------------------------------

register("chat", () => {
    let vanq = true;
    if (Settings.VanqPchat && vanq) {
		ChatLib.say("/pc Vanquisher!")
        vanq = false;
        return;
    }
}).setCriteria("A Vanquisher is spawning nearby!")

register("chat", () => {
	if(Settings.ThunderPchat){	
		ChatLib.say("/pc Thunder!");
        return;
		}
}).setCriteria("You hear a massive rumble as Thunder emerges.")

register("chat", () => {
	if(Settings.JawbusPchat){	
		ChatLib.say("/pc [!] Jawbus alert [!]")
        return;
		}
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.")

//Boss Bar --------------------------------


register('step', () => {
    let totemFound = false;
    let newScs = [];
	World.getAllEntitiesOfType(EntityArmorStand).forEach(entity => {

        //random squeezed-in fishing timer code
        let name = entity?.getName().removeFormatting()

        //catch timer
        if(Settings.timerTitle) {
            if(name.match(/^[\d.]+$/) && Player.getPlayer().field_71104_cf && name.includes(".")) {
                if(titleRendered) {
                    if(!name.includes(lastName)) {
                        Client.showTitle(titleToRender, entity.getName(), 1, 10, 1)
        
                        if(Settings.rgbTime) {
                            entity.getEntity().func_96094_a("§Z" + ChatLib.removeFormatting(entity.getName()))
                        }
                    }
        
                    lastName = name;
                } else {
                    if(!name.includes(lastName)) {
                        Client.showTitle("", entity.getName(), 1, 10, 1)
        
                        if(Settings.rgbTime) {
                            entity.getEntity().func_96094_a("§Z" + ChatLib.removeFormatting(entity.getName()))
                        }
                    }
        
                    lastName = name;
                }
            }
    
            if(Settings.catchNotif) {
                if(Settings.highPingTimer && name == "0.1") {
                    Client.showTitle("&r&cCATCH", "", 1, 10, 1)
                }
    
                if(name == "!!!") {
                    Client.showTitle("&r&cCATCH", "", 1, 10, 1)
                }
            } else {
                if(name == "!!!") {
                    Client.showTitle("", entity.getName(), 1, 10, 1)
                }
            }
        }
        
        if(!Settings.scBossBar) return

        lsScs.forEach(sc => {
            if (name.includes(sc) && !name.removeFormatting().includes("Baby Yeti")) {
                currentLsScs++;
                try {
                    hp = name?.match(`${sc}.*\/.*❤`)[0].replace(sc, '').replace("❤", '').split('/')
                } catch (e) {
                    console.log(e)
                }
                if(!hp) return
                let currenthp = hp[0]
                let maxhp = hp[1]
                let currenthpint;
                let maxhpint;

                if (currenthp.includes("k")) {
                    currenthpint = currenthp.replace("k", "")
                    currenthpint = currenthpint * 1000
                } else if (currenthp.includes("M")) {
                    currenthpint = currenthp.replace("M", "")
                    currenthpint = currenthpint * 1000000
                } else if (currenthp == 0) {
                    currenthpint = 0
                } 
                currenthpint = Math.round(currenthpint)
                if (maxhp.includes("k")) {
                    maxhpint = maxhp.replace("k", "")
                    maxhpint = maxhpint * 1000
                } else if (maxhp.includes("M")) {
                    maxhpint = maxhp.replace("M", "")
                    maxhpint = maxhpint * 1000000
                } 
                newScs.push({name, currenthp, maxhp, currenthpint, maxhpint})
            }
        })


        //Totem of Corruption timer
        if(Settings.totemTimer) {
            if(name == "Totem of Corruption") {
                totemFound = true;
            } 

            if(name.includes("Remaining")) {
                totemTime = name;
            } 

            if(name.includes("Owner")) {
                totemOwner = name;
            } 

            if(name.includes("00s")) {
                totemFound = false;
            }
        }
	});

    currentScs = newScs
    if(!totemFound) totemTime = undefined
}).setFps(10)



register("renderEntity", (entity, pos, partialTick, event) => {
    
}).setFilteredClass(EntityItem.class)


//--------------------- String rendering ------------------------
register('renderOverlay', () => {

    if(Settings.totemTimer && totemTime && totemOwner) {
        Renderer.drawString(` &5&l${totemOwner}\n &5&l${totemTime}`, data.totemTimer.x, data.totemTimer.y)
    }


    // BOSS BAR RENDERING --------------------------------------------------------
    if(!Settings.scBossBar) return;

    for(let i = 0; i < currentScs.length; i++) {
        let sc = currentScs[i]
        let widthpre = Renderer.screen.getWidth();
        let width = widthpre / 4;
        let y = 35

        Renderer.drawLine(Renderer.color(0,0,0,50), width * 1.5, y + 30 * i, width * 2.5, y + 30 * i, 10);
        //Renderer.drawLine(Renderer.color(190,50,190,190), width * 1.5 + 1, y + 30 * i, width * 2.5 - 1, y + 30 * i, 10 - 2);

        Renderer.drawStringWithShadow(sc.name, widthpre / 2 - Renderer.getStringWidth(sc.name) / 2 - 5, y - 14 + 30 * i);


        rightx = width * 1.5 + (width - 1) * sc.currenthpint / sc.maxhpint
        if (rightx > width * 1.5) Renderer.drawLine(Renderer.color(0,190,0,150), width * 1.5 + 1, y + 30 * i, rightx, y + 30 * i, 10 - 2)

        if (y == 35) { y = 38 }
        let displaylifestring = `&0${sc.currenthp}/${sc.maxhp}`
        Renderer.finishDraw();
        Renderer.scale(0.85)
        Renderer.drawString(`${displaylifestring}`, (widthpre / 2 - Renderer.getStringWidth(displaylifestring) / 2) / 0.85, y + 30 / 0.85 * i)
    }
})

register("command", (start, end) => {
    let slope = 600000;
    let startingSlope = slope  * Math.pow(2, (start/10));
    let endingSlope = slope  * Math.pow(2, (end /10));
    let startingExp = 7000000 + startingSlope
    let endingExp = 7000000 + endingSlope;
    let total = Math.round(endingExp - startingExp).toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g).join(".")
    ChatLib.chat(`&r&c[NFU] &6Skill exp required from level ${start.toString()} to level ${end.toString()} is: ${total.toString()}`)
}).setName("checkexp")

register("command", () => {
    soundWarning = false;
    ChatLib.chat("&r&c[NFU] &6 Sound warning disabled! Be sure to add sounds before using any sound-related features or &r&cyou WILL crash &6(Sound Controls in Settings to add sounds)")
}).setName("turnOffSoundWarning")


