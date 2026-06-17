// ============================================
// NAVEGAÇÃO ENTRE TELAS
// ============================================

const PAGES = {
    home: 'index.html',
    product: 'product.html',
    cart: 'cart.html',
    payment: 'payment.html',
    confirmation: 'confirmation.html',
    orders: 'pedidos.html',
    login: 'login.html',
    menu: 'menu.html',
    search: 'busca.html'
};

function navigateTo(page) {
    const pageMap = {
        'home': PAGES.home,
        'product': PAGES.product,
        'cart': PAGES.cart,
        'payment': PAGES.payment,
        'confirmation': PAGES.confirmation,
        'orders': PAGES.orders,
        'login': PAGES.login,
        'menu': PAGES.menu,
        'search': PAGES.search
    };
    const target = pageMap[page] || page;
    window.location.href = target;
}

// ============================================
// BOTTOM NAVIGATION
// ============================================

function setupBottomNav() {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon, .bottom-nav-icon');
    const navMap = { 0: 'home', 1: 'search', 2: 'cart', 3: 'login' };
    navIcons.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(navMap[index]);
        });
    });
}

// ============================================
// MENU PAGE - CORRIGIDO: TODOS PARA HOME, EXCETO ACCOUNT
// ============================================

function setupMenuLinks() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const label = this.querySelector('.item-label');
            if (label) {
                const text = label.textContent.trim();
                // SÓ O ACCOUNT VAI PARA LOGIN, O RESTO VAI PARA HOME
                if (text === 'ACCOUNT') {
                    navigateTo('login');
                } else {
                    navigateTo('home'); // NEW ARRIVALS, COLLECTIONS, MEN, WOMEN → HOME
                }
            }
        });
    });
}

// ============================================
// HEADER - BOTÃO CARRINHO - CORRIGIDO
// ============================================

function setupHeaderIcons() {
    // Voltar
    document.querySelectorAll('.header-icon[aria-label="Voltar"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });

    // Menu
    document.querySelectorAll('.header-icon[aria-label="Menu"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('menu');
        });
    });

    // ============================================================
    // CARRINHO - VOU PEGAR QUALQUER BOTÃO QUE TENHA ÍCONE DE SACOLA
    // ============================================================
    const cartBtns = document.querySelectorAll(
        // Pega qualquer botão com ícone de carrinho (pelo SVG)
        '.header-icon, .finalize-header .header-icon, .orders-header .header-icon, ' +
        '.login-header .header-icon, .menu-header .header-icon, .search-header .header-icon, ' +
        '.product-topbar .header-icon, .cart-topbar .header-icon'
    );
    
    cartBtns.forEach(btn => {
        // Verifica se o botão contém o ícone do carrinho (path do SVG)
        const svg = btn.querySelector('svg');
        if (svg) {
            const svgContent = svg.innerHTML;
            // Se tiver o path do carrinho (retângulo + alça)
            if (svgContent.includes('rect') && svgContent.includes('M4 4C4 2.34315')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateTo('cart');
                });
            }
        }
    });

    // Garantia: pega qualquer botão com aria-label="Carrinho"
    document.querySelectorAll('[aria-label="Carrinho"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateTo('cart');
        });
    });
}

// ============================================
// HOME PAGE - PRODUTOS → PRODUCT
// ============================================

function setupHomeProducts() {
    // Produto em destaque
    const featured = document.querySelector('.frame[data-name="Featured Product Section (As per wireframe IMAGE_5)"] .frame[data-name="Background"] > .frame');
    if (featured) {
        featured.style.cursor = 'pointer';
        featured.addEventListener('click', () => navigateTo('product'));
    }

    // Produtos da grade
    document.querySelectorAll('.frame[data-name="Asymmetric Grid Section"] .frame[data-name="Background"] > .frame').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => navigateTo('product'));
    });

    // CTA
    const cta = document.querySelector('.frame[data-name="CTA Section → Button"]');
    if (cta) {
        cta.style.cursor = 'pointer';
        cta.addEventListener('click', () => navigateTo('search'));
    }
}

// ============================================
// CART PAGE - PRODUTOS → PRODUCT
// ============================================

function setupCartItems() {
    document.querySelectorAll('.cart-item-media, .cart-item-title, .recommendation-card').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => navigateTo('product'));
    });
}

// ============================================
// CONFIRMATION - PRODUTOS RECOMENDADOS → PRODUCT
// ============================================

function setupConfirmationProducts() {
    document.querySelectorAll('.product-item, .product-thumb').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => navigateTo('product'));
    });
}

// ============================================
// PAYMENT - BOTÃO "X" → HOME
// ============================================

