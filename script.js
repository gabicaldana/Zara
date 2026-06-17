// ============================================
// NAVEGAÇÃO ENTRE TELAS
// ============================================

// Mapeamento de páginas
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

// Função para navegar entre páginas
function navigateTo(page) {
    if (page === 'back') {
        window.history.back();
        return;
    }
    if (page.startsWith('http')) {
        window.location.href = page;
        return;
    }
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
// BOTTOM NAVIGATION - Adicionar em todas as páginas
// ============================================

function setupBottomNav(currentPage) {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon, .bottom-nav-icon');
    const navMap = {
        0: 'home',
        1: 'search',
        2: 'cart',
        3: 'login'
    };
    
    navIcons.forEach((icon, index) => {
        if (icon) {
            // Remove eventos antigos para evitar duplicação
            icon.removeEventListener('click', handleNavClick);
            icon.addEventListener('click', handleNavClick);
            // Armazena o índice para uso no handler
            icon.dataset.navIndex = index;
        }
    });
}

function handleNavClick(e) {
    const icon = e.currentTarget;
    const index = parseInt(icon.dataset.navIndex);
    const navMap = {
        0: 'home',
        1: 'search',
        2: 'cart',
        3: 'login'
    };
    const page = navMap[index];
    if (page) {
        navigateTo(page);
    }
}

// ============================================
// HEADER ICONS
// ============================================

function setupHeaderIcons() {
    // Botão voltar
    const backBtns = document.querySelectorAll('.header-icon[aria-label="Voltar"]');
    backBtns.forEach(btn => {
        btn.removeEventListener('click', handleBack);
        btn.addEventListener('click', handleBack);
    });

    // Botão menu
    const menuBtns = document.querySelectorAll('.header-icon[aria-label="Menu"]');
    menuBtns.forEach(btn => {
        btn.removeEventListener('click', handleMenu);
        btn.addEventListener('click', handleMenu);
    });

    // Botão carrinho
    const cartBtns = document.querySelectorAll('.header-icon[aria-label="Carrinho"]');
    cartBtns.forEach(btn => {
        btn.removeEventListener('click', handleCart);
        btn.addEventListener('click', handleCart);
    });
}

function handleBack() {
    navigateTo('back');
}

function handleMenu() {
    navigateTo('menu');
}

function handleCart() {
    navigateTo('cart');
}

// ============================================
// FOOTER LINKS
// ============================================

function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-nav a, .finalize-footer .footer-nav a, .orders-footer .footer-nav a, .menu-footer .footer-nav a, .search-footer .footer-nav a, .login-footer .footer-nav a');
    footerLinks.forEach(link => {
        link.removeEventListener('click', handleFooterLink);
        link.addEventListener('click', handleFooterLink);
    });
}

function handleFooterLink(e) {
    e.preventDefault();
    const text = e.currentTarget.textContent.trim().toLowerCase();
    // Apenas simula navegação ou exibe alerta
    alert(`Navegando para: ${text}`);
}

// ============================================
// CONFIRMATION PAGE - "Ver meus pedidos"
// ============================================

function setupConfirmationLinks() {
    const orderLink = document.querySelector('.cta-link');
    if (orderLink) {
        orderLink.removeEventListener('click', handleOrderLink);
        orderLink.addEventListener('click', handleOrderLink);
    }
}

function handleOrderLink(e) {
    e.preventDefault();
    navigateTo('orders');
}

// ============================================
// PRODUCT PAGE - Seleção de tamanho
// ============================================

function setupProductSizes() {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.removeEventListener('click', handleSizeSelect);
        option.addEventListener('click', handleSizeSelect);
    });
}

