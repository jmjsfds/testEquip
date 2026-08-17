   
    let KnobSelectorManager = {
        // Properties
            initiated: false,

        // BEGIN Selectors
            // Selector Knob
            selectorKnob: {},
            oldKnobSelection: "off",
            newKnobSelection: "off",

            // Selector 'Click' Areas
            tempClick:{},
            tenAmpClick:{},
            microAmpClick:{},
            milliAmpClick:{},
            offClick:{},
            voltsClick:{},
            hertzClick:{},
            ohmsClick:{},
            capDiodeClick:{},
        // END Selectors
        
            possibleKnobSelections: ["temp","microAmp","milliAmp","tenAmp","volts","hertz","ohms","capDiode"],

        // Methods
            knobRotated: function(newKnobSelection){
                this.oldKnobSelection = this.newKnobSelection;
                console.log("newKnobSelection = " + newKnobSelection);
                switch (newKnobSelection){
                    case -90:
                        this.newKnobSelection = "temp";
                        //this.selectorKnob.setAttribute("transform","rotate(-89.99,1080.4217,816.88303)");
                        break;
                    case -67.5:
                        this.newKnobSelection = "microAmp";
                        //this.selectorKnob.setAttribute("transform","rotate(-67.5,1080.4217,816.88303)");
                        break;
                    case -45:
                        this.newKnobSelection = "milliAmp";
                        //this.selectorKnob.setAttribute("transform","rotate(-45,1080.4217,816.88303)");
                        break;
                    case -22.5:
                        this.newKnobSelection = "tenAmp";
                        //this.selectorKnob.setAttribute("transform","rotate(-22.5,1080.4217,816.88307)");
                        break;
                    case 0:
                        this.newKnobSelection = "off";
                        //this.selectorKnob.setAttribute("transform","rotate(0,1080.4217,816.88307)");
                        break;
                    case 22.5:
                        this.newKnobSelection = "volts";
                        //this.selectorKnob.setAttribute("transform","rotate(22.5,1080.4217,816.88307)");
                        break;
                    case 45:
                        this.newKnobSelection = "hertz";
                        //this.selectorKnob.setAttribute("transform","rotate(45,1080.4217,816.88307)");
                        break;
                    case 67.5:
                        this.newKnobSelection = "ohms";
                        //this.selectorKnob.setAttribute("transform","rotate(67.5,1080.4217,816.88307)");
                        break;
                    case 90:
                        this.newKnobSelection = "capDiode";
                       // this.selectorKnob.setAttribute("transform","rotate(90,1080.4217,816.88306)");
                        break;
                    default: console.log(newKnobSelection + "  is Not an allowable KnobSelection");
                }
                CentralControlManager.change("knob",this.newKnobSelection);
            },

            reset: function(){
            },

            init: function(){
               // console.log("in KnobSelectorManager.init()");
            // Selectors
                this.selectorKnob = document.getElementById("selector-knob-id");
            // console.log("beginning 'click' elements");
                /*this.offClick = document.getElementById("mm-off-click-area-id");
                this.offClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("off")});
                this.tenAmpClick = document.getElementById("mm-ten-amp-click-area-id");
                this.tenAmpClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("tenAmp")});
                this.milliAmpClick = document.getElementById("mm-milli-amp-click-area-id");
                this.milliAmpClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("milliAmp")});
                this.microAmpClick = document.getElementById("mm-micro-amp-click-area-id");
                this.microAmpClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("microAmp")});
                this.tempClick = document.getElementById("mm-temp-click-area-id");
                this.tempClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("temp")});
                this.voltsClick = document.getElementById("mm-volts-click-area-id");
                this.voltsClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("volts")});
                this.hertzClick = document.getElementById("mm-hertz-click-area-id");
                this.hertzClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("hertz")});
                this.ohmsClick = document.getElementById("mm-ohms-click-area-id");
                this.ohmsClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("ohms")});
                this.capDiodeClick = document.getElementById("mm-cap-diode-click-area-id");
                this.capDiodeClick.addEventListener("click",function(){KnobSelectorManager.changeKnob("capDiode")});*/
            // console.log("ending 'selector click' elements");

                this.initiated = true; 
            }
    }
