   
    let KnobSelectorManager = {
        //Properties
        initiated: false,

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
        multimeterHead: {},
        warningLabel: {},
        selButtonBckgrnd: {},
        
    //Status of particular elements 
        presentSELcolor: "orange",
        highAmpSelectors: ["microAmp", "milliAmp","tenAmp","volts"],
        lowAmpSelectors: ["temp","hertz","ohms","capDiode"],
        lastKnobSelectorLabel: "",
        presentKnobSelectorLabel: "off",

        /*addLink: function(htmlFile){
            console.log("inside KnobSelectorManager.addLink()");
            console.log("htmlFile = " + htmlFile);
            this.init();
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = "css/Education/Training/TrainingMultimeterCSS.css";
           // this.multimeterHead.appendChild("link");
            console.log("after adding link to multimeter.html head");
        },*/

        changeSetting: function(newKnobSelectorLabel){
            if(!this.initiated){
                this.init();
                this.initiated = true;
            }
            this.lastKnobSelectorLabel = this.presentKnobSelectorLabel;
            //console.log("this.lastKnobSelectorLabel = " + this.lastKnobSelectorLabel);
            this.presentKnobSelectorLabel = newKnobSelectorLabel;
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            this.KnobSelectorHandler(this.lastKnobSelectorLabel, "hide");
            if(this.lastKnobSelectorLabel != "off"){
                ScreenManager.PrefixUnitManager(this.lastKnobSelectorLabel, "hide");
            }
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
            this.KnobSelectorHandler(this.presentKnobSelectorLabel, "show");
            ScreenManager.PrefixUnitManager(this.presentKnobSelectorLabel, "show");
            //console.log("this.batteryTimerStarted = " + this.batteryTimerStarted);
            /*if(!ButtonManager.batteryTimerStarted){
               // console.log("starting Battery Timer");
                //ButtonManager.startBatteryTimer();
                //ButtonManager.batteryTimerStarted = true;
            }*/
            ScreenManager.AuxillarySymbolsManager();
        },

        KnobSelectorHandler: function(selectorLabel, showHide){
            //console.log("in KnobSelectorHandler");
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
           // console.log("selectorLabel = " + selectorLabel);
           /* this.lastKnobSelectorLabel = this.presentKnobSelectorLabel;
            this.presentKnobSelectorLabel = selectorLabel;*/
           // console.log("this.lastKnobSelectorLabel = " + this.lastKnobSelectorLabel + "   and this.presentKnobSelectorLabel = " +this.presentKnobSelectorLabel);
            if(selectorLabel != "sel"){
                ScreenManager.onSymbol.classList.remove("hidden-element");
            }
            if((ProbeConnectionManager.presentAmpConnection == "high") && (selectorLabel != "tenAmp")){
                this.warningLabel.classList.remove("hidden-element");
            } 
            if((ProbeConnectionManager.presentAmpConnection == "low") && (selectorLabel == "tenAmp")){
                this.warningLabel.classList.remove("hidden-element");
            } 
            switch (selectorLabel){
                case "sel":
                    console.log("in 'sel'");
                   // console.log("KnobSelectorManager.presentKnobSelectorLabel = " +  KnobSelectorManager.presentKnobSelectorLabel);
                        if(KnobSelectorManager.presentKnobSelectorLabel == "off"){return;}
                        if(this.presentSELcolor == "orange"){
                            this.selButtonBckgrnd.classList.remove("orange-bckgrnd");
                            this.selButtonBckgrnd.classList.add("red-bckgrnd");
                            this.presentSELcolor = "red";
                        }else{
                            this.selButtonBckgrnd.classList.remove("red-bckgrnd");
                            this.selButtonBckgrnd.classList.add("orange-bckgrnd");
                            this.presentSELcolor = "orange";
                        }
                        console.log("Going to Screen.PrefixUnitManager");
                        ScreenManager.PrefixUnitManager(KnobSelectorManager.presentKnobSelectorLabel, "hide"); 
                        ScreenManager.PrefixUnitManager(KnobSelectorManager.presentKnobSelectorLabel, "show");
                        console.log("going to ScreenManager.AuxillarySymbolsManager();");
                        ScreenManager.AuxillarySymbolsManager();
                        DisplayValueManager.InitialSetUp(KnobSelectorManager.presentKnobSelectorLabel);
                        //KnobSelectorManager.changeSetting(KnobSelectorManager.presentKnobSelectorLabel); 
                    break;
                case "temp":
                    //console.log("selectorLabel = " + selectorLabel);
                    this.tempSelectorKnob.classList.toggle("hidden-selector");
                    /*if(showHide == "hide"){
                        this.tempSelectorKnob.classList.add("hidden-selector");
                    }else{
                        this.tempSelectorKnob.classList.remove("hidden-selector");
                    }*/
                    //this.presentTestingOption.classList.add("hidden-element");
                    break;
                case "microAmp":
                    this.microAmpSelectorKnob.classList.toggle("hidden-selector");
                    console.log("in KnobSelectorManager.KnobSelectorHandler('microAmp'");
                    console.log("going to DisplayValueManager.InitialSetUp('microAmp')")
                    DisplayValueManager.InitialSetUp("microAmp");
                    console.log("back from DisplayValueManager.InitialSetUp('microAmp')");
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.ampAcOption);
                    }else{
                        this.showHideTestingOption(this.ampDcOption);
                    }*/
                    break;
                case "milliAmp":
                    this.milliAmpSelectorKnob.classList.toggle("hidden-selector");
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.ampAcOption);
                    }else{
                        this.showHideTestingOption(this.ampDcOption);
                    }*/
                    break;
                case "tenAmp":
                   // console.log("Toggling KnobSelectorManagerr tenAmp 'hidden-selector'");
                    this.tenAmpSelectorKnob.classList.toggle("hidden-selector");
                    if(ProbeConnectionManager.presentAmpConnection == "low"){
                        this.warningLabel.classList.remove("hidden-element");
                    }
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.ampAcOption);
                    }else{
                        this.showHideTestingOption(this.ampDcOption);
                    }*/
                    break;
                case "off":
                   // console.log("selectorLabel = " + selectorLabel);
                   // console.log("showHide = " + showHide);
                    if(showHide == "hide"){
                       // console.log("hidding offSelectorKnob");
                        this.offSelectorKnob.classList.add("hidden-selector");
                    }else{
                      //  console.log("showing offSelectorKnob");
                        this.offSelectorKnob.classList.remove("hidden-selector");
                        this.reset();
                        ScreenManager.reset();
                        ButtonManager.reset();
                        ProbeConnectionManager.reset();
                        TimingManager.reset();
                    }
                    //this.offSelectorKnob.classList.toggle("hidden-selector");
                   // this.autoSymbol.classList.remove('hidden-element');
                    break;
                case "volts":
                    console.log("in KnobSelectorManager.js case 'volts'");
                    this.voltSelectorKnob.classList.toggle("hidden-selector");
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.voltsAcOption);
                    }else{
                        this.showHideTestingOption(this.voltsDcOption);
                    }*/
                    break;
                case "hertz":
                    this.hertzSelectorKnob.classList.toggle("hidden-selector");
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.hertzOption);
                    }else{
                        this.showHideTestingOption(this.dutyCycleOption);
                    }*/
                    break;
                case "ohms":
                    this.ohmsSelectorKnob.classList.toggle("hidden-selector");
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.continuityOption);
                    }else{
                        this.showHideTestingOption(this.ohmsOption);
                    }*/
                    break;
                case "capDiode":
                    this.capDiodeSelectorKnob.classList.toggle("hidden-selector");
                    /*if(this.presentSELcolor == "orange"){
                        this.showHideTestingOption(this.capacitorOption);
                    }else{
                        this.showHideTestingOption(this.diodeOption);
                    }*/
                    break;
                default: console.log("Not an allowable KnobSelector");
            }
            if(selectorLabel != "sel"){
                DisplayValueManager.InitialSetUp(selectorLabel);
            }
            //console.log("this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
        },
       

        reset: function(){
            this.presentSELcolor = "orange";
            this.warningLabel.classList.add("hidden-element");
            this.selButtonBckgrnd.classList.add("orange-bckgrnd");
        },

        init: function(){
            console.log("in KnobSelectorManager.init()");
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
           // console.log("beginning 'click' elements");
            this.selClick = document.getElementById("mm-select-button-click-area-id");
            this.selClick.addEventListener("click",function(){KnobSelectorManager.KnobSelectorHandler("sel")});
            this.offClick = document.getElementById("mm-off-click-area-id");
            this.offClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("off")});
            this.tenAmpClick = document.getElementById("mm-ten-amp-click-area-id");
            this.tenAmpClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("tenAmp")});
            this.milliAmpClick = document.getElementById("mm-milli-amp-click-area-id");
            this.milliAmpClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("milliAmp")});
            this.microAmpClick = document.getElementById("mm-micro-amp-click-area-id");
            this.microAmpClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("microAmp")});
            this.tempClick = document.getElementById("mm-temp-click-area-id");
            this.tempClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("temp")});
            this.voltsClick = document.getElementById("mm-volts-click-area-id");
            this.voltsClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("volts")});
            this.hertzClick = document.getElementById("mm-hertz-click-area-id");
            this.hertzClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("hertz")});
            this.ohmsClick = document.getElementById("mm-ohms-click-area-id");
            this.ohmsClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("ohms")});
            this.capDiodeClick = document.getElementById("mm-cap-diode-click-area-id");
            this.capDiodeClick.addEventListener("click",function(){KnobSelectorManager.changeSetting("capDiode")});
           // console.log("ending 'selector click' elements");

            this.warningLabel = document.getElementById("warning-label-id");
            this.warningLabel.classList.add("hidden-element");
            this.selButtonBckgrnd = document.getElementById("mm-sel-button-bckgrnd-id");

            // Selector Labels
            /*this.offSelector = document.getElementById("mm-off-id");
            this.tempSelector = document.getElementById("mm-temp-id");
            this.microAmpSelector = document.getElementById("mm-micro-amp-id");
            this.milliAmpSelector = document.getElementById("mm-milli-amp-id");
            this.tenAmpSelector = document.getElementById("mm-ten-amp-label-id");
            this.voltSelector = document.getElementById("mm-volts-id");
            this.hertzSelector = document.getElementById("mm-hertz-id");
            this.ohmsSelector = document.getElementById("mm-ohms-id");
            this.capDiodeSelector = document.getElementById("mm-cap-diode-id");
            
            this.multimeterHead = document.getElementById("multimeter-head-id");*/
           
            this.presentSELcolor = "orange",
            this.lastKnobSelectorLabel = "",
            this.presentKnobSelectorLabel = "off",
            //console.log("Calling ScreenManager.init()");
            ScreenManager.init();
            ScreenManager.initiated = "true";
            //console.log("Now Calling ButtonManager.init()");
            ButtonManager.init();
            ButtonManager.initiated = "true";
            //console.log("Now Calling ProbeConnectionManager.init()");
            ProbeConnectionManager.init();
            ProbeConnectionManager.initiated = "true";
            //console.log("Finished ProbeConnectionManager.init()"); 
            DisplayValueManager.init();
            DisplayValueManager.initiated = "true";
            console.log("Finished KnobSelectorManager.init()"); 
            this.initiated = true; 
        }
    }
