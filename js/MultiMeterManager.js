   function showBattery(){
        //console.log("showing battery using outside fct");
        MultiMeterManager.batterySymbol.classList.remove("hidden-element");
        MultiMeterManager.clearBatteryTimer();
        /*MultiMeterManager.batteryTimerStarted = false;*/
   }
   function shutOffLight(){
       // console.log("shutting off backlight");
        //console.log("shutting off time = " + Date.now());
        MultiMeterManager.displayScreen.classList.remove("white-bckgrnd");
        MultiMeterManager.displayScreen.classList.add("gray-bckgrnd");
        MultiMeterManager.screenColor = "gray";
   }
    
    
    let MultiMeterManager = {
        //Properties
        initiated: false,

        warningLabel: {},

// BEGIN Plug ins 
        comPluginClick: {},
        lowAmpPluginClick: {},
        highAmpPluginClick:{},
// END Plug ins

//BEGIN Buttons
        //PlugIn 'Click' Areas
        selClick:{},
        lightClick:{},
        rangeClick:{},
        maxMinClick:{},
        holdClick:{},
        //Plug In's
        blackPlugin:{},
        redPlugin:{},
        blackPluginConnected:{},
        redPluginConnected:{},
        redTenAmpPluginConnected:{},

        //Button Backgrounds
        selButtonBckgrnd: {},

        //Light, Range & MaxMin Button Timers
       /* twoSecTimer: {},*/
        lightStartMilliSeconds: {},
        lightEndMilliSeconds: {},
        maxMinStartMilliSeconds: {},
        maxMinEndMilliSeconds: {},
        rangeStartMilliSeconds: {},
        rangeEndMilliSeconds: {},
        batteryTimer: {},
        lightThreeMinTimer: {},

//END Buttons

//BEGIN Selectors
        //Selector Knobs
        offSelectorKnob: {},
        tempSelectorKnob: {},
        microAmpSelectorKnob: {},
        milliAmpSelectorKnob: {},
        tenAmpSelectorKnob: {},
        voltSelectorKnob: {},
        hertzSelectorKnob: {},
        ohmsSelectorKnob: {},
        capDiodeSelectorKnob: {},

        //Selector Labels 
        offSelector: {},
        tempSelector: {},
        microAmpSelector: {},
        milliAmpSelector: {},
        tenAmpSelector: {},
        voltSelector: {},
        hertzSelector: {},
        ohmsSelector: {},
        capDiodeSelector: {},

        //Selector 'Click' Areas
        tempClick:{},
        tenAmpClick:{},
        microAmpClick:{},
        milliAmpClick:{},
        offClick:{},
        voltsClick:{},
        hertzClick:{},
        ohmsClick:{},
        capDiodeClick:{},
    //END Selectors
    //BEGIN Testing Options
        ampAcOption: {},
        ampDcOption: {},
        voltsAcOption: {},
        voltsDcOption: {},
        hertzOption: {},
        dutyCycleOption: {},
        continuityOption: {},
        ohmsOption: {},
        capacitorOption: {},
        diodeOption: {},
        
        presentTestingOption: {},
    //END Testing Options

        displayScreen: {},
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
        // Prefix Symbols
        milliSymbol: {},
        microSymbol: {},
        nanoSymbol: {},
        
        //Status of particular elements
        lowAmpSelectors: ["temp","volts","hertz","ohms","capDiode"],
        lastKnobSelectorLabel: "",
        presentKnobSelectorLabel: "off",
        presentSELcolor: "orange",
        //presentAmpConnection: "",
        maxMinSelected: "max",
        screenColor: "gray",
        presentPrefix: "",
        presentUnit: "",
        redPluginConnection: false,
        redTenAmpPluginConnection: false,
        blackPluginConnection: false,
        maxMinClicked: false,
        maxMinClockStarted: false,
        rangeClockStarted: false,
        lightClockStarted: false,
        batteryTimerStarted: false,

        //Methods
        changeSetting: function(newKnobSelectorLabel){
            console.log("in changeSetting");
            if(!this.initiated){
                this.init();
                this.initiated = true;
            }
            this.lastKnobSelectorLabel = this.presentKnobSelectorLabel;
            //console.log("this.lastKnobSelectorLabel = " + this.lastKnobSelectorLabel);
            this.presentKnobSelectorLabel = newKnobSelectorLabel;
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            this.KnobSelectorHandler(this.lastKnobSelectorLabel);
            if(this.lastKnobSelectorLabel != "off"){
                this.PrefixUnitHandler(this.lastKnobSelectorLabel, "hide");
            }
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            this.KnobSelectorHandler(this.presentKnobSelectorLabel);
            this.PrefixUnitHandler(this.presentKnobSelectorLabel, "show");
            //console.log("this.batteryTimerStarted = " + this.batteryTimerStarted);
            if(!this.batteryTimerStarted){
               // console.log("starting Battery Timer");
                this.startBatteryTimer();
                this.batteryTimerStarted = true;
            }
        },

       // checkNewKnobSelectorValidity: function(newKnobSelectorLabel){
//
        //},

        KnobSelectorHandler: function(selectorLabel){
            console.log("in KnobSelectorHandler");
            if(!this.initiated){
                this.init();
                this.initiated = true;
            }
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            //console.log("selectorLabel = " + selectorLabel);
           /* this.lastKnobSelectorLabel = this.presentKnobSelectorLabel;
            this.presentKnobSelectorLabel = selectorLabel;*/
           // console.log("this.lastKnobSelectorLabel = " + this.lastKnobSelectorLabel + "   and this.presentKnobSelectorLabel = " +this.presentKnobSelectorLabel);          
            this.onSymbol.classList.remove('hidden-element');
            this.autoSymbol.classList.remove('hidden-element');
           /* this.showHideWarning(selectorLabel);*/
            
            console.log("in KnobSelectorHandler and selector label = " + selectorLabel);
            switch (selectorLabel){
                case "temp":
                    //console.log("selectorLabel = " + selectorLabel);
                    this.tempSelectorKnob.classList.toggle("hidden-selector");
                    this.presentTestingOption.classList.add("hidden-element");
                    break;
                case "microAmp":
                    this.microAmpSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.ampAcOption);
                    }else{
                        this.showHideTestingOption(this.ampDcOption);
                    }
                    break;
                case "milliAmp":
                    this.milliAmpSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.ampAcOption);
                    }else{
                        this.showHideTestingOption(this.ampDcOption);
                    }
                    break;
                case "tenAmp":
                    console.log("toggling MultiMeterManager tenAmp hidden-selector");
                    this.tenAmpSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.ampAcOption);
                    }else{
                        this.showHideTestingOption(this.ampDcOption);
                    }
                    break;
                case "off":
                    //console.log("selectorLabel = " + selectorLabel);
                    this.offSelectorKnob.classList.toggle("hidden-selector");
                    /*this.onSymbol.classList.remove('hidden-element');
                    this.autoSymbol.classList.remove('hidden-element');*/
                    break;
                case "volts":
                    this.voltSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.voltsAcOption);
                    }else{
                        this.showHideTestingOption(this.voltsDcOption);
                    }
                    break;
                case "hertz":
                    this.hertzSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.hertzOption);
                    }else{
                        this.showHideTestingOption(this.dutyCycleOption);
                    }
                    break;
                case "ohms":
                    this.ohmsSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.continuityOption);
                    }else{
                        this.showHideTestingOption(this.ohmsOption);
                    }
                    break;
                case "capDiode":
                    this.capDiodeSelectorKnob.classList.toggle("hidden-selector");
                    if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.capacitorOption);
                    }else{
                        this.showHideTestingOption(this.diodeOption);
                    }
                    break;
                default: console.log("Not an allowable KnobSelector");
            }
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
        },
        
        showHideWarning: function(selector){
            //console.log("in showHideWarning & Selector = " + selector);
            if(selector == "tenAmp"){
                //console.log("in showHideWarning & 'tenAmp'");
                //console.log("this.presentAmpConnection = "+ this.presentAmpConnection);
                if(this.presentAmpConnection == "low"){
                    this.warningLabel.classList.remove("hidden-element");
                }else{
                    this.warningLabel.classList.add("hidden-element");
                }
            }else{
                //console.log("in showHideWarning & 'NOT tenAmp'");
                //console.log("this.presentAmpConnection = "+ this.presentAmpConnection);
                if(this.presentAmpConnection == "high"){
                    if(this.presentKnobSelectorLabel != "off"){
                        this.warningLabel.classList.remove("hidden-element");
                    }
                }else{
                    this.warningLabel.classList.add("hidden-element");
                }
            }
        },
        showHideTestingOption: function(selectorEle){
            //console.log("");
           /* this.presentTestingOption.classList.add("hidden-element");
            selectorEle.classList.remove("hidden-element");
            this.presentTestingOption = selectorEle;*/
        },


        ButtonHandler: function(buttonLabel){
            switch (buttonLabel){
                case "sel":
                        if(this.presentKnobSelectorLabel == "off"){return;}
                        this.selButtonBckgrnd.classList.toggle("red-bckgrnd");
                        this.selButtonBckgrnd.classList.toggle("orange-bckgrnd");
                        if(this.presentSELcolor == "orange"){
                            this.presentSELcolor = "red";
                        }else{
                            this.presentSELcolor = "orange";
                        }
                        this.PrefixUnitHandler(this.presentKnobSelectorLabel, "hide"); 
                        this.PrefixUnitHandler(this.presentKnobSelectorLabel, "show");
                        this.changeSetting(this.presentKnobSelectorLabel); 
                    break;
                case "hold":
                        if(this.presentKnobSelectorLabel == "off"){return;}
                        this.holdSymbol.classList.toggle("hidden-element");
                    
                    break;
                case "maxMin":
                        if(this.presentKnobSelectorLabel == "off"){return;}
                        this.autoSymbol.classList.add("hidden-element");
                        this.maxMinEndMilliSeconds = Date.now();
                        const maxMinDownTime = (this.maxMinEndMilliSeconds - this.maxMinStartMilliSeconds);
                        //console.log("maxMinDownTime = " + maxMinDownTime);
                        if(maxMinDownTime > 1000){
                            this.minSymbol.classList.add("hidden-element");
                            this.maxSymbol.classList.add("hidden-element");
                            this.autoSymbol.classList.remove("hidden-element");
                            this.maxMinSelected = "max";
                        }else{
                            //console.log("switching between 'MAX and 'MIN'");
                            if(this.maxMinSelected == "max"){
                                //console.log("showing Max & hiding Min");
                                this.maxSymbol.classList.remove("hidden-element");
                                this.minSymbol.classList.add("hidden-element");
                                this.maxMinSelected = "min";
                            }else{
                                //console.log("showing Min & hiding Max");
                                this.minSymbol.classList.remove("hidden-element");
                                this.maxSymbol.classList.add("hidden-element");
                                this.maxMinSelected = "max";
                            }
                        }
                        //console.log("this.maxMinSelected = " + this.maxMinSelected);
                    break;
                case "light":
                        if(this.presentKnobSelectorLabel == "off"){return;}
                        //console.log("in ButtonHandler('light')");
                        //console.log("lightStartMilliSeconds = " + this.lightStartMilliSeconds);
                        this.lightEndMilliSeconds = Date.now();
                       // console.log("lightEndMilliSeconds = " + this.lightEndMilliSeconds);
                        const lightDownTime = (this.lightEndMilliSeconds - this.lightStartMilliSeconds);
                        //console.log("lightDownTime = " + lightDownTime);
                        if(lightDownTime > 1000){
                            //console.log("downTime = " + lightDownTime);
                            if(this.screenColor == "gray"){
                                console.log("turning on Screen Light");
                                this.displayScreen.classList.remove("gray-bckgrnd");
                                this.displayScreen.classList.add("white-bckgrnd");
                                this.screenColor = "white";
                            }else{
                                console.log("turning off Screen Light");
                                this.displayScreen.classList.remove("white-bckgrnd");
                                this.displayScreen.classList.add("gray-bckgrnd");
                                this.screenColor = "gray";
                            }
                        }
                    break;
                case "range":
                        if(this.presentKnobSelectorLabel == "off"){return;}
                        this.autoSymbol.classList.add("hidden-element");
                        //console.log("rangeStartMilliSeconds = " + this.rangeStartMilliSeconds);
                        this.rangeEndMilliSeconds = Date.now();
                        //console.log("rangeEndMilliSeconds = " + this.rangeEndMilliSeconds);
                        const rangeDownTime = (this.rangeEndMilliSeconds - this.rangeStartMilliSeconds);
                        //console.log("rangeDownTime = " + rangeDownTime);
                        if(rangeDownTime > 1000){
                            //console.log("downTime = " + rangeDownTime);
                            this.autoSymbol.classList.remove("hidden-element");
                        }else{
                            this.rangeSelected = "ten";
                            //console.log("switching between 'ten', 'milli', 'micro'");
                        }
                    break;
                case "comPlugin":
                    if(this.presentKnobSelectorLabel == "off"){return;}
                    //console.log("in case: 'comPlugin'");
                    this.blackPlugin.classList.add("hidden-element");
                    this.blackPluginConnected.classList.remove("hidden-element");
                    this.blackPluginConnection = true;
                    break;
                case "lowAmpPlugin":
                    //if(this.presentKnobSelectorLabel == "off"){return;}
                    this.presentAmpConnection = "low";
                    this.redTenAmpPluginConnected.classList.add("hidden-element");
                    this.redTenAmpPluginConnection = false;
                    this.redPluginConnected.classList.remove("hidden-element");
                    this.redPluginConnection = true;
                    this.redPlugin.classList.add("hidden-element");
                    break;
                case "highAmpPlugin":
                    //if(this.presentKnobSelectorLabel == "off"){return;}
                    console
                    this.presentAmpConnection = "high";
                    this.redPluginConnected.classList.add("hidden-element");
                    this.redPluginConnection = false;
                    this.redTenAmpPluginConnected.classList.remove("hidden-element");
                    this.redTenAmpPluginConnection = true;
                    this.redPlugin.classList.add("hidden-element");
                    break;
                default: console.log("Not an allowable Button or PlugIn");
            }
        },
        UpdateScreenHandler: function(callHandler, hideShow) {
                switch (callHandler){
                    case "off":
                        this.onSymbol.classList.toggle("hidden-element");
                        break;
                default: console.log("Not an allowable Setting");
            /*let changeKnobSelector = function(callHandler, hideShow){
                console.log("in UpdateScreenHandler called by " + callHandler + "   & hideShow = " + hideShow);
                if(callHandler == "off"){
                    console.log("removing class='hidden-element'");
                    this.onSymbol.classList.remove("hidden-element");
                    this.acSymbol.classList.remove("hidden-element");
                }*/
            }
        },

        startMaxMinTime: function(){
            //console.log("setting Range start time in milliSeconds");
            this.maxMinStartMilliSeconds = Date.now();
        },
        startRangeTime: function(){
            this.rangeStartMilliSeconds = Date.now();
            this.rangeClockStarted = true;
        },
        startLightTime: function(){
           // console.log("in startLightTime");
            this.lightStartMilliSeconds = Date.now();
            //console.log("lightStartMilliSeconds = " + this.lightStartMilliSeconds);
            this.lightClockStarted = true;
            this.startThreeMinLightTime();
           // console.log("leaving startLightTime");
        },
        startThreeMinLightTime: function(){
            //console.log("in startThreeMinLightTime");
           // this.threeMinLightStartMilliSeconds = Date.now();
           // console.log("lightStartMilliSeconds = " + this.lightStartMilliSeconds);
           // this.lightClockStarted = true;
            clearTimeout(this.lightThreeMinTimer);
            this.lightThreeMinTimer = setTimeout(shutOffLight, 180000);
            //console.log("leaving startLightTime");
        },

        startBatteryTimer: function(){
            //console.log("batteryTimer started");
            this.batteryTimer = setTimeout(showBattery, 600000);/* 300000 milli secs = 5 mins  */
            //console.log("batteryTimer running");
        },
    
        clearBatteryTimer: function(){
            clearTimeout(this.batteryTimer);
            //console.log("batteryTimer has been cleared");
        },



        PrefixUnitHandler:function(selectedKnob, showHide) {
            console.log("in PrefixUnitHandler");
            console.log("selectedKnob = " + selectedKnob);
            console.log("at BEGINNING of PrefixUnitHandler & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            console.log("this.lastKnobSelectorLabel ="+this.lastKnobSelectorLabel+"  and this.presentKnobSelectorLabel = "+this.presentKnobSelectorLabel);
            //if(this.lastKnobSelectorLabel == this.presentKnobSelectorLabel){return}
            if((selectedKnob=="microAmp") || (selectedKnob=="milliAmp")||(selectedKnob=="tenAmp") || (selectedKnob=="volts")){
                //console.log("showing either acSymbol or dcSymbol");
                if((selectedKnob != "off") && (this.presentSELcolor == "orange")){
                    this.acSymbol.classList.remove("hidden-element");
                    this.dcSymbol.classList.add("hidden-element");
                }else{
                    this.acSymbol.classList.add("hidden-element");
                    this.dcSymbol.classList.remove("hidden-element");
                }
            }
            if((selectedKnob=="temp") || (selectedKnob=="hertz")||(selectedKnob=="ohms") || (selectedKnob=="capDiode")){
                this.acSymbol.classList.add("hidden-element");
                this.dcSymbol.classList.add("hidden-element");
            }

            switch (selectedKnob){
                case "temp":
                    if(showHide == "show"){
                        this.autoSymbol.classList.add("hidden-element");
                        if(this.presentSELcolor == "orange"){
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
                    this.microSymbol.classList.toggle("hidden-element");
                    this.ampSymbol.classList.toggle("hidden-element");
                    this.autoSymbol.classList.remove("hidden-element");
                    break;
                case "milliAmp":
                    this.milliSymbol.classList.toggle("hidden-element");
                    this.ampSymbol.classList.toggle("hidden-element");
                    this.autoSymbol.classList.remove("hidden-element");
                    break;
                case "tenAmp":
                    console.log("in case: 'tenAmp'");
                    this.ampSymbol.classList.toggle("hidden-element");
                    this.autoSymbol.classList.remove("hidden-element");
                    break;
                case "off":
                    //console.log("in PrefixUnitHandler.off: reseting all screen elements");
                    this.reset();
                    break;
                case "volts":
                    this.voltSymbol.classList.toggle("hidden-element");
                    this.autoSymbol.classList.remove("hidden-element");
                    break;
                case "hertz":
                    if(showHide == "show"){
                        this.autoSymbol.classList.remove("hidden-element");
                        if(this.presentSELcolor == "orange"){
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
                    if(showHide == "show"){
                        this.ohmsSymbol.classList.remove("hidden-element");
                        if(this.presentSELcolor == "orange"){
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
                    if(showHide == "show"){
                        if(this.presentSELcolor == "orange"){
                            //console.log("hiding V & diode");
                            this.faradSymbol.classList.remove("hidden-element");
                            this.nanoSymbol.classList.remove("hidden-element");
                            this.voltSymbol.classList.add("hidden-element");
                            this.diodeSymbol.classList.add("hidden-element");
                            this.autoSymbol.classList.remove("hidden-element");
                        }else{
                            //console.log("hiding nF");
                            this.faradSymbol.classList.add("hidden-element");
                            this.nanoSymbol.classList.add("hidden-element");
                            this.voltSymbol.classList.remove("hidden-element");
                            this.diodeSymbol.classList.remove("hidden-element");
                            this.autoSymbol.classList.add("hidden-element");
                        }
                    }else{
                        //console.log("hiding nf, V, and diode");
                        this.faradSymbol.classList.add("hidden-element");
                        this.nanoSymbol.classList.add("hidden-element");
                        this.voltSymbol.classList.add("hidden-element");
                        this.diodeSymbol.classList.add("hidden-element");
                    }
                    break;
                default: console.log(selectedKnob + " is not an allowable selector Knob");
            }
            //console.log("at END of PrefixUnitHandler & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
        },

        reset: function(){
            //console.log("in reset() & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            this.valueLabel.classList.add("hidden-element");
            this.onSymbol.classList.add("hidden-element");
            this.displayScreen.classList.add("gray-bckgrnd");
            this.displayScreen.classList.remove("white-bckgrnd");
            this.warningLabel.classList.add("hidden-element");
            // Button Symbols
            this.selButtonBckgrnd.classList.add("orange-bckgrnd");
            this.autoSymbol.classList.add("hidden-element");
            this.holdSymbol.classList.add("hidden-element");
            this.maxSymbol.classList.add("hidden-element");
            this.minSymbol.classList.add("hidden-element");
            // Prefix Symbols
            this.milliSymbol.classList.add("hidden-element");
            this.microSymbol.classList.add("hidden-element");
            this.nanoSymbol.classList.add("hidden-element");
            // Unit Symbols
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
            // Output Symbols
            this.acSymbol.classList.add("hidden-element");
            this.dcSymbol.classList.add("hidden-element");
            this.batterySymbol.classList.add("hidden-element");
            this.presentTestingOption.classList.add("hidden-element");
            this.clearBatteryTimer();
            // PlugIns
           /* if(this.lastKnobSelectorLabel != "off"){
                this.blackPlugin.classList.remove("hidden-element");
                this.redPlugin.classList.remove("hidden-element");
                this.redPluginConnected.classList.add("hidden-element");
                this.redTenAmpPluginConnected.classList.add("hidden-element");
                this.blackPluginConnected.classList.add("hidden-element");
                this.redPluginConnection = false;
                this.redTenAmpPluginConnection = false;
                this.blackPluginConnection = false;
            } */  

            this.presentSELcolor = "orange";
            this.presentKnobSelectorLabel = "off";
            this.maxMinSelected = "max";
            this.screenColor = "gray";
            this.maxMinClicked = false;
            this.maxMinClockStarted = false;

        },

        init: function(){
            console.log("beginning MultiMeterManager.init()");
           /* this.selectorKnob = document.getElementById("mm-selector-id");
           this.selectorKnob.style.transformOrigin = '50% -20%';*/

            this.warningLabel = document.getElementById("warning-label-id");

           // Selectors
            this.offSelectorKnob = document.getElementById("selector-knob-off-id")
            this.capDiodeSelectorKnob = document.getElementById("selector-knob-cap-diode-id");
            this.tempSelectorKnob = document.getElementById("selector-knob-temp-id");
            this.microAmpSelectorKnob = document.getElementById("selector-knob-micro-amp-id");
            this.milliAmpSelectorKnob = document.getElementById("selector-knob-milli-amp-id");
            this.tenAmpSelectorKnob = document.getElementById("selector-knob-ten-amp-id");
            this.voltSelectorKnob = document.getElementById("selector-knob-volts-id");
            this.hertzSelectorKnob = document.getElementById("selector-knob-hertz-id");
            this.ohmsSelectorKnob = document.getElementById("selector-knob-ohms-id");
            // Selector Click Areas
            console.log("beginning 'click' elements");
            this.offClick = document.getElementById("mm-off-click-area-id");
            this.offClick.addEventListener("click",function(){MultiMeterManager.changeSetting("off")});
            this.tenAmpClick = document.getElementById("mm-ten-amp-click-area-id");
            this.tenAmpClick.addEventListener("click",function(){MultiMeterManager.changeSetting("tenAmp")});
            this.milliAmpClick = document.getElementById("mm-milli-amp-click-area-id");
            this.milliAmpClick.addEventListener("click",function(){MultiMeterManager.changeSetting("milliAmp")});
            this.microAmpClick = document.getElementById("mm-micro-amp-click-area-id");
            this.microAmpClick.addEventListener("click",function(){MultiMeterManager.changeSetting("microAmp")});
            this.tempClick = document.getElementById("mm-temp-click-area-id");
            this.tempClick.addEventListener("click",function(){MultiMeterManager.changeSetting("temp")});
            this.voltsClick = document.getElementById("mm-volts-click-area-id");
            this.voltsClick.addEventListener("click",function(){MultiMeterManager.changeSetting("volts")});
            this.hertzClick = document.getElementById("mm-hertz-click-area-id");
            this.hertzClick.addEventListener("click",function(){MultiMeterManager.changeSetting("hertz")});
            this.ohmsClick = document.getElementById("mm-ohms-click-area-id");
            this.ohmsClick.addEventListener("click",function(){MultiMeterManager.changeSetting("ohms")});
            this.capDiodeClick = document.getElementById("mm-cap-diode-click-area-id");
            this.capDiodeClick.addEventListener("click",function(){MultiMeterManager.changeSetting("capDiode")});
           // console.log("ending 'selector click' elements");

            // Plugin Click Areas
            this.comPluginClick = document.getElementById("mm-com-plugin-click-area-id");/* mm-com-plugin-click-area-id */
            this.comPluginClick.addEventListener("click",function(){MultiMeterManager.ButtonHandler("comPlugin")});
            this.lowAmpPluginClick= document.getElementById("mm-mamp-plugin-click-area-id");
            this.lowAmpPluginClick.addEventListener("click",function(){MultiMeterManager.ButtonHandler("lowAmpPlugin")});
            this.highAmpPluginClick = document.getElementById("mm-ten-amp-plugin-click-area-id");
            this.highAmpPluginClick.addEventListener("click",function(){MultiMeterManager.ButtonHandler("highAmpPlugin")});
            this.blackPlugin = document.getElementById("black-plugin-id");
            this.redPlugin = document.getElementById("red-plugin-id");
            this.blackPluginConnected = document.getElementById("black-plugin-connected-id");
            this.redPluginConnected = document.getElementById("red-plugin-connected-id");
            this.redTenAmpPluginConnected = document.getElementById("red-ten-amp-plugin-connected-id");

            // Button Click Areas
            this.selClick = document.getElementById("mm-select-button-click-area-id");
            this.selClick.addEventListener("click",function(){MultiMeterManager.ButtonHandler("sel")});
            this.lightClick = document.getElementById("mm-light-button-click-area-id");
            this.lightClick.addEventListener("mouseup",function(){MultiMeterManager.ButtonHandler("light")});
            this.lightClick.addEventListener("mousedown",function(){MultiMeterManager.startLightTime("light")});
            this.rangeClick = document.getElementById("mm-range-button-click-area-id");
            this.rangeClick.addEventListener("mouseup",function(){MultiMeterManager.ButtonHandler("range")});
            this.rangeClick.addEventListener("mousedown",function(){MultiMeterManager.startRangeTime("range")});
            this.maxMinClick = document.getElementById("mm-max-min-button-click-area-id");
            this.maxMinClick.addEventListener("mouseup",function(){MultiMeterManager.ButtonHandler("maxMin")});
            this.maxMinClick.addEventListener("mousedown",function(){MultiMeterManager.startMaxMinTime()});
            this.holdClick = document.getElementById("mm-hold-button-click-area-id");
            this.holdClick.addEventListener("click",function(){MultiMeterManager.ButtonHandler("hold")});
           // console.log("ending 'button click' elements");

            // Selector Labels
            this.offSelector = document.getElementById("mm-off-id");
            this.tempSelector = document.getElementById("mm-temp-id");
            this.microAmpSelector = document.getElementById("mm-micro-amp-id");
            this.milliAmpSelector = document.getElementById("mm-milli-amp-id");
            this.tenAmpSelector = document.getElementById("mm-ten-amp-label-id");
            this.voltSelector = document.getElementById("mm-volts-id");
           // this.hertzSelector = document.getElementById("mm-hertz-id");
            this.ohmsSelector = document.getElementById("mm-ohms-id");
            this.capDiodeSelector = document.getElementById("mm-cap-diode-id");

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
            this.onSymbol = document.getElementById("mm-on-indicator-id");
           // this.onSymbol.classList.remove("hidden-element");
            this.holdSymbol = document.getElementById("mm-hold-indicator-id");
            this.maxSymbol = document.getElementById("mm-max-indicator-id");
            this.minSymbol = document.getElementById("mm-min-indicator-id");
            this.autoSymbol = document.getElementById("mm-auto-indicator-id");
            this.diodeSymbol = document.getElementById("mm-diode-symbol-id");
            this.acSymbol = document.getElementById("mm-ac-indicator-id");
            this.dcSymbol = document.getElementById("mm-dc-indicator-id");
            this.batterySymbol = document.getElementById("mm-battery-indicator-id");
            //console.log("just finished setting this.batterySymbol = doc....");

            /*this.selRedButton = document.getElementById("mm-sel-red-label-id");
            this.selWhiteButton = document.getElementById("mm-sel-white-label-id");
            this.selOrangeBckgrnd = document.getElementById("mm-sel-orange-bckgrnd-id");*/
            this.selButtonBckgrnd = document.getElementById("mm-sel-button-bckgrnd-id");
           // console.log("starting testing option elements");
            this.ampAcOption = document.getElementById("amp-ac-option-id");
            this.presentTestingOption = this.ampAcOption;
            this.ampDcOption = document.getElementById("amp-dc-option-id");
            this.voltsAcOption = document.getElementById("volts-ac-option-id");
            this.voltsDcOption = document.getElementById("volts-dc-option-id");
            this.hertzOption = document.getElementById("hertz-option-id");
            this.dutyCycleOption = document.getElementById("duty-cycle-option-id");
            this.continuityOption = document.getElementById("continuity-option-id");
            this.ohmsOption = document.getElementById("ohms-option-id");
            this.capacitorOption = document.getElementById("capacitor-option-id");
            this.diodeOption = document.getElementById("diode-option-id");
           // console.log("endinging testing option elements");
         
           /* this.offSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("off")});
            this.tempSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("temp")});
            this.microAmpSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("microAmp")});
            this.milliAmpSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("milliAmp")});
            this.tenAmpSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("tenAmp")});
            this.voltSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("Volts")});
            this.hertzSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("Hertz")});
            this.ohmsSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("Ohms")});
            this.capDiodeSelector.addEventListener("click",function(){MultiMeterManager.changeSetting("CapDiode")});*/

           /* this.selRedButton.addEventListener("click",function(){MultiMeterManager.changeSelect()});
            this.selWhiteButton.addEventListener("click",function(){MultiMeterManager.changeSelect()});
            this.selButtonBckgrnd.addEventListener("click",function(){MultiMeterManager.changeSelect()});*/

            this.initiated = true;
            console.log("finished MultiMeterManager.init()"); 
        }
    }
