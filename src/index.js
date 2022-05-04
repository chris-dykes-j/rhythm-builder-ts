// Receives form values, and creates a measure.
function get_input() {
    let accent_total = parseInt(document.getElementById("accents").value);
    let subdiv = document.getElementsByName("subdiv");
    let subdivchoice = 0;
    subdiv.forEach(option => {
        if (option.checked)
            subdivchoice = parseInt(option.value);
    });
    let timesig = document.getElementsByName("timesignature");
    let timechoice = 0;
    timesig.forEach(option => {
        if (option.checked)
            timechoice = parseInt(option.value);
    });
    let measure = {
        accents: accent_total,
        subdivision: subdivchoice,
        time_signature: timechoice,
    };
    return measure;
}
// Randomly assigns values to an array (one or zero).
function make_rhythm(measure) {
    let length = measure.subdivision * measure.time_signature;
    let bar = new Array(length).fill(0);
    let count = measure.accents;
    while (count > 0) {
        for (let i = 0; i < length; i++) {
            if (bar[i] === 0) {
                let rng = Math.round(Math.random());
                if (rng === 1) {
                    bar[i] = rng;
                    count--;
                    if (count === 0) {
                        break;
                    }
                }
            }
        }
    }
    return bar;
}
// Function to display the time signature.
function time_signature(measure) {
    let doc = document.getElementById("time");
    doc.innerHTML = "";
    let img = document.createElement("img");
    switch (measure.time_signature) {
        case 4:
            img.src = "img/4.png";
            break;
        case 3:
            img.src = "img/3.jpeg";
            break;
    }
    doc.appendChild(img);
}
// Uses array from make_rhythm and displays as notes and rests for enduser.
function display_rhythm(bar, measure) {
    let doc = document.getElementById("result");
    doc.innerHTML = "";
    if (measure.subdivision === 4) {
        bar.forEach(note => {
            let img = document.createElement("img");
            note === 1 ? img.src = "img/16thNote.png" : img.src = "img/16thRest.png";
            doc.appendChild(img);
        });
    }
    else {
        bar.forEach(note => {
            let img = document.createElement("img");
            note === 1 ? img.src = "img/8thNote.png" : img.src = "img/8thRest.png";
            doc.appendChild(img);
        });
    }
}
document.getElementById("builder")?.addEventListener("submit", e => {
    let m = get_input();
    time_signature(m);
    display_rhythm(make_rhythm(m), m);
    e.preventDefault();
});
