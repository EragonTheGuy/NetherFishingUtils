import {@Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @PercentSliderProperty, @SelectorProperty, @NumberProperty, Color} from 'Vigilance';

const File = (Java.type("java.io.File"))
const Files = (Java.type("java.nio.file.Files"))
export let SoundsObject = {}
export let Sounds = []

const assetsFolder = new File(Config.modulesFolder + "/NetherFishingUtils/assets")
assetsFolder.mkdir()

assetsFolder.listFiles().forEach((it) => {
    if(Files.probeContentType(it.toPath()) == "audio/ogg") {
        SoundsObject[it.getName()] = it.getAbsolutePath();
        Sounds.push(it.getName())
    }
})

@Vigilant("NetherFishingUtils", "Settings", {
    getSubcategoryComparator: () => (a, b) => {
        // These function examples will sort the subcategories by the order in the array, so eeeeeee
        // will be above Category.
        const subcategories = ["Normal", "Winter", "Spooky Festival", "Shark Festival", "Crimson Isle"];
        

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    }

})

class Settings {
    constructor() {
        this.initialize(this);
        this.addDependency("Red percentage","Highlighted Bobber");
        this.addDependency("Blue percentage","Highlighted Bobber");
        this.addDependency("Green percentage","Highlighted Bobber");
        this.addDependency("RGB","Highlighted Bobber");
        this.addDependency("cap at 10", "Bobber counter");
        this.addDependency("Average counter", "Bobber counter");
        this.addDependency("Average bobber text", "Bobber counter");
        this.addDependency("Lobby Blacklist timer", "Lobby Blacklist");
        this.addDependency("fishing timer config", "fishing timer");
        this.addDependency("catches text", "catches");
        this.addDependency("catches per minute text", "catches per minute");
        this.addDependency("fishing timer position", "fishing timer");
        this.addDependency("scs text", "scs");
        this.addDependency("scs per minute text", "scs per minute");
        this.addDependency("membrane difference text", "membrane difference");
        this.addDependency("membranes gained text", "membrane counter");
        this.addDependency("Carrot King Sound", "Carrot King Ping");
        this.addDependency("Thunder Sound", "Thunder Ping");
        this.addDependency("Jawbus Sound", "Jawbus Ping");
        this.addDependency("Vial drop Sound", "Vial drop Ping");
        this.addDependency("High Ping Timer", "Big catch timer")
    }


    bobberTextMove = new Gui();
    catchesTextMove = new Gui();
    catchesPerMinTextMove = new Gui();
    timerTextMove = new Gui();
    ScsPerMinTextMove = new Gui();
    scsTextMove = new Gui();
    membranesKillingMove = new Gui();
    gainedMembranesMove = new Gui();
    totemTimerMove = new Gui();

//sounds -------------------------------------------------

    @ButtonProperty({
        name:"Add/Remove Sounds",
        placeholder:"Open Folder",
        description:"&cONLY .OGG FILES WILL WORK FOR CUSTOM SOUNDS (you can transform mp3 and others by using online tools)",
        category:"Sound Controls"
    })

    openfolder() {
        try{
            const Desktop = Java.type('java.awt.Desktop');
            const File = (Java.type("java.io.File"))
            Desktop.getDesktop().open(new File(Config.modulesFolder + "/NetherFishingUtils/assets"))
        } catch (e) {
            console.log(e)
        }
    }

    @ButtonProperty({
        name:"Reload Assets",
        placeholder:"Reload!",
        description:"&cReloads Sound Assets, use after Adding/Removing Sounds",
        category:"Sound Controls"
    })

    reload() {
        Client.currentGui.close()
        this.save()
        ChatTriggers.reloadCT()
        setTimeout(() => {
            ChatLib.command("nfu", true)
        }, 1200)
    }

    // Water scs -----------------------------------------------

    @SwitchProperty({
        name: "Agarimoo spawn ping",
        description: "Enable/Disable cow spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Normal"
    })
    cowPing = false;;

    @SelectorProperty({
        name:"Agarimoo spawn sound",
        description:"Changes the notification sound played for cow spawns",
        category:"Sea Creature Sounds",
        subcategory: "Normal",
        options: Sounds
    })
    cowSound = 0;


