    function showBattery(){
        //console.log("showing battery using outside fct");
        ScreenManager.batterySymbol.classList.remove("hidden-element");
        TimingManager.clearBatteryTimer();
        //MultiMeterManager.batteryTimerStarted = false;
    }
    function shutOffLight(){
       // console.log("shutting off backlight");
        //console.log("shutting off time = " + Date.now());
        ScreenManager.displayScreen.classList.remove("white-bckgrnd");
        ScreenManager.displayScreen.classList.add("gray-bckgrnd");
        ScreenManager.screenColor = "gray";
    }
    /*function stopRangeFunction(){
        console.log("in stopRangeFunction() and showing 'auto'");
        ScreenManager.autoSymbol.classList.remove("hidden-element");
        //MultiMeterManager.batteryTimerStarted = false 
    }*/  
    
    let TimingManager = {
        //Properties

        lightStartMilliSeconds: {},
        lightEndMilliSeconds: {},

        lightThreeMinTimer: {},
        light3MinStartMilliSeconds: {},
        light3MinClockStarted: false,
        light3MinEndMilliSeconds: {},

        rangeStartMilliSeconds: {},
        rangeEndMilliSeconds: {},

        maxMinStartMilliSeconds: {},
        maxMinEndMilliSeconds: {},

        batteryTimer: {},
        batteryTimerStarted: false,

        // Methods
        startLightTimer: function(){
            console.log("in startLightTime");
            this.lightStartMilliSeconds = Date.now();
        },
        stopLightTimer: function(){
            console.log("in stopLightTime");
            this.lightEndMilliSeconds = Date.now();
            console.log("Light Down Time = " + (this.lightEndMilliSeconds - this.lightStartMilliSeconds));
            if((this.lightEndMilliSeconds - this.lightStartMilliSeconds) > 1000){
                console.log("going to ButtonManager.buttonclicked('light')");
                CentralControlManager.change("button","light");
            }
        },

        start3MinLightTimer: function(){
            this.light3MinStartMilliSeconds = Date.now();
            this.light3MinClockStarted = true;
            clearTimeout(this.lightThreeMinTimer);
            this.lightThreeMinTimer = setTimeout(shutOffLight, 180000);
        },

        startRangeTimer: function(){
            console.log("setting this.rangeStartMilliSeconds to Date.now" + Date.now());
            //console.log("Range is now operational");
            this.rangeStartMilliSeconds = Date.now();
            CentralControlManager.change("button","range");
        },
        stopRangeTimer: function(){
            console.log("in stopRangeTimer");
            this.rangeEndMilliSeconds = Date.now();
            const rangeTotalTime = this.rangeEndMilliSeconds - this.rangeStartMilliSeconds;
            if(rangeTotalTime > 1000){
                console.log("Range Button held for more than 1 sec. Terminating Range Option");
               // stopRangeFunction();
                CentralControlManager.change("button","range-terminate");
            }
        },

        startMaxMinTimer: function(){
            this.maxMinStartMilliSeconds = Date.now();
            CentralControlManager.change("button","maxMin");
        },
        stopMaxMinTimer: function(){
            this.maxMinEndMilliSeconds = Date.now();
            const maxMinTotalTime = this.maxMinEndMilliSeconds - this.maxMinStartMilliSeconds;
            console.log("maxMinTotalTime = " + maxMinTotalTime);
            if(maxMinTotalTime > 1000){
                CentralControlManager.change("button","maxMin-terminate");
            }
        },

        startBatteryTimer: function(){
            this.batteryTimer = setTimeout(showBattery, 300000);
        },
    
        clearBatteryTimer: function(){
            clearTimeout(this.batteryTimer);
        },

        reset: function(){
            this.clearBatteryTimer();
            this.batteryTimerStarted = false;
        },

        init: function(){
            //console.log("in TimingManager.init()");
        }
    }
