// Helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

// Sticky header shadow
(function headerShadow(){
  const header = qs('#header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('site-header--shadow');
    else header.classList.remove('site-header--shadow');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Mobile nav toggle + trap simple mega
(function nav(){
  const toggle = qs('#navToggle');
  const list = qs('#primaryMenu');
  const itemsWithMega = qsa('.nav__item--has-mega');

  const setOpen = (open) => {
    list.style.display = open ? 'flex' : '';
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });

  // Desktop mega open/close
  itemsWithMega.forEach(item => {
    const button = item.querySelector('button.nav__link');
    const mega = item.querySelector('.mega');
    const id = button.dataset.mega;

    // ID links for a11y
    mega.id = `mega-${id}`;
    button.setAttribute('aria-controls', mega.id);

    const show = () => {
      mega.style.display = 'grid';
      button.setAttribute('aria-expanded', 'true');
    };
    const hide = () => {
      mega.style.display = '';
      button.setAttribute('aria-expanded', 'false');
    };

    // Hover for desktop
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);

    // Click for mobile
    button.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 1000px)').matches) {
        e.preventDefault();
        const isOpen = mega.style.display === 'grid';
        mega.style.display = isOpen ? '' : 'grid';
        button.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  });

  // Close nav on resize up
  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 1000px)').matches) {
      qs('#primaryMenu').style.display = '';
      document.body.style.overflow = '';
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Hero form (demo)
(function heroSearch(){
  const form = qs('.hero__search');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pc = qs('#postcode').value.trim();
    if (!pc) return alert('Please enter your postcode.');
    alert(`Looking up local expert near: ${pc}`);
  });
})();

// Testimonials slider
(function slider(){
  const slider = qs('#reviewsSlider');
  if (!slider) return;
  const track = slider.querySelector('.slider__track');
  const prev = slider.querySelector('[data-dir="prev"]');
  const next = slider.querySelector('[data-dir="next"]');
  const slides = qsa('.slide', track);
  let index = 0;

  function go(delta){
    index = (index + delta + slides.length) % slides.length;
    const target = slides[index];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // Keyboard support
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
})();

// FAQ details smoother toggle (optional)
qsa('.accordion__item summary').forEach((sum) => {
  sum.addEventListener('click', () => {
    const details = sum.parentElement;
    // Close siblings
    qsa('.accordion__item').forEach(d => {
      if (d !== details) d.removeAttribute('open');
    });
  });
});

// Footer year
(function year(){
  const el = qs('#year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Cookie banner (very simple)
(function cookie(){
  const key = 'cookie-consent';
  const banner = qs('#cookieBanner');
  const accept = qs('#cookieAccept');
  const dismiss = qs('#cookieDismiss');
  if (!localStorage.getItem(key)) {
    banner.hidden = false;
  }
  const close = () => (banner.hidden = true);
  accept?.addEventListener('click', () => { localStorage.setItem(key, 'accepted'); close(); });
  dismiss?.addEventListener('click', close);
})();
