
 let EduNavManager = {
        //properties
            initialized: false,
            
            eduNavLabelEle: {},
            eduNavDropdownEle: {},
            eduNavDropdownHidden: true,

            trainingLabelEle: {},
            trainingDropdownEle: {},
            trainingDropdownHidden: true,

            introductionlabelEle: {},
            introductionDropdownEle: {},
            introductionDropdownHidden: true,

            codesLabelEle: {},
            codesDropdownEle: {},
            codesDropdownHidden: true,

            logicGatesLabelEle: {},
            logicGatesDropdownEle: {},
            logicGatesDropdownHidden: true,

            architecturelabelEle: {},
            architectureDropdownEle: {},
            architectureDropdownHidden: true,

            techLabelEle: {},
            techDropdownEle: {},
            techDropdownHidden: true,

            mediaArtsLabelEle: {},
            mediaArtsDropdownEle: {},
            mediaArtsDropdownHidden: true,

            /*testingLabelEle: {},
            testingDropdownEle: {},
            testingDropdownHidden: true,
            
            packetsLabelEle: {},
		    packetsDropdownEle: {},
            packetsDropdownHidden: true,

            testingCodesLabelEle: {},
            testingCodesDropdownEle: {},
            testingCodesDropdownHidden: true,

            testingLogicGatesLabelEle: {},
            testingLogicGatesDropdownEle: {},
            testingLogicGatesDropdownHidden: true,

            testingTechLabelEle: {},
            testingTechDropdownEle: {},
            testingTechDropdownHidden: true,

            testingMediaArtsLabelEle: {},
            testingMediaArtsDropdownEle: {},
            testingMediaArtsDropdownHidden: true,*/

           /* hardwarelabelEle: {},
            hardwearDropdownEle: {},
            hardwearDropdownHidden: true,
            componentslabelEle: {},
            componentsDropdownEle: {},
            componentsDropdownHidden: true,
            equipmentlabelEle: {},
            equipmentDropdownEle: {},
            equipmentDropdownHidden: true,*/
        //methods
            openCloseDropdown: function(dropdown, openOrClose){
                if(!this.initialized){this.init(); this.initialized = true;}
                console.log("in openCloseDropdown:  dropdown = " + dropdown + "   openOrClose = " + openOrClose);
                switch(dropdown){
                    /*case ("packets-menu-dd-lev-1"):
                        //console.log("this.packetsDropdownHidden = " + this.packetsDropdownHidden);
                        //console.log("openOrClose = " + openOrClose);
                        this.toggleDropdown(this.packetsDropdownEle, "packets-menu-dd-lev-1-hidden", openOrClose);
                        this.packetsDropdownHidden = !this.packetsDropdownHidden;
                        break;*/
                    case ("menu-dd-lev-1"):
				        console.log("in 'menu-dd-lev-1'");
                        this.toggleDropdown(this.trainingDropdownEle, "menu-dd-lev-1-hidden", openOrClose);
                        this.trainingDropdownHidden = !this.trainingDropdownHidden;
                        break;
                    case ("edu-nav-dropdown"):
				        console.log("in 'edu-nav-dropdown'");
                        this.toggleDropdown(this.eduNavDropdownEle, "hide-nav-dropdown", openOrClose);
                        this.introductionDropdownEle = !this.introductionDropdownEle;
                        break;
                    case ("introduction-dropdown"):
				        console.log("in training 'introduction-dropdown'");
                        this.toggleDropdown(this.introductionDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.introductionDropdownHidden = !this.introductionDropdownHidden;
                        break;
                    case ("architecture-dropdown"):
                        this.toggleDropdown(this.architectureDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.architectureDropdownHidden = !this.architectureDropdownHidden;
                        break;
                    case ("tech-dropdown"):
                        this.toggleDropdown(this.techDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.techDropdownHidden = !this.techDropdownHidden;
                        break;
                    case ("media-arts-dropdown"):
                        this.toggleDropdown(this.mediaArtsDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.mediaArtsDropdownHidden = !this.mediaArtsDropdownHidden;
                        break;
                    case ("codes-dropdown"):
				        console.log("in training 'codes-dropdown'");
                        this.toggleDropdown(this.codesDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.codesDropdownHidden = !this.codesDropdownHidden;
                        break;
                    case ("logic-gates-dropdown"):
                        this.toggleDropdown(this.logicGatesDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.logicGatesDropdownHidden = !this.logicGatesDropdownHidden;
                        break;

                    case ("test-menu-dd-lev-1"):
				        //console.log("in test-menu-dd-lev-1");
                        this.toggleDropdown(this.testingDropdownEle, "menu-dd-lev-1-hidden", openOrClose);
                        this.testingDropdownHidden = !this.testingDropdownHidden;
                        break;
                    case ("test-codes-dropdown"):
				        //console.log("in testing 'introduction-dropdown'");
                        this.toggleDropdown(this.testingCodesDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.testingCodesDropdownHidden = !this.testingCodesDropdownHidden;
                        break;
                    case ("test-logic-gates-dropdown"):
                        this.toggleDropdown(this.testinglogicGatesDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.testinglogicGatesDropdownHidden = !this.testinglogicGatesDropdownHidden;
                        break;
                    case ("test-tech-dropdown"):
                        this.toggleDropdown(this.testingTechDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.testingTechDropdownHidden = !this.testingTechDropdownHidden;
                        break;
                    case ("test-media-arts-dropdown"):
                        this.toggleDropdown(this.testingMediaArtsDropdownEle, "menu-dd-lev-2-hidden", openOrClose);
                        this.testingMediaArtsDropdownHidden = !this.testingMediaArtsDropdownHidden;
                        break;
                    default:(console.log("No Such Dropdown"));
                }
            },

            toggleDropdown: function(dropdownEle, hiddenClassName, openOrClose){
                console.log("in toggleDropdown:   dropdownHidden = " + hiddenClassName);
                console.log("hiddenClassName = " + hiddenClassName);
                if(openOrClose === "open"){
                    console.log("removing hidenClassName = " + hiddenClassName);
                    dropdownEle.classList.remove(hiddenClassName);
                }else{
                    console.log("adding hidenClassName = " + hiddenClassName);
                    dropdownEle.classList.add(hiddenClassName);
                }
            },

            init: function(){
                //console.log(" in EduNavManager.init()");
                this.eduNavLabelEle = document.getElementById('edu-nav-label-id');
                this.eduNavDropdownEle = document.getElementById("edu-nav-dropdown-id");
                /*this.trainingLabelEle = document.getElementById('training-menu-label-id');
                this.trainingDropdownEle = document.getElementById('training-menu-dd-id'); 
                this.introductionlabelEle = document.getElementById('training-menu-intro-label-id');
                this.introductionDropdownEle= document.getElementById('training-menu-intro-dd-id');
                this.codesLabelEle = document.getElementById('training-menu-codes-label-id');
                this.codesDropdownEle = document.getElementById('training-menu-codes-dd-id');
                this.logicGatesLabelEle = document.getElementById('training-menu-logic-gates-label-id');
                this.logicGatesDropdownEle = document.getElementById('training-menu-logic-gates-dd-id');
                this.architecturelabelEle = document.getElementById('training-menu-arch-label-id');
                this.architectureDropdownEle = document.getElementById('training-menu-arch-dd-id');
                this.techLabelEle = document.getElementById('training-menu-tech-label-id');
                this.techDropdownEle = document.getElementById('training-menu-tech-dd-id');
                this.mediaArtsLabelEle = document.getElementById('training-menu-media-arts-label-id');
                this.mediaArtsDropdownEle = document.getElementById('training-menu-media-arts-dd-id');
                this.testingLabelEle = document.getElementById('testing-menu-label-id');
                this.testingDropdownEle = document.getElementById('testing-menu-dd-id');
                this.packetsLabelEle = document.getElementById('packets-menu-label-id');
                this.packetsDropdownEle = document.getElementById("packets-menu-dd-id");*/
                /*this.testingCodesLabelEle = document.getElementById('testing-menu-codes-label-id');
                this.testingCodesDropdownEle = document.getElementById('testing-menu-codes-dd-id');
                this.testingLogicGatesLabelEle = document.getElementById('testing-menu-logic-gates-label-id');
                this.testingLogicGatesDropdownEle = document.getElementById('testing-menu-logic-gates-dd-id');
                this.testingTechLabelEle = document.getElementById('testing-menu-tech-label-id');
                this.testingTechDropdownEle = document.getElementById('testing-menu-tech-dd-id');
                this.testingMediaArtsLabelEle = document.getElementById('testing-menu-media-arts-label-id');
                this.testingMediaArtsDropdownEle = document.getElementById('testing-menu-media-arts-dd-id');*/
               // console.log("this.equipmentlabelEle.id = " + this.equipmentlabelEle.id);
                //console.log("this.equipmentDropdownEle.id = " + this.equipmentDropdownEle.id);
                //console.log("Ending EduNavManager.init()");
            }

    }