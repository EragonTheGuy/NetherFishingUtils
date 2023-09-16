import {EntityItem, MCItem, SkullItem, BP, Blocc} from "../const"
import {baits} from "../baits"
import Settings from "../configOne/config"
import { data } from "../guiCoords";
//import {getSkullTexture} from "../../BloomCore/utils/Utils"

let textureString;
let currentBait;

let bobberX;
let bobberY;
let bobberZ;

const baitImages = {
    "blessed" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/blessed.png"),
    "fish" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/fish.png"),
    "whale" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/whale.png"),
    "minnow" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/minnow.png"),
    "light" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/light.png"),
    "dark" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/dark.png"),
    "spooky" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/spooky.png"),
    "spiked" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/spiked.png"),
    "carrot" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/carrot.png"),
    "ice" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/ice.png"),
    "shark" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/shark.png"),
    "corrupted" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/corrupted.png"),
    "hot" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/hot.png"),
    "glowy" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/glowy.png"),
    "obf 1" : Image.fromFile("config/ChatTriggers/modules/netherfishingutils/imgs/obf 1.png"),
}

register("step", () => {
    World.getAllEntities().forEach(e => {
        if(e.getClassName() == "EntityFishHook" && new PlayerMP(e.getEntity().field_146042_b).getName() == Player.getName()) {
            bobberX = e.getX();
            bobberY = e.getY();
            bobberZ = e.getZ();
         }
    })

    World.getAllEntitiesOfType(EntityItem).forEach(e => {
        if (Math.abs(e.getX() - bobberX) <= 3 && Math.abs(e.getZ() - bobberZ) <= 3) {
            textureString = getSkullTexture(e.entity.func_70096_w().func_82710_f(10))
        }
    })

    if(!textureString) return
    Object.keys(baits).forEach(bait => {
        if(baits[bait].includes(textureString)) {
            currentBait = bait
        }
    })
}).setFps(2)

//huge thanks to Ilmars for providing this
const getSkullTexture = (item) => {
    const headItem = item?.func_77973_b()

    if (!(headItem instanceof SkullItem)) return false
    const nbt = item.func_77978_p()
    if (!nbt) return false
    if (!nbt.func_150297_b("SkullOwner", 10)) return false
    return nbt?.func_74775_l("SkullOwner")?.func_74775_l("Properties")?.func_150295_c("textures", 10)?.func_150305_b(0)?.func_74779_i("Value")
}

register("renderOverlay", () => {
    if(Settings.baitImg) {
        if(!currentBait) {
            Renderer.drawString("Current bait: none", data.bait.x, data.bait.y)
        } else {
            Renderer.drawString("Current bait: ", data.bait.x, data.bait.y)
            Renderer.drawImage(baitImages[currentBait] , data.bait.x + 70, data.bait.y - 0.5, 10, 10)
        }

    } else if(Settings.baitText) {
        if(!currentBait) {
            Renderer.drawString("Current bait: none", data.bait.x, data.bait.y)
        } else {
            Renderer.drawString("Current bait: " + currentBait, data.bait.x, data.bait.y)
        }
    } 
})
