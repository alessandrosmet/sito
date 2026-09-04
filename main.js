const root = document.documentElement;
const revealElements = document.querySelectorAll('.reveal');

function updateHeroShift() {
    const limit = window.innerWidth < 720 ? 38 : 110;
    const shift = Math.min(window.scrollY * 0.12, limit);
    root.style.setProperty('--hero-shift', `${-shift}px`);
}

window.addEventListener('scroll', updateHeroShift, { passive: true });
updateHeroShift();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

revealElements.forEach((element) => observer.observe(element));

const contactTrigger = document.querySelector('.contact-trigger');
const contactOptions = document.getElementById('contact-options');

function closeContactOptions() {
    if (!contactTrigger || !contactOptions) return;
    contactOptions.hidden = true;
    contactTrigger.setAttribute('aria-expanded', 'false');
}

contactTrigger?.addEventListener('click', () => {
    const isOpen = contactTrigger.getAttribute('aria-expanded') === 'true';
    contactOptions.hidden = isOpen;
    contactTrigger.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.contact-choice')) closeContactOptions();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeContactOptions();
});

const offerItems = document.querySelectorAll('.offer-item');

function getOfferElements(item) {
    const container = item.parentElement;

    return {
        description: container?.querySelector('.offer-description'),
        contactMessage: container?.querySelector('.offer-contact-message')
    };
}

function closeOffer(item) {
    const { description, contactMessage } = getOfferElements(item);

    item.classList.remove('is-selected');
    item.setAttribute('aria-expanded', 'false');

    description?.classList.remove('is-open');
    contactMessage?.classList.remove('is-open');
}

function openOffer(item) {
    const { description, contactMessage } = getOfferElements(item);

    if (!description) return;

    offerItems.forEach((otherItem) => {
        if (otherItem !== item) {
            closeOffer(otherItem);
        }
    });

    item.classList.add('is-selected');
    item.setAttribute('aria-expanded', 'true');
    description.classList.add('is-open');
    contactMessage?.classList.add('is-open');
}

offerItems.forEach((item, index) => {
    const { description } = getOfferElements(item);

    if (!description) return;

    description.id = `offer-description-${index + 1}`;

    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-expanded', 'false');
    item.setAttribute('aria-controls', description.id);

    // PASSAGGIO DEL MOUSE SUL PIANO
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 720) {
            openOffer(item);
        }
    });

    // MOBILE
    item.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
            const isOpen = description.classList.contains('is-open');

            if (isOpen) {
                closeOffer(item);
            } else {
                openOffer(item);
            }
        }
    });

    // TASTIERA
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openOffer(item);
        }
    });
});

const processItems = document.querySelectorAll('.process-panel ol li');

function getProcessDetail(item) {
    return item.querySelector('.process-detail');
}

function closeProcessItem(item) {
    const detail = getProcessDetail(item);

    item.classList.remove('is-selected');
    item.setAttribute('aria-expanded', 'false');
    detail?.classList.remove('is-open');
}

function openProcessItem(item) {
    const detail = getProcessDetail(item);

    if (!detail) return;

    processItems.forEach((otherItem) => {
        if (otherItem !== item) {
            closeProcessItem(otherItem);
        }
    });

    item.classList.add('is-selected');
    item.setAttribute('aria-expanded', 'true');
    detail.classList.add('is-open');
}

processItems.forEach((item, index) => {
    const detail = getProcessDetail(item);

    if (!detail) return;

    detail.id = `process-detail-${index + 1}`;

    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-expanded', 'false');
    item.setAttribute('aria-controls', detail.id);

    // PASSAGGIO DEL MOUSE SUL PASSAGGIO
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 720) {
            openProcessItem(item);
        }
    });

    // MOBILE
    item.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
            const isOpen = detail.classList.contains('is-open');

            if (isOpen) {
                closeProcessItem(item);
            } else {
                openProcessItem(item);
            }
        }
    });

    // TASTIERA
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProcessItem(item);
        }
    });
});