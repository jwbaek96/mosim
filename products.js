// ===========================
// 상품 안내 페이지 로직
// ===========================

// 스티키 탭 스크롤 활성화
document.addEventListener('DOMContentLoaded', function() {
    const stickyTabs = document.querySelectorAll('.sticky-tab');
    const sections = document.querySelectorAll('.content-section');
    
    // 스크롤 시 현재 섹션에 맞는 탭 활성화
    function updateActiveTab() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        stickyTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href') === `#${currentSection}`) {
                tab.classList.add('active');
            }
        });
    }
    
    // 스크롤 이벤트
    window.addEventListener('scroll', updateActiveTab);
    
    // 탭 클릭 시 부드러운 스크롤
    stickyTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 140; // sticky tabs 높이 고려
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 배너 슬라이드 자동 전환 (선택사항)
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        bannerSlides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % bannerSlides.length;
        showSlide(currentSlide);
    }
    
    // 5초마다 자동 전환
    setInterval(nextSlide, 5000);
    
    // 인디케이터 클릭 이벤트
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // 상단 네비게이션 활성화
    const productsNavLinks = document.querySelectorAll('.products-nav-link');
    
    productsNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            productsNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 비교 카드 클릭 이벤트
    const comparisonCards = document.querySelectorAll('.comparison-card');
    
    comparisonCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('상품 상세 페이지로 이동');
            // 실제 구현 시 상품 상세 페이지로 이동
            // window.location.href = 'product-detail.html?id=...';
        });
    });
});
