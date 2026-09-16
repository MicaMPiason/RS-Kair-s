document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));

  const toast = document.querySelector('.toast');
  const showToast = (message) => {
    toast.querySelector('span').textContent = message;
    if (window.gsap) {
      gsap.killTweensOf(toast);
      gsap.to(toast, { autoAlpha: 1, y: 0, duration: .35, ease: 'power2.out' });
      gsap.to(toast, { autoAlpha: 0, y: 25, duration: .3, delay: 3, ease: 'power2.in' });
    } else {
      toast.style.opacity = 1;
      setTimeout(() => { toast.style.opacity = 0; }, 3000);
    }
  };

  const recForm = document.querySelector('#recommendation-form');
  if (recForm) {
    recForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Dados recebidos! Configure o número do WhatsApp para ativar o envio.');
    });
  }

  document.querySelector('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Formulário pronto. Configure o WhatsApp da RS Kairós para publicar.');
  });

  document.querySelector('#year').textContent = new Date().getFullYear();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from('.hero-bg', { scale: 1.1, duration: 1.5 })
      .from('.hero-eyebrow', { y: 20, autoAlpha: 0, duration: .55 }, '-=.9')
      .from('.hero h1', { y: 30, autoAlpha: 0, duration: .75 }, '-=.35')
      .from('.hero-subtitle', { y: 22, autoAlpha: 0, duration: .6 }, '-=.45')
      .from('.hero-buttons .button', { y: 18, autoAlpha: 0, duration: .5, stagger: .1 }, '-=.3')
      .from('.hero-trust span', { y: 12, autoAlpha: 0, duration: .45, stagger: .08 }, '-=.2');

    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.from(element, {
        y: 34,
        autoAlpha: 0,
        duration: .65,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      });
    });

    gsap.from('.trust-grid article', {
      y: 18,
      autoAlpha: 0,
      duration: .5,
      stagger: .08,
      scrollTrigger: { trigger: '.trust-strip', start: 'top 90%', once: true }
    });
  }
});
