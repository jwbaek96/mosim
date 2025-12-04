// ===========================
// 사이드바 토글 및 관리
// ===========================

// 지역별 구/군 데이터
const districtData = {
    '서울': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    '경기': ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '하남시', '오산시', '양주시', '이천시', '구리시', '안성시', '포천시', '의왕시', '양평군', '여주시', '동두천시', '과천시', '가평군', '연천군'],
    '부산': ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
    '대구': ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    '인천': ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    '광주': ['동구', '서구', '남구', '북구', '광산구'],
    '대전': ['동구', '중구', '서구', '유성구', '대덕구'],
    '울산': ['중구', '남구', '동구', '북구', '울주군'],
    '세종': ['세종시'],
    '강원': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
    '충북': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
    '충남': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
    '전북': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
    '전남': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
    '경북': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
    '경남': ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
    '제주': ['제주시', '서귀포시']
};

// 컴포넌트 로드 후 초기화
function initializeAfterComponentsLoad() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const splitPanel = document.getElementById('splitPanel');
const splitPanelBack = document.getElementById('splitPanelBack');
const splitPanelTitle = document.getElementById('splitPanelTitle');
const splitPanelContent = document.getElementById('splitPanelContent');

// 사이드바 열기/닫기
function toggleSidebar() {
    mobileMenuBtn.classList.toggle('active');
    mobileSidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
    
    // Split Panel 닫기
    if (splitPanel.classList.contains('active')) {
        closeSplitPanel();
    }
}

// 사이드바 닫기
function closeSidebar() {
    mobileMenuBtn.classList.remove('active');
    mobileSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    closeSplitPanel();
}

// Split Panel 열기
function openSplitPanel(panelType) {
    splitPanel.classList.add('active');
    mobileSidebar.style.right = '320px'; // 사이드바를 좌측으로 이동
    
    // 패널 컨텐츠 설정
    if (panelType === 'contact') {
        splitPanelTitle.textContent = '고객 문의';
        splitPanelContent.innerHTML = `
            <a href="https://pf.kakao.com" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222v.01a.478.478 0 0 0 .01.064v.01a.47.47 0 0 0 .038.08l.01.01a.491.491 0 0 0 .045.062l.015.015a.477.477 0 0 0 .066.054l.012.01a.478.478 0 0 0 .079.04h.013a.469.469 0 0 0 .082.02h.013a.487.487 0 0 0 .087 0h.013a.47.47 0 0 0 .082-.02h.013a.478.478 0 0 0 .079-.04l.012-.01a.477.477 0 0 0 .066-.054l.015-.015a.491.491 0 0 0 .045-.062l.01-.01a.47.47 0 0 0 .038-.08v-.01a.478.478 0 0 0 .01-.064v-.01a.471.471 0 0 0 0-.222V9.282a.472.472 0 0 0-.944 0v1.542l-1.928-1.866a.472.472 0 0 0-.656.678l1.47 1.424-1.47 1.424a.472.472 0 0 0 .656.678l1.928-1.866v1.542a.472.472 0 0 0 .944 0v-2.557a.471.471 0 0 0 0-.222v-.01a.478.478 0 0 0-.01-.064v-.01a.47.47 0 0 0-.038-.08l-.01-.01a.491.491 0 0 0-.045-.062l-.015-.015a.477.477 0 0 0-.066-.054l-.012-.01a.478.478 0 0 0-.079-.04h-.013a.469.469 0 0 0-.082-.02h-.013a.487.487 0 0 0-.087 0h-.013a.47.47 0 0 0-.082.02h-.013a.478.478 0 0 0-.079.04l-.012.01a.477.477 0 0 0-.066.054l-.015.015a.491.491 0 0 0-.045.062l-.01.01a.47.47 0 0 0-.038.08v.01a.478.478 0 0 0-.01.064v.01a.471.471 0 0 0 0 .222v2.557a.472.472 0 0 0 .944 0v-1.542l1.928 1.866a.472.472 0 0 0 .656-.678l-1.47-1.424z"/>
                </svg>
                <span>카카오톡 채팅 문의</span>
            </a>
            <a href="mailto:contact@mosim.com">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>이메일 문의</span>
            </a>
            <a href="tel:1588-0000">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>전화 문의 (1588-0000)</span>
            </a>
        `;
    }
}

