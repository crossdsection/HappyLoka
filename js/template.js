jQuery(function($) {

	/* =============== SHOW / HIDE FORM SEARCH =============== */
	$("header .nino-search, #nino-searchForm .nino-close").click(function(){
		$("#nino-searchForm").toggleClass("open");
	});

	/* =============== SHOW / HIDE GOOGLE MAP =============== */
	$("#nino-map .nino-sectionHeading").click(function(){
		$("#nino-map").toggleClass("showMap");
		$(this).find(".text").toggle();
	});

	/* =============== TESTIMONIAL SLIDER =============== */
	$('.nino-testimonialSlider').unslider({
		nav: false,
		arrows: {
			//  Unslider default behaviour
			prev: '<a class="unslider-arrow prev"><i class="mdi mdi-chevron-left"></i></a>',
			next: '<a class="unslider-arrow next"><i class="mdi mdi-chevron-right"></i></a>',
		}
	});

	/* =============== Team SLIDER =============== */
	$('.ninoTeamSlider').unslider({
		nav: false,
		arrows: {
			//  Unslider default behaviour
			prev: '<a class="unslider-arrow prev"><i class="mdi mdi-chevron-left"></i></a>',
			next: '<a class="unslider-arrow next"><i class="mdi mdi-chevron-right"></i></a>',
		}
	});

	/* =============== CUSTOM SCROLLBAR STYLE =============== */
	$("#nino-whatWeDo .panel-body").mCustomScrollbar({
		theme:"default"
	});

	/* =============== MAKE MAIN MENU STICKED ON TOP WHEN SCROLL =============== */
	$(window).scroll(function () {
		if ($(this).scrollTop() == $('#nino-header').height() || $(this).scrollTop() > $('#nino-header').height()) {
			$('body').addClass("nino-fixed-nav");
			$('body').css('padding-top', $('#nino-navbar').height() + 'px');
		} else {
			$('body').removeClass("nino-fixed-nav");
			$('body').css('padding-top', 0);
		}
	});

	/* =============== ISOTOP =============== */
	$(window).load(function(){
		$portfolio = $('.nino-portfolioItems');
		$portfolio.isotope({
			itemSelector : 'li',
			layoutMode : 'masonry'
		});
	});

	/* =============== PORTFOLIO HOVER EFFECT =============== */
	$('.nino-portfolioItems > li').each( function() { $(this).hoverdir(); } );

	/* =============== PERTTYPHOTO =============== */
	$("a.nino-prettyPhoto").prettyPhoto();

	/* =============== SMOOTH SCROOL EFFECT =============== */
	$('#nino-navbar ul li a').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});

	/* =============== SHOW / HIDE GO TO TOP =============== */
	/* Check to see if the window is top if not then display go top button */
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('#nino-scrollToTop').fadeIn();
		} else {
			$('#nino-scrollToTop').fadeOut();
		}
	});
	/* Click event to scroll to top */
	$('#nino-scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	$.getJSON( "js/images.json", function( data ) {
		var files = data['gallery'];
		var html = '';
		for( var i in files ){
			var fileName = files[i];
			html += '<li class="item">'
			html += '<a class="nino-prettyPhoto" rel="prettyPhoto[gallery1]" title="Hatha Yoga" href="'+fileName+'">';
			html += '<img src="'+fileName+'" />';
			html += '<div class="overlay">';
			html += '<div class="content">';
			html += '<i class="mdi mdi-crown nino-icon"></i>';
			html += '<span class="desc">Lorem ipsum dolor sit</span>';
			html += '<h4 class="title">Specialized Classes</h4>';
			html += '</div>';
			html += '</div>';
			html += '</a>';
			html += '</li>';
		}
		$("#gallery").append(html);
		$("a[rel^='prettyPhoto']").prettyPhoto();
	}, function( e ){
		console.log( e );
	});

	jQuery("#nino-navbar-collapse").on("click", "a", null, function(){
		jQuery("#nino-navbar-collapse").collapse('hide');
	});

	jQuery("#sendMail").on("click", function( e ){
		e.preventDefault();
		jQuery("#sendMail").attr('disabled');
		var email = jQuery("#email").val();
		var name = jQuery("#name").val();
		var message = jQuery("#message").val();
		if( !validateEmail( email ) ){
			alert("Please Enter a valid email address");
			return false;
		}
		var url = "/mail.php?email=" + email + "&name=" + name + "&message=" + message;
		jQuery.ajax({
		    type: "GET",
		    url: url,
		    cache: false,
		    contentType: false,
		    processData: false,
		    success:  function(data){
		        alert(data);
						window.location.reload();
		    }
		});
	});
	var validateEmail = function(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}
});