function setupPaymentClose() {
    const closeBtn = document.querySelector('.payment-wrapper .header .header-icon:first-child');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('home');
        });
    }
}

// ============================================
// DEMAIS FUNÇÕES
// ============================================

function setupFooterLinks() {
    document.querySelectorAll('.footer-nav a, .finalize-footer .footer-nav a, .orders-footer .footer-nav a, .menu-footer .footer-nav a, .search-footer .footer-nav a, .login-footer .footer-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Navegando para: ${this.textContent.trim()}`);
        });
    });
}

function setupProductSizes() {
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            this.closest('.attribute-sizes').querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function setupProductButton() {
    const btn = document.querySelector('.product-button');
    if (btn) {
        btn.addEventListener('click', function() {
            const size = document.querySelector('.size-option.selected');
            alert(`Produto adicionado ao carrinho!\nTamanho: ${size ? size.textContent : 'P'}`);
            if (confirm('Deseja ir para o carrinho agora?')) navigateTo('cart');
        });
    }
}

function setupAccordion() {
    document.querySelectorAll('.accordion-row').forEach(row => {
        row.addEventListener('click', function() {
            const label = this.querySelector('span:first-child');
            if (label) alert(`Expandindo: ${label.textContent}`);
        });
    });
}

function setupCartQuantity() {
    document.querySelectorAll('.cart-quantity').forEach(group => {
        const span = group.querySelector('span');
        group.querySelector('button:first-child')?.addEventListener('click', function(e) {
            e.stopPropagation();
            if (span) { let v = parseInt(span.textContent) || 1; if (v > 1) span.textContent = --v; }
        });
        group.querySelector('button:last-child')?.addEventListener('click', function(e) {
            e.stopPropagation();
            if (span) { let v = parseInt(span.textContent) || 1; span.textContent = ++v; }
        });
    });
}

function setupCartActions() {
    document.querySelector('.cart-action.primary')?.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo('payment');
    });
    document.querySelector('.cart-action.secondary')?.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo('home');
    });
}

function setupPaymentButton() {
    document.querySelector('.finalize-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Confirmar pagamento?')) navigateTo('confirmation');
    });
}

function setupPaymentOptions() {
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.style.cursor = 'pointer';
        opt.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(o => o.style.opacity = '0.5');
            this.style.opacity = '1';
            alert(`Método selecionado: ${this.querySelector('.payment-text')?.textContent}`);
        });
    });
}

function setupAddressActions() {
    document.querySelector('.address-edit')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Editar endereço');
    });
    document.querySelector('.register-address-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Cadastrar novo endereço');
    });
}

function setupConfirmationLinks() {
    document.querySelector('.cta-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo('orders');
    });
}

function setupLoginForm() {
    document.querySelector('.login-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        if (email?.value.trim() && password?.value.trim()) {
            alert('Login realizado com sucesso!');
            navigateTo('home');
        } else {
            alert('Preencha todos os campos.');
        }
    });
}

function setupSocialButtons() {
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Continuar com ${this.textContent.trim()}`);
            navigateTo('home');
        });
    });
}

function setupSearchCorrection() {
    document.querySelector('.correction')?.addEventListener('click', function(e) {
        e.preventDefault();
        const input = document.querySelector('.search-input-wrapper input');
        if (input) {
            input.value = 'Calça';
            alert('Termo corrigido para: Calça');
        }
    });
}

function setupSearchSuggestions() {
    document.querySelectorAll('.search-suggestion-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('product');
        });
    });
}

function setupOrderDetails() {
    document.querySelectorAll('.order-details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.order-card');
            alert(`Visualizando detalhes do ${card?.querySelector('.order-number')?.textContent || 'pedido'}`);
        });
    });
}

function setupOrderCards() {
    document.querySelectorAll('.order-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.order-details-link')) return;
            alert(`Visualizando detalhes do ${this.querySelector('.order-number')?.textContent || 'pedido'}`);
        });
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

function initApp() {
    console.log('📱 Inicializando app...');
    setupBottomNav();
    setupHeaderIcons();
    setupFooterLinks();
    setupHomeProducts();
    setupMenuLinks();
    setupCartItems();
    setupCartQuantity();
    setupCartActions();
    setupProductSizes();
    setupProductButton();
    setupAccordion();
    setupPaymentClose();
    setupPaymentButton();
    setupPaymentOptions();
    setupAddressActions();
    setupConfirmationLinks();
    setupConfirmationProducts();
    setupLoginForm();
    setupSocialButtons();
    setupSearchCorrection();
    setupSearchSuggestions();
    setupOrderDetails();
    setupOrderCards();
    console.log('✅ App pronto!');
}

document.addEventListener('DOMContentLoaded', initApp);