function handleSizeSelect(e) {
    const selected = e.currentTarget;
    const parent = selected.closest('.attribute-sizes');
    if (parent) {
        parent.querySelectorAll('.size-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        selected.classList.add('selected');
    }
}

// ============================================
// PRODUCT PAGE - Botão "Adicionar ao Carrinho"
// ============================================

function setupProductButton() {
    const addBtn = document.querySelector('.product-button');
    if (addBtn) {
        addBtn.removeEventListener('click', handleAddToCart);
        addBtn.addEventListener('click', handleAddToCart);
    }
}

function handleAddToCart() {
    const selectedSize = document.querySelector('.size-option.selected');
    const sizeText = selectedSize ? selectedSize.textContent : 'P';
    alert(`Produto adicionado ao carrinho!\nTamanho: ${sizeText}`);
    // Redireciona para o carrinho após confirmação
    if (confirm('Deseja ir para o carrinho agora?')) {
        navigateTo('cart');
    }
}

// ============================================
// PRODUCT PAGE - Accordion
// ============================================

function setupAccordion() {
    const accordionRows = document.querySelectorAll('.accordion-row');
    accordionRows.forEach(row => {
        row.removeEventListener('click', handleAccordion);
        row.addEventListener('click', handleAccordion);
    });
}

function handleAccordion(e) {
    const row = e.currentTarget;
    const icon = row.querySelector('.accordion-icon');
    const content = row.nextElementSibling;
    
    if (content && content.classList.contains('accordion-content')) {
        const isOpen = content.style.display !== 'none';
        content.style.display = isOpen ? 'none' : 'block';
        if (icon) {
            icon.textContent = isOpen ? '+' : '−';
        }
    } else {
        // Se não houver conteúdo, apenas simula
        const label = row.querySelector('span:first-child');
        if (label) {
            alert(`Expandindo: ${label.textContent}`);
        }
    }
}

// ============================================
// CART PAGE - Quantidade
// ============================================

function setupCartQuantity() {
    const quantityGroups = document.querySelectorAll('.cart-quantity');
    quantityGroups.forEach(group => {
        const minusBtn = group.querySelector('button:first-child');
        const plusBtn = group.querySelector('button:last-child');
        const span = group.querySelector('span');
        
        if (minusBtn) {
            minusBtn.removeEventListener('click', handleQuantityMinus);
            minusBtn.addEventListener('click', handleQuantityMinus);
        }
        if (plusBtn) {
            plusBtn.removeEventListener('click', handleQuantityPlus);
            plusBtn.addEventListener('click', handleQuantityPlus);
        }
        
        // Armazena referência ao span
        if (span) {
            group.dataset.quantitySpan = span.textContent;
        }
    });
}

function handleQuantityMinus(e) {
    const group = e.currentTarget.closest('.cart-quantity');
    const span = group.querySelector('span');
    if (span) {
        let val = parseInt(span.textContent) || 1;
        if (val > 1) {
            val--;
            span.textContent = val;
        }
    }
}

function handleQuantityPlus(e) {
    const group = e.currentTarget.closest('.cart-quantity');
    const span = group.querySelector('span');
    if (span) {
        let val = parseInt(span.textContent) || 1;
        val++;
        span.textContent = val;
    }
}

// ============================================
// CART PAGE - Botões de ação
// ============================================

function setupCartActions() {
    const primaryBtn = document.querySelector('.cart-action.primary');
    const secondaryBtn = document.querySelector('.cart-action.secondary');
    
    if (primaryBtn) {
        primaryBtn.removeEventListener('click', handleCheckout);
        primaryBtn.addEventListener('click', handleCheckout);
    }
    if (secondaryBtn) {
        secondaryBtn.removeEventListener('click', handleContinueShopping);
        secondaryBtn.addEventListener('click', handleContinueShopping);
    }
}

function handleCheckout() {
    navigateTo('payment');
}

function handleContinueShopping() {
    navigateTo('home');
}

// ============================================
// PAYMENT PAGE - "Finalizar pedido"
// ============================================

function setupPaymentButton() {
    const finalizeBtn = document.querySelector('.finalize-button');
    if (finalizeBtn) {
        finalizeBtn.removeEventListener('click', handleFinalize);
        finalizeBtn.addEventListener('click', handleFinalize);
    }
}

function handleFinalize() {
    if (confirm('Confirmar pagamento?')) {
        navigateTo('confirmation');
    }
}

// ============================================
// LOGIN PAGE - Formulário
// ============================================

function setupLoginForm() {
    const form = document.querySelector('.login-form');
    if (form) {
        form.removeEventListener('submit', handleLogin);
        form.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    if (email && password) {
        if (email.value.trim() && password.value.trim()) {
            alert('Login realizado com sucesso!');
            navigateTo('home');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }
}

// ============================================
// MENU PAGE - Links do menu
// ============================================

function setupMenuLinks() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.removeEventListener('click', handleMenuClick);
        item.addEventListener('click', handleMenuClick);
    });
}

