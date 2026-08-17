let DisplayValueManager = {
        // Properties
            initiated: false,

        // BEGIN Selectors
            // Selector Knob
            displayScreen: {},
            minusSign: {},
            thousandDigit: {},
            hundredDigit: {},
            tenDigit: {},
            unitDigit: {},
            periodOne: {},
            periodTwo: {},
            periodThree: {},

            testing: false,

        // END Selectors
        
            possibleKnobSelections: ["temp","microAmp","milliAmp","tenAmp","volts","hertz","ohms","capDiode"],

        // Methods
            changeDisplayValue: function(newKnobSelection, selColor){
                console.log("DisplayValueManager.changeDisplayValue where newKnobSelection = " + newKnobSelection);
                //Value Display depends upon: 1)TestingValue(ie 'true' or 'false') 2) KnobSelected, 3)SEL Button status(ie 'orange' of 'red')
                switch (newKnobSelection){
                    case "temp":
                        if(!this.testing){
                            this.setDigits(["off","0","L","off"]);
                            this.setPeriods(["off","off","on"]);
                        }else{

                        }
                        break;
                    case "microAmp":
                        if(!this.testing){
                            this.setDigits(["off","off",0,0]);
                            this.setPeriods(["off","off","on"]);
                        }else{
                            
                        }
                        break;
                    case "milliAmp":
                        if(!this.testing){
                            this.setDigits(["off",0,0,0]);
                            this.setPeriods(["off","on","off"]);
                        }else{
                            
                        }
                        break;
                    case "tenAmp":
                        if(!this.testing){
                            this.setDigits([0,0,0,0]);
                            this.setPeriods(["on","off","off"]);
                        }else{
                            
                        }
                        break;
                    case "off":
                        // Clear Display
                        break;
                    case "volts":
                        if(!this.testing){
                            if(selColor == "orange"){
                                this.setDigits([0,0,0,0]);
                                this.setPeriods(["on","off","off"]);
                            }else{
                                this.setDigits(["off","off",0,0]);
                                this.setPeriods(["off","off","on"]);
                            }
                        }else{
                            
                        }
                        break;
                    case "hertz":
                        if(!this.testing){
                            if(selColor == "orange"){
                                this.setDigits([0,0,0,0]);
                                this.setPeriods(["on","off","off"]);
                            }else{
                                this.setDigits(["off","off",0,0]);
                                this.setPeriods(["off","off","on"]);
                            }
                        }else{
                            
                        }
                        break;
                    case "ohms":
                        if(!this.testing){
                                this.setDigits(["off",0,"L","off"]);
                            if(selColor == "orange"){
                                this.setPeriods(["off","off","on"]);
                            }else{
                                this.setPeriods(["off","on","off"]);
                            }
                        }else{
                            
                        }
                        break;
                    case "capDiode":
                        if(!this.testing){
                            if(selColor == "orange"){
                                this.setDigits(["off",0,0,0]);;
                                this.setPeriods(["off","on","off"]);
                            }else{
                                this.setDigits(["off",0,"L","off"]);
                                this.setPeriods(["on","off","off"]);
                            }
                        }else{
                            
                        }
                        break;
                    default: console.log(newKnobSelection + " is Not an allowable KnobSelector");
                }
            },

            setDigits: function(digitArray){
                for(var count = 0; count < 4; count++){
                    console.log("setting digit values");
                    switch (count){
                        case 0:
                            if(digitArray[0] == "off"){
                                this.thousandDigit.classList.add("hidden-element");
                            }else{
                                this.thousandDigit.classList.remove("hidden-element");
                                this.thousandDigit.innerHTML = digitArray[0];
                            }
                            break;
                        case 1:
                            if(digitArray[1] == "off"){
                                this.hundredDigit.classList.add("hidden-element");
                            }else{
                                this.hundredDigit.classList.remove("hidden-element");
                                this.hundredDigit.innerHTML = digitArray[1];
                            }
                            break;
                        case 2:
                            if(digitArray[2] == "off"){
                                this.tenDigit.classList.add("hidden-element");
                            }else{
                                this.tenDigit.classList.remove("hidden-element");
                                this.tenDigit.innerHTML = digitArray[2];
                            }
                            break;
                        case 3:
                            if(digitArray[3] == "off"){
                                this.unitDigit.classList.add("hidden-element");
                            }else{
                                this.unitDigit.classList.remove("hidden-element");
                                this.unitDigit.innerHTML = digitArray[3];
                            }
                            break;
                        default: count + " NOT valed count";
                    }
                }
            },

            setPeriods: function(periodArray){
                for(var count = 0; count < 3; count++){
                    switch (count){
                        case 0:
                            if(periodArray[0] == "off"){
                                this.periodThree.classList.add("hidden-element");
                            }else{
                                this.periodThree.classList.remove("hidden-element");
                            }
                            break;
                        case 1:
                            if(periodArray[1] == "off"){
                                this.periodTwo.classList.add("hidden-element");
                            }else{
                                this.periodTwo.classList.remove("hidden-element");
                            }
                            break;
                        case 2:
                           // console.log("in setPeriods case 2:");
                            if(periodArray[2] == "off"){
                                this.periodOne.classList.add("hidden-element");
                            }else{
                               // console.log("removing 'hidden-element' from this.periodOne");
                                this.periodOne.classList.remove("hidden-element");
                            }
                            break;
                        default: count + " NOT valed count";
                    }
                }
            },

            reset: function(){
                console.log("in DisplayValueManager.reset()")
                this.setDigits(["off","off","off","off"]);
                this.setPeriods(["off","off","off"]);
            },

            init: function(){
               // console.log("in KnobSelectorManager.init()");
            // Selectors
                this.displayScreen = document.getElementById("mm-display-screen-id");
                this.minusSign = document.getElementById("mm-minus-sign-id");
                this.thousandDigit = document.getElementById("mm-thousands-value-id");
                this.hundredDigit = document.getElementById("mm-hundreds-value-id");
                this.tenDigit = document.getElementById("mm-tens-value-id");
                this.unitDigit = document.getElementById("mm-unit-value-id");
                this.periodOne = document.getElementById("mm-period-1-id");
                this.periodTwo = document.getElementById("mm-period-2-id");
                this.periodThree = document.getElementById("mm-period-3-id");
            // console.log("ending 'selector click' elements");

                this.initiated = true; 
            }
    }
