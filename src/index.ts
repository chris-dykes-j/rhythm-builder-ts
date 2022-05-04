type Measure = {
	accents: number;
	subdivision: number;
	time_signature: number;
};

// Receives form values, and creates a measure.
function get_input() {
	let accent_total = parseInt((<HTMLInputElement>document.getElementById("accents")).value);
	let subdiv = document.getElementsByName("subdiv");
	let subdivchoice: number = 2; // Avoids crashing bug.
	subdiv.forEach(option => {
		if ((<HTMLInputElement>option).checked)
			subdivchoice = parseInt((<HTMLInputElement>option).value);
	});
	let timesig = document.getElementsByName("timesignature");
	let timechoice: number = 4; // Avoids crashing bug.
	timesig.forEach(option => {
		if ((<HTMLInputElement>option).checked)
			timechoice = parseInt((<HTMLInputElement>option).value);
	});
	let measure: Measure = {
		accents: accent_total,
		subdivision: subdivchoice,
		time_signature: timechoice,
	}
	return measure;
}

// Randomly assigns values to an array (one or zero).
function make_rhythm(measure: Measure) {
	let length: number = measure.subdivision * measure.time_signature;
	let bar: number[] = new Array(length).fill(0);
	let count: number = measure.accents;
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
function time_signature(measure: Measure) {
	let doc = document.getElementById("time")!;
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
function display_rhythm(bar: number[], measure: Measure) {
	if (measure.subdivision === 2)
		eighth_notes(bar);
	else if (measure.subdivision === 4)
		sixteenth_notes(bar);
	// Leaving older method here.

	/* bar.forEach(note => {
			let img = document.createElement("img");
			note === 1 ? img.src = "img/16thNote.png" : img.src = "img/16thRest.png";
			doc.appendChild(img);
	}); */

	else {
		let doc = document.getElementById("result")!;
		doc.innerHTML = "";
		bar.forEach(note => {
			let img = document.createElement("img");
			note === 1 ? img.src = "img/8thNote.png" : img.src = "img/8thRest.png";
			doc.appendChild(img)
		});
	}
}

// Separate function to use Quarter note values.
function eighth_notes(bar: number[]) {
	let doc = document.getElementById("result")!;
	doc.innerHTML = "";
	for (let i = 0; i < bar.length; i += 2) {
		let img = document.createElement("img");
		if (bar[i] === 1 && bar[i + 1] === 1)
			img.src = "img/8thPair.png";
		else if (bar[i] === 1 && bar[i + 1] === 0)
			img.src = "img/QuarterNote.png"
		else if (bar[i] === 0 && bar[i + 1] === 0)
			img.src = "img/QuarterRest.png"
		else if (bar[i] === 0 && bar[i + 1] === 1) {
			// There must be better way to deal with this. Creating a second image for this case.
			let img2 = document.createElement("img");
			img2.src = "img/8thRest.png"
			doc.appendChild(img2);
			img.src = "img/8thNote.png";
		}
		doc.appendChild(img);
	}
}

// WIP. There are 16 possible results, which are gradually being implemented.
function sixteenth_notes(bar: number[]) {
	let doc = document.getElementById("result")!;
	doc.innerHTML = "";
	for (let i = 0; i < bar.length; i += 4) {
		let img = document.createElement("img");
		let sum: number = bar[i] + bar[i + 1] + bar[i + 2] + bar[i + 3];
		console.log(sum);
		if (sum === 4)
			img.src = "img/16thFour.png";
		else if (sum === 3)
			img.src = "img/gallop.jpeg";
		else if (sum === 2)
			img.src = "img/8thPair.png";
		else if (sum === 1)
			img.src = "img/QuarterNote.png";
		else if (sum === 0)
			img.src = "img/QuarterRest.png";
		doc.appendChild(img);
	}
}

document.getElementById("builder")?.addEventListener("submit", e => {
	let m = get_input();
	time_signature(m);
	display_rhythm(make_rhythm(m), m);
	e.preventDefault();
});
