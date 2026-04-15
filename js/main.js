document.addEventListener('DOMContentLoaded', async() => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const projectCards = document.querySelectorAll('#projects .project-card');
    const projectModal = document.querySelector('#project-modal');
    const modalTitle = document.querySelector('#project-modal-title');
    const modalSummary = document.querySelector('#project-modal-summary');
    const modalDetails = document.querySelector('#project-modal-details');
    const modalStack = document.querySelector('#project-modal-stack');
    const modalLink = document.querySelector('#project-modal-link');
    const modalCloseTargets = document.querySelectorAll('[data-modal-close]');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content .hero-subtitle');
    const heroTitleBaseText = heroTitle?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const heroSubtitleBaseText = heroSubtitle?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const SCROLL_BG_TRIGGER = 4;
    const ANCHOR_GAP = 2;
    const MOBILE_NAV_BREAKPOINT = 768;
    const FULL_MOBILE_BREAKPOINT = 520;
    const PROJECT_DATA_URL = '/data/data.json';
    let projectDataCache = null;

    const getDisplayHeroTitleText = () => {
        if (!heroTitle || !heroTitleBaseText) {
            return heroTitleBaseText;
        }

        const hasComma = /[,，]/.test(heroTitleBaseText);
        if (!hasComma) {
            return heroTitleBaseText;
        }

        const mobileViewport = window.matchMedia(`(max-width: ${FULL_MOBILE_BREAKPOINT}px)`).matches;
        if (mobileViewport) {
            return heroTitleBaseText.replace(/[,，]/, '$&\n');
        }

        return heroTitleBaseText;
    };

    const startHeroTyping = () => {
        if (!heroTitle) {
            return;
        }

        const fullText = getDisplayHeroTitleText();
        if (!fullText) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            heroTitle.textContent = fullText;
            return;
        }

        heroTitle.textContent = '';
        heroTitle.classList.add('is-typing');

        let index = 0;
        const typingIntervalMs = 60;

        const typingTimer = window.setInterval(() => {
            index += 1;
            heroTitle.textContent = fullText.slice(0, index);

            if (index >= fullText.length) {
                window.clearInterval(typingTimer);
                heroTitle.classList.remove('is-typing');
            }
        }, typingIntervalMs);
    };

    const updateHeroSubtitleLineBreak = () => {
        if (!heroSubtitle || !heroSubtitleBaseText) {
            return;
        }

        const isMobile = window.matchMedia(`(max-width: ${FULL_MOBILE_BREAKPOINT}px)`).matches;
        if (!isMobile || !heroSubtitleBaseText.includes(',')) {
            heroSubtitle.textContent = heroSubtitleBaseText;
            return;
        }

        heroSubtitle.textContent = heroSubtitleBaseText.replace(',', ',\n');
    };

    const fetchProjectData = async() => {
        if (projectDataCache) {
            return projectDataCache;
        }

        try {
            const response = await fetch(PROJECT_DATA_URL, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Failed to load ${PROJECT_DATA_URL}`);
            }

            projectDataCache = await response.json();
            return projectDataCache;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getProjectCardData = (card, nav, idx, fetchedData) => {
        const fallbackTitle = card.querySelector('h3')?.textContent?.trim() || '프로젝트';
        const fallbackOverview = card.dataset.overview || card.querySelector('p')?.textContent?.trim() || '';
        const fallbackLink = card.dataset.link?.trim() || '';
        const fallbackStackList = card.dataset.stack
            ? card.dataset.stack.split(',').map(stack => stack.trim()).filter(Boolean)
            : Array.from(card.querySelectorAll('.project-tags .tag')).map(tag => tag.textContent?.trim() || '').filter(Boolean);

        const navItems = Array.isArray(fetchedData?.[nav]) ? fetchedData[nav] : [];
        const item = navItems.find(project => Number(project.idx) === idx);

        const detailList = Array.isArray(item?.details) ? item.details : [];
        const stackList = Array.isArray(item?.stack) && item.stack.length > 0 ? item.stack : fallbackStackList;

        return {
            title: item?.title || fallbackTitle,
            overview: item?.overview || fallbackOverview,
            detailList,
            stackList,
            link: typeof item?.link === 'string' ? item.link.trim() : fallbackLink
        };
    };

    const openProjectModal = async(card, nav, idx) => {
        if (!projectModal || !modalTitle || !modalSummary || !modalDetails || !modalStack || !modalLink) {
            return;
        }

        const fetchedData = await fetchProjectData();
        const data = getProjectCardData(card, nav, idx, fetchedData);
        modalTitle.textContent = data.title;
        modalSummary.textContent = data.overview;

        modalDetails.innerHTML = '';
        if (data.detailList.length > 0) {
            data.detailList.forEach(detail => {
                const item = document.createElement('li');
                item.textContent = detail;
                modalDetails.appendChild(item);
            });
        } else {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = '상세 내용 준비 중';
            modalDetails.appendChild(emptyItem);
        }

        modalStack.innerHTML = '';
        data.stackList.forEach(stack => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = stack;
            modalStack.appendChild(tag);
        });

        if (data.link) {
            modalLink.href = data.link;
            modalLink.classList.remove('is-hidden');
        } else {
            modalLink.removeAttribute('href');
            modalLink.classList.add('is-hidden');
        }

        projectModal.classList.add('is-open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeProjectModal = () => {
        if (!projectModal) {
            return;
        }

        projectModal.classList.remove('is-open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    const isMobileNavViewport = () => window.matchMedia(`(max-width: ${MOBILE_NAV_BREAKPOINT}px)`).matches;

    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        header.classList.remove('menu-open');
    };

    startHeroTyping();
    updateHeroSubtitleLineBreak();

    window.addEventListener('resize', () => {
        if (!heroTitle || heroTitle.classList.contains('is-typing')) {
            return;
        }

        heroTitle.textContent = getDisplayHeroTitleText();
    });

    window.addEventListener('resize', updateHeroSubtitleLineBreak);

    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        const nav = card.dataset.nav || card.closest('#works, #education, #study')?.id || '';
        const idx = Number(card.dataset.idx || 0);

        card.addEventListener('click', () => {
            void openProjectModal(card, nav, idx);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                void openProjectModal(card, nav, idx);
            }
        });
    });

    modalCloseTargets.forEach(target => {
        target.addEventListener('click', closeProjectModal);
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    });

    const updateHeaderState = () => {
        if (window.scrollY > SCROLL_BG_TRIGGER) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState);

    // 햄버거 버튼 클릭 이벤트
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active'); // 햄버거 아이콘 X 변형용

        if (navLinks.classList.contains('active')) {
            header.classList.add('menu-open');
        } else {
            header.classList.remove('menu-open');
        }
    });

    document.addEventListener('pointerdown', (event) => {
        if (!isMobileNavViewport()) {
            return;
        }

        if (!navLinks.classList.contains('active')) {
            return;
        }

        const target = event.target;
        if (target instanceof Node && (navLinks.contains(target) || menuToggle.contains(target))) {
            return;
        }

        closeMobileMenu();
    });

    // 링크 클릭 시 메뉴 닫기
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();

            closeMobileMenu();

            const headerHeight = header.offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            const scrollTop = Math.max(0, targetTop - headerHeight - ANCHOR_GAP);

            window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });

            history.replaceState(null, '', href);
        });
    });


    // Project 버튼 클릭 이벤트
    const worksBtn = document.querySelector('#works-btn');
    const educationBtn = document.querySelector('#education-btn');
    const studyBtn = document.querySelector('#study-btn');

    const works = document.querySelector('#works');
    const education = document.querySelector('#education');
    const study = document.querySelector('#study');

    worksBtn.addEventListener('click', () => {
        works.style.display = "block";
        education.style.display = "none";
        study.style.display = "none";
        worksBtn.classList.add("active");
        educationBtn.classList.remove("active");
        studyBtn.classList.remove("active");
    });

    educationBtn.addEventListener('click', () => {
        works.style.display = "none";
        education.style.display = "block";
        study.style.display = "none";
        worksBtn.classList.remove("active");
        educationBtn.classList.add("active");
        studyBtn.classList.remove("active");
    });

    studyBtn.addEventListener('click', () => {
        works.style.display = "none";
        education.style.display = "none";
        study.style.display = "block";
        worksBtn.classList.remove("active");
        educationBtn.classList.remove("active");
        studyBtn.classList.add("active");
    });

});
