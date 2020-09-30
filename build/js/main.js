var slideIndex = 1,
	slides = document.getElementsByClassName("slider-item"),
	navText = document.getElementById("nav-text");

navText.innerText = "1 - " + slides.length;

function showSlides (n) {

	for (var i = 0; i<slides.length; i++) {
		slides[i].classList.remove("active");
		slides[i].classList.add("fade");
		slides[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "block";
	slides[slideIndex-1].classList.add("active");
	slides[slideIndex-1].classList.remove("fade");
}

function plusSlides(m = 1){
	n = !m ? 1 : slideIndex + m;
	if(n > slides.length){	n = 1;	}
	if(n < 1){	n = slides.length;	}

	slideIndex = n;

	showSlides(n);
}

window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
$(".slider-item" ).on( "swipeleft", function (){
	console.log("left");
	plusSlides(-1);
} );
$(".slider-item" ).on( "swiperight", function (){
	console.log("right");
	plusSlides(1);
} );

showSlides(slideIndex);

var rotateSlider = setInterval(plusSlides, 8000)