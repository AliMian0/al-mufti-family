// Al-Mufti Mian Family website — vanilla JS, no dependencies.
document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('copyright-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---- Gallery tabs (Videos / Images) ---- */
  var tabButtons = document.querySelectorAll('.gallery-tabs button');
  var panels = document.querySelectorAll('.gallery-panel');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.remove('is-active'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var target = document.getElementById(btn.dataset.target);
      if (target) target.classList.add('is-active');
    });
  });

  /* ---- Lightbox for videos + images ---- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var content = lightbox.querySelector('.lightbox-content');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    function openLightbox(node) {
      content.innerHTML = '';
      content.appendChild(node);
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      content.innerHTML = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.video-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var src = tile.dataset.video;
        var video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        openLightbox(video);
      });
    });

    document.querySelectorAll('.image-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var src = tile.dataset.full || tile.querySelector('img').src;
        var img = document.createElement('img');
        img.src = src;
        img.alt = tile.querySelector('img').alt || '';
        openLightbox(img);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

});
