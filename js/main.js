document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // 햄버거 버튼 클릭 이벤트
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active'); // 햄버거 아이콘 X 변형용
    });

    // 링크 클릭 시 메뉴 닫기
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
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