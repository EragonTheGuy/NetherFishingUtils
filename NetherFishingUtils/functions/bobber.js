import Settings, {Sounds} from "../configOne/config";
import { data } from "../guiCoords"


let bobberCounter = 0;
let bobberCounterAvrg = 0;
let bobberAvrg = 0;
let bobberAvrgTimer = 0;

//made by IcarusPhantom
function rgb() {
    if (Settings.red >= 1.0) {
        if (Settings.blue > 0.0) {
            Settings.blue = Settings.blue - 0.05;
        } else {
            Settings.green = Settings.green + 0.05;
        }
        if (Settings.green >= 1) {
            Settings.green = 1;
            Settings.red = Settings.red - 0.05;
        }
    } else if (Settings.green >= 1.0) {
        if (Settings.red > 0.0) {
            Settings.red = Settings.red - 0.05;
        } else {
            Settings.blue = Settings.blue + 0.05;
        }
        if (Settings.blue >= 1) {
            Settings.blue = 1;
            Settings.green = Settings.green - 0.05;
        }
    } else if (Settings.blue >= 1.0) {
        if (Settings.green > 0.0) {
            Settings.green = Settings.green - 0.05;
        } else {
            Settings.red = Settings.red + 0.05;
        }
        if (Settings.red >= 1) {
            Settings.red = 1;
            Settings.blue = Settings.blue - 0.05;
        }
    }
}


register('renderWorld', () => {
    if (Settings.highlightedHook || Settings.bobberCounter) {
        bobberCounter = 0;
        World.getAllEntities().forEach(entity => {
            if(entity.getClassName() == "EntityFishHook") {
                if(entity.getPos().distanceSqToCenter(Player.getX(), Player.getY(), Player.getZ()) <= 900) {
                    bobberCounter++;
                        if(new PlayerMP(entity.getEntity().field_146042_b).getName() == Player.getName() && Settings.highlightedHook) {
                                RenderLib.drawInnerEspBox(entity.x, entity.y, entity.z, 0.5, 0.3, Settings.red, Settings.green, Settings.blue, 1, true);
                                    if(Settings.rgbEnnabled) {
                                        rgb();
                                    }
                        } 
                }
            }   
        })
    }
})

//bobber averages
register("step", () => {
    if(Settings.averageCounter) {
        World.getAllEntities().forEach(entity => {
            if(entity.getClassName() == "EntityFishHook") {
                if(entity.getPos().distanceSqToCenter(Player.getX(), Player.getY(), Player.getZ()) <= 900) {
                    bobberCounterAvrg++;
                }
            } 
        })
        c++;
        if(bobberAvrgTimer == 60) {
            bobberAvrg = Math.round(bobberCounterAvrg/60);
            bobberCounterAvrg = 0;
            bobberAvrgTimer = 0;          
        }
    }
}).setDelay(1)

register("renderOverlay", () => {
    if(Settings.bobberCounter) {
        if(Settings.capAt10 && bobberCounter > 10) {
            bobberCounter = 10;
        }
        if (Settings.averageCounter && bobberAvrg > 0) {
            bobberAvrg.toString();
            Renderer.drawString("Average bobbers: " + bobberAvrg, data.bobberCount.x, data.bobberCount.y);
        } else if(Settings.averageCounter && bobberAvrg == 0) {
            bobberAvrg.toString();
            Renderer.drawString("Average bobbers: " + bobberAvrg + " (probably loading)", data.bobberCount.x, data.bobberCount.y);
        } else {
            bobberCounter.toString();
            Renderer.drawString("bobbers around you: " + bobberCounter, data.bobberCount.x, data.bobberCount.y);
        }
    }
})