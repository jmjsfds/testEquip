  
    let ProbeConnectionManager = {
        //Properties
        initiated: false,

        //Plug In's
        blackPlugin:{},
        redPlugin:{},
       // blackPluginConnected:{},
       // redPluginConnected:{},
       // redTenAmpPluginConnected:{},

        //PlugIns Click 
        comPluginClick: {},
        lowAmpPluginClick: {},
        highAmpPluginClick:{},

        //Connections
        presentAmpConnection: "",
        redPluginConnection: false,
        redTenAmpPluginConnection: false,
        blackPluginConnection: false,

        bothPluginConnected: false,

        //Methods

        PluginManager: function(plugin){
            if(!this.initiated){
                //console.log("Calling ProbeConnectionManager.init()");
                this.init();
                this.initiated = "true";
            };
            switch (plugin){
                case "comPlugin":
                    if(!this.blackPluginConnection){
                        console.log("connecting this.blackPlugin");
                        this.blackPlugin.setAttribute("transform","translate(650,-284) rotate(90) scale(0.3)");
                        this.blackPluginConnection = true;
                    }else{
                        console.log("disconnecting this.blackPlugin");
                        this.blackPlugin.setAttribute("transform","translate(255,-284) rotate(90) scale(0.3)");
                        this.blackPluginConnection = false;
                    }

                    //this.blackPlugin.classList.add("connect-black-plugin");
                    /*this.blackPlugin.classList.add("hidden-element");
                    this.blackPluginConnected.classList.remove("hidden-element");*/
                    if(this.redPluginConnection || this.redTenAmpPluginConnection){
                       // console.log("this.pluginConnections is true");
                        this.bothPluginConnected = "true";
                    }
                    break;
                case "lowAmpPlugin":
                    if(KnobSelectorManager.presentKnobSelectorLabel == "tenAmp"){
                        this.warningLabel.classList.remove("hidden-element");
                    }else{
                    this.warningLabel.classList.add("hidden-element"); 
                    }
                    this.redPlugin.setAttribute("transform","translate(835,70) rotate(90) scale(0.3)");

                    if(this.blackPluginConnection){
                        this.bothPluginConnected = "true";
                    // console.log("this.pluginConnections is true");
                    }
                    break;
                case "highAmpPlugin":
                    this.presentAmpConnection = "high";
                    if((KnobSelectorManager.presentKnobSelectorLabel != "tenAmp") && (KnobSelectorManager.presentKnobSelectorLabel != "off") ){
                        //console.log("showing Warning");
                        this.warningLabel.classList.remove("hidden-element");
                    }else{
                       this.warningLabel.classList.add("hidden-element"); 
                    }
                    this.redPlugin.setAttribute("transform","translate(835,-640) rotate(90) scale(0.3)");
                 
                    if(this.blackPluginConnection){
                        this.pluginConnections = "true";
                       // console.log("this.pluginConnections is true");
                    }
                    break;
                case "off":
                    console.log("logging off: resetting red & black plugins to original position");
                    this.redPlugin.setAttribute("transform","translate(255,70) rotate(90) scale(0.3)");
                    this.blackPlugin.setAttribute("transform","translate(255,-288) rotate(90) scale(0.3)");
                    break;
                default: console.log("Not an allowable Button or PlugIn");
            }
        },

        reset: function(){
            // PlugIns
            this.PluginManager("off");
            //PlugInConnections
            this.redPluginConnection = false;
            this.redTenAmpPluginConnection = false;
            this.blackPluginConnection = false;
        },

        init: function(){
            //console.log("in ProbeConnectionManager.init()");
            this.warningLabel = document.getElementById("warning-label-id");

            // Plugin Click Areas
            //console.log("Beginning 'Plugin click' elements");
            this.comPluginClick = document.getElementById("mm-com-plugin-click-area-id");
            this.comPluginClick.addEventListener("click",function(){ProbeConnectionManager.PluginManager("comPlugin")});
            this.lowAmpPluginClick= document.getElementById("mm-mamp-plugin-click-area-id");
            this.lowAmpPluginClick.addEventListener("click",function(){ProbeConnectionManager.PluginManager("lowAmpPlugin")});
            this.highAmpPluginClick = document.getElementById("mm-ten-amp-plugin-click-area-id");
            this.highAmpPluginClick.addEventListener("click",function(){ProbeConnectionManager.PluginManager("highAmpPlugin")});
            //PlugIns
            this.blackPlugin = document.getElementById("black-plugin-id");
            this.redPlugin = document.getElementById("red-plugin-id");
           // this.blackPluginConnected = document.getElementById("black-plugin-connected-id");
           // this.redPluginConnected = document.getElementById("red-plugin-connected-id");
           // this.redTenAmpPluginConnected = document.getElementById("red-ten-amp-plugin-connected-id");

            //console.log("finished ProbeConnectionManager.init()"); 
        }
    }
