let ScreenManager = {
        //Properties
        initiated: false,

        // Unit Symbols
        degFahrenheitSymbol: {},
        degCelsiusSymbol: {},
        ampSymbol: {},
        voltSymbol: {},
        ohmsSymbol:{},
        soundSymbol:{},
        hertzSymbol: {},
        dutyCycleSymbol: {},
        faradSymbol: {},
        diodeSymbol: {},
        capSymbol: {},
        // Prefix Symbols
        milliSymbol: {},
        microSymbol: {},
        nanoSymbol: {},
        
       // displayScreen: {},
        //Auxiliary elements visible on the "Display Screen"
        valueLabel: {},
        onSymbol: {},
        autoSymbol: {},
        holdSymbol: {},
        maxSymbol: {},
        minSymbol: {},
        acSymbol: {},
        dcSymbol: {},
        batterySymbol: {},
        
        //Status of particular elements
        maxMinSelected: "max",
        screenColor: "gray",
        presentPrefix: "",
        presentUnit: "",

        //Methods
        AuxillarySymbolsManager: function(){ 
            console.log("in AuxillarySymbolsManager");
            console.log("KnobSelectorManager.presentKnobSelectorLabel = " + KnobSelectorManager.presentKnobSelectorLabel);
            if(KnobSelectorManager.highAmpSelectors.includes(KnobSelectorManager.presentKnobSelectorLabel)){
                console.log("showing either acSymbol or dcSymbol");
                //if(KnobSelectorManager.presentSELcolor == "orange"){
                if(KnobSelectorManager.presentSELcolor == "orange"){ // (presentKnobSelectorLabel != "off") && (KnobSelectorManager.presentSELcolor == "orange")
                    console.log("showing acSymbol & hiding dcSymbol");
                    this.acSymbol.classList.remove("hidden-element");
                    this.dcSymbol.classList.add("hidden-element");
                }else{
                    console.log("showing dcSymbol & hiding acSymbol");
                    this.acSymbol.classList.add("hidden-element");
                    this.dcSymbol.classList.remove("hidden-element");
                }
            }
            if(KnobSelectorManager.lowAmpSelectors.includes(KnobSelectorManager.presentKnobSelectorLabel)){
                console.log("hiding both ac and dcSymbols");
                this.acSymbol.classList.add("hidden-element");
                this.dcSymbol.classList.add("hidden-element");
            }
        },

        PrefixUnitManager:function(selectedKnob, showHide) {
            if(!TimingManager.batteryTimerStarted){
                TimingManager.startBatteryTimer();
                TimingManager.batteryTimerStarted = true;
            }
            //console.log("in PrefixUnitManager");
            //console.log("selectedKnob = " + selectedKnob);
           // console.log("at BEGINNING of PrefixUnitManager & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
           // console.log("this.lastKnobSelectorLabel ="+this.lastKnobSelectorLabel+"  and this.presentKnobSelectorLabel = "+this.presentKnobSelectorLabel);
            //if(this.lastKnobSelectorLabel == this.presentKnobSelectorLabel){return}

            switch (selectedKnob){
                case "temp":
                    if(showHide == "show"){
                        this.autoSymbol.classList.add("hidden-element");
                        this.acSymbol.classList.add("hidden-element");
                        this.dcSymbol.classList.add("hidden-element");
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                        //console.log("showing degF & hiding degC");
                            this.degFahrenheitSymbol.classList.remove("hidden-element");
                            this.degCelsiusSymbol.classList.add("hidden-element");
                        }else{
                        //console.log("showing degC & hiding degF");
                            this.degFahrenheitSymbol.classList.add("hidden-element");
                            this.degCelsiusSymbol.classList.remove("hidden-element");
                        }
                    }else{
                        //console.log("hiding degC & degF");
                        this.degFahrenheitSymbol.classList.add("hidden-element");
                        this.degCelsiusSymbol.classList.add("hidden-element");
                    }
                    break;
                case "microAmp":
                    if(showHide == "show"){
                        this.microSymbol.classList.remove("hidden-element");
                        this.ampSymbol.classList.remove("hidden-element");
                    }else{
                        this.microSymbol.classList.add("hidden-element");
                        this.ampSymbol.classList.add("hidden-element");
                    }
                    this.autoSymbol.classList.remove("hidden-element");
                    if(KnobSelectorManager.presentSELcolor == "orange"){
                        this.acSymbol.classList.remove("hidden-element");
                        this.dcSymbol.classList.add("hidden-element");
                    }else{
                        this.acSymbol.classList.add("hidden-element");
                        this.dcSymbol.classList.remove("hidden-element");
                    }
                    break;
                case "milliAmp":
                    if(showHide == "show"){
                        this.milliSymbol.classList.remove("hidden-element");
                        this.ampSymbol.classList.remove("hidden-element");
                    }else{
                        this.milliSymbol.classList.add("hidden-element");
                        this.ampSymbol.classList.add("hidden-element");
                    }
                    this.autoSymbol.classList.remove("hidden-element");
                    if(KnobSelectorManager.presentSELcolor == "orange"){
                        this.acSymbol.classList.remove("hidden-element");
                        this.dcSymbol.classList.add("hidden-element");
                    }else{
                        this.acSymbol.classList.add("hidden-element");
                        this.dcSymbol.classList.remove("hidden-element");
                    }
                    break;
                case "tenAmp":
                    if(showHide == "show"){
                        this.ampSymbol.classList.remove("hidden-element");
                    }else{
                        this.ampSymbol.classList.add("hidden-element");
                    }
                    this.autoSymbol.classList.remove("hidden-element");
                    //console.log("KnobSelectorManager.presentSELcolor = " + KnobSelectorManager.presentSELcolor);
                    if(KnobSelectorManager.presentSELcolor == "orange"){
                        this.acSymbol.classList.remove("hidden-element");
                        this.dcSymbol.classList.add("hidden-element");
                    }else{
                        this.acSymbol.classList.add("hidden-element");
                        this.dcSymbol.classList.remove("hidden-element");
                    }
                    break;
                case "off":
                    //console.log("in PrefixUnitManager.off: reseting all screen elements");
                    this.reset();
                    break;
                case "volts":
                    if(showHide == "show"){
                        this.voltSymbol.classList.remove("hidden-element");
                    }else{
                        this.voltSymbol.classList.add("hidden-element");
                    }
                    this.autoSymbol.classList.remove("hidden-element");
                    if(KnobSelectorManager.presentSELcolor == "orange"){
                        this.acSymbol.classList.remove("hidden-element");
                        this.dcSymbol.classList.add("hidden-element");
                    }else{
                        this.acSymbol.classList.add("hidden-element");
                        this.dcSymbol.classList.remove("hidden-element");
                    }
                    break;
                case "hertz":
                    this.autoSymbol.classList.remove("hidden-element");
                    this.acSymbol.classList.add("hidden-element");
                    this.dcSymbol.classList.add("hidden-element");
                    if(showHide == "show"){
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            this.hertzSymbol.classList.remove("hidden-element");
                            this.dutyCycleSymbol.classList.add("hidden-element");
                        }else{
                            //console.log("toggling dutyCycleSymbol");
                            this.hertzSymbol.classList.add("hidden-element");
                            this.dutyCycleSymbol.classList.remove("hidden-element");
                        }
                    }else{
                        this.hertzSymbol.classList.add("hidden-element");
                        this.dutyCycleSymbol.classList.add("hidden-element");
                    }
                    break;
                case "ohms":
                    this.acSymbol.classList.add("hidden-element");
                    this.dcSymbol.classList.add("hidden-element");
                    if(showHide == "show"){
                        this.ohmsSymbol.classList.remove("hidden-element");
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            //console.log("showing ohms and souund");
                            this.soundSymbol.classList.remove("hidden-element");
                            this.autoSymbol.classList.add("hidden-element");
                        }else{
                            //console.log("hiding sound and showing ohms");
                            this.soundSymbol.classList.add("hidden-element");
                            this.autoSymbol.classList.remove("hidden-element");
                        }
                    }else{
                        this.ohmsSymbol.classList.add("hidden-element");
                        this.soundSymbol.classList.add("hidden-element");
                    }
                    break;
                case "capDiode":
                    this.acSymbol.classList.add("hidden-element");
                    this.dcSymbol.classList.add("hidden-element");
                    if(showHide == "show"){
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            //console.log("hiding V & diode");
                            this.faradSymbol.classList.remove("hidden-element");
                            this.nanoSymbol.classList.remove("hidden-element");
                            this.autoSymbol.classList.remove("hidden-element");
                            this.capSymbol.classList.remove("hidden-element");
                            this.voltSymbol.classList.add("hidden-element");
                            this.diodeSymbol.classList.add("hidden-element");
                        }else{
                            //console.log("hiding nF");
                            this.faradSymbol.classList.add("hidden-element");
                            this.nanoSymbol.classList.add("hidden-element");
                            this.voltSymbol.classList.remove("hidden-element");
                            this.diodeSymbol.classList.remove("hidden-element");
                            this.capSymbol.classList.add("hidden-element");
                            this.autoSymbol.classList.add("hidden-element");
                        }
                    }else{
                        //console.log("hiding nf, V, and diode");
                        this.faradSymbol.classList.add("hidden-element");
                        this.nanoSymbol.classList.add("hidden-element");
                        this.voltSymbol.classList.add("hidden-element");
                        this.diodeSymbol.classList.add("hidden-element");
                        this.capSymbol.classList.add("hidden-element");
                    }
                    break;
                default: console.log(selectedKnob + " is not an allowable selector Knob");
            }
            //console.log("at END of PrefixUnitManager & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
        },

        stopMaxMinFunction: function(){
            this.maxSymbol.classList.add("hidden-element");
            this.minSymbol.classList.add("hidden-element");
            this.autoSymbol.classList.remove("hidden-element");
        },

        stopRangeFunction: function(){
            this.autoSymbol.classList.remove("hidden-element");
        },

        changeScreenColor: function(){
            console.log("this.screenColor = " + this.screenColor);
            if(this.screenColor == "gray"){
                this.displayScreen.classList.remove("gray-bckgrnd");
                this.displayScreen.classList.add("white-bckgrnd");
                this.screenColor = "white";
            }else{
                this.displayScreen.classList.remove("white-bckgrnd");
                this.displayScreen.classList.add("gray-bckgrnd");
                this.screenColor = "gray";
            }
        },


        reset: function(){
            //console.log("in ScreenManager.reset()");
            //console.log("in reset() & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            this.valueLabel.classList.add("hidden-element");
            this.onSymbol.classList.add("hidden-element");
           // this.displayScreen.classList.add("gray-bckgrnd");
            //this.displayScreen.classList.remove("white-bckgrnd");
           // this.warningLabel.classList.add("hidden-element");
            this.autoSymbol.classList.add("hidden-element");
            this.holdSymbol.classList.add("hidden-element");
            this.maxSymbol.classList.add("hidden-element");
            this.minSymbol.classList.add("hidden-element");
            // Prefix Symbols
            //console.log("resetting Prefix symbols");
            this.milliSymbol.classList.add("hidden-element");
            this.microSymbol.classList.add("hidden-element");
            this.nanoSymbol.classList.add("hidden-element");
            // Unit Symbols
            //console.log("resetting Unit symbols");
            this.degFahrenheitSymbol.classList.add("hidden-element");
            this.degCelsiusSymbol.classList.add("hidden-element");
            this.ampSymbol.classList.add("hidden-element");
            this.voltSymbol.classList.add("hidden-element");
            this.soundSymbol.classList.add("hidden-element");
            this.ohmsSymbol.classList.add("hidden-element");
            this.hertzSymbol.classList.add("hidden-element");
            this.dutyCycleSymbol.classList.add("hidden-element");
          //  this.hertzSymbol.classList.add("hidden-element");
            this.faradSymbol.classList.add("hidden-element");
            this.diodeSymbol.classList.add("hidden-element");
            this.capSymbol.classList.add("hidden-element");
            // Output Symbols
            console.log("resetting ac,dc & battery symbols");
            this.acSymbol.classList.add("hidden-element");
            this.dcSymbol.classList.add("hidden-element");
            this.batterySymbol.classList.add("hidden-element");

            //console.log("resetting maxMin & screenColor");
            this.maxMinSelected = "max";
            this.screenColor = "gray";

        },

        init: function(){
            //console.log("Beginning ScreenManager.init()"); 

            //Output elements
            this.displayScreen = document.getElementById("mm-display-screen-id");
            this.valueLabel = document.getElementById("mm-measured-value-id");
            //Prefix symbols
            this.kiloSymbol = document.getElementById("mm-kilo-si-prefix-id");
            this.megaSymbol = document.getElementById("mm-mega-si-prefix-id");
            this.milliSymbol = document.getElementById("mm-milli-si-prefix-id");
            this.microSymbol = document.getElementById("mm-micro-si-prefix-id");
            this.nanoSymbol = document.getElementById("mm-nano-si-prefix-id");
            //Unit symbols
            this.ampSymbol = document.getElementById("mm-amp-unit-id");
            this.voltSymbol = document.getElementById("mm-volt-unit-id");
            this.degFahrenheitSymbol = document.getElementById("mm-deg-fahrenheit-unit-id");
            this.degCelsiusSymbol = document.getElementById("mm-deg-celsius-unit-id");
            this.faradSymbol = document.getElementById("mm-farad-unit-id");
            this.ohmsSymbol = document.getElementById("mm-omega-unit-id");
            this.soundSymbol = document.getElementById("mm-sound-unit-id");
            this.hertzSymbol = document.getElementById("mm-hertz-unit-id");
            this.dutyCycleSymbol = document.getElementById("mm-duty-cycle-unit-id");
            //Auxillary Screen Symbols
            this.onSymbol = document.getElementById("mm-on-symbol-id");
           // this.onSymbol.classList.remove("hidden-element");
            this.holdSymbol = document.getElementById("mm-hold-symbol-id");
            this.maxSymbol = document.getElementById("mm-max-symbol-id");
            this.minSymbol = document.getElementById("mm-min-symbol-id");
            this.autoSymbol = document.getElementById("mm-auto-symbol-id");
            this.diodeSymbol = document.getElementById("mm-diode-symbol-id");
            this.capSymbol = document.getElementById("mm-capacitor-symbol-id");
            this.acSymbol = document.getElementById("mm-ac-symbol-id");
            //this.acSymbol = document.getElementById("mm-ac-indicator-id");
            this.dcSymbol = document.getElementById("mm-dc-symbol-id");
            //this.dcSymbol = document.getElementById("mm-dc-indicator-id");
            this.acSymbol.classList.remove("hidden");
            this.dcSymbol.classList.remove("hidden");
            //this.batterySymbol = document.getElementById("mm-battery-symbol-id");
            this.batterySymbol = document.getElementById("mm-battery-symbol-id");
            //console.log("just finished setting this.batterySymbol = doc....");

            //console.log("Finished ScreenManager.init()"); 
        }
    }
