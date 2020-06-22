$(document).ready(function() {

    $(".button-link").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top - 48 }, 1000);
    });
    var w = $(window).width();
    if (w > 575) {
        slickDotsScroll('brands-slider');
        $('.brands-slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            infinite: false,
            prevArrow: "<img class='slick-prev' src='img/arrow_l.png'>",
            nextArrow: "<img class='slick-next' src='img/arrow_r.png'>",
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        arrow: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrow: false
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        centerMode: true,
                        variableWidth: true,
                        arrow: false
                    }
                },
            ]
        });
    }

    toggleSlider();


    if (w > 575) {
        $(".adv-item").hover(

            function() {
                var hoverLink = $(this).children('img').attr('data-hover');
                $(this).children('img').attr('src', hoverLink);
            },
            function() {
                var normalLink = $(this).children('img').attr('data-normal');
                $(this).children('img').attr('src', normalLink);
            }
        );
    }

    scrollTracking('.middle-line-1');
    scrollTracking('.middle-line-2');

});

$(window).scroll(function() {
    scrollTracking('.middle-line-1');
    scrollTracking('.middle-line-2');
});

var block_show = false;

function scrollTracking(target) {
    if (block_show) {
        // return false;
    }

    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var et = $(target).offset().top;
    var eh = $(target).outerHeight();
    var dh = $(document).height();

    if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
        block_show = true;

        // Код анимации

        var w = $(window).width();
        if (w > 575) {
            $(target).animate({
                backgroundPositionY: "0px",
                backgroundPositionX: "0px"
            }, 1500);

        }
    }
}

function setBoundries(slick, state) {
    if (state === 'default') {
        slick.find('ul.slick-dots li').eq(4).addClass('n-small-1');
    }
}

function slickDotsScroll(slickSliderClass) {
    // Slick Selector.
    var slickSlider = $('.' + slickSliderClass);
    var maxDots = 5;
    var transformXIntervalNext = -18;
    var transformXIntervalPrev = 18;

    slickSlider.on('init', function(event, slick) {
        $(this).find('ul.slick-dots').wrap("<div class='slick-dots-container'></div>");
        $(this).find('ul.slick-dots li').each(function(index) {
            $(this).addClass('dot-index-' + index);
        });
        $(this).find('ul.slick-dots').css('transform', 'translateX(0)');
        setBoundries($(this), 'default');
    });

    var transformCount = 0;
    slickSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var totalCount = $(this).find('.slick-dots li').length;
        if (totalCount > maxDots) {
            if (nextSlide > currentSlide) {
                if ($(this).find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('n-small-1')) {
                    if (!$(this).find('ul.slick-dots li:last-child').hasClass('n-small-1')) {
                        transformCount = transformCount + transformXIntervalNext;
                        $(this).find('ul.slick-dots li.dot-index-' + nextSlide).removeClass('n-small-1');
                        var nextSlidePlusOne = nextSlide + 1;
                        $(this).find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass('n-small-1');
                        $(this).find('ul.slick-dots').css('transform', 'translateX(' + transformCount + 'px)');
                        var pPointer = nextSlide - 3;
                        var pPointerMinusOne = pPointer - 1;
                        $(this).find('ul.slick-dots li').eq(pPointerMinusOne).removeClass('p-small-1');
                        $(this).find('ul.slick-dots li').eq(pPointer).addClass('p-small-1');
                    }
                }
            } else {
                if ($(this).find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('p-small-1')) {
                    if (!$(this).find('ul.slick-dots li:first-child').hasClass('p-small-1')) {
                        transformCount = transformCount + transformXIntervalPrev;
                        $(this).find('ul.slick-dots li.dot-index-' + nextSlide).removeClass('p-small-1');
                        var nextSlidePlusOne = nextSlide - 1;
                        $(this).find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass('p-small-1');
                        $(this).find('ul.slick-dots').css('transform', 'translateX(' + transformCount + 'px)');
                        var nPointer = currentSlide + 3;
                        var nPointerMinusOne = nPointer - 1;
                        $(this).find('ul.slick-dots li').eq(nPointer).removeClass('n-small-1');
                        $(this).find('ul.slick-dots li').eq(nPointerMinusOne).addClass('n-small-1');
                    }
                }
            }
        }
    });
}
// $('.slick-slider').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     dots: true,
//     focusOnSelect: true,
//     infinite: false,
// });
function toggleSlider() {
    var w = $(window).width();
    if (w <= 575) {
        $('#toggle-clients').removeClass('row').addClass('clients-slider');
        $('#toggle-clients>div').removeClass('col-4').removeClass('col-lg-3');
        $('.toggle-clients-wrapper').css({ "padding-left": "0", "padding-right": "0", "margin-left": "0", "margin-right": "0" });

        $('#toggle-advantages').removeClass().addClass('advantages-slider');
        $('#toggle-advantages>div').removeClass().css("width", "220px");
        $('.toggle-advantages-wrapper').css({ "padding-left": "0", "padding-right": "0", "margin-left": "0", "margin-right": "0" });

        $('#toggle-team').removeClass().addClass('team-slider');
        $('#toggle-team>div').removeClass().css("width", "220px");
        $('.toggle-team-wrapper').css({ "padding-left": "0", "padding-right": "0", "margin-left": "0", "margin-right": "0" });

        $('.brands-wrapper').css({ "padding-left": "0", "padding-right": "0", "margin-left": "0", "margin-right": "0" });



        slickDotsScroll('clients-slider');
        slickDotsScroll('advantages-slider');
        slickDotsScroll('team-slider');
        slickDotsScroll('brands-slider');

        $('.clients-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
            variableWidth: true,
            arrows: false,
            dots: true,
            focusOnSelect: true,
            infinite: false
        });

        // $('button').on('click', function() {
        //     $('.slick-slider').slick('slickGoTo', 4);
        //     // gallery.slick('slickGoTo', parseInt(slideIndex));
        // });


        $('.advantages-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
            variableWidth: true,
            arrows: false,
            dots: true,
            infinite: false,
        });

        $('.team-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
            variableWidth: true,
            arrows: false,
            dots: true,
            infinite: false,
        });

        $('.brands-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
            variableWidth: true,
            arrows: false,
            dots: true,
            infinite: false
        });
    }
}

$(window).resize(function() {
    // toggleSlider();
});

function FormControlPlaceholder() {
    $("input.form-control:not(:focus), textarea.form-control:not(:focus)").each(function() {
        if ($.trim($(this).val()) != "") {
            $(this).addClass("notempty");
        } else {
            $(this).removeClass("notempty");
        }
    });
    $("input.form-control, textarea.form-control").on("blur", function() {
        if ($.trim($(this).val()) != "") {
            $(this).addClass("notempty");
        } else {
            $(this).removeClass("notempty");
        }
    });
}
FormControlPlaceholder();