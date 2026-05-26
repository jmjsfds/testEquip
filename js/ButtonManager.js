  
    let ButtonManager = {
        //Properties
        initiated: false,

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

        /*warningLabel: {},*/

        // BEGIN Plug ins 
        comPluginClick: {},
        lowAmpPluginClick: {},
        highAmpPluginClick:{},
        // END Plug ins
        

        //Light, Range & MaxMin Button Timers
       /* twoSecTimer: {},
        lightStartMilliSeconds: {},
        lightEndMilliSeconds: {},
        maxMinStartMilliSeconds: {},
        maxMinEndMilliSeconds: {},
        rangeStartMilliSeconds: {},
        rangeEndMilliSeconds: {},
        batteryTimer: {},
        lightThreeMinTimer: {},*/

//END Buttons


       /* redPluginConnection: false,
        redTenAmpPluginConnection: false,
        blackPluginConnection: false,
        pluginConnections: false,*/
        maxMinClicked: false,

        //Methods
        
        ButtonHandler: function(buttonLabel){
            /*if(!this.initiated){
                console.log("Calling ButtonManager.init()");
                this.init();
                this.initiated = "true";
            };*/
            switch (buttonLabel){
                /*case "sel":
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
                        ScreenManager.PrefixUnitManager(KnobSelectorManager.presentKnobSelectorLabel, "hide"); 
                        ScreenManager.PrefixUnitManager(KnobSelectorManager.presentKnobSelectorLabel, "show");
                        ScreenManager.AuxillarySymbolsManager();
                        //KnobSelectorManager.changeSetting(KnobSelectorManager.presentKnobSelectorLabel); 
                    break;*/
                case "hold":
                        //console.log("in Button - 'hold' and this.presentKnobSelectorLabel = " + KnobSelectorManager.presentKnobSelectorLabel);
                        if(KnobSelectorManager.presentKnobSelectorLabel == "off"){return;}
                        ScreenManager.holdSymbol.classList.toggle("hidden-element");
                    
                    break;
                case "maxMin":
                        if(KnobSelectorManager.presentKnobSelectorLabel == "off"){return;}
                        //TimingManager.stopMaxMinTime();
                        //console.log("removing autoSymbol");
                        ScreenManager.autoSymbol.classList.add("hidden-element");
                        //TimingManager.maxMinEndMilliSeconds = Date.now();
                        //console.log("switching between 'MAX and 'MIN'");
                        if(ScreenManager.maxMinSelected == "max"){
                            //console.log("showing Max & hiding Min");
                            ScreenManager.maxSymbol.classList.remove("hidden-element");
                            ScreenManager.minSymbol.classList.add("hidden-element");
                            ScreenManager.maxMinSelected = "min";
                        }else{
                            //console.log("showing Min & hiding Max");
                            ScreenManager.minSymbol.classList.remove("hidden-element");
                            ScreenManager.maxSymbol.classList.add("hidden-element");
                            ScreenManager.maxMinSelected = "max";
                        }
                        //console.log("ScreenManager.maxMinSelected = " + ScreenManager.maxMinSelected);
                    break;
                case "light":
                        if(KnobSelectorManager.presentKnobSelectorLabel == "off"){return;}
                        console.log("in case 'light'");
                    break;
                case "range":
                        if(KnobSelectorManager.presentKnobSelectorLabel == "off"){return;}
                        ScreenManager.autoSymbol.classList.add("hidden-element");
                        //console.log("rangeEndMilliSeconds = " + this.rangeEndMilliSeconds);
                        //const rangeDownTime = (ScreenManager.rangeEndMilliSeconds - ScreenManager.rangeStartMilliSeconds);
                        //console.log("rangeDownTime = " + rangeDownTime);
                        /*if(rangeDownTime > 1000){
                            //console.log("downTime = " + rangeDownTime);
                            this.autoSymbol.classList.remove("hidden-element");
                        }else{
                            this.rangeSelected = "ten";
                            //console.log("switching between 'ten', 'milli', 'micro'");
                        }*/
                    break;
                default: console.log("Not an allowable Button");
            }
        },

        reset: function(){
            // Button Symbols
            //console.log("in ButtonManager.reset()");
            this.maxMinClicked = false;
            this.maxMinClockStarted = false;

        },

        init: function(){
            //console.log("in ButtonManager.init()");

            // Plugin Click Areas
           /* console.log("Beginning 'Plugin click' elements");
            this.comPluginClick = document.getElementById("mm-com-plugin-click-area-id");
            this.comPluginClick.addEventListener("click",function(){ButtonManager.ButtonHandler("comPlugin")});
            this.lowAmpPluginClick= document.getElementById("mm-mamp-plugin-click-area-id");
            this.lowAmpPluginClick.addEventListener("click",function(){ButtonManager.ButtonHandler("lowAmpPlugin")});
            this.highAmpPluginClick = document.getElementById("mm-ten-amp-plugin-click-area-id");
            this.highAmpPluginClick.addEventListener("click",function(){ButtonManager.ButtonHandler("highAmpPlugin")});
            this.blackPlugin = document.getElementById("black-plugin-id");
            this.redPlugin = document.getElementById("red-plugin-id");
            this.blackPluginConnected = document.getElementById("black-plugin-connected-id");
            this.redPluginConnected = document.getElementById("red-plugin-connected-id");
            this.redTenAmpPluginConnected = document.getElementById("red-ten-amp-plugin-connected-id");*/

            // Button Click Areas
            //console.log("Beginning 'Button click' elements");
            /*this.selClick = document.getElementById("mm-select-button-click-area-id");
            this.selClick.addEventListener("click",function(){ButtonManager.ButtonHandler("sel")});*/
            this.lightClick = document.getElementById("mm-light-button-click-area-id");
            this.lightClick.addEventListener("mouseup",function(){TimingManager.stopLightTime();});
            this.lightClick.addEventListener("mousedown",function(){TimingManager.startLightTime();});
            this.rangeClick = document.getElementById("mm-range-button-click-area-id");
            this.rangeClick.addEventListener("mouseup",function(){ButtonManager.ButtonHandler("range");TimingManager.stopRangeTime();});
            this.rangeClick.addEventListener("mousedown",function(){TimingManager.startRangeTime("range")});
            this.maxMinClick = document.getElementById("mm-max-min-button-click-area-id");
            this.maxMinClick.addEventListener("mouseup",function(){ButtonManager.ButtonHandler("maxMin");TimingManager.stopMaxMinTime();});
            this.maxMinClick.addEventListener("mousedown",function(){TimingManager.startMaxMinTime()});
            this.holdClick = document.getElementById("mm-hold-button-click-area-id");
            this.holdClick.addEventListener("click",function(){ButtonManager.ButtonHandler("hold")});
            //console.log("ending 'Button click' elements");

            //console.log("finished ButtonManager.init()"); 
        }
    }
