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

    // Il messaggio di contatto NON viene aperto qui.
    // Compare solo passando sopra il messaggio stesso.
}

offerItems.forEach((item, index) => {
    const { description, contactMessage } = getOfferElements(item);

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

    // SOLO PASSANDO SOPRA IL MESSAGGIO DI CONTATTO
    if (contactMessage) {
        contactMessage.addEventListener('mouseenter', () => {
            contactMessage.classList.add('is-open');
        });

        contactMessage.addEventListener('mouseleave', () => {
            contactMessage.classList.remove('is-open');
        });
    }
});