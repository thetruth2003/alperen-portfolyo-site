'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
function closeMenu() {
  header?.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  header.classList.toggle('menu-open', open);
});
document.querySelectorAll('.primary-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
const filterGroup = document.querySelector('.project-filters');
const cards = [...document.querySelectorAll('[data-project]')];
if (filterGroup) {
  filterGroup.hidden = false;
  filterGroup.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const category = button.dataset.filter.toLowerCase();
    filterGroup.querySelectorAll('button').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category.toLowerCase() !== category; });
    document.querySelector('[data-count]').textContent = String(cards.filter(card => !card.hidden).length);
  });
}
document.querySelectorAll('[data-animation]').forEach(button => {
  const frame = button.closest('.hero-screen, .detail-media');
  const image = frame.querySelector('img');
  const initialLabel = button.innerHTML;
  const stop = () => {
    image.src = button.dataset.poster;
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = initialLabel;
  };
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return stop();
    image.src = button.dataset.animation;
    button.setAttribute('aria-pressed', 'true');
    button.innerHTML = '<span aria-hidden="true">■</span> Stop gameplay';
  });
  image.addEventListener('error', () => {
    if (button.getAttribute('aria-pressed') === 'true') {
      stop();
      button.innerHTML = 'Clip unavailable — try again';
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
});
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  const submit = contactForm.querySelector('[type="submit"]');
  if (['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    status.textContent = 'This local preview cannot deliver messages. Please use the email link.';
    return;
  }
  submit.disabled = true;
  status.textContent = 'Sending your message…';
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: new URLSearchParams(new FormData(contactForm)).toString()
    });
    if (!response.ok) throw new Error('Submission failed');
    window.location.assign('/thank-you.html');
  } catch {
    status.textContent = 'Your message could not be sent. Please try again or contact me using the email link.';
    submit.disabled = false;
  }
});
