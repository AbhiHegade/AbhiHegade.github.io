(function () {
  'use strict';

  function initTabs() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    const panels = Array.from(document.querySelectorAll('[data-panel]'));
    const tabLinks = Array.from(document.querySelectorAll('.tab-link[data-tab]'));

    if (!panels.length) return;

    const validTabs = new Set(panels.map((panel) => panel.dataset.panel));

    function showTab(tabName, options) {
      const settings = Object.assign({ updateHash: true, scroll: true }, options || {});
      const selectedTab = validTabs.has(tabName) ? tabName : 'home';

      panels.forEach((panel) => {
        const isActive = panel.dataset.panel === selectedTab;
        panel.hidden = !isActive;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      });

      tabLinks.forEach((link) => {
        const isActive = link.dataset.tab === selectedTab;
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });

      document.body.dataset.activeTab = selectedTab;
      if (nav) nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');

      if (settings.updateHash && window.location.hash !== `#${selectedTab}`) {
        history.pushState({ tab: selectedTab }, '', `#${selectedTab}`);
      }

      if (settings.scroll) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }

    tabLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showTab(link.dataset.tab);
      });
    });

    function syncFromLocation() {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        showTab('home', { updateHash: false, scroll: false });
        return;
      }

      if (validTabs.has(hash)) {
        showTab(hash, { updateHash: false, scroll: false });
        return;
      }

      const target = document.getElementById(hash);
      const targetPanel = target ? target.closest('[data-panel]') : null;

      if (targetPanel) {
        showTab(targetPanel.dataset.panel, {
          updateHash: false,
          scroll: false
        });

        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }

      showTab('home', { updateHash: false, scroll: false });
    }

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    syncFromLocation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs, { once: true });
  } else {
    initTabs();
  }
}());
