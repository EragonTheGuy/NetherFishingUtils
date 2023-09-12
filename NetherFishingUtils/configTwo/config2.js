import {@Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @PercentSliderProperty, @SelectorProperty, @NumberProperty, Color} from 'Vigilance';


@Vigilant("NetherFishingUtils", "Settings", {
    getSubcategoryComparator: () => (a, b) => {
        // These function examples will sort the subcategories by the order in the array, so eeeeeee
        // will be above Category.
        const subcategories = ["Normal", "Winter", "Spooky Festival", "Shark Festival", "Crimson Isle"];
        

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    }

})

class Settings2 {
    constructor() {
        this.initialize(this);
        this.addDependency("Jawbus Text", "Jawbus Title");
        this.addDependency("Thunder Text", "Thunder Title");
        this.addDependency("Carrot King Text", "Carrot King Title");
        this.addDependency("Jawbus Text", "Jawbus Title");
        this.addDependency("Double Hook Text", "Double Hook Title");
        this.addDependency("Vial Text", "Vial Title");
        this.addDependency("Yeti Text", "Yeti Title");
        this.addDependency("Great White Text", "Great White Title");
        this.addDependency("Phantom Fisher Text", "Phantom Fisher Title");
        this.addDependency("Grim Reaper Text", "Grim Reaper Title");
        this.addDependency("Sea Emperor Text", "Sea Emperor Title");
        this.addDependency("Nutcracker Text", "Nutcracker Title");
        this.addDependency("Night Squid Text", "Night Squid Title");
        this.addDependency("Reindrake Text", "Reindrake Title");
        this.addDependency("Agarimoo Text", "Agarimoo Title");
        this.addDependency("Phlegblast Text", "Phlegblast Title");
        this.addDependency("Carrot King Subtext", "Carrot King Title");
        this.addDependency("Jawbus Subtext", "Jawbus Title");
        this.addDependency("Double Hook Subtext", "Double Hook Title");
        this.addDependency("Vial Subtext", "Vial Title");
        this.addDependency("Yeti Subtext", "Yeti Title");
        this.addDependency("Great White Subtext", "Great White Title");
        this.addDependency("Phantom Fisher Subtext", "Phantom Fisher Title");
        this.addDependency("Grim Reaper Subtext", "Grim Reaper Title");
        this.addDependency("Sea Emperor Subtext", "Sea Emperor Title");
        this.addDependency("Nutcracker Subtext", "Nutcracker Title");
        this.addDependency("Night Squid Subtext", "Night Squid Title");
        this.addDependency("Reindrake Subtext", "Reindrake Title");
        this.addDependency("Agarimoo Subtext", "Agarimoo Title");
        this.addDependency("Phlegblast Subtext", "Phlegblast Title");
    }
//water scs -------------------------------------------------------------

    @PercentSliderProperty({
        name: "Title Timer",
        description: "How long should titles stay for? (0% = 0 seconds, 100% = 10 seconds etc.)",
        category: "Text",
    })
    stTime = 0.15;

    @SwitchProperty({
        name: "Agarimoo Title",
        description: "Enable/Disable cow Text",
        category: "Text",
        subcategory: "Normal",
    })
    cowTitle = false;

    @TextProperty({
        name: "Agarimoo Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Normal",
    })
    cowText = "&4Aga&frimoo!";

    @TextProperty({
        name: "Agarimoo Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Normal",
    })
    cowSubtext = "";


    
    @SwitchProperty({
        name: "Night Squid Title",
        description: "Enable/Disable nsquid Text",
        category: "Text",
        subcategory: "Normal",
    })
    nsquidTitle = false;

    @TextProperty({
        name: "Night Squid Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Normal",
    })
    nsquidText = "&0Night Squid!";

    @TextProperty({
        name: "Night Squid Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Normal",
    })
    nsquidSubtext = "";



    @SwitchProperty({
        name: "Carrot King Title",
        description: "Enable/Disable Carrot King Text",
        category: "Text",
        subcategory: "Normal",
    })
    carrotTitle = false;

