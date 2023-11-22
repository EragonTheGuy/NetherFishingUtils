import {fishingSpeed} from "../stats"
import Skyblock from "../../BloomCore/Skyblock"
import { File } from "../../BloomCore/utils/Utils";


const NecklaceSlot = 10;
const CloakSlot = 19;
const BeltSlot = 28;
const GauntletSlot = 37
const petSlot = 47;
const ResourcePack = Java.type("net.minecraft.client.gui.GuiScreenResourcePacks")


/*function getField(e, field) {
    let field2 = e.class.getDeclaredField(field);

    field2.setAccessible(true)

    return field2.get(e)
}

getField(Client.getMinecraft().func_110438_M().func_110613_c(), "field_110617_f")*/

let necklace;
let cloak;
let belt;
let gauntlet;
let mythicff = false;

register("tick", () => {
    if(Client.isInGui()  && Player.getContainer().getName() == "Your Equipment and Stats") {
        necklace = Player.getContainer().getStackInSlot(NecklaceSlot)?.getName()
        cloak = Player.getContainer().getStackInSlot(CloakSlot)?.getName()
        belt = Player.getContainer().getStackInSlot(BeltSlot)?.getName()
        gauntlet = Player.getContainer().getStackInSlot(GauntletSlot)?.getName()

        Player.getContainer()?.getStackInSlot(NecklaceSlot)?.getLore()?.forEach(l => {
            if(l.removeFormatting().includes("Fishing Speed")) {
                let base =  l.removeFormatting().split(":")[1].split("(")[0]
                let reforge = l.removeFormatting().split(":")[1].split("(")[1].replace(")", "")
                if(base == reforge) {
                    fishingSpeed["equipment"]["necklace"]["base"] = 0;
                    fishingSpeed["equipment"]["necklace"]["reforge"] = reforge;
                } else {
                    fishingSpeed["equipment"]["necklace"]["base"] = Number(base) - Number(reforge);
                    fishingSpeed["equipment"]["necklace"]["reforge"] = Number(reforge)
                }
            }
        })

        Player.getContainer()?.getStackInSlot(CloakSlot)?.getLore()?.forEach(l => {
            if(l.removeFormatting().includes("Fishing Speed")) {
                let base =  l.removeFormatting().split(":")[1].split("(")[0]
                let reforge = l.removeFormatting().split(":")[1].split("(")[1].replace(")", "")
                if(base == reforge) {
                    fishingSpeed["equipment"]["cloak"]["base"] = 0;
                    fishingSpeed["equipment"]["cloak"]["reforge"] = reforge;
                } else {
                    fishingSpeed["equipment"]["cloak"]["base"] = Number(base) - Number(reforge);
                    fishingSpeed["equipment"]["cloak"]["reforge"] = Number(reforge)
                }
            }
        })

        Player.getContainer()?.getStackInSlot(BeltSlot)?.getLore()?.forEach(l => {
            if(l.removeFormatting().includes("Fishing Speed")) {
                let base =  l.removeFormatting().split(":")[1].split("(")[0]
                let reforge = l.removeFormatting().split(":")[1].split("(")[1].replace(")", "")
                if(base == reforge) {
                    fishingSpeed["equipment"]["belt"]["base"] = 0;
                    fishingSpeed["equipment"]["belt"]["reforge"] = reforge;
                } else {
                    fishingSpeed["equipment"]["belt"]["base"] = Number(base) - Number(reforge);
                    fishingSpeed["equipment"]["belt"]["reforge"] = Number(reforge)
                }
            }
        })

        Player.getContainer()?.getStackInSlot(GauntletSlot)?.getLore()?.forEach(l => {
            if(l.removeFormatting().includes("Fishing Speed")) {
                let base =  l.removeFormatting().split(":")[1].split("(")[0]
                let reforge = l.removeFormatting().split(":")[1].split("(")[1].replace(")", "")
                if(base == reforge) {
                    fishingSpeed["equipment"]["gauntlet"]["base"] = 0;
                    fishingSpeed["equipment"]["gauntlet"]["reforge"] = reforge;
                } else {
                    fishingSpeed["equipment"]["gauntlet"]["base"] = Number(base) - Number(reforge);
                    fishingSpeed["equipment"]["gauntlet"]["reforge"] = Number(reforge)
                }
            }
        })

        Player.getContainer()?.getStackInSlot(petSlot)?.getLore()?.forEach(l => {
            if(l.removeFormatting().includes("Fishing Speed")) {
                let petSpeed = l.removeFormatting().split(":")[1]
            }

            if(l.removeFormatting().includes("Sea Creature Chance")) {
                let petScc = l.removeFormatting().split(":")[1]
            }
        })

       if(Player.getContainer()?.getStackInSlot(47)?.getName()?.removeFormatting() == undefined) return
       let petLvl =  Player.getContainer()?.getStackInSlot(47)?.getName()?.removeFormatting()?.split("[")[1].split("]")[0]
    }
})

register("chat", () => {
    mythicff = true;
}).setCriteria("&r&aYou summoned your &r&dFlying Fish&r&a!&r")

/*register("step", () => {
    if(!Skyblock.inSkyblock) return
    ChatLib.chat(Player.getInventory()?.getStackInSlot(36)?.getName())
    ChatLib.chat(Player.getInventory()?.getStackInSlot(37)?.getName())
    ChatLib.chat(Player.getInventory()?.getStackInSlot(38)?.getName())
    ChatLib.chat(Player.getInventory()?.getStackInSlot(39)?.getName())
    for(let i = 36; i <= 39; i++) {
        Player.getContainer().getStackInSlot(i)?.getLore().forEach(l => {
            if(l.removeFormatting().includes("Fishing Speed")) {
                let base =  l.removeFormatting().split(":")[1].split("(")[0]
                let reforge = l.removeFormatting().split(":")[1].split("(")[1].replace(")", "")
                if(Player.getContainer().getStackInSlot(i)?.getName().removeFormatting().includes("Magma Lord") && mythicff) base -= Math.round(base * 0.16666666666)
                if(base == reforge) {
                    fishingSpeed["equipment"]["gauntlet"]["base"] = 0;
                    fishingSpeed["equipment"]["gauntlet"]["reforge"] = reforge;
                } else {
                    fishingSpeed["armor"]["gauntlet"]["base"] = Number(base) - Number(reforge);
                    fishingSpeed["equipment"]["gauntlet"]["reforge"] = Number(reforge)
                }
            }
        })
    }
}).setFps(1)*/

register("command", (textureName) => {
    if(FileLib.exists("./resourcepacks/3dhypixel.zip") && FileLib.exists("./resourcepacks/3dhypixel.zip")) {

    }
}).setName("testFile")


