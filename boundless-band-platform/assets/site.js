(() => {
  const header = document.querySelector('[data-site-header]');
  const nav = document.querySelector('[data-site-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNav();
  });
  window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });

  document.querySelectorAll('[data-workflow]').forEach((workflow) => {
    const tabs = Array.from(workflow.querySelectorAll('[data-workflow-tab]'));
    const panels = workflow.querySelectorAll('[data-workflow-panel]');
    const activateTab = (tab, moveFocus = false) => {
      const target = tab.getAttribute('data-workflow-tab');
      tabs.forEach((candidate) => {
        const active = candidate === tab;
        candidate.setAttribute('aria-selected', String(active));
        candidate.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-workflow-panel') !== target;
      });
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab, true));
      tab.addEventListener('keydown', (event) => {
        const lastIndex = tabs.length - 1;
        const targetIndex = {
          ArrowLeft: index === 0 ? lastIndex : index - 1,
          ArrowRight: index === lastIndex ? 0 : index + 1,
          Home: 0,
          End: lastIndex,
        }[event.key];
        if (targetIndex === undefined) return;
        event.preventDefault();
        activateTab(tabs[targetIndex], true);
      });
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) window.lucide.createIcons();
  });
})();