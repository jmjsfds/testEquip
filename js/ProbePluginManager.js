  
    let ProbePluginManager = {
        //Properties
        initiated: false,

        //Plug In's
        blackPlugin:{},
        redPlugin:{},

        //PlugIns Click 
        comPluginClick: {},
        lowAmpPluginClick: {},
        highAmpPluginClick:{},

        //Connections
        redPluginConnected: false,
        blackPluginConnected: false,

        bothPluginsConnected: false,
        pinYdata: {},
        yPinCoord: 0,
        xPinCoord: 0,

        //Methods

        pluginManager: function(plugin){
            if(!this.initiated){
                //console.log("Calling ProbeManager.init()");
                this.init();
                this.initiated = "true";
            };
            switch (plugin){
                case "comPlugin":
                    if(this.blackPluginConnected){
                        console.log("disconnecting this.blackPlugin");
                        this.blackPlugin.setAttribute("transform","translate(-255,24) rotate(0) scale(0.1)");
                        this.blackPluginConnected = false;
                    }else{
                        console.log("connecting this.blackPlugin");
                        this.blackPlugin.setAttribute("transform","translate(-109,820) scale(0.1)");
                        this.blackPluginConnected = true;
                    }
                    break;
                case "lowAmpPlugin":
                    CentralControlManager.change("ampConnection","low");
                    this.redPluginConnected = true;
                    this.redPlugin.setAttribute("transform","translate(10.5,760) scale(0.1)");

                    if(this.blackPluginConnected){
                        this.bothPluginsConnected = "true";
                    // console.log("this.pluginConnections is true");
                    }
                    break;
                case "highAmpPlugin":
                    CentralControlManager.change("ampConnection","high");
                    this.redPluginConnected = true;
                    this.redPlugin.setAttribute("transform","translate(-230,760) scale(0.1)");
                 
                    if(this.blackPluginConnected){
                        this.pluginConnections = "true";
                       // console.log("this.pluginConnections is true");
                    }
                    this.redTenAmpPluginConnection = true;
                    break;
                case "off":
                    console.log("logging off: resetting red & black plugins to original position");
                    this.redPlugin.setAttribute("transform","translate(-15,1045) scale(0.1)");
                    this.blackPlugin.setAttribute("transform","translate(-200,1045) scale(0.1)");
                    break;
                default: console.log(plugin + " is Not an allowable PlugIn");
            }

            if(this.redPluginConnected && this.blackPluginConnected){
                // console.log("this.pluginConnections is true");
                this.bothPluginsConnected = "true";
            }
            /*this.warningManager();*/
        },

        probeManager: function(probe) {
            if(!this.initiated){
                //console.log("Calling ProbeManager.init()");
                this.init();
                this.initiated = "true";
            };
        },

        reset: function(){
            // PlugIns
            this.pluginManager("off");
            //PlugInConnections
            this.redPluginConnected = false;
            this.redTenAmpPluginConnection = false;
            this.blackPluginConnected = false;
        },

        init: function(){
          //console.log("in ProbePluginManager.init()");
          const pinYdataString = `{ "tg": -1500, "tv": -1432, "a": -1216, "b": -1144, "c": -1072, "d": -1000, "e": -928, "f": -720,
                                  "g": -648, "h": -576, "i": -504, "j": -432, "bg": -210, "bv": -140
                                }`
          this.pinYdata = JSON.parse(pinYdataString);
            //console.log("finished creating this.pinYdata");
            //console.log("this.pinYdata.tg = " + this.pinYdata.tg);
            //console.log("this.pinYdata.bv = " + this.pinYdata.bv);
      
          const railPrefix = ["bg","bv","tg","tv"];
          for(var j = 0; j < 4; ++j){
            for(var i = 1; i<51; ++i){
              let pin = document.getElementById(railPrefix[j] + i + "-id");
              pin.classList.add("pin");
            }
          }  
          const mainPrefix = ["a","b","c","d","e","f","g","h","i","j"];
          for(var j = 0; j < 10; ++j){
            for(var i = 1; i<64; ++i){
              //console.log("mainPrefix[j] + i + -id = " + mainPrefix[j] + i + "-id");
              let mainPin = document.getElementById(mainPrefix[j] + i + "-id");
              mainPin.classList.add("pin");
            }
          }

          const step = 22.5; 
          gsap.registerPlugin(Draggable);
          let clamp = gsap.utils.clamp(-90, 90);
          // let snap = gsap.utils.snap(22.5);
          gsap.set("#selector-knob-id", { transformOrigin: "center center" });

          Draggable.create("#selector-knob-id", {
            type: "rotation",
            bounds: { minRotation: -90, maxRotation: 90 },
            inertia: false, // Disables momentum/throwing completely
            liveSnap: function(endValue) {
                // Snaps the rotation value in real-time to the nearest 22.5-degree step
                ////console.log("endvalue = ", endValue);
                ////console.log("Snapped value: = ", Math.round(endValue / step) * step);
                return Math.round(endValue / step) * step;
            },
     
            onDrag: function() {
              //console.log("Current rotation:", this.rotation);
            },
            onRelease: function() {
              //console.log("Released at: " + this.rotation);
              const thisRotation = this.rotation;
              KnobSelectorManager.knobRotated(thisRotation);
            },
            onSnapComplete: function() {
              //console.log("Snapped to final angle:", this.rotation);
            }
          });

          gsap.registerPlugin(Draggable);

          const redProbe = document.querySelector("#red-probe-id");
          const redProbeTip = document.querySelector("#red-tip-id");
          const breadboardTargets = document.querySelectorAll(".pin");

          Draggable.create(redProbe, {
            type: "x,y",
            pinX: "",
            pinY: "",
            pinNumber: 1,
            onPress: function() {
              //this.pinX = this.x;
              //this.pinY = this.y;
              //console.log("pinXY = " + this.pinX + "," + this.pinY);
            },

            onRelease: function() {
              let matchedTarget = null;
              let isReturning = false;
   
             
              // Check if the redProbe overlaps any target
              breadboardTargets.forEach(target => {
                if (Draggable.hitTest(redProbeTip, target)) {
                  matchedTarget = target;
                }
                if(matchedTarget){
                  console.log("matchedTarget.id = " + matchedTarget.id);
                  let matchedTargetIdDigit2 = matchedTarget.id.slice(1,2);
                  console.log("matchedTarget.id.slice(1,2) = " + matchedTargetIdDigit2);
                  
                  if((matchedTargetIdDigit2 == "g") || (matchedTargetIdDigit2 == "v")){
                    // one of the 4 power rails has been clicked (ie "bg", "bv", "tg", "tv")
                    console.log("a pin on the power rails has been clicked");
                    console.log("rail code = " + matchedTarget.id.slice(0,2));
                    switch (matchedTarget.id.slice(0,2)){
                      case "tg":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.tg;
                        console.log("ProbePluginManager.pinYdata.tg = " + ProbePluginManager.pinYdata.tg);
                        break;
                      case "tv":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.tv;
                        console.log("ProbePluginManager.pinYdata.tv = " + ProbePluginManager.pinYdata.tv);
                        break;
                      case "bg":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.bg;
                        console.log("ProbePluginManager.pinYdata.bg = " + ProbePluginManager.pinYdata.bg);
                        break;
                      case "bv":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.bv;
                        console.log("ProbePluginManager.pinYdata.bv = " + ProbePluginManager.pinYdata.bv);
                        break;
                        default: console.log(matchedTarget.id.slice(0,2) + " is not a valid code");
                    }
                    console.log( "matchedTargetId y-coord = " + ProbePluginManager.yPinCoord );
                    // calculate the xPinCoord
                    let railPinNumber = matchedTarget.id.slice(2,matchedTarget.id.length - 3);
                    console.log("railPinNumber = " + railPinNumber);
                    let numberGroupFive = Math.trunc((matchedTarget.id.slice(2,matchedTarget.id.length - 3) -1 ) / 5 );// Need to add 0 to 4 more pins!
                    console.log("numberGroupFive = " + numberGroupFive);
                    console.log("railPinNumber - numberGroupFive * 5 = " + railPinNumber - numberGroupFive*5);
                    ProbePluginManager.xPinCoord = 3695 - 435.89 * numberGroupFive - 73.3 * (railPinNumber - numberGroupFive * 5 - 1);
                  }else{
                    console.log("one of the main pins had been clicked");
                    // one of the main pins has been clicked (ie "a", "b", "c", ...  "j")
                    //ProbePluginManager.xPinCoord = 3695 - 72.5 * (matchedTarget.id.slice(1,matchedTarget.id.length - 3) - 1);
                    switch (matchedTarget.id.slice(0,1)){
                      case "a":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.a;
                        console.log("ProbePluginManager.pinYdata.a = " + ProbePluginManager.pinYdata.a);
                        break;
                      case "b":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.b;
                        console.log("ProbePluginManager.pinYdata.b = " + ProbePluginManager.pinYdata.b);
                        break;
                      case "c":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.c;
                        console.log("ProbePluginManager.pinYdata.c = " + ProbePluginManager.pinYdata.c);
                        break;
                      case "d":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.d;
                        console.log("ProbePluginManager.pinYdata.d = " + ProbePluginManager.pinYdata.d);
                        break;
                      case "e":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.e;
                        console.log("ProbePluginManager.pinYdata.e = " + ProbePluginManager.pinYdata.e);
                        break;
                      case "f":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.f;
                        console.log("ProbePluginManager.pinYdata.f = " + ProbePluginManager.pinYdata.f);
                        break;
                      case "g":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.g;
                        console.log("ProbePluginManager.pinYdata.g = " + ProbePluginManager.pinYdata.g);
                        break;
                      case "h":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.h;
                        console.log("ProbePluginManager.pinYdata.h = " + ProbePluginManager.pinYdata.h);
                        break;
                      case "i":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.i;
                        console.log("ProbePluginManager.pinYdata.i = " + ProbePluginManager.pinYdata.i);
                        break;
                      case "j":
                        ProbePluginManager.yPinCoord = ProbePluginManager.pinYdata.j;
                        console.log("ProbePluginManager.pinYdata.j = " + ProbePluginManager.pinYdata.j);
                        break;
                        default: console.log(matchedTarget.id.slice(0,2) + " is not a valid code");
                    }
                    // calculate the xPinCoord
                    console.log("pinNumber = " + matchedTarget.id.slice(1,matchedTarget.id.length - 3));
                    ProbePluginManager.xPinCoord = 3830 - 72.5 * (matchedTarget.id.slice(1,matchedTarget.id.length - 3) - 1);
                  }
                  
                  gsap.to(this.target, { x: ProbePluginManager.xPinCoord, y: ProbePluginManager.yPinCoord, duration: 0.3 });
                }else{
                  console.log("returning to starting position");
                /*isReturning = true;
                gsap.to(this.target, { x: 800, y: 100, duration: 7.2});
                //gsap.to(this.target, { x: -3275, y: 50, duration: 0.2 });
                isReturning = false;*/
                }
              });
            }
          });

          const blackProbe = document.querySelector("#black-probe-id");
          const blackProbeTip = document.querySelector("#black-tip-id");

          Draggable.create(blackProbe, {
            type: "x,y",

            onRelease: function() {
              let matchedTarget = null;
            
              // Check if the blackProbe overlaps any target
              breadboardTargets.forEach(target => {
                if (Draggable.hitTest(blackProbeTip, target)) {
                  matchedTarget = target;
                }
              });

              if (matchedTarget) {
                //console.log("matchedTarget found");
                //console.log("matchedTarget.id = " + matchedTarget.id);
                // Get the bounding boxes of both elements 
                const blackProbeTipRect = blackProbeTip.getBoundingClientRect();
                const targetRect = matchedTarget.getBoundingClientRect();
              
                // Calculate the difference to move the blackProbe to the center
                const dx = (targetRect.left + targetRect.width / 2) - (blackProbeTipRect.left);// + blackProbeTipRect.width / 2);
                //const dy = (targetRect.top + targetRect.height / 2) - (blackProbeTipRect.top + blackProbeTipRect.height / 2);// + blackProbeTipRect.height / 2
                const dy = 0; //(targetRect.top + targetRect.height/2) - (blackProbeTipRect.top);
                console.log("dx = " + dx + "  dy = " + dy);
                // Animate to the center position smoothly
                gsap.to(this.target, {
                  x: `+=${dx}`,
                  y: `+=${dy}`,
                  duration: 0.3,
                  ease: "power2.out"
                });
              } else {
                // Optional: Return to origin if not dropped on a target
                gsap.to(this.target, { x: -20, y: 100, duration: 0.3 });
              }
            }
          });




          const redPlugin = document.querySelector("#red-plugin-id");
          const redThumbPad = document.querySelector("#red-thumb-pad-id");
          const voltPluginTargets = document.querySelectorAll(".mm-volt-plugin-area");

          gsap.registerPlugin(Draggable);

          Draggable.create(redPlugin, {
            type: "x,y",
            isReturning: false,

            onRelease: function() {
              if(this.isReturning) return;
              let matchedTarget = null;

              // Loop through multiple drop zones for collision checking
              voltPluginTargets.forEach(target => {
                if (Draggable.hitTest(redThumbPad, target)) {
                  matchedTarget = target;
                }
              });

              if (matchedTarget) {
                //console.log("matchedTarget.id = " + matchedTarget.id);
                // Get SVG local bounding boxes for precise center alignment
              // const subBox   = redPluginHead.getBBox();
              // const targetBox = matchedZone.getBBox();
                const subBox   = redThumbPad.getBoundingClientRect();
                const targetBox = matchedTarget.getBoundingClientRect();

                // Current accumulated translation values on the dragged group
                //console.log("currentX = " + this.x);
                //console.log("currentY = " + this.y);
                const currentX = this.x;
                const currentY = this.y;

                // Calculate sub-element offset relative to the parent group container
                const subCenterX = subBox.x + subBox.width / 2;
                const subCenterY = subBox.y + subBox.height / 2;
                const targetCenterX = targetBox.x + targetBox.width / 2;
                const targetCenterY = targetBox.y + targetBox.height / 2 + 10;
                //console.log("subCenterX,Y = " + subCenterX + "," + subCenterY);
                //console.log("targetCenterX,Y = " + targetCenterX + "," + targetCenterY);
                // Adjust coordinate delta to align sub-element center to target center
                //const dx = targetCenterX - (currentX + subCenterX);
                //const dy = targetCenterY - (currentY + subCenterY);
                const dx = targetCenterX - (subCenterX);
                const dy = targetCenterY - (subCenterY);
                //console.log("dx,dy = " + dx + "," + dy);
                

                gsap.to(redPlugin, {
                  x: currentX + dx,
                  y: currentY + dy,
                  duration: 0.3,
                  ease: "power2.out"
                });
              } else {
                // Spring back or reset position on miss redPlugin
                isReturning = true;
                gsap.to(this.target, { x: -3150, y: 60, duration: 0.2 });
                /*gsap.to(dragGroup, {
                  x: 0,
                  y: 0,
                  duration: 0.4,
                  ease: "elastic.out(1, 0.75)"
                });*/
                isReturning = false;
              }
            }
          }); 

          const blackPlugin = document.querySelector("#black-plugin-id");
          const blackThumbPad = document.querySelector("#black-thumb-pad-id");
          const comPluginTargets = document.querySelectorAll(".mm-com-plugin-area");

          Draggable.create(blackPlugin, {
            type: "x,y",
            pinX: "",
            pinY: "",
            isReturning: false,

            onRelease: function() {
              console.log("in blackPlugin.onRelease()");
              if(this.isReturning) return;

              let matchedTarget = null;
                console.log("Checking for Collisions");
              // Check if the blackProbe collides with any target
              comPluginTargets.forEach(target => {
                if (Draggable.hitTest(blackThumbPad, target)) {
                  matchedTarget = target;
                }
              });

              if (matchedTarget) {
                console.log("matchedTarget found");
                //console.log("matchedTarget.id = " + matchedTarget.id);
                // Get the bounding boxes of both elements 
                const blackThumbPadRect = this.target.getBoundingClientRect();
                const targetRect = matchedTarget.getBoundingClientRect();
              
                // Calculate the difference to move the blackProbe to the center
                const dx = (targetRect.left + targetRect.width / 2) - (blackThumbPadRect.left + blackThumbPadRect.width / 2);
                const dy = (targetRect.top + targetRect.height / 2) - (blackThumbPadRect.top + 20);
                //const dy = (targetRect.top + targetRect.height / 2) - blackProbeRect.top;
                //console.log("dx = " + dx + "  dy = " + dy);
                // Animate to the center position smoothly
                gsap.to(this.target, {
                  x: `+=${dx}`,
                  y: `+=${dy}`,
                  duration: 0.3,
                  ease: "power2.out"
                });
              } else {
                // Optional: Return to origin if not dropped on a target 
              // gsap.set(this.target, { pointerEvents: "none" });
                this.isReturning = true;
                gsap.to(this.target, { x: -3333, y: 64, duration: 0.2});
                //gsap.to(this.target, { x: -3275, y: 50, duration: 0.2 });
                this.isReturning = false;
              }
            }
          }) 
        }
      }
