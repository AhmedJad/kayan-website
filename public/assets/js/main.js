(function($) {
    "use strict";


    function common() {
        $('.ps-single-no-search').select2({
            minimumResultsForSearch: -1,
            dropdownCssClass: "ps-dropdown-single"
        });
        $('.ps-rating').each((index, value) => {
            var rate = $(value).attr('value');
            if ($(value).attr('value') === 0) {
                rate = "0";
            }
            $(value).barrating({
                theme: 'fontawesome-stars',
                initialRating: rate,
                readonly: 'true'
            });
        });
        $('.ps-rating--form').each((index, value) => {
            var rate = $(value).attr('data-value');
            if ($(value).attr('data-value') === 0) {
                rate = "0";
            }
            $(value).barrating({
                theme: 'fontawesome-stars',
                initialRating: rate
            });
        });

        $(".ps-header__search .ps-input").on("change paste keyup", function () {
            if ($(this).val()) {
                $('.ps-search--result').addClass('active');
            } else {
                $('.ps-search--result').removeClass('active');
            }
        });

        $('.ps-search--result').on('mouseleave', function (e) {
            $(this).removeClass('active');
        });

        $(".ps-search--mobile .ps-input").on("change paste keyup", function () {
            if ($(this).val()) {
                $('.ps-search--mobile .ps-search__result').addClass('active');
            } else {
                $('.ps-search--mobile .ps-search__result').removeClass('active');
            }
        });

        $('[data-toggle=tooltip]').tooltip();

        $('.ps-section__toggle').on('click', function (event) {
            event.preventDefault();
            $('.ps-section--review-product .ps-form--review').slideToggle();
        });

        $('.ps-select--feature a').on('click', function (event) {
            event.preventDefault();
            var parent = $(this).parent();
            parent.find('a').removeClass('active');
            $(this).addClass('active');
        });

        $('.ps-block-control').on('click', function (event) {
            event.preventDefault();
            var parent = $(this).parent();
            parent.find('.ps-widget__content').slideToggle();
            $(this).toggleClass('active');
        });

        $('#collapse-filter').on('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $('.ps-categogy__main').toggleClass('active');
        });

        $('#close-widget-product').on('click', function (event) {
            event.preventDefault();
            $(this).removeClass('active');
            $('.ps-categogy__main').removeClass('active');
        });

        $('.js-example-basic-single').select2({
            dropdownCssClass: "ps-dropdown-input"
        });

        $('.ps-shopping__toggle').on('click', function (event) {
            event.preventDefault();
            $('.ps-shopping__form').slideToggle();
        });

        $('.toogle-password').on('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('fa-eye');
            $(this).toggleClass('fa-eye-slash');
            var parent = $(this).parent().parent();
            var type = parent.find('input').attr('type') == 'password' ? 'text' : 'password';
            parent.find('input').attr('type', type);
        });

        $('#create-account').on('click', function (event) {
            $('.ps-hidden[data-for="create-account"]').slideToggle();
        });

        $('#ship-address').on('click', function (event) {
            $('.ps-hidden[data-for="ship-address"]').slideToggle();
        });
    }

    function openModal() {
        $('#cart-mini, .ps-cart--mini').hover(function(e) {
            $(".ps-cart--mini").stop(true, true).addClass("active");
        }, function() {
            $(".ps-cart--mini").stop(true, true).removeClass("active");
        });  

        $('#login-modal, .ps-login--modal').hover(function(e) {
            $(".ps-login--modal").stop(true, true).addClass("active");
        }, function() {
            $(".ps-login--modal").stop(true, true).removeClass("active");
        });  
    }

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(endtime) {
        var daysSpan =  $('.ps-countdown__days');
        var hoursSpan =  $('.ps-countdown__hours');
        var minutesSpan = $('.ps-countdown__minutes');
        var secondsSpan = $('.ps-countdown__seconds');

        if (hoursSpan && minutesSpan && secondsSpan) {
            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }

        function updateClock() {
            var t = getTimeRemaining(endtime);
            
            var hoursText = ('0' + t.hours).slice(-2);
            var minutesText = ('0' + t.minutes).slice(-2);
            var secondsText = ('0' + t.seconds).slice(-2);
            var daysText = ('00' + t.days).slice(-3);
            
            daysSpan.each(function (index) {
                if (daysText >= 100) {
                    $(this).find('.first-1st').text(daysText.slice(0, 1));
                    $(this).find('.first-1st').css('display', 'inline-block');
                }
                $(this).find('.first').text(daysText.slice(1, 2));
                $(this).find('.last').text(daysText.slice(-1));
            });

            hoursSpan.each(function (index) {
                $(this).find('.first').text(hoursText.slice(0, 1));
                $(this).find('.last').text(hoursText.slice(-1));
            });

            minutesSpan.each(function (index) {
                $(this).find('.first').text(minutesText.slice(0, 1));
                $(this).find('.last').text(minutesText.slice(-1));
            });

            secondsSpan.each(function (index) {
                $(this).find('.first').text(secondsText.slice(0, 1));
                $(this).find('.last').text(secondsText.slice(-1));
            });

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
    }

    function countDown() {
        var deadline = new Date(Date.parse(new Date()) + 300 * 60 * 60 * 1000);
        initializeClock(deadline);
    }

    function stickyMenu() {
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            var innerWidth = $(window).innerWidth();
            if (scroll > 200 && innerWidth > 760) {
                $('.ps-header').addClass('ps-header--sticky');
            } else if (scroll > 700 && innerWidth < 760) {
                $('.ps-header').addClass('ps-header--sticky');
                $('.ps-search--result').removeClass('active');
            } else {
                $('.ps-header').removeClass('ps-header--sticky')
            }

            if (scroll > 100) {
                $('.scroll-top').show();
            } else {
                $('.scroll-top').hide();
            }
        });

        $('.ps-menu--sticky').on('click', function(event) {
            event.preventDefault();
            $('.ps-navigation').slideToggle();
        });

        $('.scroll-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({ scrollTop: 0 }, 500);
        });

        $('a[href="#home-block"]').on('click', function (event) {
            smoothScrollingTo(this.hash);
        });
    }

    function smoothScrollingTo(target) {
        if (target) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);
        }
    }

    function subMenuToggle() {
        $('.menu--mobile .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent('li');
            
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
            current.toggleClass('active');
        });

        $('.ps-language-currency .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent('li');
            
            current.children('.sub-menu').slideToggle(350);
            current.toggleClass('active');
        });

        $('#open-menu').on('click', function(e) {
            e.preventDefault();
            $('.ps-menu--slidebar').addClass('active');
            $(this).parent().addClass('active');
        });

        $('#close-menu').on('click', function(e) {
            e.preventDefault();
            $('.ps-menu--slidebar').removeClass('active');
            $(this).parent().removeClass('active');
        });

        // $('.ps-menu__sticky #menu-slide').on('click', function (e) {
        //     e.preventDefault();
        //     $('.ps-menu--slidebar').addClass('active');
        //     $('#open-menu').parent().addClass('active');
        // });

        $('.menu-slide').on('click', function (e) {
            e.preventDefault();
            $('.ps-menu--slidebar').addClass('active');
            $('#open-menu').parent().addClass('active');
        });

        $('#open-menu-top').on('click', function (e) {
            e.preventDefault();
            $('.ps-menu--slidebar').addClass('active');
            $(this).parent().addClass('active');
            $('.ps-header--mobile').addClass('slidebar-active');
        });

        $('#close-menu-top').on('click', function (e) {
            e.preventDefault();
            $('.ps-menu--slidebar').removeClass('active');
            $(this).parent().removeClass('active');
            $('.ps-header--mobile').removeClass('slidebar-active');
        });
    }

    function slickCarousel() {
        if ($('.ps-product--gallery .ps-product__thumbnail').length) {
            $('.ps-product--gallery .ps-product__thumbnail')
            .on('init', function (slick) {
                $('.ps-product--gallery .ps-product__thumbnail').fadeIn(1000);
            })
            .slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                lazyLoad: 'ondemand',
                asNavFor: '.ps-gallery--image'
            });

            $('.ps-gallery--image')
            .on('init', function (slick) {
                $('.ps-gallery--image').fadeIn(1000);
            })
            .slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                lazyLoad: 'ondemand',
                asNavFor: '.ps-product--gallery .ps-product__thumbnail',
                dots: false,
                arrows: false,
                focusOnSelect: true
            });

            //remove active class from all thumbnail slides
            $('.ps-gallery--image .slick-slide').removeClass('slick-active');

            //set active class to first thumbnail slides
            $('.ps-gallery--image .slick-slide').eq(0).addClass('slick-active');

            // On before slide change match active thumbnail to current slide
            $('.ps-product--gallery .ps-product__thumbnail').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var mySlideNumber = nextSlide;
                $('.ps-gallery--image .slick-slide').removeClass('slick-active');
                $('.ps-gallery--image .slick-slide').eq(mySlideNumber).addClass('slick-active');
            });
        }

        $('.modal').on('shown.bs.modal', function (e) {
            $('.ps-product--gallery .ps-product__thumbnail').slick('setPosition');
            $('.ps-gallery--image').slick('setPosition');
            $('.wrap-modal-slider').addClass('open');
        })
    }

    function slidePriceWidget() {
        var rangeSlider = document.getElementById('slide-price');
        if (rangeSlider) {
            var input0 = document.getElementById('slide-price-min');
            var input1 = document.getElementById('slide-price-max');
            var inputs = [input0, input1];
            noUiSlider.create(rangeSlider, {
                start: [0, 820],
                connect: true,
                step: 1,
                range: {
                    min: [1],
                    max: [1000]
                }
            });

            rangeSlider.noUiSlider.on("update", function(values, handle) {
                inputs[handle].textContent  = '$' + values[handle];
            });
        }
    }

    function lightgalleryVideos() {
        $('#ps-video-gallery').lightGallery();
    }

    function backgroundImage() {
        var databackground = $('[data-background]');
        databackground.each(function () {
            if ($(this).attr('data-background')) {
                var image_path = $(this).attr('data-background');
                $(this).css({
                    backgroundImage: 'url(' + image_path + ')',
                });
            }
        });
    }

    $(function() {
        common();
        openModal();
        countDown();
        stickyMenu();
        subMenuToggle();
        slickCarousel();
        slidePriceWidget();
        lightgalleryVideos();
        smoothScrollingTo(location.hash);
        backgroundImage();
    });

    $(window).on('load', function() {
       
    });
})(jQuery);

