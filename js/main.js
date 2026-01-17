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
});