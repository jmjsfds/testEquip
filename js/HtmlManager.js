
   
        function showEduEle(){
            console.log("executing showEduEle()");
            HtmlManager.eduEle.innerHTML = HtmlManager.resultText;
            // const eduEleTimeSetId = setTimeout(HtmlManager.showEduEle,5000);
            //console.log("just before 'if(HtmlManager.requestedFile == 'html/MultiMeter.html'){ '");
            if(HtmlManager.requestedFile == "html/MultiMeter.html"){
                // console.log("after KnobSelectorManager.init() called");
                KnobSelectorManager.init();
                const multimeterHTML = document.getElementById("multimeter-html-id");
                //console.log("handling 'training' and 'exercises' css");
                if(HtmlManager.type == "training"){
                    // console.log("adding training CSS link");
                    HtmlManager.eduEle.append(HtmlManager.trainingLink);
            //console.log("right after appending 'HtmlManager.trainingLink' => adding 'hide-edu-contents");
            //HtmlManager.eduEle.classList.add("hide-edu-contents");
                    if(document.getElementById("exercises-css-link-id")){
                        //console.log("removing 'exercises-css-id'");
                        document.getElementById("exercises-css-id").remove();
                    }
                }
                if(HtmlManager.type == "exercises"){
                    //console.log("adding exercises CSS link");
                    HtmlManager.eduEle.append(HtmlManager.exercisesLink);
            //console.log("right after appending 'HtmlManager.exercisesLink' => adding 'hide-edu-contents");
            //HtmlManager.eduEle.classList.add("hide-edu-contents");
                    if(document.getElementById("training-css-link-id")){
                        //console.log("removing 'training-css-id'");
                        document.getElementById("training-css-id").remove();
                    }
                }
            }
            console.log("the new selection should be appearing");
            HtmlManager.eduEle.classList.remove("transition-hide");
            HtmlManager.eduEle.classList.add("transition-show");
            HtmlManager.eduEle.classList.remove("opacity-zero");
            HtmlManager.eduEle.classList.add("opacity-one");
        }
   
   let HtmlManager = {
        //Properties
        eduEle: {},
        type: "",
        resultText: "",

        trainingLink: {},
        exercisesLink: {},
        multimeterCover: {},
        requestedFile: "",
        initialized: false,
    
        //Methods

        request:    function(HTMLsourceFile, contentId, type){ // type: "training" or "exercises"
                        if (!this.initialized){this.init(contentId); this.initialized = true;};
                        if((this.requestedFile == HTMLsourceFile) && (this.type == type)){return}
                        this.type = type;
                        this.eduEle.classList.remove("transition-show");
                        this.eduEle.classList.add("transition-hide");
                        this.eduEle.classList.remove("opacity-one");
                        this.eduEle.classList.add("opacity-zero");
                        console.log("the present Multimeter selection should be fading out");
                        this.requestedFile = HTMLsourceFile;
                        this.load(contentId);
                        },

        load:   function(contentId) {
                    //console.log("in EduHtmlManager.load ");
                    fetch(this.requestedFile)
                        .then(result => {
                            if (result.ok) {
                                //console.log("result.ok");
                                return result.text();
                            }
                        })
                        .then(resultHTML => {
                            this.resultText = resultHTML;
                            console.log("going to setTimeout(showEduEle, 400);");
                            const showEduEleId = setTimeout(showEduEle, 300);
                            /*this.eduEle.innerHTML = resultHTML;
                           // const eduEleTimeSetId = setTimeout(this.showEduEle,5000);
                            //console.log("just before 'if(this.requestedFile == 'html/MultiMeter.html'){ '");
                            if(this.requestedFile == "html/MultiMeter.html"){
                               // console.log("after KnobSelectorManager.init() called");
                                KnobSelectorManager.init();
                                const multimeterHTML = document.getElementById("multimeter-html-id");
                                //console.log("handling 'training' and 'exercises' css");
                                if(this.type == "training"){
                                   // console.log("adding training CSS link");
                                    this.eduEle.append(this.trainingLink);
                            //console.log("right after appending 'this.trainingLink' => adding 'hide-edu-contents");
                            //this.eduEle.classList.add("hide-edu-contents");
                                    if(document.getElementById("exercises-css-link-id")){
                                        //console.log("removing 'exercises-css-id'");
                                        document.getElementById("exercises-css-id").remove();
                                    }
                                }
                                if(this.type == "exercises"){
                                    //console.log("adding exercises CSS link");
                                    this.eduEle.append(this.exercisesLink);
                            //console.log("right after appending 'this.exercisesLink' => adding 'hide-edu-contents");
                            //this.eduEle.classList.add("hide-edu-contents");
                                    if(document.getElementById("training-css-link-id")){
                                        //console.log("removing 'training-css-id'");
                                        document.getElementById("training-css-id").remove();
                                    }
                                }
                            }*/
                           // console.log("end of  ' if(this.requestedFile == 'html/MultiMeter.html'){ '  ");/
                            //console.log("adding 'hide-edu-contents again");
                           // this.eduEle.classList.remove("opacity-zero");
                            //this.eduEle.classList.add("opacity-one");
                            /*const showEduEleId = setTimeout(showEduEle, 2000);*/
                        })
        },

        init: function() {
            //console.log("starting HtmlManager.init()");
            //console.log("contentId = " + contentId);
            this.eduEle = document.getElementById("edu-contents-id");
           // console.log("list of this.eduEle classes = " + this.eduEle.classList);
            this.initialized = true
            this.multimeterCover = document.getElementById("multimeter-cover-id");
            //console.log("ending HtmlManager.init()");
            this.exercisesLink = document.createElement("link");
            this.exercisesLink.id = "exercises-css-link-id";
            this.exercisesLink.rel = "stylesheet";
            this.exercisesLink.type = "text/css";
            this.exercisesLink.href = "css/Education/Multimeter/ExercisesMultimeterCSS.css";
            
            this.trainingLink = document.createElement("link");
            this.trainingLink.id = "training-css-link-id";
            this.trainingLink.rel = "stylesheet";
            this.trainingLink.type = "text/css";
            this.trainingLink.href = "css/Education/Multimeter/TrainingMultimeterCSS.css";
        }
    }