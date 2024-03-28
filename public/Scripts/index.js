let currentTextIndex = 0;
let isBlinkerWhite = false;

let textAnimation = async function() {
    let texts = ["Friends", "Chat", "People"];
    let textHTML = document.getElementById('textChange');
    
    let lastText = texts[currentTextIndex];
    let newText = texts[currentTextIndex+1];
    let currentText;
    
    // If its looping
    if(lastText == undefined) {
        lastText = texts[texts.length-1];
    }

    for(let i = 0; i < Math.max(newText.length, lastText.length); ++i) {
        await new Promise(r => setTimeout(r, 100)); // Wait 100ms

        currentText = newText.slice(0,i+1) + lastText.slice(i+1, Math.max(lastText.length,newText.length));
        textHTML.innerText = currentText;
    }

    currentTextIndex += 1;
    if(currentTextIndex >= texts.length-1) { currentTextIndex = -1; }
}

let blinker = function() {
    let blinkerHTML = document.getElementById('blinker');
    if(isBlinkerWhite) {
        blinkerHTML.style.color = "white";
        isBlinkerWhite = false;
    } else if(!isBlinkerWhite) {
        blinkerHTML.style.color = "black";
        isBlinkerWhite = true;
    }
}

let textAnimationLoop = async function() {
    while(true) {
        await new Promise(r => setTimeout(r, 1000)); // Wait 1000ms
        await textAnimation(); // Call Animation
    }
}

textAnimationLoop(); // Can't really do anything because its a while loop do everything before this function