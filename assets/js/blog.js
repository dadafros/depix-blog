(function () {
  'use strict';

  var lang = document.documentElement.lang || 'pt';

  /* ---- Utilities ---- */
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* ---- Search ---- */
  var searchIndex = null;

  function loadIndex() {
    if (searchIndex) return Promise.resolve(searchIndex);
    return fetch('/' + lang + '/index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { searchIndex = data; return data; })
      .catch(function () { return []; });
  }

  function searchPosts(query, posts) {
    var terms = normalize(query).split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!terms.length) return [];
    var results = [];
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i];
      var title = normalize(p.title);
      var desc = normalize(p.description || '');
      var tags = normalize((p.tags || []).join(' '));
      var content = normalize(p.content || '');
      var score = 0;
      var allMatch = true;
      for (var j = 0; j < terms.length; j++) {
        var t = terms[j];
        var inTitle = title.indexOf(t) !== -1;
        var inTags = tags.indexOf(t) !== -1;
        var inDesc = desc.indexOf(t) !== -1;
        var inContent = content.indexOf(t) !== -1;
        if (!inTitle && !inTags && !inDesc && !inContent) { allMatch = false; break; }
        if (inTitle) score += 10;
        if (inTags) score += 8;
        if (inDesc) score += 5;
        if (inContent) score += 1;
      }
      if (allMatch && score > 0) results.push({ post: p, score: score });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results;
  }

  function renderCard(p) {
    var readLabel = lang === 'pt' ? 'de leitura' : 'read';
    return '<article class="post-card">' +
      '<a href="' + esc(p.url) + '" class="post-card-link"><div class="post-card-body">' +
      '<div class="post-card-meta"><time class="post-meta">' + esc(p.date) + '</time>' +
      '<span class="meta-dot">&middot;</span>' +
      '<span class="post-meta">' + esc(p.readingTime) + ' min ' + readLabel + '</span></div>' +
      '<h2 class="post-card-title">' + esc(p.title) + '</h2>' +
      (p.description ? '<p class="post-card-excerpt">' + esc(p.description) + '</p>' : '') +
      '</div></a></article>';
  }

  function initSearch() {
    var input = document.getElementById('search-input');
    var resultsEl = document.getElementById('search-results');
    var postList = document.querySelector('.post-list');
    var sectionTitle = document.querySelector('.section-title');
    var tagFilter = document.getElementById('tag-filter');
    if (!input) return;

    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      var q = this.value.trim();
      if (q.length > 200) q = q.substring(0, 200);
      if (!q) {
        if (resultsEl) { resultsEl.classList.add('hidden'); resultsEl.innerHTML = ''; }
        if (postList) postList.classList.remove('hidden');
        if (sectionTitle) sectionTitle.classList.remove('hidden');
        if (tagFilter) tagFilter.classList.remove('hidden');
        return;
      }
      timer = setTimeout(function () {
        loadIndex().then(function (index) {
          var matches = searchPosts(q, index);
          if (postList) postList.classList.add('hidden');
          if (sectionTitle) sectionTitle.classList.add('hidden');
          if (tagFilter) tagFilter.classList.add('hidden');
          if (resultsEl) {
            resultsEl.classList.remove('hidden');
            if (!matches.length) {
              var msg = lang === 'pt' ? 'Nenhum resultado encontrado.' : 'No results found.';
              resultsEl.innerHTML = '<p class="search-empty">' + msg + '</p>';
            } else {
              resultsEl.innerHTML = matches.map(function (m) { return renderCard(m.post); }).join('');
            }
          }
          // Clear active tag
          if (tagFilter) {
            var btns = tagFilter.querySelectorAll('.tag-filter-btn');
            for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
          }
        });
      }, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { this.value = ''; this.dispatchEvent(new Event('input')); this.blur(); }
    });
  }

  /* ---- Tag Filter ---- */
  function initTagFilter() {
    var filterEl = document.getElementById('tag-filter');
    var postCards = document.querySelectorAll('.post-list .post-card');
    if (!filterEl || !postCards.length) return;

    filterEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.tag-filter-btn');
      if (!btn) return;

      var tag = btn.dataset.tag;
      var wasActive = btn.classList.contains('active');
      var btns = filterEl.querySelectorAll('.tag-filter-btn');
      for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');

      // Clear search
      var input = document.getElementById('search-input');
      if (input) input.value = '';
      var resultsEl = document.getElementById('search-results');
      if (resultsEl) { resultsEl.classList.add('hidden'); resultsEl.innerHTML = ''; }
      var postList = document.querySelector('.post-list');
      if (postList) postList.classList.remove('hidden');
      var sectionTitle = document.querySelector('.section-title');
      if (sectionTitle) sectionTitle.classList.remove('hidden');

      if (wasActive) {
        for (var j = 0; j < postCards.length; j++) postCards[j].classList.remove('hidden');
        return;
      }

      btn.classList.add('active');
      for (var k = 0; k < postCards.length; k++) {
        var cardTags = postCards[k].dataset.tags ? postCards[k].dataset.tags.split(',') : [];
        postCards[k].classList.toggle('hidden', cardTags.indexOf(tag) === -1);
      }
    });
  }

  /* ---- Back to Top ---- */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Table of Contents ---- */
  function initToC() {
    var toc = document.getElementById('toc');
    if (!toc) return;
    var toggle = toc.querySelector('.toc-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      toc.classList.toggle('open');
    });
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initSearch();
    initTagFilter();
    initBackToTop();
    initToC();
  });
})();
