// scData format
import {scData} from "../data/scData"
import {data} from "../guiCoords"
import {scSinceJawbus, scSinceThunder, jawbusSinceVial, thunderSinceFlash} from "../index"
import Skyblock from "../../BloomCore/Skyblock";
import Settings, {Sounds} from "../configOne/config"
import Settings2 from "../configTwo/config2"
import {normalLavaScMsgs} from "../scsLists"
import { removeUnicode } from "../../BloomCore/utils/Utils";
const File = Java.type("java.io.File")


const regex = /§7 \((\d+)\)/g

var confirmClearStats = false;

var thunderData = [];
var thunderColumns = [];
var thunderMax = 0;

var jawbusData = [];
var jawbusColumns = [];
var jawbusMax = 0;

let x;
let y;
//##############################################################################
//                CLEAR AND CONFIRM
//##############################################################################

// clear command
register("command", () => {
    confirmClearStats = true;
    ChatLib.chat("do /confirmClear to confirm");
}).setName("clearStats");


// confirmation command
register("command", () => {
    if (confirmClearStats)
    {
        confirmClearStats = false;
        scData.scSinceJawbus = scSinceJawbus;
        scData.scSinceThunder = scSinceThunder;
        scData.jawbusSinceVial = jawbusSinceVial
        scData.thunderSinceFlash = thunderSinceFlash
        scData.nbrJawbus = [];
        scData.nbrThunder = [];
        scData.STATS.avgNbrJawbus = 0;
        scData.STATS.avgNbrThunder = 0;
        scData.save();
        ChatLib.chat("stats cleared");
    }
}).setName("confirmClear");


//##############################################################################
//                MOBS EVENTS
//##############################################################################

// chat register thunder
register("chat", () => {
    calcAvgThunder(scData.scSinceThunder);
    scSinceThunder = 0;
    scData.scSinceThunder = scSinceThunder;
    scData.save()
    scData.thunderSinceFlash++;
}).setCriteria("You hear a massive rumble as Thunder emerges${ali}");

