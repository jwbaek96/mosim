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
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// 모든 컴포넌트 로드
async function loadAllComponents() {
    await Promise.all([
        loadComponent('header-component', 'components/header.html'),
        loadComponent('sidebar-component', 'components/sidebar.html'),
        loadComponent('footer-component', 'components/footer.html')
    ]);
    
    // 컴포넌트 로드 후 이벤트 발생
    document.dispatchEvent(new Event('componentsLoaded'));
}

// DOM 로드 완료 시 컴포넌트 로드
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
