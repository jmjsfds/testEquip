
    let SelectionOptionsManager = {
        //Properties
            initialized: false,
            
            testingSelectorLabel: {},
            selectorTitleData: {},

            testingImgData: {},
            testingSelectorImg: {},

            /*tempSelection: {},
            microAmpSelection: {},
            milliAmpSelection: {},
            tenAmpSelection: {},
            voltsSelection: {},
            hertzSelection: {},
            ohmsSelection : {},
            capDiodeSelection: {},*/
            knobSelections: ["temp","microAmp","milliAmp","tenAmp","volts","hertz","ohms","capDiode"],
           

            presentOption: 0, // varies between 0 and 7.  0: "temp",  1: "micro"  2: "milli"  3: "ten"  4: "volts"  5: "Hertz/DutyCycle  6: "Continuity/Ohms"  7: "Capacitor/Diode"
            presentSel: 0, //  varies between 0 and 1.    0: "orange",  1: "red"

        // Methods
        changeKnob: function(knobSelected, selColor){ 
            //console.log("knobSelected = " + knobSelected);
           // console.log("selColor = " + selColor);                  //function(presentKnobSelection){
            if(!this.initialized){this.init(); 
                this.initialized = true;}
            if(selColor == "orange"){
                this.presentSel = 0;
            }else{
                this.presentSel = 1;
            }
            this.presentOption = this.knobSelections.indexOf(knobSelected);
            for(var i=0; i < this.selectorTitleData[this.presentSel][this.presentOption].class.length; i++ ){
                this.testingSelectorLabel.classList.add(this.selectorTitleData[this.presentSel][this.presentOption].class[i]);
                console.log("this.selectorTitleData[this.presentSel][this.presentOption].class["+i+"] =   " + this.selectorTitleData[this.presentSel][this.presentOption].class[i]);
            }
            this.testingSelectorLabel.innerHTML = this.selectorTitleData[this.presentSel][this.presentOption].title;
            this.testingSelectorImg.src = this.testingImgData[this.presentSel][this.presentOption].imgSrc;
            console.log("this.testingSelectorImg.src = " + this.testingSelectorImg.src);
        },

        reset: function(){
   //         this.testingSelectorLabel.innerHTML = "";
        },

        init: function(){
           // console.log("in SelectionOptionManager.init()");
            this.testingSelectorLabel = document.getElementById("main-testing-heading-id");
            selectorTitleDataString =  `[   [
                                            {   "class":["temp-f","selection-option"],
                                                "title":"Temperature (deg F)"
                                            },{  "class":["micro-amp-ac","selection-option"],
                                                "title":"Micro Amp (ac)"
                                            },{  "class":["milli-amp-ac","selection-option"],
                                                "title":"Milli Amp (ac)"
                                            },{  "class":["ten-amp-ac","selection-option"],
                                                "title":"Ten Amp (ac)"
                                            },{  "class":["voltage-ac","selection-option"],
                                                "title":"Voltage (ac)"
                                            },{  "class":["hertz','selection-option"],
                                                "title":"Hertz"
                                            },{  "class":["continuity","selection-option"],
                                                "title":"Continuity"
                                            },{  "class":["capacitor","selection-option"],
                                                "title":"Capacitor"
                                            }
                                        ],
                                        [
                                            {   "class":["temp-c","selection-option"],
                                                "title":"Temperature (deg C)"
                                            },{  "class":["micro-amp-dc","selection-option"],
                                                "title":"Micro Amp (dc)"
                                            },{  "class":["milli-amp-dc","selection-option"],
                                                "title":"Milli Amp (dc)"
                                            },{  "class":["ten-amp-dc","selection-option"],
                                                "title":"Ten Amp (dc)"
                                            },{  "class":["voltage-dc","selection-option"],
                                                "title":"Voltage (dc)"
                                            },{  "class":["duty-cycle","selection-option"],
                                                "title":"Duty Cycle"
                                            },{  "class":["ohms","selection-option"],
                                                "title":"Measuring Resistance"
                                            },{  "class":["diode","selection-option"],
                                                "title":"Diode"
                                            }
                                        ]
                                    ]`;
            this.selectorTitleData = JSON.parse(selectorTitleDataString);

            this.testingSelectorImg = document.getElementById("testing-img-id");
            testingImgDataString =  `[   [
                                            {   "class":["temp-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["micro-amp-ac-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["milli-amp-ac-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["ten-amp-ac-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["voltage-ac-img","img-option"],
                                                "imgSrc":["media/imgs/Test-Equipment/AC-Source.svg"]
                                            },{  "class":["hertz-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["continuity-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["capacitor-img","img-option"],
                                                "imgSrc":[""]
                                            }
                                        ],
                                        [
                                            {   "class":["temp-c-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["micro-amp-dc-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["milli-amp-dc-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["ten-amp-dc-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["voltage-dc-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["duty-cycle-img","img-option"],
                                                "imgSrc":[""]
                                            },{  "class":["ohms-img","img-option"],
                                                "imgSrc":["media/imgs/resistors-capacitors/resistor.svg"]
                                            },{  "class":["diode-img","img-option"],
                                                "imgSrc":[""]
                                            }
                                        ]
                                    ]`;
            this.testingImgData = JSON.parse(testingImgDataString);
            
           // console.log("leaving SelectionOptionManager.init()");
        }
    }