// chat register jawbus
register("chat", () => {
    calcAvgJawbus(scData.scSinceJawbus);
    scData.scSinceJawbus = 0;
    scData.jawbusSinceVial++;
    scData.save()
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived${ali}");

// chat register vial
register("chat", () => {
    calcAvgVial(scData.jawbusSinceVial);
    scData.jawbusSinceVial = 0;
}).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)${ali}");


register("entityDeath", (entity) => {
    //flash drop alert
    if(Skyblock.area == "Crimson Isle" && entity.getName().removeFormatting().includes("Guardian")) {
        setTimeout(() => {
            Player.getInventory().getItems().forEach(item => {
                if(item?.getName()?.includes("Enchanted Book") && item?.getLore()?.find(l => l.removeFormatting().includes("Flash I"))) {
                    calcAvgFlash(scData.thunderSinceFlash)
                    scData.thunderSinceFlash = 0;
                    if(Settings.flashText) {
                        Client.showTitle(Settings2.flashText, Settings2.flashSubtext, 1, Settings2.stTime * 200, 1)
                    }
                    
                    if(Settings.flashPing) {
                        new Sound({source: Sounds[Settings.flashSound], priority: true}).play()
                    }
                }
            })
        }, 100)
    }
})

Object.keys(normalLavaScMsgs).forEach(messageKey => {
    // Setting the value of this key
    const message = normalLavaScMsgs[messageKey]

    // Register chat this message
    register("chat", () => {
        scData.scSinceJawbus++;
        scData.scSinceThunder++;
        doubleHook = false;
        scData.save()
    }).setCriteria(message)
})
//##############################################################################
//                STATS DISPLAY
//##############################################################################

// stats event, display infos
register("command", () => {
    ChatLib.chat(`&r&b&kabc&r&f number of &r&b&lthunders &r&fcaught: ${scData.nbrThunder.length}`);
    ChatLib.chat(`&raverage sc before &r&b&lthunder: &r&f${scData.STATS.avgNbrThunder}`);

    ChatLib.chat(`&r&e&kabc&r&f number of &r&e&ljawbus &r&fcaught: ${scData.nbrJawbus.length}`);
    ChatLib.chat(`&raverage sc before &r&e&ljawbus: &r&f${scData.STATS.avgNbrJawbus}`);

    ChatLib.chat(`&r&a&kabc&r&f number of &r&a&lvial &r&fcaught: ${scData.nbrVial.length}`);
    ChatLib.chat(`&raverage sc before &r&a&lvial: &r&f${scData.STATS.avgNbrVial}`);
}).setName("scStats").setAliases("scs");



//##############################################################################
//                FUNCTIONS
//##############################################################################


// calculate average catch for thunder
function calcAvgThunder(nbr)
{
    scData.nbrThunder.push(nbr);
    scData.save();
    ChatLib.chat(`&r&fNew entry for &r&b&lthunder &r&fadded: &r&b&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < scData.nbrThunder.length; i++)
    {
        sum += parseInt(scData.nbrThunder[i]);
    }
    scData.STATS.avgNbrThunder = Math.round(sum/scData.nbrThunder.length);
    scData.scSinceThunder = 0;
    scData.save();
    
}

// calculate average catch for jawbus
function calcAvgJawbus(nbr)
{
    scData.nbrJawbus.push(nbr);
    scData.save();
    ChatLib.chat(`&r&fNew entry for &r&e&ljawbus &r&fadded: &r&e&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < scData.nbrJawbus.length; i++)
    {
        sum += parseInt(scData.nbrJawbus[i]);
    }
    scData.STATS.avgNbrJawbus = Math.round(sum/scData.nbrJawbus.length);
    scData.scSinceJawbus = 0;
    scData.save();
    
}


// calculate average catch for vial
function calcAvgVial(nbr)
{
    scData.nbrVial.push(nbr);
    scData.save();
    ChatLib.chat(`&r&fNew entry for &r&a&lvial &r&fadded: &r&a&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < scData.nbrVial.length; i++)
    {
        sum += parseInt(scData.nbrVial[i]);
    }
    scData.STATS.avgNbrVial = Math.round(sum/scData.nbrVial.length);
    scData.jawbusSinceVial = 0;
    scData.save(); 
}



function calcAvgFlash(nbr)
{
    scData.nbrFlash.push(nbr);
    scData.save();
    ChatLib.chat(`&r&fNew entry for &r&a&lFlash &r&fadded: &r&a&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < scData.nbrFlash.length; i++)
    {
        sum += parseInt(scData.nbrFlash[i]);
    }
    scData.STATS.avgNbrFlash = Math.round(sum/scData.nbrFlash.length);
    scData.thunderSinceFlash = 0;
    scData.save();
}

// process thunder scData and calculate scData for display purpose
function processThunderColumns()
{
    vals = scData.nbrThunder;
    vals.sort(function(a, b) { return a - b; });
    thunderMax = vals[vals.length-1];
    
    thunderData = [];
    thunderColumns = [];
    for (i = 0; i < 51; i++)
    {
        thunderColumns.push(Math.round(i/100 * thunderMax));
    }
    for (i = 0; i < 50; i++)
    {
        thunderData.push(scData.nbrThunder.filter(x => x > thunderColumns[i]).filter(x => x <= thunderColumns[i+1]).length);
    }
}


// process jawbus scData and calculate scData for display purpose
function processJawbusColumns()
{
    vals = scData.nbrJawbus;
    vals.sort(function(a, b) { return a - b; });
    jawbusMax = vals[vals.length-1];

    jawbusData = [];
    jawbusColumns = [];
    for (i = 0; i < 51; i++)
    {
        jawbusColumns.push(Math.round(i/100 * jawbusMax));
    }
    for (i = 0; i < 50; i++)
    {
        jawbusData.push(scData.nbrJawbus.filter(x => x > jawbusColumns[i]).filter(x => x <= jawbusColumns[i+1]).length);
    }
}


//##############################################################################
//                GRAPH
//##############################################################################


// render event
register ("renderoverlay", () => {
    processThunderColumns();
    processJawbusColumns();
    
    if (Settings.scGraph)
    {
        new Rectangle(Renderer.BLACK, data.scGraph.x +10, data.scGraph.y +10, 0, 75).setOutline(Renderer.BLACK, 0.75).draw();
        new Rectangle(Renderer.BLACK, data.scGraph.x +10, data.scGraph.y +85, 141.8, 0).setOutline(Renderer.BLACK, 0.75).draw();
        new Rectangle(Renderer.BLACK, data.scGraph.x +10, data.scGraph.y +10+100, 0, 75).setOutline(Renderer.BLACK, 0.75).draw();
        new Rectangle(Renderer.BLACK, data.scGraph.x +10, data.scGraph.y +85+100, 141.8, 0).setOutline(Renderer.BLACK, 0.75).draw();

        new Text("0", data.scGraph.x +10, data.scGraph.y +90).setColor(Renderer.AQUA).draw();
        new Text(thunderMax/2, data.scGraph.x +72, data.scGraph.y +90).setColor(Renderer.AQUA).draw();
        new Text(thunderMax, data.scGraph.x +135, data.scGraph.y +90).setColor(Renderer.AQUA).draw();
        new Text("0", data.scGraph.x +10, data.scGraph.y +90+100).setColor(Renderer.YELLOW).draw();
        new Text(jawbusMax/2, data.scGraph.x +70, data.scGraph.y +90+100).setColor(Renderer.YELLOW).draw();
        new Text(jawbusMax, data.scGraph.x +130, data.scGraph.y +90+100).setColor(Renderer.YELLOW).draw();

        new Text("catches : " + scData.nbrThunder.length, data.scGraph.x +90, data.scGraph.y +10).setColor(Renderer.AQUA).draw();
        new Text("catches : " + scData.nbrJawbus.length, data.scGraph.x +90, data.scGraph.y +10+100).setColor(Renderer.YELLOW).draw();
        new Text("avg : " + scData.STATS.avgNbrThunder, data.scGraph.x +90, data.scGraph.y+10+10).setColor(Renderer.AQUA).draw();
        new Text("avg : " + scData.STATS.avgNbrJawbus, data.scGraph.x +90, data.scGraph.y +10+100+10).setColor(Renderer.YELLOW).draw();

        dupe = [...thunderData];
        c = dupe.sort(function(a, b) { return a - b; })[49];
        new Text(c, data.scGraph.x -4, data.scGraph.y +10).setColor(Renderer.AQUA).draw();
        h = 75 / c;
        z = 141.8/50;
        for (i = 0; i < 50; i++)
        {
            new Rectangle(Renderer.AQUA, data.scGraph.x +10+(i*z), data.scGraph.y +85-(h*thunderData[i]), z, h*thunderData[i]).draw();
        }

        dupe = [...jawbusData];
        c = dupe.sort(function(a, b) { return a - b; })[49];
        new Text(c, data.scGraph.x -4, data.scGraph.y +10+100).setColor(Renderer.YELLOW).draw();
        h = 75 / c;
        z = 141.8/50;
        for (i = 0; i < 50; i++)
        {
            new Rectangle(Renderer.YELLOW, data.scGraph.x +10+(i*z), data.scGraph.y +100+85-(h*jawbusData[i]), z, h*jawbusData[i]).draw();
        }

        if (Settings.graphMove.isOpen())
        {
            new Rectangle(Renderer.WHITE, data.scGraph.x -5, data.scGraph.y -5, 161.8+10, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, data.scGraph.x -5, data.scGraph.y -5, 0, 200+10).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, data.scGraph.x -5, data.scGraph.y + 200+5, 161.8+10, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, data.scGraph.x + 161.8+5, data.scGraph.y -5, 0, 200+10).setOutline(Renderer.WHITE, 1.0).draw();
        }
    }
});