    @SwitchProperty({
        name: "Night Squid spawn ping",
        description: "Enable/Disable nsquid spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Normal"
    })
    nsquidPing = false;;

    @SelectorProperty({
        name:"Night Squid spawn sound",
        description:"Changes the notification sound played for nsquid spawns",
        category:"Sea Creature Sounds",
        subcategory: "Normal",
        options: Sounds
    })
    nsquidSound = 0;



    @SwitchProperty({
        name: "Carrot King Ping",
        description: "Enable/Disable Carrot King Ping",
        category: "Sea Creature Sounds",
        subcategory: "Normal"
    })
    carrotPing = false;;

    @SelectorProperty({
        name:"Carrot King Sound",
        description:"Changes the notification sound played for Carrot King",
        category:"Sea Creature Sounds",
        subcategory: "Normal",
        options: Sounds
    })
    carrotSound = 0;



    @SwitchProperty({
        name: "Sea Emperor spawn ping",
        description: "Enable/Disable emp spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Normal",
    })
    empPing = false;

    @SelectorProperty({
        name:"sea Emperor spawn sound",
        description:"Changes the notification sound played for emp spawns",
        category:"Sea Creature Sounds",
        subcategory: "Normal",
        options: Sounds
    })
    empSound = 0;



    @SwitchProperty({
        name: "Zombie Miner spawn ping",
        description: "Enable/Disable miner spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Normal",
    })
    minerPing = false;;
 
    @SelectorProperty({
        name:"Zombie Miner spawn sound",
        description:"Changes the notification sound played for miner spawns",
        category:"Sea Creature Sounds",
        subcategory: "Normal",
        options: Sounds
    })
    minerSound = 0;

// nether scs ---------------------------------------

    @SwitchProperty({
        name: "Thunder Ping",
        description: "Enable/Disable Thunder Ping",
        category: "Sea Creature Sounds",
        subcategory: "Crimson Isle",
    })
    thunderPing = false;;

    @SelectorProperty({
        name:"Thunder Sound",
        description:"Changes the notification sound played for Thunder",
        category:"Sea Creature Sounds",
        subcategory: "Crimson Isle",
        options: Sounds
    })
    thunderSound = 0;

    @SwitchProperty({
        name: "Jawbus Ping",
        description: "Enable/Disable Jawbus Ping",
        category: "Sea Creature Sounds",
        subcategory: "Crimson Isle",
    })
    jawbusPing = false;;

    @SelectorProperty({
        name:"Jawbus Sound",
        description:"Changes the notification sound played for Jawbus",
        category:"Sea Creature Sounds",
        subcategory: "Crimson Isle",
        options: Sounds
    })
    jawbusSound = 0;


    @SwitchProperty({
        name: "Phlegblast spawn ping",
        description: "Enable/Disable phleg spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Crimson Isle",
    })
    phlegPing = false;;
 
    @SelectorProperty({
        name:"Phlegblast spawn sound",
        description:"Changes the notification sound played for phleg spawns",
        category:"Sea Creature Sounds",
        subcategory: "Crimson Isle",
        options: Sounds
    })
    phlegSound = 0;

//  misc --------------------------------------------

    @SwitchProperty({
        name: "Double Hook Ping",
        description: "Enable/Disable Double Hook Ping",
        category: "Sea Creature Sounds",
        subcategory: "Misc",
    })
    dhPing = false;;

    @SelectorProperty({
        name:"Double Hook Sound",
        description:"Changes the notification sound played for Double Hooks",
        category:"Sea Creature Sounds",
        subcategory: "Misc",
        options: Sounds
    })
    dhSound = 0;


    //drops ---------------------------------------------------------

    @SwitchProperty({
        name: "Vial drop Ping",
        description: "Enable/Disable Vial drop Ping",
        category: "Drop Sounds",
        subcategory: "Drops",
    })
    vialPing = false;;

    @SelectorProperty({
        name:"Vial drop Sound",
        description:"Changes the notification sound played for Radioactive Vial drops",
        category:"Drop Sounds",
        subcategory: "Drops",
        options: Sounds
    })
    vialSound = 0;

    @SwitchProperty({
        name: "Flash drop Ping",
        description: "Enable/Disable Flash drop Ping",
        category: "Drop Sounds",
        subcategory: "Drops",
    })
    flashPing = false;;

