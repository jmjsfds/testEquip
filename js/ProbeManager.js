  
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
            //console.log("in ProbeManager.init()");

            // Plugin Click Areas
           // console.log("Beginning 'Plugin click' elements");
            this.comPluginClick = document.getElementById("mm-com-plugin-click-area-id");
            this.comPluginClick.addEventListener("click",function(){ProbeManager.pluginManager("comPlugin")});
            this.lowAmpPluginClick= document.getElementById("mm-mamp-plugin-click-area-id");
            this.lowAmpPluginClick.addEventListener("click",function(){ProbeManager.pluginManager("lowAmpPlugin")});
            this.highAmpPluginClick = document.getElementById("mm-ten-amp-plugin-click-area-id");
            this.highAmpPluginClick.addEventListener("click",function(){ProbeManager.pluginManager("highAmpPlugin")});
            //PlugIns
            this.blackPlugin = document.getElementById("black-plugin-id");
            this.redPlugin = document.getElementById("red-plugin-id");
           // this.blackPluginConnected = document.getElementById("black-plugin-connected-id");
           // this.redPluginConnected = document.getElementById("red-plugin-connected-id");
           // this.redTenAmpPluginConnected = document.getElementById("red-ten-amp-plugin-connected-id");

            //console.log("finished ProbeManager.init()"); 
        }
    }
