var slideIndex = 1,
	slides = document.getElementsByClassName("item-img"),
	articles = document.getElementsByClassName("item-article"),
	navText = document.getElementById("nav-text");

navText.innerText = "1 - " + slides.length;

function showSlides (n) {

	for (var i = 0; i<slides.length; i++) {
		slides[i].classList.remove("active-img");
		slides[i].classList.add("fade-img");
		//slides[i].style.display = "none";
		articles[i].classList.remove("active-article");
		articles[i].classList.add("fade-article");
		//articles[i].style.display = "none";
	}

	//slides[slideIndex-1].style.display = "block";
	slides[slideIndex-1].classList.add("active-img");
	slides[slideIndex-1].classList.remove("fade-img");

	//articles[slideIndex-1].style.display = "block";
	articles[slideIndex-1].classList.add("active-article");
	articles[slideIndex-1].classList.remove("fade-article");
}

function plusSlides(m = 1){
	n = !m ? 1 : slideIndex + m;
	if(n > slides.length){	n = 1;	}
	if(n < 1){	n = slides.length;	}

	slideIndex = n;

	showSlides(n);
}

$(".slider-item" ).on( "swipeleft", function (){
	console.log("left");
	plusSlides(-1);
} );
$(".slider-item" ).on( "swiperight", function (){
	console.log("right");
	plusSlides(1);
} );

showSlides(slideIndex);

var rotateSlider = setInterval(plusSlides, 3000)