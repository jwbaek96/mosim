// ===========================
// 사이드바 토글 및 관리
// ===========================

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
