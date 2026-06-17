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
// BOTTOM NAVIGATION
// ============================================

function setupBottomNav() {
    const navIcons = document.querySelectorAll('.bottom-nav .nav-icon, .bottom-nav-icon');
    const navMap = {
        0: 'home',
        1: 'search',
        2: 'cart',
        3: 'login'
    };
    
    navIcons.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const page = navMap[index];
            if (page) {
                navigateTo(page);
            }
        });
    });
}

// ============================================
// HEADER ICONS
// ============================================

function setupHeaderIcons() {
    // Botão voltar
    const backBtns = document.querySelectorAll('.header-icon[aria-label="Voltar"]');
    backBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('back');
        });
    });

    // Botão menu (hambúrguer)
    const menuBtns = document.querySelectorAll('.header-icon[aria-label="Menu"]');
    menuBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('menu');
        });
    });

    // Botão carrinho - CORRIGIDO: seletores mais específicos
    const cartBtns = document.querySelectorAll(
        // Header padrão
        '.header-icon[aria-label="Carrinho"], ' +
        // Finalize (confirmação)
        '.finalize-header .header-icon:last-child, ' +
        // Orders (pedidos)
        '.orders-header .header-icon:last-child, ' +
        // Login
        '.login-header .header-icon:last-child, ' +
        // Menu
        '.menu-header .header-icon:last-child, ' +
        // Search (busca)
        '.search-header .header-icon:last-child, ' +
        // Product (produto)
        '.product-topbar .header-icon:last-child, ' +
        // Cart (carrinho) - o próprio ícone do carrinho no header
        '.cart-topbar .header-icon:last-child'
    );
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateTo('cart');
        });
    });
}

// ============================================
// FOOTER LINKS
// ============================================

function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-nav a, .finalize-footer .footer-nav a, .orders-footer .footer-nav a, .menu-footer .footer-nav a, .search-footer .footer-nav a, .login-footer .footer-nav a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim().toLowerCase();
            alert(`Navegando para: ${text}`);
        });
    });
}

// ============================================
// HOME PAGE - Produtos levam para product.html
// ============================================

function setupHomeProducts() {
    // Produto em destaque (Featured Product)
    const featuredImage = document.querySelector('.frame[data-name="Featured Product Section (As per wireframe IMAGE_5)"] .frame[data-name="Background"] > .frame');
    if (featuredImage) {
        featuredImage.style.cursor = 'pointer';
        featuredImage.addEventListener('click', function(e) {
            if (e.target.closest('.featured-heart')) return;
            navigateTo('product');
        });
    }

    // Produtos da grade assimétrica
    const gridImages = document.querySelectorAll('.frame[data-name="Asymmetric Grid Section"] .frame[data-name="Background"] > .frame');
    gridImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            navigateTo('product');
        });
    });

    // Botão "VER TODA A COLEÇÃO"
    const ctaBtn = document.querySelector('.frame[data-name="CTA Section → Button"]');
    if (ctaBtn) {
        ctaBtn.style.cursor = 'pointer';
        ctaBtn.addEventListener('click', function() {
            navigateTo('search');
        });
    }
}

// ============================================
// MENU PAGE - Links funcionais (CORRIGIDO)
// ============================================

function setupMenuLinks() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const label = this.querySelector('.item-label');
            if (label) {
                const text = label.textContent.trim();
                // Mapeia os itens do menu
                const menuMap = {
                    'NEW ARRIVALS': 'home',    // → HOME
                    'COLLECTIONS': 'home',      // → HOME
                    'MEN': 'home',              // → HOME
                    'WOMEN': 'home',            // → HOME
                    'ACCOUNT': 'login'          // → LOGIN
                };
                const target = menuMap[text] || 'home';
                navigateTo(target);
            }
        });
    });
}

// ============================================
// CART PAGE - Produtos levam para product.html
// ============================================

function setupCartItems() {
    // Imagens dos itens do carrinho
    const cartImages = document.querySelectorAll('.cart-item-media');
    cartImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            navigateTo('product');
        });
    });

    // Nomes dos produtos no carrinho
    const cartTitles = document.querySelectorAll('.cart-item-title');
    cartTitles.forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            navigateTo('product');
        });
    });

    // Recomendações no carrinho
    const recommendations = document.querySelectorAll('.recommendation-card');
    recommendations.forEach(rec => {
        rec.style.cursor = 'pointer';
        rec.addEventListener('click', function() {
            navigateTo('product');
        });
    });
}

// ============================================
// CONFIRMATION PAGE - Produtos recomendados
// ============================================

function setupConfirmationProducts() {
    const products = document.querySelectorAll('.product-item');
    products.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            navigateTo('product');
        });
    });

    const thumbs = document.querySelectorAll('.product-thumb');
    thumbs.forEach(thumb => {
        thumb.style.cursor = 'pointer';
        thumb.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateTo('product');
        });
    });
}

// ============================================
// PRODUCT PAGE - Seleção de tamanho
// ============================================

function setupProductSizes() {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.closest('.attribute-sizes');
            if (parent) {
                parent.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            }
        });
    });
}

// ============================================
// PRODUCT PAGE - Botão "Adicionar ao Carrinho"
// ============================================

