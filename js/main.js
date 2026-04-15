document.addEventListener('DOMContentLoaded', async() => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content .hero-subtitle');
    const heroTitleBaseText = heroTitle?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const heroSubtitleBaseText = heroSubtitle?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const SCROLL_BG_TRIGGER = 4;
    const ANCHOR_GAP = 2;
    const FULL_MOBILE_BREAKPOINT = 520;

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

    startHeroTyping();
    updateHeroSubtitleLineBreak();

    window.addEventListener('resize', () => {
        if (!heroTitle || heroTitle.classList.contains('is-typing')) {
            return;
        }

        heroTitle.textContent = getDisplayHeroTitleText();
    });

    window.addEventListener('resize', updateHeroSubtitleLineBreak);

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

            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            header.classList.remove('menu-open');

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

    // project 데이터 동적 바인딩
    const result = await getData("works");
    console.log("result ==== ", await result.json());

});


const getData = async(param) => {
    const url = "/data/data.json";
    let result = "";
    switch (param) {
        case "works":
            result = fetch(url);
            break;

        case "education" :
            break;

        default:
            break;
    }

    return result;
}