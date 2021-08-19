type Measure = {
	accents: number;
	subdivision: number;
	time_signature: number;
};

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
					console.log(bar[i]);
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
function inputRhythm() {
	let accents = document.getElementsByName("accents");
	let subdiv = document.getElementsByName("subdiv");
	let timesig = document.getElementsByName("timesignature");
}

document.getElementById("builder")!.addEventListener("submit", e=> {
	let test = document.getElementById("test")!;
	test.textContent = "This is a test";
});

function printRhythm() {
	let test: Measure = {
		accents: 4,
		subdivision: 2,
		time_signature: 4
	}
	console.log(make_rhythm(test));
}