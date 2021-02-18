var pricesArray = [];
var designCharacters;
var style;
var bodyRadio;
var bodyButtons;
var styleShading;
var styleShadingRadio;
var outfit;
var outfitOptions;

function updateDesignCharacters() {
    let content = "";
    let noCost = pricesArray.designing[0].no[0].dollarOrPercentage + pricesArray.designing[0].no[0].value;
    let yesCost = pricesArray.designing[0].yes[0].minValue;
    yesCost += " ~ " + pricesArray.designing[0].yes[0].maxValue + pricesArray.designing[0].yes[0].dollarOrPercentage;

    document.getElementById("noDesignRadioText").innerText = `No, we are not designing a character (${noCost})`;
    document.getElementById("yesDesignRadioText").innerText = `Yes, we are designing a new character (${yesCost})`;

    for (var i = 0; i < designCharacters.length; i++) {
        if (designCharacters[i].checked) {
            if (designCharacters[i].value == "no") {
                content = noCost;
            }
            else if (designCharacters[i].value == "yes") {
                content = yesCost;
            }
        }
    }

    if (content == "") {
        document.getElementById("designingCharIDValue").classList.add("d-none");
    } else {
        document.getElementById("designingCharIDValue").classList.remove("d-none");
        document.getElementById("designingCharIDValue").innerText = content;
    }
}

function enableBodyButton(i){
    bodyButtons[i].classList.remove("disabled");
    bodyButtons[i].classList.remove("disabledd");
}

function disableBodyButton(i){
    bodyButtons[i].classList.add("disabled");
    bodyButtons[i].classList.add("disabledd");
}

function showStyleShading(){
    styleShading.classList.remove("d-none");
    let content = "";
    let noCost = "";
    let yesCost = "";

    if (style.value == "doodle"){
        noCost = pricesArray.cheapshading[0].doodle[0].dollarOrPercentage + pricesArray.cheapshading[0].doodle[0].no;
        yesCost = pricesArray.cheapshading[0].doodle[0].dollarOrPercentage + pricesArray.cheapshading[0].doodle[0].yes;
    } 
    else if (style.value == "scribble"){
        noCost = pricesArray.cheapshading[0].scribble[0].dollarOrPercentage + pricesArray.cheapshading[0].scribble[0].no;
        yesCost = pricesArray.cheapshading[0].scribble[0].dollarOrPercentage + pricesArray.cheapshading[0].scribble[0].yes;
    }

    document.getElementById("noStyleShadingRadioText").innerText = `No aditional shading (${noCost})`;
    document.getElementById("yesStyleShadingRadioText").innerText = `Yes I would like aditinal shading (${yesCost})`;

    document.getElementById("styleShadingIDValue").classList.remove("d-none");

    for (var i = 0; i < styleShadingRadio.length; i++) {
        if (styleShadingRadio[i].checked) {
            if (styleShadingRadio[i].value == "no") {
                content = noCost;
            }
            else if (styleShadingRadio[i].value == "yes") {
                content = yesCost;
            }
        }
    }

    if (content == "") {
        document.getElementById("styleShadingIDValue").classList.add("d-none");
    } else {
        document.getElementById("styleShadingIDValue").classList.remove("d-none");
        document.getElementById("styleShadingIDValue").innerText = content;
    }
}

function hideStyleShading(){
    styleShading.classList.add("d-none");
    document.getElementById("styleShadingIDValue").classList.add("d-none");
}