function setupProductButton() {
    const addBtn = document.querySelector('.product-button');
    if (addBtn) {
        addBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedSize = document.querySelector('.size-option.selected');
            const sizeText = selectedSize ? selectedSize.textContent : 'P';
            alert(`Produto adicionado ao carrinho!\nTamanho: ${sizeText}`);
            if (confirm('Deseja ir para o carrinho agora?')) {
                navigateTo('cart');
            }
        });
    }
}

// ============================================
// PRODUCT PAGE - Accordion
// ============================================

function setupAccordion() {
    const accordionRows = document.querySelectorAll('.accordion-row');
    accordionRows.forEach(row => {
        row.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('.accordion-icon');
            let content = this.nextElementSibling;
            
            if (!content || !content.classList.contains('accordion-content')) {
                const label = this.querySelector('span:first-child');
                if (label) {
                    alert(`Expandindo: ${label.textContent}`);
                }
                return;
            }
            
            const isOpen = content.style.display !== 'none';
            content.style.display = isOpen ? 'none' : 'block';
            if (icon) {
                icon.textContent = isOpen ? '+' : '−';
            }
        });
    });
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
            minusBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (span) {
                    let val = parseInt(span.textContent) || 1;
                    if (val > 1) {
                        val--;
                        span.textContent = val;
                    }
                }
            });
        }
        if (plusBtn) {
            plusBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (span) {
                    let val = parseInt(span.textContent) || 1;
                    val++;
                    span.textContent = val;
                }
            });
        }
    });
}

// ============================================
// CART PAGE - Botões de ação
// ============================================

function setupCartActions() {
    const primaryBtn = document.querySelector('.cart-action.primary');
    const secondaryBtn = document.querySelector('.cart-action.secondary');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('payment');
        });
    }
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('home');
        });
    }
}

// ============================================
// PAYMENT PAGE - Botão "X" (fechar)
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
// PAYMENT PAGE - "Finalizar pedido"
// ============================================

function setupPaymentButton() {
    const finalizeBtn = document.querySelector('.finalize-button');
    if (finalizeBtn) {
        finalizeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Confirmar pagamento?')) {
                navigateTo('confirmation');
            }
        });
    }
}

// ============================================
// PAYMENT PAGE - Métodos de pagamento (seleção)
// ============================================

function setupPaymentOptions() {
    const options = document.querySelectorAll('.payment-option');
    options.forEach(option => {
        option.style.cursor = 'pointer';
        option.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.style.opacity = '0.5';
            });
            this.style.opacity = '1';
            const text = this.querySelector('.payment-text');
            if (text) {
                alert(`Método de pagamento selecionado: ${text.textContent}`);
            }
        });
    });
}

// ============================================
// PAYMENT PAGE - Endereço (editar/cadastrar)
// ============================================

function setupAddressActions() {
    const editBtn = document.querySelector('.address-edit');
    const registerBtn = document.querySelector('.register-address-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Editar endereço: Rua Oscar Freire, 1000');
        });
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Cadastrar novo endereço');
        });
    }
}

// ============================================
// CONFIRMATION PAGE - "Ver meus pedidos"
// ============================================

function setupConfirmationLinks() {
    const orderLink = document.querySelector('.cta-link');
    if (orderLink) {
        orderLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('orders');
        });
    }
}

// ============================================
// LOGIN PAGE - Formulário
// ============================================

function setupLoginForm() {
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
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
        });
    }
}

// ============================================
// LOGIN PAGE - Botões sociais
// ============================================

function setupSocialButtons() {
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            alert(`Continuar com ${text}`);
            navigateTo('home');
        });
    });
}

// ============================================
// SEARCH PAGE - Correção de termo
// ============================================

function setupSearchCorrection() {
    const correction = document.querySelector('.correction');
    if (correction) {
        correction.addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.querySelector('.search-input-wrapper input');
            if (input) {
                input.value = 'Calça';
                alert('Termo corrigido para: Calça');
            }
        });
    }
}

// ============================================
// SEARCH PAGE - Sugestões de produtos
// ============================================

function setupSearchSuggestions() {
    const suggestions = document.querySelectorAll('.search-suggestion-item');
    suggestions.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('product');
        });
    });
}

// ============================================
// ORDERS PAGE - "VER DETALHES"
// ============================================

function setupOrderDetails() {
    const detailLinks = document.querySelectorAll('.order-details-link');
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.order-card');
            const orderNumber = card ? card.querySelector('.order-number') : null;
            if (orderNumber) {
                alert(`Visualizando detalhes do ${orderNumber.textContent}`);
            }
        });
    });
}

// ============================================
// ORDERS PAGE - Clique no card do pedido
// ============================================

function setupOrderCards() {
    const cards = document.querySelectorAll('.order-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.order-details-link')) return;
            const orderNumber = this.querySelector('.order-number');
            if (orderNumber) {
                alert(`Visualizando detalhes do ${orderNumber.textContent}`);
            }
        });
    });
}

// ============================================
// INICIALIZAÇÃO GERAL
// ============================================

function initApp() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPage = currentPath.replace('.html', '');
    
    console.log(`📱 Inicializando: ${currentPage}`);
    
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
    
    console.log('✅ App inicializado com sucesso!');
}

document.addEventListener('DOMContentLoaded', initApp);