function handleMenuClick(e) {
    e.preventDefault();
    const label = e.currentTarget.querySelector('.item-label');
    if (label) {
        alert(`Navegando para: ${label.textContent}`);
        // Aqui você pode redirecionar para páginas específicas
        // Exemplo: if (label.textContent === 'NEW ARRIVALS') navigateTo('search');
    }
}

// ============================================
// SEARCH PAGE - Correção de termo
// ============================================

function setupSearchCorrection() {
    const correction = document.querySelector('.correction');
    if (correction) {
        correction.removeEventListener('click', handleCorrection);
        correction.addEventListener('click', handleCorrection);
    }
}

function handleCorrection() {
    const input = document.querySelector('.search-input-wrapper input');
    if (input) {
        input.value = 'Calça';
        alert('Termo corrigido para: Calça');
    }
}

// ============================================
// SEARCH PAGE - Sugestões de produtos
// ============================================

function setupSearchSuggestions() {
    const suggestions = document.querySelectorAll('.search-suggestion-item');
    suggestions.forEach(item => {
        item.removeEventListener('click', handleSuggestionClick);
        item.addEventListener('click', handleSuggestionClick);
    });
}

function handleSuggestionClick(e) {
    e.preventDefault();
    const name = e.currentTarget.querySelector('.product-name');
    if (name) {
        alert(`Visualizando: ${name.textContent}`);
        navigateTo('product');
    }
}

// ============================================
// ORDERS PAGE - "VER DETALHES"
// ============================================

function setupOrderDetails() {
    const detailLinks = document.querySelectorAll('.order-details-link');
    detailLinks.forEach(link => {
        link.removeEventListener('click', handleOrderDetails);
        link.addEventListener('click', handleOrderDetails);
    });
}

function handleOrderDetails(e) {
    e.preventDefault();
    const card = e.currentTarget.closest('.order-card');
    const orderNumber = card ? card.querySelector('.order-number') : null;
    if (orderNumber) {
        alert(`Visualizando detalhes do ${orderNumber.textContent}`);
        // Aqui você pode redirecionar para uma página de detalhes do pedido
    }
}

// ============================================
// PAYMENT PAGE - Métodos de pagamento (seleção)
// ============================================

function setupPaymentOptions() {
    const options = document.querySelectorAll('.payment-option');
    options.forEach(option => {
        option.removeEventListener('click', handlePaymentSelect);
        option.addEventListener('click', handlePaymentSelect);
        // Adiciona estilo de cursor pointer
        option.style.cursor = 'pointer';
    });
}

function handlePaymentSelect(e) {
    const option = e.currentTarget;
    const text = option.querySelector('.payment-text');
    if (text) {
        // Remove seleção anterior
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.style.opacity = '0.5';
        });
        option.style.opacity = '1';
        alert(`Método de pagamento selecionado: ${text.textContent}`);
    }
}

// ============================================
// PAYMENT PAGE - Endereço (editar/cadastrar)
// ============================================

function setupAddressActions() {
    const editBtn = document.querySelector('.address-edit');
    const registerBtn = document.querySelector('.register-address-btn');
    
    if (editBtn) {
        editBtn.removeEventListener('click', handleEditAddress);
        editBtn.addEventListener('click', handleEditAddress);
    }
    if (registerBtn) {
        registerBtn.removeEventListener('click', handleRegisterAddress);
        registerBtn.addEventListener('click', handleRegisterAddress);
    }
}

function handleEditAddress() {
    alert('Editar endereço: Rua Oscar Freire, 1000');
}

function handleRegisterAddress() {
    alert('Cadastrar novo endereço');
}

// ============================================
// INICIALIZAÇÃO GERAL
// ============================================

function initApp() {
    // Detecta a página atual
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPage = currentPath.replace('.html', '');
    
    console.log(`📱 Inicializando: ${currentPage}`);
    
    // Configura todos os componentes
    setupBottomNav(currentPage);
    setupHeaderIcons();
    setupFooterLinks();
    setupConfirmationLinks();
    setupProductSizes();
    setupProductButton();
    setupAccordion();
    setupCartQuantity();
    setupCartActions();
    setupPaymentButton();
    setupLoginForm();
    setupMenuLinks();
    setupSearchCorrection();
    setupSearchSuggestions();
    setupOrderDetails();
    setupPaymentOptions();
    setupAddressActions();
    
    console.log('✅ App inicializado com sucesso!');
}

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', initApp);