    @TextProperty({
        name: "Carrot King Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Normal",
    })
    carrotText = "&aCarrot King!";

    @TextProperty({
        name: "Carrot King Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Normal",
    })
    carrotSubtext = "";



    @SwitchProperty({
        name: "Water Hydra Title",
        description: "Enable/Disable hydra Text",
        category: "Text",
        subcategory: "Normal",
    })
    hydraTitle = false;

    @TextProperty({
        name: "Water Hydra Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Normal",
    })
    hydraText = "&1Water Hydra!";

    @TextProperty({
        name: "Water Hydra Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Normal",
    })
    hydraSubtext = "";



    @SwitchProperty({
        name: "Sea Emperor Title",
        description: "Enable/Disable emp Text",
        category: "Text",
        subcategory: "Normal",
    })
    empTitle = false;

    @TextProperty({
        name: "Sea Emperor Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Normal",
    })
    empText = "&1Sea Emperor!";

    @TextProperty({
        name: "Sea Emperor Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Normal",
    })
    empSubtext = "";




    @SwitchProperty({
        name: "Zombier Miner Title",
        description: "Enable/Disable miner Text",
        category: "Text",
        subcategory: "Normal",
    })
    minerTitle = false;

    @TextProperty({
        name: "Zombie Miner Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Normal",
    })
    minerText = "&7Zombie Miner!";

    @TextProperty({
        name: "Zombie Miner Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Normal",
    })
    minerSubtext = "";

// nether scs ------------------------------------------

