/**
 * Slick
 * @see         https://github.com/kenwheeler/slick/
 * @license     MIT license
 */
!function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
  "use strict";
  var b = window.Slick || {};
  b = function () {
    function c(c, d) {
      var f, g, e = this;
      if (e.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: a(c),
            appendDots: a(c),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
            nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function (a, b) {
              return '<button type="button" data-role="none">' + (b + 1) + "</button>"
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            fade: !1,
            focusOnSelect: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            onBeforeChange: null,
            onAfterChange: null,
            onInit: null,
            onReInit: null,
            onSetPosition: null,
            pauseOnHover: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rtl: !1,
            slide: "div",
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            variableWidth: !1,
            vertical: !1,
            waitForAnimate: !0
          }, e.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            $list: null,
            touchObject: {},
            transformsEnabled: !1
          }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.paused = !1, e.positionProp = null, e.respondTo = null, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.windowWidth = 0, e.windowTimer = null, e.options = a.extend({}, e.defaults, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, f = e.options.responsive || null, f && f.length > -1) {
        e.respondTo = e.options.respondTo || "window";
        for (g in f)f.hasOwnProperty(g) && (e.breakpoints.push(f[g].breakpoint), e.breakpointSettings[f[g].breakpoint] = f[g].settings);
        e.breakpoints.sort(function (a, b) {
          return b - a
        })
      }
      e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.init(), e.checkResponsive()
    }

    var b = 0;
    return c
  }(), b.prototype.addSlide = function (b, c, d) {
    var e = this;
    if ("boolean" == typeof c)d = c, c = null; else if (0 > c || c >= e.slideCount)return !1;
    e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
      a(c).attr("index", b)
    }), e.$slidesCache = e.$slides, e.reinit()
  }, b.prototype.animateSlide = function (b, c) {
    var d = {}, e = this;
    if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
      var f = e.$slides.eq(e.currentSlide).outerHeight(!0);
      e.$list.animate({height: f}, e.options.speed)
    }
    e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({left: b}, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({top: b}, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? a({animStart: e.currentLeft}).animate({animStart: b}, {
      duration: e.options.speed,
      easing: e.options.easing,
      step: function (a) {
        e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
      },
      complete: function () {
        c && c.call()
      }
    }) : (e.applyTransition(), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
      e.disableTransition(), c.call()
    }, e.options.speed))
  }, b.prototype.asNavFor = function (b) {
    var c = this, d = null != c.options.asNavFor ? a(c.options.asNavFor).getSlick() : null;
    null != d && d.slideHandler(b, !0)
  }, b.prototype.applyTransition = function (a) {
    var b = this, c = {};
    c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.autoPlay = function () {
    var a = this;
    a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
  }, b.prototype.autoPlayClear = function () {
    var a = this;
    a.autoPlayTimer && clearInterval(a.autoPlayTimer)
  }, b.prototype.autoPlayIterator = function () {
    var a = this;
    a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
  }, b.prototype.buildArrows = function () {
    var b = this;
    b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow = a(b.options.prevArrow), b.$nextArrow = a(b.options.nextArrow), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.appendTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled"))
  }, b.prototype.buildDots = function () {
    var c, d, b = this;
    if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
      for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1)d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";
      d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active")
    }
  }, b.prototype.buildOut = function () {
    var b = this;
    b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
      a(c).attr("index", b)
    }), b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), b.options.centerMode === !0 && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.options.accessibility === !0 && b.$list.prop("tabIndex", 0), b.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
  }, b.prototype.checkResponsive = function () {
    var c, d, e, b = this, f = b.$slider.width(), g = window.innerWidth || a(window).width();
    if ("window" === b.respondTo ? e = g : "slider" === b.respondTo ? e = f : "min" === b.respondTo && (e = Math.min(g, f)), b.originalSettings.responsive && b.originalSettings.responsive.length > -1 && null !== b.originalSettings.responsive) {
      d = null;
      for (c in b.breakpoints)b.breakpoints.hasOwnProperty(c) && e < b.breakpoints[c] && (d = b.breakpoints[c]);
      null !== d ? null !== b.activeBreakpoint ? d !== b.activeBreakpoint && (b.activeBreakpoint = d, b.options = a.extend({}, b.originalSettings, b.breakpointSettings[d]), b.refresh()) : (b.activeBreakpoint = d, b.options = a.extend({}, b.originalSettings, b.breakpointSettings[d]), b.refresh()) : null !== b.activeBreakpoint && (b.activeBreakpoint = null, b.options = b.originalSettings, b.refresh())
    }
  }, b.prototype.changeSlide = function (b, c) {
    var f, g, h, i, j, d = this, e = a(b.target);
    switch (e.is("a") && b.preventDefault(), h = 0 !== d.slideCount % d.options.slidesToScroll, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
      case"previous":
        g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
        break;
      case"next":
        g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
        break;
      case"index":
        var k = 0 === b.data.index ? 0 : b.data.index || a(b.target).parent().index() * d.options.slidesToScroll;
        if (i = d.getNavigableIndexes(), j = 0, i[k] && i[k] === k)if (k > i[i.length - 1])k = i[i.length - 1]; else for (var l in i) {
          if (k < i[l]) {
            k = j;
            break
          }
          j = i[l]
        }
        d.slideHandler(k, !1, c);
      default:
        return
    }
  }, b.prototype.clickHandler = function (a) {
    var b = this;
    b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
  }, b.prototype.destroy = function () {
    var b = this;
    b.autoPlayClear(), b.touchObject = {}, a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && "object" != typeof b.options.prevArrow && b.$prevArrow.remove(), b.$nextArrow && "object" != typeof b.options.nextArrow && b.$nextArrow.remove(), b.$slides.parent().hasClass("slick-track") && b.$slides.unwrap().unwrap(), b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({
      position: "",
      left: "",
      top: "",
      zIndex: "",
      opacity: "",
      width: ""
    }), b.$slider.removeClass("slick-slider"), b.$slider.removeClass("slick-initialized"), b.$list.off(".slick"), a(window).off(".slick-" + b.instanceUid), a(document).off(".slick-" + b.instanceUid)
  }, b.prototype.disableTransition = function (a) {
    var b = this, c = {};
    c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.fadeSlide = function (a, b, c) {
    var d = this;
    d.cssTransitions === !1 ? (d.$slides.eq(b).css({zIndex: 1e3}), d.$slides.eq(b).animate({opacity: 1}, d.options.speed, d.options.easing, c), d.$slides.eq(a).animate({opacity: 0}, d.options.speed, d.options.easing)) : (d.applyTransition(b), d.applyTransition(a), d.$slides.eq(b).css({
      opacity: 1,
      zIndex: 1e3
    }), d.$slides.eq(a).css({opacity: 0}), c && setTimeout(function () {
      d.disableTransition(b), d.disableTransition(a), c.call()
    }, d.options.speed))
  }, b.prototype.filterSlides = function (a) {
    var b = this;
    null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
  }, b.prototype.getCurrent = function () {
    var a = this;
    return a.currentSlide
  }, b.prototype.getDotCount = function () {
    var a = this, b = 0, c = 0, d = 0;
    if (a.options.infinite === !0)d = Math.ceil(a.slideCount / a.options.slidesToScroll); else for (; b < a.slideCount;)++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    return d - 1
  }, b.prototype.getLeft = function (a) {
    var c, d, g, b = this, e = 0;
    return b.slideOffset = 0, d = b.$slides.first().outerHeight(), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = -1 * b.slideWidth * b.options.slidesToShow, e = -1 * d * b.options.slidesToShow), 0 !== b.slideCount % b.options.slidesToScroll && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = -1 * (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth, e = -1 * (b.options.slidesToShow - (a - b.slideCount)) * d) : (b.slideOffset = -1 * b.slideCount % b.options.slidesToScroll * b.slideWidth, e = -1 * b.slideCount % b.options.slidesToScroll * d))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? -1 * a * b.slideWidth + b.slideOffset : -1 * a * d + e, b.options.variableWidth === !0 && (g = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = g[0] ? -1 * g[0].offsetLeft : 0, b.options.centerMode === !0 && (g = b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = g[0] ? -1 * g[0].offsetLeft : 0, c += (b.$list.width() - g.outerWidth()) / 2)), c
  }, b.prototype.getNavigableIndexes = function () {
    for (var a = this, b = 0, c = 0, d = []; b < a.slideCount;)d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    return d
  }, b.prototype.getSlideCount = function () {
    var c, b = this;
    if (b.options.swipeToSlide === !0) {
      var d = null;
      return b.$slideTrack.find(".slick-slide").each(function (c, e) {
        return e.offsetLeft + a(e).outerWidth() / 2 > -1 * b.swipeLeft ? (d = e, !1) : void 0
      }), c = Math.abs(a(d).attr("index") - b.currentSlide)
    }
    return b.options.slidesToScroll
  }, b.prototype.init = function () {
    var b = this;
    a(b.$slider).hasClass("slick-initialized") || (a(b.$slider).addClass("slick-initialized"), b.buildOut(), b.setProps(), b.startLoad(), b.loadSlider(), b.initializeEvents(), b.updateArrows(), b.updateDots()), null !== b.options.onInit && b.options.onInit.call(this, b)
  }, b.prototype.initArrowEvents = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {message: "previous"}, a.changeSlide), a.$nextArrow.on("click.slick", {message: "next"}, a.changeSlide))
  }, b.prototype.initDotEvents = function () {
    var b = this;
    b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {message: "index"}, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", function () {
      b.paused = !0, b.autoPlayClear()
    }).on("mouseleave.slick", function () {
      b.paused = !1, b.autoPlay()
    })
  }, b.prototype.initializeEvents = function () {
    var b = this;
    b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {action: "start"}, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {action: "move"}, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {action: "end"}, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), b.options.pauseOnHover === !0 && b.options.autoplay === !0 && (b.$list.on("mouseenter.slick", function () {
      b.paused = !0, b.autoPlayClear()
    }), b.$list.on("mouseleave.slick", function () {
      b.paused = !1, b.autoPlay()
    })), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.options.slide, b.$slideTrack).on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, function () {
      b.checkResponsive(), b.setPosition()
    }), a(window).on("resize.slick.slick-" + b.instanceUid, function () {
      a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
        b.windowWidth = a(window).width(), b.checkResponsive(), b.setPosition()
      }, 50))
    }), a("*[draggable!=true]", b.$slideTrack).on("dragstart", function (a) {
      a.preventDefault()
    }), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.initUI = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
  }, b.prototype.keyHandler = function (a) {
    var b = this;
    37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({data: {message: "previous"}}) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({data: {message: "next"}})
  }, b.prototype.lazyLoad = function () {
    function g(b) {
      a("img[data-lazy]", b).each(function () {
        var b = a(this), c = a(this).attr("data-lazy");
        b.load(function () {
          b.animate({opacity: 1}, 200)
        }).css({opacity: 0}).attr("src", c).removeAttr("data-lazy").removeClass("slick-loading")
      })
    }

    var c, d, e, f, b = this;
    b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
  }, b.prototype.loadSlider = function () {
    var a = this;
    a.setPosition(), a.$slideTrack.css({opacity: 1}), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
  }, b.prototype.postSlide = function (a) {
    var b = this;
    null !== b.options.onAfterChange && b.options.onAfterChange.call(this, b, a), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay()
  }, b.prototype.progressiveLazyLoad = function () {
    var c, d, b = this;
    c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function () {
      d.removeAttr("data-lazy"), b.progressiveLazyLoad()
    }).error(function () {
      d.removeAttr("data-lazy"), b.progressiveLazyLoad()
    }))
  }, b.prototype.refresh = function () {
    var b = this, c = b.currentSlide;
    b.destroy(), a.extend(b, b.initials), b.init(), b.changeSlide({data: {message: "index", index: c}}, !0)
  }, b.prototype.reinit = function () {
    var b = this;
    b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.options.focusOnSelect === !0 && a(b.options.slide, b.$slideTrack).on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), null !== b.options.onReInit && b.options.onReInit.call(this, b)
  }, b.prototype.removeSlide = function (a, b, c) {
    var d = this;
    return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, d.reinit(), void 0)
  }, b.prototype.setCSS = function (a) {
    var d, e, b = this, c = {};
    b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? a + "px" : "0px", e = "top" == b.positionProp ? a + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
  }, b.prototype.setDimensions = function () {
    var b = this;
    if (b.options.vertical === !1 ? b.options.centerMode === !0 && b.$list.css({padding: "0px " + b.options.centerPadding}) : (b.$list.height(b.$slides.first().outerHeight(!0) * b.options.slidesToShow), b.options.centerMode === !0 && b.$list.css({padding: b.options.centerPadding + " 0px"})), b.listWidth = b.$list.width(), b.listHeight = b.$list.height(), b.options.vertical === !1 && b.options.variableWidth === !1)b.slideWidth = Math.ceil(b.listWidth / b.options.slidesToShow), b.$slideTrack.width(Math.ceil(b.slideWidth * b.$slideTrack.children(".slick-slide").length)); else if (b.options.variableWidth === !0) {
      var c = 0;
      b.slideWidth = Math.ceil(b.listWidth / b.options.slidesToShow), b.$slideTrack.children(".slick-slide").each(function () {
        c += Math.ceil(a(this).outerWidth(!0))
      }), b.$slideTrack.width(Math.ceil(c) + 1)
    } else b.slideWidth = Math.ceil(b.listWidth), b.$slideTrack.height(Math.ceil(b.$slides.first().outerHeight(!0) * b.$slideTrack.children(".slick-slide").length));
    var d = b.$slides.first().outerWidth(!0) - b.$slides.first().width();
    b.options.variableWidth === !1 && b.$slideTrack.children(".slick-slide").width(b.slideWidth - d)
  }, b.prototype.setFade = function () {
    var c, b = this;
    b.$slides.each(function (d, e) {
      c = -1 * b.slideWidth * d, b.options.rtl === !0 ? a(e).css({
        position: "relative",
        right: c,
        top: 0,
        zIndex: 800,
        opacity: 0
      }) : a(e).css({position: "relative", left: c, top: 0, zIndex: 800, opacity: 0})
    }), b.$slides.eq(b.currentSlide).css({zIndex: 900, opacity: 1})
  }, b.prototype.setHeight = function () {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.css("height", b)
    }
  }, b.prototype.setPosition = function () {
    var a = this;
    a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), null !== a.options.onSetPosition && a.options.onSetPosition.call(this, a)
  }, b.prototype.setProps = function () {
    var a = this, b = document.body.style;
    a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType && a.animType !== !1
  }, b.prototype.setSlideClasses = function (a) {
    var c, d, e, f, b = this;
    b.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), d = b.$slider.find(".slick-slide"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active") : d.length <= b.options.slidesToShow ? d.addClass("slick-active") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
  }, b.prototype.setupInfinite = function () {
    var c, d, e, b = this;
    if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
      for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1)d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
      for (c = 0; e > c; c += 1)d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
      b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        a(this).attr("id", "")
      })
    }
  }, b.prototype.selectHandler = function (b) {
    var c = this, d = parseInt(a(b.target).parents(".slick-slide").attr("index"));
    return d || (d = 0), c.slideCount <= c.options.slidesToShow ? (c.$slider.find(".slick-slide").removeClass("slick-active"), c.$slides.eq(d).addClass("slick-active"), c.options.centerMode === !0 && (c.$slider.find(".slick-slide").removeClass("slick-center"), c.$slides.eq(d).addClass("slick-center")), c.asNavFor(d), void 0) : (c.slideHandler(d), void 0)
  }, b.prototype.slideHandler = function (a, b, c) {
    var d, e, f, g, i = null, j = this;
    return b = b || !1, j.animating === !0 && j.options.waitForAnimate === !0 || j.options.fade === !0 && j.currentSlide === a || j.slideCount <= j.options.slidesToShow ? void 0 : (b === !1 && j.asNavFor(a), d = a, i = j.getLeft(d), g = j.getLeft(j.currentSlide), j.currentLeft = null === j.swipeLeft ? g : j.swipeLeft, j.options.infinite === !1 && j.options.centerMode === !1 && (0 > a || a > j.getDotCount() * j.options.slidesToScroll) ? (j.options.fade === !1 && (d = j.currentSlide, c !== !0 ? j.animateSlide(g, function () {
      j.postSlide(d)
    }) : j.postSlide(d)), void 0) : j.options.infinite === !1 && j.options.centerMode === !0 && (0 > a || a > j.slideCount - j.options.slidesToScroll) ? (j.options.fade === !1 && (d = j.currentSlide, c !== !0 ? j.animateSlide(g, function () {
      j.postSlide(d)
    }) : j.postSlide(d)), void 0) : (j.options.autoplay === !0 && clearInterval(j.autoPlayTimer), e = 0 > d ? 0 !== j.slideCount % j.options.slidesToScroll ? j.slideCount - j.slideCount % j.options.slidesToScroll : j.slideCount + d : d >= j.slideCount ? 0 !== j.slideCount % j.options.slidesToScroll ? 0 : d - j.slideCount : d, j.animating = !0, null !== j.options.onBeforeChange && a !== j.currentSlide && j.options.onBeforeChange.call(this, j, j.currentSlide, e), f = j.currentSlide, j.currentSlide = e, j.setSlideClasses(j.currentSlide), j.updateDots(), j.updateArrows(), j.options.fade === !0 ? (c !== !0 ? j.fadeSlide(f, e, function () {
      j.postSlide(e)
    }) : j.postSlide(e), void 0) : (c !== !0 ? j.animateSlide(i, function () {
      j.postSlide(e)
    }) : j.postSlide(e), void 0)))
  }, b.prototype.startLoad = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
  }, b.prototype.swipeDirection = function () {
    var a, b, c, d, e = this;
    return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : "vertical"
  }, b.prototype.swipeEnd = function () {
    var b = this;
    if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX)return !1;
    if (b.touchObject.swipeLength >= b.touchObject.minSwipe)switch (b.swipeDirection()) {
      case"left":
        b.slideHandler(b.currentSlide + b.getSlideCount()), b.currentDirection = 0, b.touchObject = {};
        break;
      case"right":
        b.slideHandler(b.currentSlide - b.getSlideCount()), b.currentDirection = 1, b.touchObject = {}
    } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
  }, b.prototype.swipeHandler = function (a) {
    var b = this;
    if (!(b.options.swipe === !1 || "ontouchend"in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse")))switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, a.data.action) {
      case"start":
        b.swipeStart(a);
        break;
      case"move":
        b.swipeMove(a);
        break;
      case"end":
        b.swipeEnd(a)
    }
  }, b.prototype.swipeMove = function (a) {
    var c, d, e, f, b = this;
    return f = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || f && 1 !== f.length ? !1 : (c = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX, b.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), d = b.swipeDirection(), "vertical" !== d ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), e = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.swipeLeft = b.options.vertical === !1 ? c + b.touchObject.swipeLength * e : c + b.touchObject.swipeLength * (b.$list.height() / b.listWidth) * e, b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : (b.setCSS(b.swipeLeft), void 0)) : void 0)
  }, b.prototype.swipeStart = function (a) {
    var c, b = this;
    return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, b.dragging = !0, void 0)
  }, b.prototype.unfilterSlides = function () {
    var a = this;
    null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
  }, b.prototype.unload = function () {
    var b = this;
    a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && "object" != typeof b.options.prevArrow && b.$prevArrow.remove(), b.$nextArrow && "object" != typeof b.options.nextArrow && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "")
  }, b.prototype.updateArrows = function () {
    var b, a = this;
    b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.options.infinite !== !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.removeClass("slick-disabled"), a.$nextArrow.removeClass("slick-disabled"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled"), a.$nextArrow.removeClass("slick-disabled")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled"), a.$prevArrow.removeClass("slick-disabled")) : a.currentSlide > a.slideCount - a.options.slidesToShow + b && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled"), a.$prevArrow.removeClass("slick-disabled")))
  }, b.prototype.updateDots = function () {
    var a = this;
    null !== a.$dots && (a.$dots.find("li").removeClass("slick-active"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active"))
  }, a.fn.slick = function (a) {
    var c = this;
    return c.each(function (c, d) {
      d.slick = new b(d, a)
    })
  }, a.fn.slickAdd = function (a, b, c) {
    var d = this;
    return d.each(function (d, e) {
      e.slick.addSlide(a, b, c)
    })
  }, a.fn.slickCurrentSlide = function () {
    var a = this;
    return a.get(0).slick.getCurrent()
  }, a.fn.slickFilter = function (a) {
    var b = this;
    return b.each(function (b, c) {
      c.slick.filterSlides(a)
    })
  }, a.fn.slickGoTo = function (a, b) {
    var c = this;
    return c.each(function (c, d) {
      d.slick.changeSlide({data: {message: "index", index: parseInt(a)}}, b)
    })
  }, a.fn.slickNext = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick.changeSlide({data: {message: "next"}})
    })
  }, a.fn.slickPause = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick.autoPlayClear(), b.slick.paused = !0
    })
  }, a.fn.slickPlay = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick.paused = !1, b.slick.autoPlay()
    })
  }, a.fn.slickPrev = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick.changeSlide({data: {message: "previous"}})
    })
  }, a.fn.slickRemove = function (a, b) {
    var c = this;
    return c.each(function (c, d) {
      d.slick.removeSlide(a, b)
    })
  }, a.fn.slickRemoveAll = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick.removeSlide(null, null, !0)
    })
  }, a.fn.slickGetOption = function (a) {
    var b = this;
    return b.get(0).slick.options[a]
  }, a.fn.slickSetOption = function (a, b, c) {
    var d = this;
    return d.each(function (d, e) {
      e.slick.options[a] = b, c === !0 && (e.slick.unload(), e.slick.reinit())
    })
  }, a.fn.slickUnfilter = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick.unfilterSlides()
    })
  }, a.fn.unslick = function () {
    var a = this;
    return a.each(function (a, b) {
      b.slick && b.slick.destroy()
    })
  }, a.fn.getSlick = function () {
    var a = null, b = this;
    return b.each(function (b, c) {
      a = c.slick
    }), a
  }
});