    @SelectorProperty({
        name:"Flash drop Sound",
        description:"Changes the notification sound played for Flash book drops",
        category:"Drop Sounds",
        subcategory: "Drops",
        options: Sounds
    })
    flashSound = 0;


//winter scs ---------------------------------------

    @SwitchProperty({
        name: "Grinch spawn ping",
        description: "Enable/Disable grinch spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Winter",
    })
    grinchPing = false;;

    @SelectorProperty({
        name:"Grinch spawn sound",
        description:"Changes the notification sound played for grinch spawns",
        category:"Sea Creature Sounds",
        subcategory: "Winter",
        options: Sounds
    })
    grinchSound = 0;

    @SwitchProperty({
        name: "Nutcracker spawn ping",
        description: "Enable/Disable cracker spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Winter",
    })
    nutcrackerPing = false;;

    @SelectorProperty({
        name:"Nutcracker spawn sound",
        description:"Changes the notification sound played for cracker spawns",
        category:"Sea Creature Sounds",
        subcategory: "Winter",
        options: Sounds
    })
    nutcrackerSound = 0;

    @SwitchProperty({
        name: "Yeti spawn ping",
        description: "Enable/Disable Yeti spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Winter",
    })
    yetiPing = false;;

    @SelectorProperty({
        name:"Yeti spawn sound",
        description:"Changes the notification sound played for Yeti spawns",
        category:"Sea Creature Sounds",
        subcategory: "Winter",
        options: Sounds
    })
    yetiSound = 0;


    @SwitchProperty({
        name: "Reindrake spawn ping",
        description: "Enable/Disable drake spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Winter",
    })
    drakePing = false;;

    @SelectorProperty({
        name:"Reindrake spawn sound",
        description:"Changes the notification sound played for drake spawns",
        category:"Sea Creature Sounds",
        subcategory: "Winter",
        options: Sounds
    })
    drakeSound = 0;


//Spooky Festival

    @SwitchProperty({
        name: "Werewolf spawn ping",
        description: "Enable/Disable wolf spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Spooky Festival",
    })
    wolfPing = false;;

    @SelectorProperty({
        name:"Werewolf spawn sound",
        description:"Changes the notification sound played for wolf spawns",
        category:"Sea Creature Sounds",
        subcategory: "Spooky Festival",
        options: Sounds
    })
    wolfSound = 0;

    @SwitchProperty({
        name: "Phantom Fisher spawn ping",
        description: "Enable/Disable fisher spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Spooky Festival",
    })
    fisherPing = false;;

    @SelectorProperty({
        name:"Phantom Fisher spawn sound",
        description:"Changes the notification sound played for fisher spawns",
        category:"Sea Creature Sounds",
        subcategory: "Spooky Festival",
        options: Sounds
    })
    fisherSound = 0;

    @SwitchProperty({
        name: "Grim Reaper spawn ping",
        description: "Enable/Disable reaper spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Spooky Festival",
    })
    reaperPing = false;;

    @SelectorProperty({
        name:"Grim Reaper spawn sound",
        description:"Changes the notification sound played for reaper spawns",
        category:"Sea Creature Sounds",
        subcategory: "Spooky Festival",
        options: Sounds
    })
    reaperSound = 0;


//Shark Festival ------------------------------------


    @SwitchProperty({
        name: "Tiger White Shark spawn ping",
        description: "Enable/Disable tiger spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Shark Festival",
    })
    tigerPing = false;;

    @SelectorProperty({
        name:"Tiger White Shark sound",
        description:"Changes the notification sound played for tiger spawns",
        category:"Sea Creature Sounds",
        subcategory: "Shark Festival",
        options: Sounds
    })
    tigerSound = 0;

    @SwitchProperty({
        name: "Great White Shark spawn ping",
        description: "Enable/Disable gw spawn sound",
        category: "Sea Creature Sounds",
        subcategory: "Shark Festival",
    })
    gwPing = false;;

