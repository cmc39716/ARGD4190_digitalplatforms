console.log("SCRIPT IS WORKING"); 

let posterText = document.getElementById("poster-text");
let posterPhoto = document.getElementById("poster-photo");
let posterShape = document.getElementById("poster-shape");


// TEXT CONTROLS

let textInput = document.getElementById("text-input");
let textSize = document.getElementById("text-size");
let textX = document.getElementById("text-x");
let textY = document.getElementById("text-y");
let textSkew = document.getElementById("text-skew");
let textColor = document.getElementById("text-color");


// PHOTO CONTROLS

let photoScale = document.getElementById("photo-scale");
let photoX = document.getElementById("photo-x");
let photoY = document.getElementById("photo-y");
let photoSkew = document.getElementById("photo-skew");


// SHAPE CONTROLS

let shapeSize = document.getElementById("shape-size");
let shapeX = document.getElementById("shape-x");
let shapeY = document.getElementById("shape-y");
let shapeColor = document.getElementById("shape-color");



// -----------------------------------
// REUSABLE FUNCTIONS
// -----------------------------------


// Change text

function updateText(element, input) {

    element.textContent = input.value;

}


// Change color

function updateColor(element, input) {

    element.style.color = input.value;

}


// Change background color

function updateBackground(element, input) {

    element.style.backgroundColor = input.value;

}


// Change font size

function updateSize(element, input) {

    element.style.fontSize = input.value + "px";

}


// Position an element

function updatePosition(element, xInput, yInput) {

    let x = xInput.value;
    let y = yInput.value;

    element.style.translate =
        x + "px " + y + "px";

}


// Transform text

function updateTextTransform(element, xInput, yInput, skewInput) {

    let x = xInput.value;
    let y = yInput.value;
    let skew = skewInput.value;

    element.style.transform =
        "translate(" + x + "px, " + y + "px)" +
        " skew(" + skew + "deg)";

}


// Transform photo

function updatePhotoTransform(
    element,
    xInput,
    yInput,
    scaleInput,
    skewInput
) {

    let x = xInput.value;
    let y = yInput.value;

    let scale =
        scaleInput.value / 100;

    let skew =
        skewInput.value;

    element.style.transform =
        "translate(" + x + "px, " + y + "px)" +
        " scale(" + scale + ")" +
        " skew(" + skew + "deg)";

}


// Change shape size

function updateShapeSize(element, input) {

    element.style.width =
        input.value + "px";

    element.style.height =
        input.value + "px";

}



// -----------------------------------
// TEXT EVENTS
// -----------------------------------

textInput.addEventListener("input", function() {

    updateText(posterText, textInput);

});


textSize.addEventListener("input", function() {

    updateSize(posterText, textSize);

});


textColor.addEventListener("input", function() {

    updateColor(posterText, textColor);

});


textX.addEventListener("input", updateTextMovement);
textY.addEventListener("input", updateTextMovement);
textSkew.addEventListener("input", updateTextMovement);


function updateTextMovement() {

    updateTextTransform(
        posterText,
        textX,
        textY,
        textSkew
    );

}



// -----------------------------------
// PHOTO EVENTS
// -----------------------------------

photoX.addEventListener("input", updatePhoto);
photoY.addEventListener("input", updatePhoto);
photoScale.addEventListener("input", updatePhoto);
photoSkew.addEventListener("input", updatePhoto);


function updatePhoto() {

    updatePhotoTransform(
        posterPhoto,
        photoX,
        photoY,
        photoScale,
        photoSkew
    );

}



// -----------------------------------
// SHAPE EVENTS
// -----------------------------------

shapeSize.addEventListener("input", function() {

    updateShapeSize(
        posterShape,
        shapeSize
    );

});


shapeColor.addEventListener("input", function() {

    updateBackground(
        posterShape,
        shapeColor
    );

});


shapeX.addEventListener("input", updateShapePosition);
shapeY.addEventListener("input", updateShapePosition);


function updateShapePosition() {

    updatePosition(
        posterShape,
        shapeX,
        shapeY
    );

}