/* All functions in this file are used only for charts.html */
var D3Charts = function () {

  // Init Flot Chart Plugins
  var runD3Plugins = function () {

    // Plugin 1

  };

  // Init Flot Charts Plugin
  var runD3Charts = function () {

    // Add a series of colors to be used in the charts and pie graphs
    var Colors = [bgPrimary, bgInfo, bgWarning, bgAlert, bgDanger, bgSystem, bgSuccess,];

    // Line Chart
    var chart1 = c3.generate({
      bindto: '#line-chart',
      color: {
        pattern: Colors,
      },
      point: {
        r: 3
      },
      padding: {
        left: 30,
        right: 30,
        top: 0,
        bottom: 0,
      },
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ],
        axes: {
          data1: 'y',
          data2: 'y2',
        }
      },
      axis: {
        x: {
          label: 'X Label'
        },
        y: {
          label: {
            text: 'Y Axis Label',
            position: 'outer-middle'
          }
        },
        y2: {
          show: true,
          label: {
            text: 'Y2 Axis Label',
            position: 'outer-middle'
          }
        }
      }
    });


    // Area Chart
    var chart2 = c3.generate({
      bindto: '#area-chart',
      color: {
        pattern: Colors,
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0,
      },
      data: {
        columns: [
          ['data1', 300, 350, 300, 0, 0, 0],
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        types: {
          data1: 'area',
          data2: 'area-spline'
        }
      }
    });


    // Step Chart
    var chart3 = c3.generate({
      bindto: '#step-chart',
      color: {
        pattern: Colors,
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0,
      },
      data: {
        columns: [
          ['data1', 300, 350, 300, 0, 0, 100],
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        types: {
          data1: 'step',
          data2: 'area-step'
        }
      }
    });


    // Bar Chart
    var chart4 = c3.generate({
      bindto: '#bar-chart',
      color: {
        pattern: Colors,
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0,
      },
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      }
    });
    setTimeout(function () {
      chart4.load({
        columns: [
          ['data3', 130, -150, 200, 300, -200, 100]
        ]
      });
    }, 1000);


    // TimeSeries Chart
    var chart5 = c3.generate({
      bindto: '#timeseries-chart',
      color: {
        pattern: Colors,
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0,
      },
      data: {
        x: 'x',
        // xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
          ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
          // ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 340, 200, 500, 250, 350]
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });


    // Scatter Chart
    var chart6 = c3.generate({
      bindto: '#scatter-chart',
      color: {
        pattern: Colors,
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0,
      },
      data: {
        xs: {
          setosa: 'setosa_x',
          versicolor: 'versicolor_x',
        },
        // iris data from R
        columns: [
          ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
          ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
          ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
          ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ],
        type: 'scatter'
      },
      axis: {
        x: {
          label: 'Sepal.Width',
          tick: {
            fit: false
          }
        },
        y: {
          label: 'Petal.Width'
        }
      }
    });

    // Spline Chart
    var chart7 = c3.generate({
      bindto: '#spline-chart',
      color: {
        pattern: Colors
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0
      },
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'spline'
      }
    });


    // Sub Navigation Chart
    var chart8 = c3.generate({
      bindto: '#subnav-chart',
      color: {
        pattern: Colors
      },
      padding: {
        left: 25,
        right: 15,
        top: 0,
        bottom: 0
      },
      data: {
        columns: [
          ['sample', 30, 200, 100, 400, 150, 250]
        ]
      },
      subchart: {
        show: true
      }
    });


    // MouseWheel Zoom
    var chart9 = c3.generate({
      bindto: '#zoom-chart',
      color: {
        pattern: Colors
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0
      },
      data: {
        columns: [
          ['sample', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
        ]
      },
      zoom: {
        enabled: true
      }
    });


    // Donut Chart
    var chart10 = c3.generate({
      bindto: '#donut-chart',
      color: {
        pattern: Colors
      },
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120]
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      donut: {
        title: "Iris Petal Width"
      }
    });

    // Guage Chart
    var chart11 = c3.generate({
      bindto: '#guage-chart',
      color: {
        pattern: Colors,
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      data: {
        columns: [
          ['data', 91.4]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      size: {
        height: 180
      }
    });

    // Pie Chart
    var chart12 = c3.generate({
      bindto: '#pie-chart',
      color: {
        pattern: Colors
      },
      data: {
        // iris data from R
        columns: [
          ['data1', 30],
          ['data2', 120]
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      }
    });


    // Combination Chart
    var chart13 = c3.generate({
      bindto: '#combo-chart',
      color: {
        pattern: Colors
      },
      padding: {
        left: 30,
        right: 15,
        top: 0,
        bottom: 0
      },
      data: {
        columns: [
          ['data1', 30, 20, 50, 40, 60, 50],
          ['data2', 200, 130, 90, 240, 130, 220],
          ['data3', 300, 200, 160, 400, 250, 250],
          ['data4', 200, 130, 90, 240, 130, 220],
          ['data5', 130, 120, 150, 140, 160, 150],
          ['data6', 90, 70, 20, 50, 60, 120]
        ],
        type: 'bar',
        types: {
          data3: 'spline',
          data4: 'line',
          data6: 'area'
        },
        groups: [
          ['data1','data2']
        ]
      }
    });

  };

  return {
    init: function () {
      runD3Plugins();
      runD3Charts();
    }
  };
}();