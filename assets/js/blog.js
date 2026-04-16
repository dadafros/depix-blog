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
          // Clear active tags + close overflow dropdown
          if (tagFilter) {
            var btns = tagFilter.querySelectorAll('.tag-filter-btn');
            for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
            var dd = document.getElementById('tag-overflow-dropdown');
            var tb = document.getElementById('tag-overflow-toggle');
            if (dd) dd.classList.add('hidden');
            if (tb) { tb.classList.remove('open'); tb.classList.remove('has-active'); tb.setAttribute('aria-expanded', 'false'); }
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

    var toggleBtn = document.getElementById('tag-overflow-toggle');
    var dropdown = document.getElementById('tag-overflow-dropdown');

    function updateOverflowToggleStyle() {
      if (!toggleBtn || !dropdown) return;
      var hasActive = dropdown.querySelector('.tag-filter-btn.active') !== null;
      toggleBtn.classList.toggle('has-active', hasActive);
    }

    function getActiveTags() {
      var active = filterEl.querySelectorAll('.tag-filter-btn.active[data-tag]');
      var tags = [];
      for (var i = 0; i < active.length; i++) tags.push(active[i].dataset.tag);
      return tags;
    }

    // Empty-state element for tag filter (created once, reused)
    var tagEmptyEl = document.createElement('p');
    tagEmptyEl.className = 'search-empty tag-filter-empty hidden';
    tagEmptyEl.textContent = lang === 'pt' ? 'Nenhum post com todas as tags selecionadas.' : 'No posts match all selected tags.';
    filterEl.parentNode.insertBefore(tagEmptyEl, filterEl.nextSibling);

    function filterPosts() {
      var activeTags = getActiveTags();
      if (!activeTags.length) {
        for (var j = 0; j < postCards.length; j++) postCards[j].classList.remove('hidden');
        tagEmptyEl.classList.add('hidden');
        return;
      }
      var visibleCount = 0;
      for (var k = 0; k < postCards.length; k++) {
        var cardTags = postCards[k].dataset.tags ? postCards[k].dataset.tags.split(',') : [];
        var matchAll = true;
        for (var t = 0; t < activeTags.length; t++) {
          if (cardTags.indexOf(activeTags[t]) === -1) { matchAll = false; break; }
        }
        postCards[k].classList.toggle('hidden', !matchAll);
        if (matchAll) visibleCount++;
      }
      // Show empty message but keep all posts visible below it
      if (visibleCount === 0) {
        tagEmptyEl.classList.remove('hidden');
        for (var m = 0; m < postCards.length; m++) postCards[m].classList.remove('hidden');
      } else {
        tagEmptyEl.classList.add('hidden');
      }
    }

    // Overflow dropdown toggle
    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = !dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden', isOpen);
        toggleBtn.classList.toggle('open', !isOpen);
        toggleBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.classList.contains('hidden') &&
            !dropdown.contains(e.target) &&
            !toggleBtn.contains(e.target)) {
          dropdown.classList.add('hidden');
          toggleBtn.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Tag click handler — multi-select
    filterEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.tag-filter-btn[data-tag]');
      if (!btn) return;

      // Clear search
      var input = document.getElementById('search-input');
      if (input) input.value = '';
      var resultsEl = document.getElementById('search-results');
      if (resultsEl) { resultsEl.classList.add('hidden'); resultsEl.innerHTML = ''; }
      var postList = document.querySelector('.post-list');
      if (postList) postList.classList.remove('hidden');
      var sectionTitle = document.querySelector('.section-title');
      if (sectionTitle) sectionTitle.classList.remove('hidden');

      btn.classList.toggle('active');
      filterPosts();
      updateOverflowToggleStyle();
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
      var expanded = toc.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
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
