// ===========================
// 컴포넌트 로더
// ===========================

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            console.log(`✅ ${componentPath} 로드 완료`);
        } else {
            console.error(`❌ Element not found: ${elementId}`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// 모든 컴포넌트 로드
async function loadAllComponents() {
    console.log('📦 컴포넌트 로딩 시작');
    await Promise.all([
        loadComponent('header-component', 'components/header.html'),
        loadComponent('footer-component', 'components/footer.html')
    ]);
    
    console.log('✅ 컴포넌트 로딩 완료');
    
    // requestAnimationFrame으로 다음 렌더링 사이클까지 대기
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            console.log('🔍 menuContent 확인:', document.getElementById('menuContent'));
            document.dispatchEvent(new Event('componentsLoaded'));
            console.log('🎉 componentsLoaded 이벤트 발생');
        });
    });
}

// DOM 로드 완료 시 컴포넌트 로드
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
