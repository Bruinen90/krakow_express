const discoverPoland = document.querySelector("#discoverPoland");
const mustSee = document.querySelector("#mustSee");

class Slider {
	constructor(
		container,
		marginWidth,
		slideDuration,
		slideWidth,
		minSlidesOnScreen
	) {
		this.container = container;
		this.marginWidth = marginWidth;
		this.slideDuration = slideDuration;
		this.slideWidth = slideWidth;
		this.minSlidesOnScreen = minSlidesOnScreen;
		this.currSlide = 0;
		this.slidesCount = container.querySelectorAll(
			".oneRowSlider__slide"
		).length;
		this.maxSlide = this.slidesCount;
		if (minSlidesOnScreen && window.innerWidth > 768) {
			this.maxSlide =
				this.slidesCount -
				(this.slidesCount % this.minSlidesOnScreen) -
				1;
		}
	}

	changeSlide(targetSlide) {
		if (targetSlide < 0) {
			this.currSlide = this.slidesCount - 1;
		} else if (targetSlide >= this.maxSlide) {
			this.currSlide = 0;
		} else {
			this.currSlide = targetSlide;
		}
		this.container.style.transform = `translateX(calc(${-this.currSlide *
			(this.slideWidth + this.marginWidth)}px)`;
	}

	startSlideShow() {
		let showTime = setInterval(
			() => this.changeSlide(this.currSlide + 1),
			this.slideDuration
		);
		const resetInterval = () => {
			clearInterval(showTime);
			showTime = setInterval(
				() => this.changeSlide(this.currSlide + 1),
				this.slideDuration
			);
		};
		const swipeHandler = new Hammer(this.container);
		swipeHandler.on("swipeleft", () => {
			this.changeSlide(this.currSlide + 1);
			resetInterval();
		});
		swipeHandler.on("swiperight", () => {
			this.changeSlide(this.currSlide - 1);
			resetInterval();
		});
		return showTime;
	}
}

const discoverSlider = new Slider(discoverPoland, 30, 3500, 350, 3);
const mustSlider = new Slider(mustSee, 30, 3500, 350, 3);
discoverSlider.startSlideShow();
mustSlider.startSlideShow();
