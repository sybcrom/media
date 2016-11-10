// menu au scroll
var posNav = $("main").offset().top




$(window).scroll(function(){
	if($(window).scrollTop() > posNav){
		$(".navbar").addClass("active");

	}
	else{
		$(".navbar").removeClass("active");
	}

	// couleur sur lien
	if(scrollPos > $(".brand").offset().top){
		$("#toc a.selected").removeClass("selected");
		$("#toc a[href='#chap1']").addClass("selected");
	}  
	if(scrollPos > $(".chiffre").offset().top){
		$("#toc a.selected").removeClass("selected");
		$("#toc a[href='#chap2']").addClass("selected");
	}  
	if(scrollPos > $(".blocimages").offset().top){
		$("#toc a.selected").removeClass("selected");
		$("#toc a[href='#chap3']").addClass("selected");
	} 
	if(scrollPos > $(".contact").offset().top){
		$("#toc a.selected").removeClass("selected");
		$("#toc a[href='#chap4']").addClass("selected");
	} 
});


$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});