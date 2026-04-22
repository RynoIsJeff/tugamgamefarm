jQuery(function ($) {
	'use strict';

	/* ----------------------------------------------------------- */
	/*  Fixed header on scroll
	/* ----------------------------------------------------------- */
	$(window).on('scroll', function () {

		function fixedHeader() {
			var headerTopBar    = $('.top-bar').outerHeight() || 0;
			var headerLogoArea  = $('.header-one .logo-area').outerHeight() || 0;
			var headerNav       = $('.header-one .site-navigation');

			if ($(window).scrollTop() > headerTopBar + headerLogoArea) {
				headerNav.addClass('navbar-fixed');
				$('.header-one').css('margin-bottom', headerNav.outerHeight());
			} else {
				headerNav.removeClass('navbar-fixed');
				$('.header-one').css('margin-bottom', 0);
			}
		}
		fixedHeader();

		/* Back-to-top button visibility */
		function scrollTopBtn() {
			var scrollToTop = $('#back-to-top');
			if ($(window).scrollTop() >= 50) {
				scrollToTop.fadeIn();
			} else {
				scrollToTop.fadeOut();
			}
		}
		scrollTopBtn();
	});


	$(document).ready(function () {

		/* Mobile navbar dropdown toggle */
		function navbarDropdown() {
			if ($(window).width() < 992) {
				$('.site-navigation .dropdown-toggle').on('click', function () {
					$(this).siblings('.dropdown-menu').animate({ height: 'toggle' }, 300);
				});
				var navbarHeight = $('.site-navigation').outerHeight();
				$('.site-navigation .navbar-collapse').css(
					'max-height', 'calc(100vh - ' + navbarHeight + 'px)'
				);
			}
		}
		navbarDropdown();


		/* Back-to-top click handler */
		function backToTop() {
			$('#back-to-top').on('click', function () {
				$('#back-to-top').tooltip('hide');
				$('body,html').animate({ scrollTop: 0 }, 800);
				return false;
			});
		}
		backToTop();


		/* Main hero banner carousel */
		function bannerCarouselOne() {
			$('.banner-carousel.banner-carousel-1').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: true,
				speed: 600,
				arrows: true,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		bannerCarouselOne();


		/* Accommodation room gallery thumbnails */
		function accomGallery() {
			$('.accom-gallery.slick-thumbs').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				infinite: true,
				speed: 400,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>',
				responsive: [
					{ breakpoint: 992, settings: { slidesToShow: 3 } },
					{ breakpoint: 768, settings: { slidesToShow: 2 } },
					{ breakpoint: 480, settings: { slidesToShow: 1 } }
				]
			});
		}
		accomGallery();

	});

});
