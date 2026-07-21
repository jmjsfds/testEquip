   
    let ButtonManager = {
        //Properties
        initiated: false,

//BEGIN Buttons (click)
        selClick:{},
        lightClick:{},
        rangeClick:{},
        maxMinClick:{},
        holdClick:{},
//END Buttons (click)
        selButtonBckgrnd: {},
        
        presentSELcolor: "orange",
        maxMinClicked: false,

        //Methods
        
        buttonClicked: function(buttonLabel){
            switch (buttonLabel){
                case "sel":
                    console.log("in 'sel'");
                    console.log("this.presentSelColor = " + CentralControlManager.presentSelColor);
                    console.log("CentralControlManager.newKnobSelection = " + CentralControlManager.newKnobSelection);
                    if(CentralControlManager.newKnobSelection == "off"){return;}
                    if(CentralControlManager.presentSelColor == "orange"){
                        this.selButtonBckgrnd.classList.remove("orange-bckgrnd");
                        this.selButtonBckgrnd.classList.add("red-bckgrnd");
                        CentralControlManager.presentSelColor = "red";
                    }else{
                        this.selButtonBckgrnd.classList.remove("red-bckgrnd");
                        this.selButtonBckgrnd.classList.add("orange-bckgrnd");
                        CentralControlManager.presentSelColor = "orange";
                    }
                    CentralControlManager.change("button","sel");
                    break;
                case "hold":
                        CentralControlManager.change("button","hold");
                    break;
                case "maxMin":
                        TimingManager.maxMinEndMilliSeconds = Date.now();
                        CentralControlManager.change("button","maxMin");
                    break;
                case "light":
                        console.log("msg to CCM.change(): light button clicked");
                        CentralControlManager.change("button","light");
                    break;
                case "range":
                        console.log("range button has been clicked. Range Option now functional");
                        CentralControlManager.change("button","range");
                    break;
                default: console.log(buttonLabel + "  is Not an allowable Button");
            }
        },

        reset: function(){
            console.log("in ButtonManager.reset()");
            this.maxMinClicked = false;
            this.presentSELcolor = "orange";
            this.selButtonBckgrnd.classList.remove("red-bckgrnd");
            this.selButtonBckgrnd.classList.add("orange-bckgrnd");

        },

        init: function(){
           // console.log("in ButtonManager.init()");

            this.selButtonBckgrnd = document.getElementById("mm-sel-button-bckgrnd-id");
            // Button Click Areas
            
            this.selClick = document.getElementById("mm-select-button-click-area-id");
            this.selClick.addEventListener("click",function(){ButtonManager.buttonClicked("sel")});
            
            this.lightClick = document.getElementById("mm-light-button-click-area-id");
            this.lightClick.addEventListener("mouseup",function(){TimingManager.stopLightTimer();});
            this.lightClick.addEventListener("mousedown",function(){TimingManager.startLightTimer();});

            this.rangeClick = document.getElementById("mm-range-button-click-area-id");
            this.rangeClick.addEventListener("mouseup",function(){TimingManager.stopRangeTimer()});
            this.rangeClick.addEventListener("mousedown",function(){TimingManager.startRangeTimer("range")});

            this.maxMinClick = document.getElementById("mm-max-min-button-click-area-id");
            this.maxMinClick.addEventListener("mouseup",function(){TimingManager.stopMaxMinTimer();});
            this.maxMinClick.addEventListener("mousedown",function(){TimingManager.startMaxMinTimer()});

            this.holdClick = document.getElementById("mm-hold-button-click-area-id");
            this.holdClick.addEventListener("click",function(){ButtonManager.buttonClicked("hold")});

            //console.log("finished ButtonManager.init()"); 
        }
    }
