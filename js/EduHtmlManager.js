
    let EduHtmlManager = {
        //Properties
        ceoEle: {},
        eduEle: {},
        icDataEle: {},
        type: {},
        requestedFile: "",
        initialized: false,
        //JsonTableData74173: {},
    
        //Methods
        request:    function(HTMLsourceFile, contentId, type){ // type: "training" or "exercises"
                        this.type = type;
                        //console.log("requested contentId = " + contentId);
                        //console.log("HTMLsourceFile = " + HTMLsourceFile);
                        if (!this.initialized){this.init(contentId); this.initialized = true;};
                            //console.log("in EduHtmlManager.request() HTMLsourceFile =  " + HTMLsourceFile);
                            //alert("in request HTMLsourceFile =  " + HTMLsourceFile);
                            //console.log("contentId = " + contentId);
                            //TrainingNavEventHandler.closeDropDown("training"); needs updating
                            //EduNavManager("training");
                            this.requestedFile = HTMLsourceFile;
                            //console.log("this.requestedFile = " + this.requestedFile);
                            this.load(contentId);
                        },

        load:   function(contentId) {
                    //console.log("in EduHtmlManager.load ");
                    fetch(this.requestedFile)
                        .then(result => {
                            if (result.ok) {
                                return result.text();
                            }
                        })
                        .then(resultHTML => {
                            //console.log("contentId.slice(0,3) = " + contentId.slice(0,3));
                            //this.contentsEle.innerHTML = resultHTML;
                            //console.log("scrolling Into View");
                            /*document.getElementById(contentId).scrollIntoView({block: 'start'});*/
                            if(contentId.slice(0,3) == "ceo"){
                                this.ceoEle.innerHTML = resultHTML;
                                //console.log("this.contentsEle.style.zIndex = " + this.contentsEle.style.zIndex);
                                //console.log("sending to this.ceoShow()");
                                this.ceoShow();
                            }else{
                                this.eduEle.innerHTML = resultHTML;
                            }
                            //console.log("this.requestedFile = " + resultHTML);
                            //console.log("this.requestedFile.slice(0,24) = " + this.requestedFile.slice(0,24));
                            if(this.requestedFile.slice(0,24) == "html/Education/Training/"){
                            // //console.log("reset page to top of page");
            // Temperly disabled                    document.getElementById(contentId).scrollIntoView({block: 'start'});
                                //PracticeTruthTableManager.initialize();
                                //PracticeTruthTableManager.create("circuit","NotXor");
                            }
                            if(this.requestedFile == "html/Education/Training/TestEquipment/MultiMeter.html"){
                                console.log("calling KnowSelectorManager.init()");
                                KnobSelectorManager.init();
                               // console.log("after KnobSelectorManager.init() called");
                                //const multimeterHTML = document.getElementById("multimeter-html-id");
                                if(this.type == "training"){
                                    const link = document.createElement("link");
                                    link.id = "training-css-link-id";
                                    link.rel = "stylesheet";
                                    link.type = "text/css";
                                    link.href = "css/Education/Multimeter/TrainingMultimeterCSS.css";
                                    /*this.eduEle.setAttribute("display", 'block');*/
                                    this.eduEle.append(link);
                                    if(document.getElementById("exercises-css-link-id")){
                                        console.log("removing 'exercises-css-id'");
                                        document.getElementById("exercises-css-id").remove();
                                    }
                                }
                                if(this.type == "exercises"){
                                    const link = document.createElement("link");
                                    link.id = "exercises-css-link-id";
                                    link.rel = "stylesheet";
                                    link.type = "text/css";
                                    link.href = "css/Education/Multimeter/ExercisesMultimeterCSS.css";
                                    this.eduEle.setAttribute("display", "none");
                                    this.eduEle.append(link);
                                    if(document.getElementById("training-css-link-id")){
                                        console.log("removing 'training-css-id'");
                                        document.getElementById("training-css-id").remove();
                                    }
                                }
                               // console.log("displaying this.eduEle");
                                this.eduEle.setAttribute("display", "block");
                                /*console.log("in this.requestedFile == html/Education/Training/TestEquipment/MultiMeterTraining.html");
                                EduHtmlManager.request("html/Education/Training/TestEquipment/MultiMeter.html", "training-multimeter-container-id" );
                                const multimeterHtml = document.getElementById("multimeter-html-id");
                                console.log("after const multimerteHtml = document.get   ");
                                const link = document.createElement("link");
                                link.rel = "stylesheet";
                                link.type = "text/css";
                                link.href = "css/Education/Training/TrainingMultimeterCSS.css";
                                multimeterHtml.head.appendChild(link);
                                //document.getElementsByTagName('head').appendChild(link);
                                //multimeterHead.appendChild(link);
                                //console.log("after multimeterHead.appendChild(link)");
                                //KnobSelectorManager.addLink("training");
                                console.log("Going to MultiMeterManager.init()");
                                ScreenManager.init();
                                ButtonManager.init();
                                KnobSelectorManager.init();*/
                            }
                        /* if(this.requestedFile == "html/Education/Training/TestEquipment/MultiMeterExercises.html"){
                                console.log("in this.requestedFile == html/Education/Training/TestEquipment/MultiMeterExercises.html");
                                EduHtmlManager.request("html/Education/Training/TestEquipment/MultiMeter.html", "training-multimeter-container-id" );
                            }
                            if(this.requestedFile == "html/Education/Training/TestEquipment/MultiMeter.html"){
                                console.log("in this.requestedFile == html/Education/Training/TestEquipment/MultiMeterExercises.html");
                                EduHtmlManager.request("html/Education/Training/TestEquipment/MultiMeter.html", "training-multimeter-container-id" );
                            }*/
                            if (this.requestedFile ==  "html/Education/Training/Codes/ASCII.html") {
                               // console.log("in this.requestedFile = html/Education/Training/Codes/ASCII.html");
                                TableGenerator.createTable('ascii-table-id',JsonTableDataASCII);
                            }
                            if(this.requestedFile == "html/Education/Exercises/LogicGatesICs/GatesPractice.html"){
                               // console.log("in this.requestedFile = html/Education/Training/Introduction/GatesIcs.html");
                                TableGenerator.createTable('basic-practice-table-id',JsonTableDataPractice74LS08);
                                TableGenerator.createTable('circuit-practice-table-id',JsonTableDataPracticeNotXor);
                            }
                            if(this.requestedFile == "html/Education/Training/TruthTables/TruthTables.html"){ // contentId == "truth-table-contents-id"
                               // console.log("in html/Education/Training/TruthTables/TruthTables.html");
                                TableGenerator.createTable("morse-1-bit-word-id",JsonTableDataMorseCodeOneBit);
                                TableGenerator.createTable("morse-2-bit-word-id",JsonTableDataMorseCodeTwoBit);
                                TableGenerator.createTable("morse-3-bit-word-id",JsonTableDataMorseCodeThreeBit);
                                TableGenerator.createTable("morse-4-bit-word-id",JsonTableDataMorseCodeFourBit);
                            }
                            //console.log("before if(this.requestedFile == 'html//LS00 ");
                        //if(this.requestedFile == "html/Education/Resources/Data_Sheets/LS00_Data_Sheet.html"){
                            //console.log("this.requestedFile = " + resultHTML);
                            //console.log("this.requestedFile.slice(0,25) = " + this.requestedFile.slice(0,25));
                            if(this.requestedFile.slice(0,25) == ("html/Education/IC_Data/LS") ){
                               // console.log("in JsonTableData selection switch");
                               // console.log("this.requestedFile.slice(23, this.requestedFile.length - 5) = " + this.requestedFile.slice(23, this.requestedFile.length - 5));
                                let JsonTableData = {};
                                let tableId = "";
                                // find the 4th occurrence of '/'
                                //var requestedString = this.nthOccurrence(this.requestedFile, "/", 4);
                                //console.log("requested String = " + requestedString);
                                //console.log("this.requestedFile.slice(23, this.requestedFile.length -5): " + this.requestedFile.slice(23, this.requestedFile.length -5));
                                let requestedDataSheet = this.requestedFile.slice(23, this.requestedFile.length - 5);
                                //console.log("this.requestedFile.slice(23, this.requestedFile.length - 5) =  " + this.requestedFile.slice(23, this.requestedFile.length - 5));
                                switch(requestedDataSheet){
                                    case "LS00_Data_Sheet":
                                       // console.log("in LS00_Data_Sheet");
                                        JsonTableData = JsonTableData74LS00;
                                        tableId = "id-table-7400";
                                    break;
                                    case "LS02_Data_Sheet":
                                    //  //console.log("in LS02_Data_Sheet");
                                        JsonTableData = JsonTableData74LS02;
                                        tableId = "id-table-7402";
                                    break;
                                    case "LS04_Data_Sheet":
                                    //  //console.log("in LS04_Data_Sheet");
                                        JsonTableData = JsonTableData74LS04;
                                        tableId = "id-table-7404";
                                    break;
                                    case "LS08_Data_Sheet":
                                    // //console.log("in LS08_Data_Sheet");
                                        JsonTableData = JsonTableData74LS08;
                                        tableId = "id-table-7408";
                                    break;
                                    case "LS32_Data_Sheet":
                                    // //console.log("in LS32_Data_Sheet");
                                        JsonTableData = JsonTableData74LS32;
                                        tableId = "id-table-7432";
                                    break;
                                    case "LS86_Data_Sheet":
                                        //console.log("in LS86_Data_Sheet");
                                        JsonTableData = JsonTableData74LS86;
                                        tableId = "id-table-7486";
                                    break;
                                    case "LS107_Data_Sheet":
                                        JsonTableData = JsonTableData74LS107;
                                        tableId = "id-table-74107";
                                    break;
                                    case "LS138_Data_Sheet":
                                        JsonTableData = JsonTableData74LS138;
                                        tableId = "id-table-74138";
                                    break;
                                    case "LS139_Data_Sheet":
                                        //console.log("in LS139_Data_Sheet");
                                        JsonTableData = JsonTableData74LS139;
                                        tableId = "id-table-74139";
                                    break;
                                    case "LS157_Data_Sheet":
                                        //console.log("in LS157_Data_Sheet");
                                        JsonTableData = JsonTableData74LS157;
                                        tableId = "id-table-74157";
                                    break;
                                    case "LS161_Data_Sheet":
                                        JsonTableData = JsonTableData74LS161;
                                        tableId = "id-table-74161";
                                    break;
                                    case "LS173_Data_Sheet":
                                    // //console.log("in LS173_Data_Sheet");
                                        JsonTableData = JsonTableData74LS173;
                                    // //console.log("after JsonTableData = JsonTableData74LS173;");
                                        tableId = "id-table-74173";
                                    break;
                                    case "LS189_Data_Sheet":
                                        JsonTableData = JsonTableData74LS189;
                                        tableId = "id-table-74189";
                                    break;
                                    case "LS245_Data_Sheet":
                                        JsonTableData = JsonTableData74LS245;
                                        tableId = "id-table-74245";
                                    break;
                                    case "LS273_Data_Sheet":
                                        JsonTableData = JsonTableData74LS273;
                                        tableId = "id-table-74273";
                                    break;
                                    case "LS283_Data_Sheet":
                                        //console.log("in LS283_Data_Sheet");
                                        JsonTableData = JsonTableData74LS283;
                                        //console.log("after JsonTableData = JsonTableData74LS283;");
                                        tableId = "id-table-74283";
                                    break;
                                    default: console.log("No Such JsonTableData");
                                }
                            TableGenerator.createTable(tableId, JsonTableData);
                            }
                        //console.log("Closing Packets DropDown");
                        //EduNavManager.openCloseDropdown('packets-menu-dd-lev-1', 'close');
                        })
        },

       /* nthOccurrence: function(string, char, nth){
            var first_index = string.indexOf(char);
            var length_up_to_first_index = first_index + 1;

            if(nth == 1) {
                return first_index;
            }else{
                string_after_first_occurrence = string.slice(length_up_to_first_index, char, nth - 1);
                var next_occurrence = this.nthOccurrence(string_after_first_occurrence, char, nth - 1);
                if(next_occurrence === -1){
                    return -1;
                }else{
                    return length_up_to_first_index + next_occurrence;
                }
            }
        },*/

        show: function() { 
         //alert("in EduHTML_Manager this.show()");
           // this.load();
            this.targetEle.classList.replace("transition-1-0","transition-0-1")
            this.targetEle.style.opacity = "1";
        },

        close: function(){
           // alert("in EduHTML_Manager this.close");
            this.icDataEle.style.opacity = 0;
            this.icDataEle.style.display = "none";
        },

        ceoShow: function(){ 
            //console.log("In ceoShow()");
            this.ceoEle.classList.replace("hide-ceo-contents", "show-ceo-contents");
            this.ceoEle.style.zIndex = 10;
            //console.log("leaving ceoShow()");
        },

        ceoHide: function(){ 
            //console.log("In ceoHide()");
            this.ceoEle.classList.replace("show-ceo-contents", "hide-ceo-contents");
            this.ceoEle.style.zIndex = -10;
            //console.log("leaving ceoHide()");
        },

        ceoFinishTransition: function() {
            //console.log("in ceoFinishTransition");
            //console.log("this.contentsEle.style.opacity =  " + this.contentsEle.style.opacity);
           /* if (this.ceoEle.style.zIndex == 10) {
                this.ceoEle.style.zIndex = -10;
            }else{
                this.ceoEle.style.zIndex = 10;
            }*/
        },

        init: function() {
        //console.log("in EduHtmlManager.init()");
        //console.log("contentId = " + contentId);
         //alert("this.eduNavOneContentsEle.classList = " + this.eduNavOneContentsEle.classList);
            /*if(contentId.slice(0,3) == "ceo"){*/
            this.ceoEle = document.getElementById("ceo-contents-id");
                /*this.ceoEle.addEventListener("transitionend", this.ceoFinishTransition, false);
            }else{*/
            this.eduEle = document.getElementById("edu-contents-id");
            this.icDataEle = document.getElementById("ic-data-contents-id");
           /* } */
        // alert("this.eduContentsEle.classList = " + this.eduContentsEle.classList);
          //  this.eduContentsEle.addEventListener("transitionend", this.show().bind, false);
            //this.contentsEle.style.opacity = 1;   /*eduTransitionHasEnded*/
       // alert("after this.eduContentsEle");
        //console.log("end of EduHtmlManager.init()");
        }
    }
/* END CeoHTML_Manager */	