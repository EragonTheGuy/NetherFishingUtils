import PogObject from "../../PogData"
import Settings, {Sounds} from "../configOne/config"
import Skyblock from "../../BloomCore/Skyblock";

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

let flashCounter = 0;

function wormStuff() {
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
        ChatLib.chat(dieing)
        dieing = true
    };

    if(wormCounter == 59 && prewarningTriggered == true && warningTriggered == true) {
        
    }

    if(wormCounter == 60) {
        ChatLib.chat(entityCounter)
        ChatLib.chat("falsified")
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
}

register('entityDeath', (entity) => {

    //flash drop alert
    ChatLib.chat(entity.getName().removeFormatting())
    if(Skyblock.area == "Crimson Isle" && entity.getName().removeFormatting().includes("Guardian")) {
        ChatLib.chat("thunder died")
        Player.getInventory().getItems().forEach(item => {
            if(item.getName() == "Enchanted Book" && item.getLore().includes("Flash")) {
                flashCounter++;
                if(Settings.flashText) {
                    Client.showTitle(Settings.flashText, Settings.flashSubtext, 1, Settings.stTime * 100, 1)
                }
                
                if(Settings.flashPing) {
                    new Sound({source: Sounds[Settings.flashSound], priority: true}).play()
                }
            }
        })
    }
})

register("entityDeath", (entity) => {

    if(Skyblock.area != "Crystal Hollows") return

    if(entity.getName() != "Silverfish" || Skyblock.area != "Crystal Hollows") return;
    wormStuff()
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