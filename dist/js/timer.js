let countDownDate = new Date("Aug 6, 2019 23:53:01").getTime();

let x = setInterval(function() {
	const now = new Date().getTime();
	let distance = countDownDate - now;
	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);
	document.querySelector(".umbrella__countdown").innerHTML =
		" " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

	if (distance < 0) {
		clearInterval(x);
		document.querySelector(".umbrella").classList.add('umbrella__expired')
	}
}, 1000);