    @SwitchProperty({
        name: "Thunder Title",
        description: "Enable/Disable Thunder Text (Text on screen when Thunder spawns)",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    thunderTitle = false;
    
    @TextProperty({
        name: "Thunder Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    thunderText = "&3Thunder!";
    
    @TextProperty({
        name: "Thunder Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    thunderSubtext = "";



    @SwitchProperty({
        name: "Jawbus Title",
        description: "Enable/Disable Jawbus Title (Text on screen when Jawbus spawns)",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    jawbusTitle = false;

    @TextProperty({
        name: "Jawbus Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    jawbusText = "&r&cJawbus!";
    
    @TextProperty({
        name: "Jawbus Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    jawbusSubtext = "";

    @SwitchProperty({
        name: "Phlegblast Title",
        description: "Enable/Disable phleg Text",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    phlegTitle = false;

    @TextProperty({
        name: "Phlegblast Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    phlegText = "&7Phlegblast";

    @TextProperty({
        name: "Phlegblast Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Crimson Isle",
    })
    phlegSubtext = "";

// misc ---------------------------------------

    @SwitchProperty({
        name: "Double Hook Title",
        description: "Shows a Text on screen when you get a double hook",
        category: "Text",
        subcategory: "Misc",
    })
    dhTitle = false;

    @TextProperty({
        name: "Double Hook Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Misc",
    })
    dhText = "&aDouble Hook!";

    @TextProperty({
        name: "Double Hook Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Misc",
    })
    dhSubtext = "";

    @SwitchProperty({
        name: "Double Hook Combination",
        description: "Shows your dh subtext instead of your normal one when double-hooking rare scs",
        category: "Text",
        subcategory: "Misc",
    })
    dhCustom = false;
    
// drops ------------------------------------------

    @SwitchProperty({
        name: "Vial Title",
        description: "Shows a Text on screen when you drop a Radioactive Vial",
        category: "Text",
        subcategory: "Drop Sounds",
    })
    vialTitle = false;

    @TextProperty({
        name: "Vial Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Drop Sounds",
    })
    vialText = "&dRadioactive Vial!";

    @TextProperty({
        name: "Vial Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Drop Sounds",
    })
    vialSubtext = "";


    @SwitchProperty({
        name: "Flash Title",
        description: "Shows a Text on screen when you drop a Flash book",
        category: "Text",
        subcategory: "Drop Sounds",
    })
    flashTitle = false;

    @TextProperty({
        name: "Flash Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Drop Sounds",
    })
    flashText = "&bFLASH!";

    @TextProperty({
        name: "Flash Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Drop Sounds",
    })
    flashSubtext = "";
//winter scs ----------------------------------------------------


    @SwitchProperty({
        name: "Grinch Title",
        description: "Enable/Disable grinch Text",
        category: "Text",
        subcategory: "Winter",
    })
    grinchTitle = false;

    @TextProperty({
        name: "Grinch Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Winter",
    })
    grinchText = "&2Grinch!";

    @TextProperty({
        name: "Grinch Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Winter",
    })
    grinchSubtext = "";

    @SwitchProperty({
        name: "Nutcracker Title",
        description: "Enable/Disable Nutcracker Text",
        category: "Text",
        subcategory: "Winter",
    })
    nutcrackerTitle = false;

    @TextProperty({
        name: "Nutcracker Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Winter",
    })
    nutcrackerText = "&aNutcracker!";

    @TextProperty({
        name: "Nutcracker Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Winter",
    })
    nutcrackerSubtext = "";



    @SwitchProperty({
        name: "Yeti Title",
        description: "Enable/Disable Yeti Text",
        category: "Text",
        subcategory: "Winter",
    })
    yetiTitle = false;

    @TextProperty({
        name: "Yeti Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Winter",
    })
    yetiText = "&1Yeti!";

    @TextProperty({
        name: "Yeti Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Winter",
    })
    yetiSubtext = "";

    @SwitchProperty({
        name: "Reindrake Title",
        description: "Enable/Disable drake Text",
        category: "Text",
        subcategory: "Winter",
    })
    drakeTitle = false;

    @TextProperty({
        name: "Reindrake Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Winter",
    })
    drakeText = "&fReindrake!";

    @TextProperty({
        name: "Reindrake Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Winter",
    })
    drakeSubtext = "";

// shark festival -------------------------------

    @SwitchProperty({
        name: "Tiger White Title",
        description: "Enable/Disable tiger Text",
        category: "Text",
        subcategory: "Shark Festival",
    })
    tigerTitle = false;

    @TextProperty({
        name: "Tiger Shark Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Shark Festival",
    })
    tigerText = "&7Tiger Shark!";

    @TextProperty({
        name: "Tiger Shark Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Shark Festival",
    })
    tigerSubtext = "";

    @SwitchProperty({
        name: "Great White Title",
        description: "Enable/Disable GW Text",
        category: "Text",
        subcategory: "Shark Festival",
    })
    gwTitle = false;

    @TextProperty({
        name: "Great White Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Shark Festival",
    })
    gwText = "&4Great White!";

    @TextProperty({
        name: "Great White Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Shark Festival",
    })
    gwSubtext = "";

// spooky festival --------------------------------

    @SwitchProperty({
        name: "Werewolf Title",
        description: "Enable/Disable wolf Text",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    wolfTitle = false;

    @TextProperty({
        name: "Werewolf Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    wolfText = "&0Werewolf!";

    @TextProperty({
        name: "Werewolf Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    wolfSubtext = "";

    @SwitchProperty({
        name: "Phantom Fisher Title",
        description: "Enable/Disable fisher Text",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    fisherTitle = false;

    @TextProperty({
        name: "Phantom Fisher Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    fisherText = "&8Phantom Fisher!";

    @TextProperty({
        name: "Phantom Fisher Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    fisherSubtext = "";



    @SwitchProperty({
        name: "Grim Reaper Title",
        description: "Enable/Disable reaper Text",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    reaperTitle = false;

    @TextProperty({
        name: "Grim Reaper Text",
        description: "What should be displayed?",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    reaperText = "&0Grim Reaper!";

    @TextProperty({
        name: "Grim Reaper Subtext",
        description: "What should be displayed for a subtitle?",
        category: "Text",
        subcategory: "Spooky Festival",
    })
    reaperSubtext = "";
}

export default new Settings2();