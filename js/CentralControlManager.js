/*  CentralControlManager
*   Primary Function: Coordinate Selections originating in: KnobSelectorManager, ButtonManager, TestingComponentsManager, ProbeManager, ScreenManager and TimingManager
*       1: Centralize the coordination between above Managers   
*       2: eg Each Manager only has to be concerened with their own changes and not how that change will affect any of the other Managers  
*/

    let CentralControlManager = {
        //Properties
            initialized: false,
            oldKnobSelection: "off",
            newKnobSelection: "off",
            multimeterOn: false,

            ampConnection: "",
            
            testingSelectorLabel: {},
            selectorTitleData: {},
            testingImgData: {},
            testingSelectorImg: {},

            ohmsArticle: {},
            warningLabel: {},

            possibleKnobSelections: ["temp","microAmp","milliAmp","tenAmp","volts","hertz","ohms","capDiode","off"],
            acDcSelectors:  ["microAmp","milliAmp","tenAmp","volts"],
            noAcDcSelectors:  ["temp","hertz","ohms","capDiode"],

            presentOption: 0, // varies between 0 and 7.  0: "temp",  1: "micro"  2: "milli"  3: "ten"  4: "volts"  5: "Hertz/DutyCycle  6: "Continuity/Ohms"  7: "Capacitor/Diode"
            presentSelColor: "orange", //  varies between 0 and 1.    0: "orange",  1: "red"
            rangeCount: 0,

            connector: {},
        // Methods

        change: function(itemChanged,changedValue){
            console.log("itemChanged = " + itemChanged);
            console.log("changedValue = " + changedValue);
            switch (itemChanged){
                case "knob":
                    this.oldKnobSelection = this.newKnobSelection;
                    this.newKnobSelection = changedValue; 
                    this.warningManager();
                    if(changedValue == "off"){
                        console.log("resetting everything");
                        // reset everything
                        ButtonManager.reset();
                        DisplayValueManager.reset();
                        KnobSelectorManager.reset();
                        ProbeManager.reset();
                        ScreenManager.reset();
                        TestingComponentsManager.reset();
                        TimingManager.reset();
                        this.warningLabel.classList.add("hidden-element");
                    }else{
                        console.log("starting batteryTimer");
                        this.batteryTimer
                        console.log("going to ScreenManager.auxillarySymbolsManager()");
                        ScreenManager.auxillarySymbolsManager();
                        if(this.oldKnobSelection != "off"){
                            ScreenManager.prefixUnitManager(this.oldKnobSelection, "hide");
                        }
                        ScreenManager.prefixUnitManager(this.newKnobSelection, "show");
                        DisplayValueManager.changeDisplayValue(this.newKnobSelection, this.presentSelColor);
                    }
                    break;
                case "ampConnection":
                    console.log("in CentralControlManager.change(ampConnection)");
                    this.ampConnection = changedValue;
                    this.warningManager();
                    break;
                case "button":
                    if(this.knobSelection == "off"){return}
                    //console.log("in CentralControlManager.change('button'");
                    switch (changedValue){
                        case "sel":
                            console.log("in CentralControlManager.change('button','sel'");
                            ScreenManager.auxillarySymbolsManager();
                            if(this.oldKnobSelection != "off"){
                                console.log("this.oldKnobSelection = " + this.oldKnobSelection);
                                ScreenManager.prefixUnitManager(this.oldKnobSelection, "hide");
                            }
                            ScreenManager.prefixUnitManager(this.newKnobSelection, "show");
                            DisplayValueManager.changeDisplayValue(this.newKnobSelection,this.presentSelColor);
                            break;
                        case "hold":
                            ScreenManager.holdSymbol.classList.toggle("hidden-element");
                            break;
                        case "maxMin":
                            ScreenManager.autoSymbol.classList.add("hidden-element");
                            console.log("switching between 'MAX and 'MIN'");
                            if(ScreenManager.maxMinSelected == "max"){
                                console.log("showing Max & hiding Min");
                                ScreenManager.maxSymbol.classList.remove("hidden-element");
                                ScreenManager.minSymbol.classList.add("hidden-element");
                                ScreenManager.maxMinSelected = "min";
                            }else{
                                console.log("showing Min & hiding Max");
                                ScreenManager.minSymbol.classList.remove("hidden-element");
                                ScreenManager.maxSymbol.classList.add("hidden-element");
                                ScreenManager.maxMinSelected = "max";
                            }
                            break;
                        case "maxMin-terminate":
                                console.log("in maxMin-terminate");
                                ScreenManager.minSymbol.classList.add("hidden-element");
                                ScreenManager.maxSymbol.classList.add("hidden-element");
                                ScreenManager.maxMinSelected = "max";
                                ScreenManager.autoSymbol.classList.remove("hidden-element");
                            break;
                        case "light":
                                //console.log("msg to ScreenManager.changeScreenColor()");
                                ScreenManager.changeScreenColor();
                            break;
                        case "range":
                                ScreenManager.autoSymbol.classList.add("hidden-element");
                                //console.log("cycling through 'range options' where cycleCount = " + this.rangeCount);
                                this.rangeCount++;
                                //console.log("this.rangeCount = " + this.rangeCount);
                                this.rangeCount = this.rangeCount % 4;
                                console.log("this.rangeCount = " + this.rangeCount);
                            break;
                        case "range-terminate":
                            console.log("in case: 'range-terminate'");
                            ScreenManager.autoSymbol.classList.remove("hidden-element");
                            break;
                        default: console.log(changedValue + "  is NOT an allowable Button");
                    }
                    break;
                default: console.log(itemChanged + ' is Not an allowable "itemChange"');
            }

           
        },
        batteryTimer: function(){
            if(!TimingManager.batteryTimerStarted){
                TimingManager.startBatteryTimer();
                TimingManager.batteryTimerStarted = true;
            }
        },
        stopMaxMinFunction: function(){
            this.maxSymbol.classList.add("hidden-element");
            this.minSymbol.classList.add("hidden-element");
            this.autoSymbol.classList.remove("hidden-element");
        },

        maxMinTerminated: function(){
            ScreenManager.maxSymbol.classList.add("hidden-element");
            ScreenManager.minSymbol.classList.add("hidden-element");
        },

        stopRangeFunction: function(){
            this.autoSymbol.classList.remove("hidden-element");
        },

        rangeTerminated: function(){
            ScreenManager.autoSymbol.classList.remove("hidden-element");
        },

        warningManager: function(){
            console.log("in warning Manager");
            console.log("this.ampConnection == " + this.ampConnection);
            console.log("this.newKnobSelection " + this.newKnobSelection);
            if(this.newKnobSelection == "off"){return}
            if(((this.ampConnection == "high") && (this.newKnobSelection != "tenAmp")) || ((this.ampConnection == "low") && (this.newKnobSelection == "tenAmp"))){
                this.warningLabel.classList.remove("hidden-element");
            }else{
                this.warningLabel.classList.add("hidden-element");
            }
        },

        reset: function(){
            this.ampConnection = "";
            this.knobSelection = "off";
            this.warningLabel.classList.add("hidden-element");
        },

        init: function(){
            //console.log("in CentralControlManager.init()");
            this.warningLabel = document.getElementById("warning-label-id");

            ButtonManager.init();
            ButtonManager.initiated = "true";
             
            DisplayValueManager.init();
            DisplayValueManager.initiated = "true";

            KnobSelectorManager.init();
            KnobSelectorManager.initiated = "true";

            ProbeManager.init();
            ProbeManager.initiated = "true";

            ScreenManager.init();
            ScreenManager.initiated = "true";

            TestingComponentsManager.init();
            TestingComponentsManager.initiated = "true";

            TimingManager.init();
            TimingManager.initiated = "true";

            TestingComponentsManager.init();
            TestingComponentsManager.initiated = "true";

            //this.ohmsArticle = document.getElementById("mm-ohms-article-id");
           //console.log("leaving CentralControlManager.init()");
           this.connector = document.getElementById("trg-6-id");
        }
    }
