'use strict';
const linksManipulate = function () {
  const pages = document.querySelectorAll('.main');
  const links = document.querySelectorAll('.nav__link');
  const linkProjects = document.querySelector('.link-projects');
  // Async Time-out f-on
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  let currentPage = 0;

  const openPage = async function (pageNumber) {
    try {
      pages.forEach(p => p.classList.remove('fadeIn'));
      await wait(1.5);
      pages[pageNumber].classList.add('fadeIn');
      pages[pageNumber].style.display = 'grid';
      activateLink(pageNumber);
    } catch (err) {
      console.error(err);
    }
  };

  const activateLink = function (pageNumber) {
    links.forEach(l => l.classList.remove('active'));
    links[pageNumber].classList.add('active');
  };

  const closePage = async function (pageNumber) {
    try {
      pages.forEach(p => p.classList.remove('fadeOut'));
      // pages.forEach(p => (p.style.display = 'none'));
      pages[pageNumber].classList.add('fadeOut');
      await wait(1);
      pages[pageNumber].style.display = 'none';
    } catch (err) {
      console.error(err);
    }
  };

  links.forEach(l => {
    // Handling the click event
    l.addEventListener('click', function (e) {
      e.preventDefault();
      // Guard clause
      if (l.classList.contains('active')) return;
      const clickedElId = l.getAttribute('href').slice(1);
      if (clickedElId === 'about') {
        closePage(currentPage);
        currentPage = 1;
        openPage(currentPage);
      } else if (clickedElId === 'projects') {
        closePage(currentPage);
        currentPage = 2;
        openPage(currentPage);
      } else if (clickedElId === 'home') {
        closePage(currentPage);
        currentPage = 0;
        openPage(currentPage);
      }
    });
  });

  linkProjects.addEventListener('click', function (e) {
    e.preventDefault();
    closePage(0);
    openPage(2);
  });
  closePage(0);
  openPage(currentPage);
};
const homeAnimation = function () {
  /*
  Copyright (c) 2016 Niklas Knaack
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

  !(function () {
    function t(t, e) {
      function n() {
        (A = document.createElementNS(E, 'svg')),
          A.addEventListener('mousemove', v),
          t.appendChild(A),
          p.bgDraw &&
            ((P = document.createElementNS(E, 'rect')),
            P.setAttribute('x', 0),
            P.setAttribute('y', 0),
            P.setAttribute('fill', p.bgColor),
            A.appendChild(P)),
          a(),
          i(),
          d(),
          window.addEventListener('resize', y);
      }
      function i() {
        var e =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
          n =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
          i = e,
          r = n;
        p.width.toString().indexOf('%') > 0 ||
        p.height.toString().indexOf('%') > 0
          ? ((i = Math.round((t.offsetWidth / 100) * parseInt(p.width))),
            (r = Math.round((i / 100) * parseInt(p.height))))
          : ((i = parseInt(p.width)), (r = parseInt(p.height))),
          i >= e && (i = e),
          r >= n && (r = n),
          (b = { x: i / 2, y: r / 2 }),
          (O.x = p.speed / b.x),
          (O.y = p.speed / b.y),
          (w =
            i >= r
              ? (r / 100) * parseInt(p.radius)
              : (i / 100) * parseInt(p.radius)),
          1 > w && (w = 1),
          (x = w / 2),
          x < p.radiusMin && ((x = p.radiusMin), (w = 2 * x)),
          A.setAttribute('width', i),
          A.setAttribute('height', r),
          p.bgDraw && (P.setAttribute('width', i), P.setAttribute('height', r)),
          o(x);
      }
      function o(t) {
        for (var e = 0, n = S.length; n > e; e++) r(S[e], t);
      }
      function r(t, e) {
        var n = t.vectorPosition.x - C.x,
          i = t.vectorPosition.y - C.y,
          o = t.vectorPosition.z - C.z,
          r = Math.sqrt(n * n + i * i + o * o);
        (t.vectorPosition.x /= r),
          (t.vectorPosition.y /= r),
          (t.vectorPosition.z /= r),
          (t.vectorPosition.x *= e),
          (t.vectorPosition.y *= e),
          (t.vectorPosition.z *= e);
      }
      function s(t, e, n, i, o) {
        var r = {};
        return (
          (r.element = document.createElementNS(E, 'text')),
          r.element.setAttribute('x', 0),
          r.element.setAttribute('y', 0),
          r.element.setAttribute('fill', p.fontColor),
          r.element.setAttribute('font-family', p.fontFamily),
          r.element.setAttribute('font-size', p.fontSize),
          r.element.setAttribute('font-weight', p.fontWeight),
          r.element.setAttribute('font-style', p.fontStyle),
          r.element.setAttribute('font-stretch', p.fontStretch),
          r.element.setAttribute('text-anchor', 'middle'),
          (r.element.textContent = p.fontToUpperCase
            ? e.label.toUpperCase()
            : e.label),
          (r.link = document.createElementNS(E, 'a')),
          r.link.setAttributeNS(
            'http://www.w3.org/1999/xlink',
            'xlink:href',
            e.url
          ),
          r.link.setAttribute('target', e.target),
          // To prevent fading out other elements comment line below
          r.link.addEventListener('mouseover', f, !0),
          r.link.addEventListener('mouseout', h, !0),
          r.link.appendChild(r.element),
          (r.index = t),
          (r.mouseOver = !1),
          (r.vectorPosition = { x: n, y: i, z: o }),
          (r.vector2D = { x: 0, y: 0 }),
          A.appendChild(r.link),
          r
        );
      }
      function a() {
        for (var t = 1, e = p.entries.length + 1; e > t; t++) {
          var n = Math.acos(-1 + (2 * t - 1) / e),
            i = Math.sqrt(e * Math.PI) * n,
            o = Math.cos(i) * Math.sin(n),
            r = Math.sin(i) * Math.sin(n),
            a = Math.cos(n),
            u = s(t - 1, p.entries[t - 1], o, r, a);
          S.push(u);
        }
      }
      function u(t) {
        for (var e = 0, n = S.length; n > e; e++) {
          var i = S[e];
          if (
            i.element.getAttribute('x') === t.getAttribute('x') &&
            i.element.getAttribute('y') === t.getAttribute('y')
          )
            return i;
        }
      }
      function c(t) {
        for (var e = u(t), n = 0, i = S.length; i > n; n++) {
          var o = S[n];
          o.index === e.index ? (o.mouseOver = !0) : (o.mouseOver = !1);
        }
      }
      function l() {
        var t = O.x * z.x - p.speed,
          e = p.speed - O.y * z.y,
          n = t * k,
          i = e * k;
        (D.sx = Math.sin(n)),
          (D.cx = Math.cos(n)),
          (D.sy = Math.sin(i)),
          (D.cy = Math.cos(i));
        for (var o = 0, r = S.length; r > o; o++) {
          var s = S[o];
          if (M) {
            var a = s.vectorPosition.x,
              u = s.vectorPosition.y * D.sy + s.vectorPosition.z * D.cy;
            (s.vectorPosition.x = a * D.cx + u * D.sx),
              (s.vectorPosition.y =
                s.vectorPosition.y * D.cy + s.vectorPosition.z * -D.sy),
              (s.vectorPosition.z = a * -D.sx + u * D.cx);
          }
          var c = p.fov / (p.fov + s.vectorPosition.z);
          (s.vector2D.x = s.vectorPosition.x * c + b.x),
            (s.vector2D.y = s.vectorPosition.y * c + b.y),
            s.element.setAttribute('x', s.vector2D.x),
            s.element.setAttribute('y', s.vector2D.y);
          var l;
          M
            ? ((l = (x - s.vectorPosition.z) / w),
              l < p.opacityOut && (l = p.opacityOut))
            : ((l = parseFloat(s.element.getAttribute('opacity'))),
              (l += s.mouseOver
                ? (p.opacityOver - l) / p.opacitySpeed
                : (p.opacityOut - l) / p.opacitySpeed)),
            s.element.setAttribute('opacity', l);
        }
        S = S.sort(function (t, e) {
          return e.vectorPosition.z - t.vectorPosition.z;
        });
      }
      function d() {
        requestAnimFrame(d), l();
      }
      function f(t) {
        (M = !1), c(t.target);
      }
      function h(t) {
        M = !0;
      }
      function v(t) {
        z = m(A, t);
      }
      function m(t, e) {
        var n = t.getBoundingClientRect();
        return { x: e.clientX - n.left, y: e.clientY - n.top };
      }
      function y(t) {
        i();
      }
      var p = {
        entries: [],
        width: 480,
        height: 480,
        radius: '70%',
        radiusMin: 75,
        bgDraw: !0,
        bgColor: '#000',
        opacityOver: 1,
        opacityOut: 0.05,
        opacitySpeed: 6,
        fov: 800,
        speed: 2,
        fontFamily: 'Arial, sans-serif',
        fontSize: '15',
        fontColor: '#fff',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontToUpperCase: !1,
      };
      if (void 0 !== e)
        for (var g in e)
          e.hasOwnProperty(g) && p.hasOwnProperty(g) && (p[g] = e[g]);
      if (!p.entries.length) return !1;
      var x,
        w,
        b,
        A,
        P,
        S = [],
        M = !0,
        z = { x: 0, y: 0 },
        C = { x: 0, y: 0, z: 0 },
        O = { x: 0, y: 0 },
        D = { sx: 0, cx: 0, sy: 0, cy: 0 },
        k = Math.PI / 180,
        E = 'http://www.w3.org/2000/svg';
      (window.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (t) {
            window.setTimeout(t, 1e3 / 60);
          }
        );
      })()),
        n();
    }
    window.SVG3DTagCloud = t;
  })(),
    'undefined' != typeof jQuery &&
      !(function (t) {
        t.fn.svg3DTagCloud = function (e) {
          return this.each(function () {
            t.data(this, 'plugin_SVG3DTagCloud') ||
              t.data(this, 'plugin_SVG3DTagCloud', new SVG3DTagCloud(this, e));
          });
        };
      })(jQuery);

  function docReady(fn) {
    // see if DOM is already available
    if (
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  docReady(function () {
    // DOM is loaded and ready for manipulation here
    const entries = [
      {
        label: 'HTML',
        url: 'https://en.wikipedia.org/wiki/HTML',
        target: '_blank',
      },
      {
        label: 'CSS',
        url: 'https://en.wikipedia.org/wiki/CSS',
        target: '_blank',
      },
      {
        label: 'Sass',
        url: 'https://en.wikipedia.org/wiki/Sass',
        target: '_blank',
      },
      {
        label: 'JavaScript',
        url: 'https://en.wikipedia.org/wiki/JavaScript',
        target: '_blank',
      },
      {
        label: 'jQuery',
        url: 'https://en.wikipedia.org/wiki/JQuery',
        target: '_blank',
      },
      {
        label: 'Fiddler',
        url: 'https://www.telerik.com/fiddler',
        target: '_blank',
      },
      {
        label: 'Git',
        url: 'https://en.wikipedia.org/wiki/Git',
        target: '_blank',
      },
      {
        label: 'GitHub',
        url: 'https://en.wikipedia.org/wiki/GitHub',
        target: '_blank',
      },
      {
        label: 'Bootstrap',
        url: 'https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)',
        target: '_blank',
      },
      {
        label: 'VSC',
        url: 'https://code.visualstudio.com/',
        target: '_blank',
      },
      {
        label: 'npm',
        url: 'https://www.npmjs.com/',
        target: '_blank',
      },
      {
        label: '_leaflet',
        url: 'https://leafletjs.com/',
        target: '_blank',
      },
      {
        label: 'API',
        url: 'https://en.wikipedia.org/wiki/API',
        target: '_blank',
      },
      {
        label: 'Jira',
        url: 'https://en.wikipedia.org/wiki/Jira_(software)',
        target: '_blank',
      },
      {
        label: 'qTest',
        url: 'https://www.tricentis.com/',
        target: '_blank',
      },
      {
        label: 'Confluence',
        url: 'https://www.atlassian.com/software/confluence',
        target: '_blank',
      },
    ];

    const settings = {
      entries,
      width: 320,
      height: 200,
      radius: '65%',
      bgDraw: true,
      bgColor: 'transparent',
      speed: 1,
      fontColor: '#24fe41',
      fontWeight: 'bold',
    };

    const svg3DTagCloud = new SVG3DTagCloud(
      document.getElementById('tag-cloud'),
      settings
    );
  });
};
const slider = function () {
  const hikingString =
    "Hiking? The experience that I would recommend to everyone. It depends on the location where you go, but there will always be other hikers. In my case, they were all boring, because they don't want to drink Rakia. Where is the point of hiking if you don't get drunk till the top of the mountain? The last time we have been on Rtanj, we decided to go straight down from the top, not to meander along a path that is slightly downhill, and of course that we fell and rolled downhill like idiots, but where is the fun if you are pretending that you are normal?";
  const natureString =
    "I'm a nature lover! My choice between city or nature, cafe or picnic will always be nature where you can see green around yourself and breathe fresh air! Even if I grew up with a dad who has thrown empty bottles and other trash through the window of a car, I don't throw anything outside of the trash can, and my message for you is don't be like my dad!";
  const tableTString =
    'Four years ago I started playing table tennis with my friend Johnny. I would recommend that sport to anyone, because there are small chances to hurt yourself, and you can burn extra kilograms by playing hard. This game is funnier if you are drunk while playing.';
  const rollerString =
    "What to say smart about this... Be careful with i***ts, oops I mean pedestrians who just don't see that they are stepping into, or walking onto the bike path in front of you. And since it is hard to slow down with roller-skates I recommend you to stay strong and to hit the pedestrian hard because 1. He made a mistake by stepping onto the bike path and this is the perfect way for him to learn another lesson in life, and 2. You don't want to lose your head.";
  const pesString =
    "Version 2018, players 🔼, injures: on, game speed 1, opiates ready, and fight can start on the field! Just like in normal football games, I like to shoot from large distances, this image shows that I do the same in PES. Don't forget to throw an eye on Interceptions, Tackles, and Saves, that shows you what I meant when I said fight can start on the field. 😁";
  const motoString = `Motorcycles are not for people who don't see a larger picture than just what is in front of them. I started driving larger moto-bikes when I was 14, without any equipment, I only wore sunglasses, shorts, and a t-shirt. People watched me with admiration, they were like: "Wow, look that kid on a moto-bike!", and most of them asked me how old am I (If I was parked of course). Nowadays people would say my parents are insane, and things like: "he can lose his head by driving that beast". But here I am, still alive, for which is responsible my normal and fast-thinking brain.... Maybe 😜`;

  const sliderTextContent = [
    hikingString,
    natureString,
    tableTString,
    rollerString,
    pesString,
    motoString,
  ];

  const sliderContainer = document.querySelector('.main--2');
  const slides = document.querySelectorAll('.slider__slide');
  const slideText = document.querySelector('.slider__text--ch');

  let curSlide = 0;
  const allSlides = slides.length;

  const activateBtn = function (slide) {
    document
      .querySelectorAll('.slider__btn')
      .forEach(dot => dot.classList.remove('btn--active'));

    document
      .querySelector(`.slider__btn[data-slide="${slide}"]`)
      .classList.add('btn--active');
    // Changing text with slides
    slideText.textContent = sliderTextContent[slide];
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === allSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateBtn(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = allSlides - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateBtn(curSlide);
  };

  const init = function () {
    goToSlide(0);
    activateBtn(0);
  };
  init();

  sliderContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('slider__arrow--left')) prevSlide();
    if (e.target.classList.contains('slider__arrow--right')) nextSlide();
    if (e.target.classList.contains('slider__btn')) {
      goToSlide(e.target.dataset.slide);
      activateBtn(e.target.dataset.slide);
    }
  });
};
const runApp = function () {
  linksManipulate();
  homeAnimation();
  slider();
};
runApp();
