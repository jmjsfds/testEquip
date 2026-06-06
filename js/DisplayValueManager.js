let DisplayValueManager = {
        //Properties
        initiated: false,
        //measuredValueContainer: {},

        unitDigit: {},
        tensDigit: {},
        hundredsDigit: {},
        thousandsDigit: {},

        periodOne: {},
        periodTwo: {},
        periodThree: {},

        minusSign: {},

        displayValue: ['','','',''],
        periodLocation: ['','',''],

        //Methods
        InitialSetUp: function(selectedKnob) {                
            switch (selectedKnob){
                case "temp":
                        this.displayValue = ['','0','L',''];
                        this.periodLocation = ['','','.'];
                    break;
                case "microAmp":
                        this.displayValue = ['','','0','0'];
                        this.periodLocation = ['','','.'];
                    break;
                case "milliAmp":
                        console.log("in DisplayValueManager case 'milliAmp'");
                        this.displayValue = ['','0','0','0'];
                        this.periodLocation = ['','.',''];
                        //console.log("now adding classList to this.minusSign");
                        this.minusSign.setAttribute("class","mm-minus-sign-3-digits");
                        //console.log("after adding classList");
                    break;
                case "tenAmp":
                        this.displayValue = ['0','0','0','0'];
                        this.periodLocation = ['.','',''];
                        this.minusSign.removeAttribute("class","mm-minus-sign-3-digits");
                        //this.minusSign.classList.remove("minus-sign-3-digits");
                    break;
                case "off":
                        console.log("in InitialSetUp off");
                    this.reset();
                    break;
                case "volts":
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            this.displayValue = ['0','0','0','0'];
                            this.periodLocation = ['.','',''];
                        }else{
                            this.displayValue = ['','','0','0'];
                            this.periodLocation = ['','','.'];
                        }
                    break;
                case "hertz":
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            this.displayValue = ['0','0','0','0'];
                            this.periodLocation = ['.','',''];
                        }else{
                            this.displayValue = ['','','0','0'];
                            this.periodLocation = ['','','.'];
                        }
                    break;
                case "ohms":
                        this.displayValue = ['','0','L',''];
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            this.periodLocation = ['','','.'];
                        }else{
                            this.periodLocation = ['','.',''];
                        }
                    break;
                case "capDiode":
                        if(KnobSelectorManager.presentSELcolor == "orange"){
                            this.displayValue = ['',0,0,0];
                            this.periodLocation = ['','.',''];
                        }else{
                            this.displayValue = ['',0,'L',''];
                            this.periodLocation = ['.','',''];
                        }
                    break;
                default: console.log("in DisplayValueManager " + selectedKnob + " is not an allowable selector Knob");
            }
            this.displayResults();
            //console.log("at END of PrefixUnitManager & this.presentKnobSelectorLabel = " + this.presentKnobSelectorLabel);
        },

        displayResults: function(){
            this.unitDigit.textContent = this.displayValue[3];
            this.tensDigit.textContent = this.displayValue[2]; 
            this.hundredsDigit.textContent = this.displayValue[1]; 
            this.thousandsDigit.textContent = this.displayValue[0];
            this.periodOne.textContent = this.periodLocation[2];
            this.periodTwo.textContent = this.periodLocation[1];
            this.periodThree.textContent = this.periodLocation[0]; 
        },

        GetData: function(){

        },

        AutoFunction: function(){
           
        },

        RangeFunction: function(){
           
        },

        reset: function(){
            //console.log("in ScreenManager.reset()");
            this.periodLocation = ['','',''];
            this.displayValue = ['','','',''];
            this.displayResults();
            /*this.unitDigit = 0;
            this.tensDigit = 0;
            this.hundredsDigit = 0;
            this.thousandsDigit = 0;*/
            //this.measuredValueContainer.clallList.add("hidden-element");

        },

        init: function(){
            //console.log("Beginning ScreenManager.init()"); 
            //Output elements
            this.measuredValueContainer = document.getElementById("mm-measured-value-id");
            this.unitDigit = document.getElementById("mm-unit-value-id");
            this.tensDigit = document.getElementById("mm-tens-value-id");
            this.hundredsDigit = document.getElementById("mm-hundreds-value-id");
            this.thousandsDigit = document.getElementById("mm-thousands-value-id");

            this.periodOne = document.getElementById("mm-period-1-id");
            this.periodTwo = document.getElementById("mm-period-2-id");
            this.periodThree = document.getElementById("mm-period-3-id");

            this.minusSign = document.getElementById("mm-minus-sign-id");
            //console.log("Finished ScreenManager.init()"); 
        }
    }
