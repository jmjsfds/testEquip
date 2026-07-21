let TestingComponentsManager = {
    // Properties
        initiated: false,
        colorNumberValue: ["black","brown","red","orange","yellow","green","blue","violet","gray","white"],
        resistorValue: 0,
        resistorBandOne: "red",
        resistorBandtwo: "yellow",
        resistorBandThree: "brown",
    // Methods

    //this.testingSelectorLabel.innerHTML = this.presentOption;
                //console.log("this.selectorTitleData[this.presentSel][this.presentOption].class.length =  " + this.selectorTitleData[this.presentSel][this.presentOption].class.length);
            /*? for(var i=0; i < this.selectorTitleData[this.presentSel][this.presentOption].class.length; i++ ){
                    //console.log("this.selectorTitleData[this.presentSel][this.presentOption].class[" + i + "] =   " + this.selectorTitleData[this.presentSel][this.presentOption].class[i]);
                    //this.testingSelectorLabel.classList.add(this.selectorTitleData[this.presentSel][this.presentOption].class[i]);
                }*/
                //this.testingSelectorLabel.innerHTML = this.selectorTitleData[this.presentSel][this.presentOption].title;
                //this.testingSelectorImg.src = this.testingImgData[this.presentSel][this.presentOption].imgSrc;
                //console.log("this.testingSelectorImg.src = " + this.testingSelectorImg.src);
                /*if((knobSelected == "ohms") && (this.presentSel == 1)){
                    this.ohmsArticle.classList.remove("hidden-element");
                    console.log("Now going to HtmlManager to load OhmTest.html");
                    //HtmlManager.request("html/OhmTest.html","article","exercises");
                    //ComponentManager.show("breadboard","show");
                }*/
    measureResistance: function(){
        console.log("in measureResistance:");
        this.resistorValue = (this.colorNumberValue.indexOf(this.resistorBandOne)*10 + this.colorNumberValue.indexOf(this.resistorBandtwo))*(10**this.colorNumberValue.indexOf(this.resistorBandThree));
        console.log("resistorValue = " + this.resistorValue);
    },

    reset: function(){
        
    },

    init: function(){
            console.log("in TestingComponentsManager.init()");
        this.measureResistance();
           // this.testingSelectorImg = document.getElementById("testing-img-id");
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
                                                "imgSrc":[""]
                                            },{  "class":["diode-img","img-option"],
                                                "imgSrc":[""]
                                            }
                                        ]
                                    ]`;
            this.testingImgData = JSON.parse(testingImgDataString);
    }
}