    @SelectorProperty({
        name:"Great White Shark sound",
        description:"Changes the notification sound played for gw spawns",
        category:"Sea Creature Sounds",
        subcategory: "Shark Festival",
        options: Sounds
    })
    gwSound = 0;


//notifs --------------------------------------------------

@SwitchProperty({
    name: "Jawbus party notification",
    description: "Enable/Disable Jawbus message in pchat",
    category: "Party",
})
JawbusPchat = true;

@SwitchProperty({
    name: "Thunder party notification",
    description: "Enable/Disable Thunder message in pchat",
    category: "Party",
})
ThunderPchat = true;

@SwitchProperty({
    name: "Vanquisher party notification",
    description: "Enable/Disable Vanquisher message in pchat",
    category: "Party",
})
VanqPchat = true;

//bobber stuff ----------------------------------------------

@SwitchProperty({
    name: "Highlighted Bobber",
    description: "Highlights your own bobber",
    category: "Bobber",
})
highlightedHook = false;

@PercentSliderProperty({
    name: 'Red percentage',
    description: 'Select a percentage for red',
    category: 'Bobber',
    subcategory: 'BobberColors',
})
red = 0.0;

@PercentSliderProperty({
    name: 'Green percentage',
    description: 'Select a percentage for green',
    category: 'Bobber',
    subcategory: 'BobberColors',
})
green = 0.0;

@PercentSliderProperty({
    name: 'Blue percentage',
    description: 'Select a percentage for blue',
    category: 'Bobber',
    subcategory: 'BobberColors',
})
blue = 0.0;

@SwitchProperty({
    name: "RGB",
    description: '&r&cNOTICE: ALL COLORS MUST BE SET TO 100 FOR THIS TO WORK!',
    category: "Bobber",
    subcategory: 'BobberColors'
})
rgbEnnabled = false;

@SwitchProperty({
    name: "Bobber counter",
    description: "Displays the number of Bobbers around you (slightly off sometimes)",
    category: "Misc",
    subcategory: 'Bobber'
})
bobberCounter = true;

@SwitchProperty({
    name: "cap at 10",
    description: "Caps the number of bobbers at 10",
    category: "Misc",
    subcategory: 'Bobber'
})
capAt10 = false;

@SwitchProperty({
    name: "Average counter",
    description: "Gives an average of the bobbers around you every minute (slightly off sometimes)",
    category: "Misc",
    subcategory: 'Bobber'
})
averageCounter = false;

@ButtonProperty({
    name: "Average bobber text",
    description: "Moves the bobber text",
    category: "Misc",
    subcategory: "Bobber"
})
moveBobberText() {
     this.bobberTextMove.open()
};

@SwitchProperty({
    name: "Lobby Player Blacklist",
    description: "Lets you add players to a blacklist and warns you if they're in your lobby (helpful to avoid griefers etc.); /bl for commands",
    category: "Misc",
    subcategory: 'Blacklist'
})
playerBL = false;

@SwitchProperty({
    name: "Lobby Blacklist",
    description: "Automatically stores lobbies you've visited for a certain amount of time and warns you when you visit them again (helpful for grinding mobs etc.)",
    category: "Misc",
    subcategory: 'Blacklist'
})
lobbyBL = false;

@SelectorProperty({
    name: "Lobby Blacklist timer",
    description: "How long should lobbies be blacklisted for (in seconds)",
    category: "Misc",
    subcategory: 'Blasklist options',
    options: ['30', '60', '120', '300']
})
blacklistTime = 0;


@SwitchProperty({
    name: "catches",
    description: "shows you how many things you have caught. Also includes junk",
    category: "Barn"
})
catches = false;

@ButtonProperty({
    name: "catches text",
    description: "Moves the catches text",
    category: "Barn",
})
moveCatchesText() {
     this.catchesTextMove.open()
};

@SwitchProperty({
    name: "fishing timer",
    description: "Barn fishing timer",
    category: "Barn"
})
timer = false;

@ButtonProperty({
    name: "fishing timer position",
    description: "Moves the fishing timer",
    category: "Barn",
})
moveTimer() {
     this.timerTextMove.open()
};

@TextProperty({
    name: "fishing timer config",
    description: "fishing timer in minutes (defaults to 5)",
    category: "Barn",
})
minutes = '5';

@SwitchProperty({
    name: "catches per minute",
    description: "shows your catches per minute",
    category: "Barn"
})
catchesPerMin = false;

@ButtonProperty({
    name: "catches per minute text",
    description: "Moves the catches per minute text",
    category: "Barn",
})
moveCatchesPerMinText() {
     this.catchesPerMinTextMove.open()
}

@SwitchProperty({
    name: "scs",
    description: "shows you how many sea creatures you have caught. This will be accurate.",
    category: "Barn"
})
scs = false;

@ButtonProperty({
    name: "scs text",
    description: "Moves the scs text",
    category: "Barn",
})
moveScsText() {
     this.scsTextMove.open()
};

@SwitchProperty({
    name: "scs per minute",
    description: "shows your scs per minute",
    category: "Barn"
})
scsPerMin = false;

@ButtonProperty({
    name: "scs per minute text",
    description: "Moves the scs per minute text",
    category: "Barn",
})
moveScsPerMinText() {
     this.ScsPerMinTextMove.open()
}

@SwitchProperty({
    name: "mob cap warning",
    description: "shows a warning on screen when (sc) mob cap is reached",
    category: "Barn"
})
mobCap = false;

@SwitchProperty({
    name: "mob cap prewarning",
    description: "shows a warning on screen when (sc) mob cap is almost reached (5 mobs)",
    category: "Barn"
})
mobCapPre = false;

@SwitchProperty({
    name: "mob cap party prewarning",
    description: "sends a message in party chat when mobcap is almost reached",
    category: "Barn"
})
mobCapPreChat = false;

@SwitchProperty({
    name: "Mobcap reached ping",
    description: "Enable/Disable mobcap reached sound",
    category: "Barn",
})
capPing = false;

@SelectorProperty({
    name:"Mobcap reached sound",
    description:"Changes the notification sound played when the mobcap is reached",
    category:"Barn",
    options: Sounds
})
capSound = 0;

@SwitchProperty({
    name: "Mobcap almost reached ping",
    description: "Enable/Disable mobcap almost reached sound",
    category: "Barn",
})
capClosePing = false;

@SelectorProperty({
    name:"Mob Cap almost reached sound",
    description:"Changes the notification sound played when the mobcap is almost reached",
    category:"Barn",
    options: Sounds
})
capCloseSound = 0;

@SwitchProperty({
    name: "membrane difference",
    description: "shows how many membranes you got per killing",
    category: "Worm"
})
membraneDifferenceCounter = false;

@ButtonProperty({
    name: "membrane difference text",
    description: "Moves the membranes gained this killing text",
    category: "Worm",
    subcategory: "Move"
})
moveMembraneGained() {
     this.membranesKillingMove.open()
};

@SwitchProperty({
    name: "membrane counter",
    description: "shows your session membranes gained this session",
    category: "Worm"
})
membranesInInv = false;

@ButtonProperty({
    name: "membranes gained text",
    description: "Moves the membranes gained this session text",
    category: "Worm",
    subcategory: "Move"
})
moveMembraneCounter() {
     this.gainedMembranesMove.open()
};

@ButtonProperty({
    name: "reset session membranes",
    description: "resets your fishing session to 0",
    category: "Worm"
})
resetMembraneSession() {
    ChatLib.command('resetSessionMembranes', true)
};

@SwitchProperty({
    name: "totem timer",
    description: "shows the data of an active totem of corruption",
    category: "Worm"
})
totemTimer = false;

@ButtonProperty({
    name: "totem info",
    description: "Moves the totem info text",
    category: "Worm",
    subcategory: "Move"
})
moveTotemTimer() {
     this.totemTimerMove.open()
};

@SwitchProperty({
    name: "Lootshare sc boss bar",
    description: "Adds a big boss bar at the top of your screen for lootsharing Scs",
    category: "Extras",
})
scBossBar = true;

@SwitchProperty({
    name: "Big catch timer",
    description: "Displays the small timer until catch in a big way",
    category: "Extras",
})
timerTitle = true;

@SwitchProperty({
    name: "Catch notification",
    description: "Displays a big title when catch is ready",
    category: "Extras",
})
catchNotif = true;

@SwitchProperty({
    name: "High Ping Timer",
    description: "Only for people with high ping: makes the catch msg appear 0.1 seconds earlier",
    category: "Extras",
})
highPingTimer = true;

@SwitchProperty({
    name: "RGB catch timer",
    description: "Displays the small timer until catch in rgb (EXTREMELY SCUFFED)",
    category: "Extras",
})
rgbTimer = true;
}




export default new Settings();