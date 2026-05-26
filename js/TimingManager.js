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
    function stopRangeFunction(){
        //console.log("showing battery using outside fct");
        ScreenManager.autoSymbol.classList.remove("hidden-element");
        ScreenManager.clearBatteryTimer();
        //MultiMeterManager.batteryTimerStarted = false 
    }  
    
    let TimingManager = {
        //Properties
        lightStartMilliSeconds: {},
        lightEndMilliSeconds: {},
        light3MinStartMilliSeconds: {},
        light3MinEndMilliSeconds: {},
        rangeStartMilliSeconds: {},
        rangeEndMilliSeconds: {},
        maxMinStartMilliSeconds: {},
        maxMinEndMilliSeconds: {},
        batteryTimer: {},
        lightThreeMinTimer: {},
       // ClockStarted,
        //maxMinClockStarted: false,
        //rangeClockStarted: false,
        //lightClockStarted: false,
        light3MinClockStarted: false,
        batteryTimerStarted: false,


        
            /*const maxMinDownTime = (this.maxMinEndMilliSeconds - this.maxMinStartMilliSeconds);
            console.log("maxMinDownTime = " + maxMinDownTime);
            if(maxMinDownTime > 1000){
                ScreenManager.minSymbol.classList.add("hidden-element");
                ScreenManager.maxSymbol.classList.add("hidden-element");
                ScreenManager.autoSymbol.classList.remove("hidden-element");
                ScreenManager.maxMinSelected = "max";
            }*/

        // Methods
        startLightTime: function(){
            console.log("in startLightTime");
            this.lightStartMilliSeconds = Date.now();
            //console.log("lightStartMilliSeconds = " + this.lightStartMilliSeconds);
            //this.light1SecClockStarted = true;
           // console.log("leaving startLightTime");
        },
        stopLightTime: function(){
            console.log("in startLightTime");
            this.lightEndMilliSeconds = Date.now();
           // console.log("Light Down Time = " + (this.lightEndMilliSeconds - this.lightStartMilliSeconds));
            if((this.lightEndMilliSeconds - this.lightStartMilliSeconds) > 1000){
               // console.log("going to ButtonManager.ButtonHandler('light')");
                ScreenManager.changeScreenColor();
            }
            //this.light1SecClockStarted = true;
           // console.log("leaving startLightTime");
        },
        start3MinLightTime: function(){
            this.light3MinStartMilliSeconds = Date.now();
            this.light3MinClockStarted = true;
            clearTimeout(this.lightThreeMinTimer);
            this.lightThreeMinTimer = setTimeout(shutOffLight, 180000);
            //console.log("leaving startLightTime");
        },
        startRangeTime: function(){
            this.rangeStartMilliSeconds = Date.now();
           // console.log("this.rangeStartMilliSeconds = " + this.rangeStartMilliSeconds);
            //this.rangeClockStarted = true;
        },
        stopRangeTime: function(){
           // console.log("getting Range stop time in milliSeconds");
            this.rangeEndMilliSeconds = Date.now();
          //  console.log("this.rangeEndMilliSeconds = " + this.rangeEndMilliSeconds);
           // const maxMinTotalTime = parseInt(this.maxMinEndMilliSeconds) - parseInt(this.maxMinStartMilliSeconds);
            const rangeTotalTime = this.rangeEndMilliSeconds - this.rangeStartMilliSeconds;
           // console.log("this.rangeTotalTime = " + rangeTotalTime); 
            if(rangeTotalTime > 1000){
               // console.log("terminating Range function");
                ScreenManager.stopRangeFunction();
            }
        },
        startMaxMinTime: function(){
           // console.log("setting MaxMin start time in milliSeconds");
            this.maxMinStartMilliSeconds = Date.now();
           // console.log("this.maxMinStartMilliSeconds = " + this.maxMinStartMilliSeconds);
            //this.maxMinClockStarted = true;
        },
        stopMaxMinTime: function(){
           // console.log("getting MaxMin stop time in milliSeconds");
            this.maxMinEndMilliSeconds = Date.now();
           // console.log("this.maxMinEndMilliSeconds = " + this.maxMinEndMilliSeconds);
           // const maxMinTotalTime = parseInt(this.maxMinEndMilliSeconds) - parseInt(this.maxMinStartMilliSeconds);
            const maxMinTotalTime = this.maxMinEndMilliSeconds - this.maxMinStartMilliSeconds;
           // console.log("this.maxMinTotalTime = " + maxMinTotalTime); 
            if(maxMinTotalTime > 1000){
               // console.log("terminating Max Min function");
                ScreenManager.stopMaxMinFunction();
            }
        },

        startBatteryTimer: function(){
            this.batteryTimer = setTimeout(showBattery, 300000);     /* 300000 milli secs = 5 mins  */
           // console.log("batteryTimer started");
        },
    
        clearBatteryTimer: function(){
            clearTimeout(this.batteryTimer);
            //console.log("batteryTimer has been cleared");
        },

        reset: function(){
            this.clearBatteryTimer();
            this.batteryTimerStarted = false;
        },

        init: function(){
            
        }
    }
