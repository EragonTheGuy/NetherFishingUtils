import PogObject from "../../PogData"
import Settings, {Sounds} from "../configOne/config";

let blacklist = new PogObject("NetherFishingUtils", {
    playerBlacklist: []
}, "playerBlacklist.json")

let lobbyBlacklist = [];
let blTimer = 30;
let playerFound = false;
let title = false;

//player blacklist
register("command", (arg1, arg2) => {
    switch (arg1) {
        case 'add':
            if(!arg2) {
                ChatLib.chat("&r&cPlease enter a valid name!");
                return;
            } else if (blacklist.playerBlacklist.includes(arg2)) {
                ChatLib.chat("&r&cThis player is already on your blacklist!")
            } else {
                blacklist.playerBlacklist.push(arg2);
                blacklist.save();
                ChatLib.chat("&aAdded "+arg2+" to your blacklist!");
            }
            break;
        
        case 'remove':
            if(!blacklist.playerBlacklist.includes(arg2)) {
                ChatLib.chat("&r&cThis Player is not on your blacklist!")
            } else {
                blacklist.playerBlacklist.splice(blacklist.playerBlacklist.indexOf(arg2));
                blacklist.save();
                ChatLib.chat("&aRemoved "+arg2+" from your blacklist!");
            }
            break;
        
        case 'removeall':
            blacklist.playerBlacklist = [];
            ChatLib.chat('&aRemoved all players from your blacklist!')
            break;
        
        case 'list':
            if(!blacklist.playerBlacklist[0]) {
                ChatLib.chat('&r&cYour blacklist is currently empty!')
            } else {
                ChatLib.chat(blacklist.playerBlacklist.toString());
            }
            break;
        default:
            ChatLib.chat("Commands available for player blacklist:\n/bl add [player]\n/bl remove [player]\n/bl list\n/bl removeall")
            break;
    }

}).setName("bl")

register('command', (args) => {
    switch(args) {
        case 'reset':
            lobbyBlacklist = [];
            ChatLib.chat('&aReset your lobby blacklist!')
            break;
    }
}).setName('lobbybl')


if(Settings.playerBL) {
    register('step', () => {
        playerFound = false;
    }).setDelay(300)

    register('worldLoad', () => {
        playerFound = false;
    })

    register('step', () => {
        let players = TabList.getUnformattedNames();
        for (let i = 0; i < players.length; i++) {
            if(players.includes(blacklist.playerBlacklist[i]) && !playerFound) {
                Client.showTitle("&r&cBlacklisted player detected!","", 1, 60, 1);
                playerFound = true;
            }
        }
    }).setDelay(1)
}

//lobby blacklist
if(Settings.lobbyBL) {
    switch(Settings.blacklistTime) {
        case 0:
            blTimer = 30;
            break;
        case 1:
            blTimer = 60;
            break;
        case 2: 
            blTimer = 120
            break;
        case 3:
            blTimer = 300
            break;
        default:
            blTimer = 30;
            break;
    }
}

register('worldLoad', () => {
    title = true;
    totemTime = undefined
})

register('renderScoreboard', () => {
    if (Scoreboard.getLines().length > 0 && lobbyBlacklist.includes(Scoreboard.getLineByIndex(Scoreboard.getLines().length -1).toString()) && title && lobbyBL) {
        Client.showTitle("&r&cYou visited this lobby already!", "", 1, 60, 1);
        title = false;
        
    }

    if(Scoreboard.getLines().length > 0 
    && !lobbyBlacklist.includes(Scoreboard.getLineByIndex(Scoreboard.getLines().length -1).toString()) 
    && title 
    && !Scoreboard.getLines().some(line => ChatLib.removeFormatting(line).includes("Your"))) {
        lobbyBlacklist.push(Scoreboard.getLineByIndex(Scoreboard.getLines().length - 1).toString());
        title = false;
    }
})

register('step', () => {
    lobbyBlacklist.shift();
}).setDelay(blTimer)