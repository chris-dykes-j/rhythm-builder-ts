type Measure = {
	accents: number;
	subdivision: number;
	time_signature: number;
};

function get_input() {
	let accent_total = parseInt((<HTMLInputElement>document.getElementById("accents")).value);
	let subdiv = document.getElementsByName("subdiv");
	let subdivchoice: number = 0;
	subdiv.forEach(option => {
		if ((<HTMLInputElement>option).checked)
			subdivchoice = parseInt((<HTMLInputElement>option).value);
	});
	let timesig = document.getElementsByName("timesignature");
	let timechoice: number = 0;
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

function display_rhythm(measure: Number[]) {
	let doc = document.getElementById("result")!;
	doc.innerHTML = "";
	measure.forEach(note => {
		let img = document.createElement("img");
		note === 1 ? img.src = "img/8thNote.png" : img.src = "img/8thRest.png";
		console.log(note);
		doc.appendChild(img)
	});
}

document.getElementById("builder")?.addEventListener("submit", e=> {
	display_rhythm(make_rhythm(get_input()))
	e.preventDefault();
});
