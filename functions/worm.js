import PogObject from "../../PogData"
import Settings, {Sounds} from "../configOne/config"
import Settings2 from "../configTwo/config2"
import Skyblock from "../../BloomCore/Skyblock";
import { data } from "../guiCoords"
import {nonPingScs, lavaScs, waterScs, allScs, scMessages, lsScs} from "../scsLists";

let lifetimeMembranes = new PogObject("NetherFishingUtils", {
    lifetimeMembranes: 0
}, "lifetimeMembranes.json")

let prewarningTriggered = false;
let warningTriggered = false;
let dieing = false;

let membranesInInv = 0;
let membranesLast = 0;
let membraneDifference = 0;
let wormCounter = 0;
let gainedMembranes = 0;
let membranesBefore = 0;
let fetchCurrentMembranes = true;

let lootShareCounter;

register('entityDeath', (entity) => {

    if(Skyblock.area != "Crystal Hollows") return

    if(entity.getName() != "Silverfish" || Skyblock.area != "Crystal Hollows") return;

    if(fetchCurrentMembranes) {
        Player.getInventory().getItems().forEach(item => {
            if(item?.getName()?.removeFormatting() == "Worm Membrane") {
                membranesBefore += item.getStackSize();
            }
        }) 
    }

    fetchCurrentMembranes = false;

    wormCounter++;

    if(wormCounter >= 15 && wormCounter < 50) {
        dieing = true
    };

    if(wormCounter == 59 && prewarningTriggered == true && warningTriggered == true) {
        
    }

    if(wormCounter == 60) {
        prewarningTriggered = false;
        warningTriggered = false;
        dieing = false;
        membranesInInv = 0;
        setTimeout(() => {
        Player.getInventory().getItems().forEach(item => {
            if(item?.getName()?.removeFormatting() == "Worm Membrane") {
                membranesInInv += item.getStackSize();
            }
        })
        if(membranesInInv < membranesLast && membranesBefore == 0) {
            membraneDifference = membranesInInv
        } else if(membranesInInv < membranesLast) {
            membraneDifference = 0;
        } else {
            membraneDifference = membranesInInv - membranesBefore;
        }

        gainedMembranes += membraneDifference;
        lifetimeMembranes += membraneDifference;
        membranesLast = membranesInInv;
        wormCounter = 0;
        fetchCurrentMembranes = true;
        membranesBefore = 0;
        } , 1000)
    }

})

register('command', () => {
    membraneDifference = 0;
    gainedMembranes = 0;
    dieing = false;
}).setName('resetKilling')

register("command", (amount) => {
    gainedMembranes = parseInt(amount);
}).setName("setMembranes")


register("chat", () => {
    prewarningTriggered = false;
    warningTriggered = false;
    dieing = false;
}).setCriteria("Your Kill Combo has expired! You reached a ${combo} Kill Combo!")

register("renderOverlay", () => {
    if(Skyblock.area == "Crystal Hollows") {
        if(Settings.membraneDifferenceCounter) {
            Renderer.drawString("Membranes gained this killing: " + membraneDifference?.toString(), data.membraneDifference.x, data.membraneDifference.y)
        }
        if(Settings.membranesInInv) {
            Renderer.drawString("Total membranes gained this session: " + gainedMembranes?.toString(), data.gainedMembranes.x, data.gainedMembranes.y)
        }
    }
})

function mobcap() {
    World.getAllEntities().forEach(entity => {
        if (Skyblock.area == "Crimson Isle") {
            lavaScs.forEach(index => {
                if (!entity.getName().includes(index)) return

                entityCounter++;

                //apparently this is the mobcap???
                if (entityCounter < 55) return

                Client.showTitle("&r&cMobcap reached!", "", 1, 30, 1);
            })
            return
        }

        allScs.forEach(index => {
            if (!entity.getName().includes(index)) return

            entityCounter++;

            if (entityCounter >= 55 && entityCounter < 59 && Settings.mobCapPre && !prewarningTriggered) {
                entityCounter++
                Client.showTitle("&r&cMobcap prewarning!", "", 1, 30, 1)
                if(Settings.mobCapPreChat) {ChatLib.say("/pc Mobcap almost reached! (5 mobs)")}
                if(Settings.capClosePing) {new Sound({source: Sounds[Settings.capCloseSound], priority: true}).play()}
                prewarningTriggered = true;
                return
            }

            if (entityCounter >= 60 && !warningTriggered) {
                
                if(Settings.capPing) {new Sound({source: Sounds[Settings.capSound], priority: true}).play()}
                Client.showTitle("&r&cMobcap reached!", "", 1, 30, 1);
                warningTriggered = true;

                return
            }
        })
    })
}


//mob cap warning and catch counter
register('step', () => {
    if(dieing) return;
    entityCounter = 0;
    if (!Settings.mobCap) return

    mobcap()
}).setFps(2)

register("chat", () => {
    lootShareCounter++;
    if(lootShareCounter >= 10) {
        prewarningTriggered = false;
        warningTriggered = false;
        dieing = false;
        lootShareCounter = 0;
    }
}).setCriteria("&r&e&lLOOT SHARE").setContains()