function updateStyle() {
    bodyButtons = document.getElementsByName("buttonBody");
    let portraitText = document.getElementById("portraitText");
    let halfbodyText = document.getElementById("halfbodyText");
    let thighsupText = document.getElementById("thigh-upText");
    let fullbodyText = document.getElementById("fullbodyText");
    let otherText = document.getElementById("otherText");
    styleShading = document.getElementById("styleShadingID");

    for (let i=0;i<bodyButtons.length;i++){
        bodyButtons[i].classList.remove("active");
        bodyRadio[i].checked = false;
    }

    updateBody();

    if (style.value == "choose") {
        hideStyleShading();
        portraitText.innerHTML = `Portrait`;
        disableBodyButton(0);
        halfbodyText.innerHTML = `Halfbody`;
        disableBodyButton(1);
        thighsupText.innerHTML = `Thigh-up`;
        disableBodyButton(2);
        fullbodyText.innerHTML = `Full body`;
        disableBodyButton(3);
        otherText.innerHTML = `Other`;
        disableBodyButton(4);
    }
    else if (style.value == "cleanColors") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].cleanColors[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].portrait[0].cleanColors[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].cleanColors[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].cleanColors[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].cleanColors[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].thighs[0].cleanColors[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].cleanColors[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].full[0].cleanColors[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].cleanColors[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].other[0].cleanColors[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "hybrid") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].hybrid[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].portrait[0].hybrid[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].hybrid[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].hybrid[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].hybrid[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].thighs[0].hybrid[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].hybrid[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].full[0].hybrid[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].hybrid[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].other[0].hybrid[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "coloredSketch") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].coloredSketch[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].portrait[0].coloredSketch[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].coloredSketch[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].coloredSketch[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].coloredSketch[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].thighs[0].coloredSketch[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].coloredSketch[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].full[0].coloredSketch[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].coloredSketch[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].other[0].coloredSketch[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "emote") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].emote[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].emote[0].dollarOrPercentage + pricesArray.body[0].portrait[0].emote[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].emote[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].emote[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].emote[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].emote[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].emote[0].dollarOrPercentage + pricesArray.body[0].thighs[0].emote[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].emote[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].emote[0].dollarOrPercentage + pricesArray.body[0].full[0].emote[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].emote[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].emote[0].dollarOrPercentage + pricesArray.body[0].other[0].emote[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "sketch") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].sketch[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].sketch[0].dollarOrPercentage + pricesArray.body[0].portrait[0].sketch[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].sketch[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].sketch[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].sketch[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].sketch[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].sketch[0].dollarOrPercentage + pricesArray.body[0].thighs[0].sketch[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].sketch[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].sketch[0].dollarOrPercentage + pricesArray.body[0].full[0].sketch[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].sketch[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].sketch[0].dollarOrPercentage + pricesArray.body[0].other[0].sketch[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "doodle") {
        showStyleShading();
        if (pricesArray.body[0].portrait[0].doodle[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].doodle[0].dollarOrPercentage + pricesArray.body[0].portrait[0].doodle[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].doodle[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].doodle[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].doodle[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].doodle[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].doodle[0].dollarOrPercentage + pricesArray.body[0].thighs[0].doodle[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].doodle[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].doodle[0].dollarOrPercentage + pricesArray.body[0].full[0].doodle[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].doodle[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].doodle[0].dollarOrPercentage + pricesArray.body[0].other[0].doodle[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "scribble") {
        showStyleShading();
        if (pricesArray.body[0].portrait[0].scribble[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].scribble[0].dollarOrPercentage + pricesArray.body[0].portrait[0].scribble[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].scribble[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].scribble[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].scribble[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].scribble[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].scribble[0].dollarOrPercentage + pricesArray.body[0].thighs[0].scribble[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].scribble[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].scribble[0].dollarOrPercentage + pricesArray.body[0].full[0].scribble[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].scribble[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].scribble[0].dollarOrPercentage + pricesArray.body[0].other[0].scribble[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "logo") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].logo[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].logo[0].dollarOrPercentage + pricesArray.body[0].portrait[0].logo[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].logo[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].logo[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].logo[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].logo[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].logo[0].dollarOrPercentage + pricesArray.body[0].thighs[0].logo[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].logo[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].logo[0].dollarOrPercentage + pricesArray.body[0].full[0].logo[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].logo[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].logo[0].dollarOrPercentage + pricesArray.body[0].other[0].logo[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    } 
    
    else if (style.value == "other") {
        hideStyleShading();
        if (pricesArray.body[0].portrait[0].other[0].isItPossible) {
            portraitText.innerHTML = `Portrait<br>${pricesArray.body[0].portrait[0].other[0].dollarOrPercentage + pricesArray.body[0].portrait[0].other[0].value}`;
            enableBodyButton(0);
        } else {
            portraitText.innerHTML = `Portrait`;
            disableBodyButton(0);
        }

        if (pricesArray.body[0].halfbody[0].other[0].isItPossible) {
            halfbodyText.innerHTML = `Halfbody<br>${pricesArray.body[0].halfbody[0].other[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].other[0].value}`;
            enableBodyButton(1);
        } else {
            halfbodyText.innerHTML = `Halfbody`;
            disableBodyButton(1);
        }

        if (pricesArray.body[0].thighs[0].other[0].isItPossible) {
            thighsupText.innerHTML = `Thigh-up<br>${pricesArray.body[0].thighs[0].other[0].dollarOrPercentage + pricesArray.body[0].thighs[0].other[0].value}`;
            enableBodyButton(2);
        } else {
            thighsupText.innerHTML = `Thigh-up`;
            disableBodyButton(2);
        }

        if (pricesArray.body[0].full[0].other[0].isItPossible) {
            fullbodyText.innerHTML = `Full body<br>${pricesArray.body[0].full[0].other[0].dollarOrPercentage + pricesArray.body[0].full[0].other[0].value}`;
            enableBodyButton(3);
        } else {
            fullbodyText.innerHTML = `Full body`;
            disableBodyButton(3);
        }

        if (pricesArray.body[0].other[0].other[0].isItPossible) {
            otherText.innerHTML = `Other<br>${pricesArray.body[0].other[0].other[0].dollarOrPercentage + pricesArray.body[0].other[0].other[0].value}`;
            enableBodyButton(4);
        } else {
            otherText.innerHTML = `Other`;
            disableBodyButton(4);
        }
    }
}

function updateBody() {
    let bodyContent = "";

    for (var i = 0; i < bodyRadio.length; i++) {
        if (bodyRadio[i].checked) {
            if (bodyRadio[i].value == "portrait") {
                if (style.value == "cleanColors") {
                    if (pricesArray.body[0].portrait[0].cleanColors[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].portrait[0].cleanColors[0].value;
                    }
                } else if (style.value == "hybrid") {
                    if (pricesArray.body[0].portrait[0].hybrid[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].portrait[0].hybrid[0].value;
                    }
                } else if (style.value == "coloredSketch") {
                    if (pricesArray.body[0].portrait[0].coloredSketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].portrait[0].coloredSketch[0].value;
                    }
                } else if (style.value == "emote") {
                    if (pricesArray.body[0].portrait[0].emote[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].emote[0].dollarOrPercentage + pricesArray.body[0].portrait[0].emote[0].value;
                    }
                } else if (style.value == "sketch") {
                    if (pricesArray.body[0].portrait[0].sketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].sketch[0].dollarOrPercentage + pricesArray.body[0].portrait[0].sketch[0].value;
                    }
                } else if (style.value == "doodle") {
                    if (pricesArray.body[0].portrait[0].doodle[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].doodle[0].dollarOrPercentage + pricesArray.body[0].portrait[0].doodle[0].value;
                    }
                } else if (style.value == "scribble") {
                    if (pricesArray.body[0].portrait[0].scribble[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].scribble[0].dollarOrPercentage + pricesArray.body[0].portrait[0].scribble[0].value;
                    }
                } else if (style.value == "logo") {
                    if (pricesArray.body[0].portrait[0].logo[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].logo[0].dollarOrPercentage + pricesArray.body[0].portrait[0].logo[0].value;
                    }
                } else if (style.value == "other") {
                    if (pricesArray.body[0].portrait[0].other[0].isItPossible){
                        bodyContent = pricesArray.body[0].portrait[0].other[0].dollarOrPercentage + pricesArray.body[0].portrait[0].other[0].value;
                    }
                }
            }
            else if (bodyRadio[i].value == "halfbody") {
                if (style.value == "cleanColors") {
                    if (pricesArray.body[0].halfbody[0].cleanColors[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].cleanColors[0].value;
                    }
                } else if (style.value == "hybrid") {
                    if (pricesArray.body[0].halfbody[0].hybrid[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].hybrid[0].value;
                    }
                } else if (style.value == "coloredSketch") {
                    if (pricesArray.body[0].halfbody[0].coloredSketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].coloredSketch[0].value;
                    }
                } else if (style.value == "emote") {
                    if (pricesArray.body[0].halfbody[0].emote[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].emote[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].emote[0].value;
                    }
                } else if (style.value == "sketch") {
                    if (pricesArray.body[0].halfbody[0].sketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].sketch[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].sketch[0].value;
                    }
                } else if (style.value == "doodle") {
                    if (pricesArray.body[0].halfbody[0].doodle[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].doodle[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].doodle[0].value;
                    }
                } else if (style.value == "scribble") {
                    if (pricesArray.body[0].halfbody[0].scribble[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].scribble[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].scribble[0].value;
                    }
                } else if (style.value == "logo") {
                    if (pricesArray.body[0].halfbody[0].logo[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].logo[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].logo[0].value;
                    }
                } else if (style.value == "other") {
                    if (pricesArray.body[0].halfbody[0].other[0].isItPossible){
                        bodyContent = pricesArray.body[0].halfbody[0].other[0].dollarOrPercentage + pricesArray.body[0].halfbody[0].other[0].value;
                    }
                }
            }
            else if (bodyRadio[i].value == "thighs") {
                if (style.value == "cleanColors") {
                    if (pricesArray.body[0].thighs[0].cleanColors[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].thighs[0].cleanColors[0].value;
                    }
                } else if (style.value == "hybrid") {
                    if (pricesArray.body[0].thighs[0].hybrid[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].thighs[0].hybrid[0].value;
                    }
                } else if (style.value == "coloredSketch") {
                    if (pricesArray.body[0].thighs[0].coloredSketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].thighs[0].coloredSketch[0].value;
                    }
                } else if (style.value == "emote") {
                    if (pricesArray.body[0].thighs[0].emote[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].emote[0].dollarOrPercentage + pricesArray.body[0].thighs[0].emote[0].value;
                    }
                } else if (style.value == "sketch") {
                    if (pricesArray.body[0].thighs[0].sketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].sketch[0].dollarOrPercentage + pricesArray.body[0].thighs[0].sketch[0].value;
                    }
                } else if (style.value == "doodle") {
                    if (pricesArray.body[0].thighs[0].doodle[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].doodle[0].dollarOrPercentage + pricesArray.body[0].thighs[0].doodle[0].value;
                    }
                } else if (style.value == "scribble") {
                    if (pricesArray.body[0].thighs[0].scribble[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].scribble[0].dollarOrPercentage + pricesArray.body[0].thighs[0].scribble[0].value;
                    }
                } else if (style.value == "logo") {
                    if (pricesArray.body[0].thighs[0].logo[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].logo[0].dollarOrPercentage + pricesArray.body[0].thighs[0].logo[0].value;
                    }
                } else if (style.value == "other") {
                    if (pricesArray.body[0].thighs[0].other[0].isItPossible){
                        bodyContent = pricesArray.body[0].thighs[0].other[0].dollarOrPercentage + pricesArray.body[0].thighs[0].other[0].value;
                    }
                }
            }
            else if (bodyRadio[i].value == "fullbody") {
                if (style.value == "cleanColors") {
                    if (pricesArray.body[0].full[0].cleanColors[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].full[0].cleanColors[0].value;
                    }
                } else if (style.value == "hybrid") {
                    if (pricesArray.body[0].full[0].hybrid[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].full[0].hybrid[0].value;
                    }
                } else if (style.value == "coloredSketch") {
                    if (pricesArray.body[0].full[0].coloredSketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].full[0].coloredSketch[0].value;
                    }
                } else if (style.value == "emote") {
                    if (pricesArray.body[0].full[0].emote[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].emote[0].dollarOrPercentage + pricesArray.body[0].full[0].emote[0].value;
                    }
                } else if (style.value == "sketch") {
                    if (pricesArray.body[0].full[0].sketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].sketch[0].dollarOrPercentage + pricesArray.body[0].full[0].sketch[0].value;
                    }
                } else if (style.value == "doodle") {
                    if (pricesArray.body[0].full[0].doodle[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].doodle[0].dollarOrPercentage + pricesArray.body[0].full[0].doodle[0].value;
                    }
                } else if (style.value == "scribble") {
                    if (pricesArray.body[0].full[0].scribble[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].scribble[0].dollarOrPercentage + pricesArray.body[0].full[0].scribble[0].value;
                    }
                } else if (style.value == "logo") {
                    if (pricesArray.body[0].full[0].logo[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].logo[0].dollarOrPercentage + pricesArray.body[0].full[0].logo[0].value;
                    }
                } else if (style.value == "other") {
                    if (pricesArray.body[0].full[0].other[0].isItPossible){
                        bodyContent = pricesArray.body[0].full[0].other[0].dollarOrPercentage + pricesArray.body[0].full[0].other[0].value;
                    }
                }
            }
            else if (bodyRadio[i].value == "other") {
                if (style.value == "cleanColors") {
                    if (pricesArray.body[0].other[0].cleanColors[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].cleanColors[0].dollarOrPercentage + pricesArray.body[0].other[0].cleanColors[0].value;
                    }
                } else if (style.value == "hybrid") {
                    if (pricesArray.body[0].other[0].hybrid[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].hybrid[0].dollarOrPercentage + pricesArray.body[0].other[0].hybrid[0].value;
                    }
                } else if (style.value == "coloredSketch") {
                    if (pricesArray.body[0].other[0].coloredSketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].coloredSketch[0].dollarOrPercentage + pricesArray.body[0].other[0].coloredSketch[0].value;
                    }
                } else if (style.value == "emote") {
                    if (pricesArray.body[0].other[0].emote[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].emote[0].dollarOrPercentage + pricesArray.body[0].other[0].emote[0].value;
                    }
                } else if (style.value == "sketch") {
                    if (pricesArray.body[0].other[0].sketch[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].sketch[0].dollarOrPercentage + pricesArray.body[0].other[0].sketch[0].value;
                    }
                } else if (style.value == "doodle") {
                    if (pricesArray.body[0].other[0].doodle[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].doodle[0].dollarOrPercentage + pricesArray.body[0].other[0].doodle[0].value;
                    }
                } else if (style.value == "scribble") {
                    if (pricesArray.body[0].other[0].scribble[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].scribble[0].dollarOrPercentage + pricesArray.body[0].other[0].scribble[0].value;
                    }
                } else if (style.value == "logo") {
                    if (pricesArray.body[0].other[0].logo[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].logo[0].dollarOrPercentage + pricesArray.body[0].other[0].logo[0].value;
                    }
                } else if (style.value == "other") {
                    if (pricesArray.body[0].other[0].other[0].isItPossible){
                        bodyContent = pricesArray.body[0].other[0].other[0].dollarOrPercentage + pricesArray.body[0].other[0].other[0].value;
                    }
                }
            }
        }
    }

    if (bodyContent == "") {
        document.getElementById("bodyIDValue").classList.add("d-none");
    } else {
        document.getElementById("bodyIDValue").classList.remove("d-none");
        document.getElementById("bodyIDValue").innerText = bodyContent;
    }
}