// Split Panel 닫기
function closeSplitPanel() {
    splitPanel.classList.remove('active');
    mobileSidebar.style.right = '0';
}

// 이벤트 리스너
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

if (splitPanelBack) {
    splitPanelBack.addEventListener('click', closeSplitPanel);
}

// Split Panel 트리거 버튼
document.querySelectorAll('.split-panel-trigger').forEach(trigger => {
    const button = trigger.querySelector('.nav-button');
    const panelType = trigger.getAttribute('data-panel');
    
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openSplitPanel(panelType);
        });
    }
});

// ===========================
// 서브메뉴 토글 (아코디언)
// ===========================

document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link:not(.nav-button)');
    
    if (link && item.querySelector('.sub-menu')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 다른 메뉴 닫기
            document.querySelectorAll('.nav-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 현재 메뉴 토글
            item.classList.toggle('active');
        });
    }
});

// ===========================
// 활성 상태 (Active State) 관리
// ===========================

function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // 데스크톱 네비게이션 활성 상태
    document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 모바일 사이드바 활성 상태
    document.querySelectorAll('.sidebar-nav .nav-link, .sidebar-nav .sub-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || href === currentPath) {
            link.classList.add('active');
            
            // 부모 메뉴 열기
            const parentNavItem = link.closest('.nav-item');
            if (parentNavItem) {
                parentNavItem.classList.add('active');
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// 페이지 로드 시 활성 상태 설정
document.addEventListener('DOMContentLoaded', setActiveNavigation);

// ===========================
// 스무스 스크롤
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // 해시만 있는 경우 (같은 페이지 내 이동)
        if (href.startsWith('#') && href.length > 1) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // 사이드바 닫기
                closeSidebar();
                
                // 스무스 스크롤
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// 반응형 처리
// ===========================

function handleResize() {
    const width = window.innerWidth;
    
    // 데스크톱 사이즈에서는 사이드바 강제 닫기
    if (width >= 768) {
        closeSidebar();
    }
}

window.addEventListener('resize', handleResize);

// ===========================
// 터치 영역 최적화 (접근성)
// ===========================

// 모든 터치 가능한 요소의 크기 검증 (개발 모드에서만)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        const touchElements = document.querySelectorAll('a, button, .quick-link-item, .nav-link, .nav-button');
        
        touchElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const minSize = 44; // 최소 터치 영역
            
            if (rect.width < minSize || rect.height < minSize) {
                console.warn('터치 영역이 44px 미만입니다:', element, `${rect.width}x${rect.height}`);
            }
        });
    });
}

// ===========================
// ESC 키로 사이드바/패널 닫기
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (splitPanel.classList.contains('active')) {
            closeSplitPanel();
        } else if (mobileSidebar.classList.contains('active')) {
            closeSidebar();
        }
    }
});

// ===========================
// 로딩 애니메이션 (선택 사항)
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 컴포넌트 로드 완료 후 초기화
document.addEventListener('componentsLoaded', initializeAfterComponentsLoad);

// ===========================
// 홈 페이지 지역 선택 로직
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const regionSelect = document.getElementById('regionSelect');
    const districtSelect = document.getElementById('districtSelect');
    const regionNotice = document.getElementById('regionNotice');
    
    if (regionSelect && districtSelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = this.value;
            
            // 세부지역 초기화
            districtSelect.innerHTML = '<option value="">--</option>';
            
            if (selectedRegion && districtData[selectedRegion]) {
                // 선택된 지역의 세부지역 옵션 추가
                districtData[selectedRegion].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
                districtSelect.disabled = false;
                
                // 지역 선택 시 알림 메시지 숨기기
                if (regionNotice) {
                    regionNotice.style.display = 'none';
                }
            } else {
                districtSelect.disabled = true;
                
                // 지역 미선택 시 알림 메시지 보이기
                if (regionNotice) {
                    regionNotice.style.display = 'block';
                }
            }
        });
    }
});