const chatid = (msg, id) => new Message(msg).setChatLineId(id).chat()

const FileInputStream = Java.type("java.io.FileInputStream")
const GZIPInputStream = Java.type("java.util.zip.GZIPInputStream")
const FileOutputStream = Java.type("java.io.FileOutputStream")
const Byte = Java.type("java.lang.Byte")

const unzipGzipFromFile = (file, outputFolder, fileName) => {
    if(!FileLib.isDirectory(outputFolder)) new File(outputFolder).mkdirs();

    const fs = new FileInputStream(file)
    const gs = new GZIPInputStream(fs)
    const fo = new FileOutputStream(`${outputFolder}${fileName}.txt`)

    let buffer = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536)

    let len
    while((len = gs.read(buffer)) > 0){
        fo.write(buffer, 0, len)
    }
}


let dir = new File("./logs")
let filesRead = 0;
let filestoRead = dir.listFiles().length
let filesUnzipped = 0;
let dh = false;
let lastLine

register("gameLoad", () => {
    new Thread(() => {
        if(FileLib.isDirectory("./logs/readableLogs")) {
            return
        }

        dir.listFiles().forEach(file => {
            filesUnzipped++;
            if(!file.getName().includes(".gz")) return
            unzipGzipFromFile(file, `./logs/readableLogs/`, file.getName().split(".")?.[0])
            chatid("&r&c[NFU] unzipping file " + filesUnzipped + " out of " + filestoRead, 1)
        })

        let readableLogs = new File("./logs/readableLogs")

        readableLogs.listFiles().forEach(file => {
            filesRead++;
            chatid("&r&c[NFU] " + filesRead + " out of " + readableLogs.listFiles().length + " files processed!", 2)
            FileLib.read(file)?.split("\n")?.forEach(line => {

                if(!line.includes("[CHAT]")) return

                if(lastLine = line) return

                lastLine = line;


                if(line.removeFormatting().includes("Double Hook!")) dh = true;

                if(line.includes("§r§c§lYou have angered a legendary creature... Lord Jawbus has arrived.§r") && !/§[fr]:/.test(line)) {
                    if(scData.scSinceJawbus == 0) return
                    calcAvgJawbus(scData.scSinceJawbus);
                    scData.jawbusSinceVial++;

                    if(dh) scData.jawbusSinceVial++;
                } else if(line.removeFormatting().includes("You hear a massive rumble as Thunder emerges") && !/§[fr]:/.test(line)) {
                    if(scData.scSinceThunder == 0) return
                    calcAvgThunder(scData.scSinceThunder);
                } else if(line.removeFormatting().includes("RARE DROP! Radioactive Vial") && !/§[fr]:/.test(line)) {
                    if(scData.jawbusSinceVial == 0) return
                    calcAvgVial(scData.jawbusSinceVial)
                    scData.jawbusSinceVial = 0;
                } else {
                    normalLavaScMsgs.forEach(message => {
                        if(line.removeFormatting().includes(message) && !line.removeFormatting().includes("§f")) {
                            if(regex.test(line)[1]) {
                                scData.scSinceThunder += parseInt(regex.test(line)[1]);
                                scData.scSinceJawbus += parseInt(regex.test(line)[1]);
                            } else {
                                scData.scSinceThunder++;
                                scData.scSinceJawbus++;
                            }
                            scData.save();
                        }
                    })     
                }   
            })
        })
    }).start()
})