function updateOutfit(){
    var content = "";

    for (var i=0;i<outfitOptions.length;i++){
        if (i == 0){
            outfitOptions[i].innerText = "Very simple (T-shirt + pants) +" + (pricesArray.outfit[0].verySimple[0].value - 100) + pricesArray.outfit[0].verySimple[0].dollarOrPercentage;
        } else if (i == 1){
            outfitOptions[i].innerText = "Simple +~" + (pricesArray.outfit[0].simple[0].value - 100) + pricesArray.outfit[0].simple[0].dollarOrPercentage;
        } else if (i == 2){
            outfitOptions[i].innerText = "Average +~" + (pricesArray.outfit[0].average[0].value - 100) + pricesArray.outfit[0].average[0].dollarOrPercentage;
        } else if (i == 3){
            outfitOptions[i].innerText = "Somewhat complex +~" + (pricesArray.outfit[0].somewhatComplex[0].value - 100) + pricesArray.outfit[0].somewhatComplex[0].dollarOrPercentage;
        } else if (i == 4){
            outfitOptions[i].innerText = "Layered clothing +~" + (pricesArray.outfit[0].layeredClothing[0].value - 100) + pricesArray.outfit[0].layeredClothing[0].dollarOrPercentage;
        } else if (i == 5){
            outfitOptions[i].innerText = "Very complex (Semi-transparent, lace, embroidered, etc.) +~" + (pricesArray.outfit[0].veryComplex[0].value - 100) + pricesArray.outfit[0].veryComplex[0].dollarOrPercentage;
        }
    }

    if (outfit.value == "choose"){

    } else if (outfit.value == "verysimple"){
        content = (pricesArray.outfit[0].verySimple[0].value - 100) + pricesArray.outfit[0].verySimple[0].dollarOrPercentage;
    } else if (outfit.value == "simple"){
        content = (pricesArray.outfit[0].simple[0].value - 100) + pricesArray.outfit[0].simple[0].dollarOrPercentage;
    } else if (outfit.value == "average"){
        content = (pricesArray.outfit[0].average[0].value - 100) + pricesArray.outfit[0].average[0].dollarOrPercentage;
    } else if (outfit.value == "somewhatcomplex"){
        content = (pricesArray.outfit[0].somewhatComplex[0].value - 100) + pricesArray.outfit[0].somewhatComplex[0].dollarOrPercentage;
    } else if (outfit.value == "layeredclothing"){
        content = (pricesArray.outfit[0].layeredClothing[0].value - 100) + pricesArray.outfit[0].layeredClothing[0].dollarOrPercentage;
    } else if (outfit.value == "verycomplex"){
        content = (pricesArray.outfit[0].veryComplex[0].value - 100) + pricesArray.outfit[0].veryComplex[0].dollarOrPercentage;
    }

    if (content == "") {
        document.getElementById("outfitIDValue").classList.add("d-none");
    } else {
        document.getElementById("outfitIDValue").classList.remove("d-none");
        document.getElementById("outfitIDValue").innerText = content;
    }
}

function updateAmountCharacters(){

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRICES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            pricesArray = resultObj.data;

            designCharacters = document.getElementsByName("designCharacterRadio");
            updateDesignCharacters();
            style = document.getElementById("inputStyle");
            bodyRadio = document.getElementsByName("amountBody");
            styleShadingRadio = document.getElementsByName("styleShadingRadio");
            updateStyle();
            updateBody();
            outfit = document.getElementById("inputOutfit");
            outfitOptions = document.getElementsByName("outfitOptions");
            updateOutfit();
            
            updateAmountCharacters();
        }
    });
});