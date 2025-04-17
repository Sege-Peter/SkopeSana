// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuOverlay.style.display = 'block';
        setTimeout(() => {
            mobileMenuOverlay.style.opacity = '1';
            document.querySelector('.mobile-menu-container').style.transform = 'translateX(0)';
        }, 10);
    });
    
    closeMobileMenu.addEventListener('click', function() {
        document.querySelector('.mobile-menu-container').style.transform = 'translateX(-100%)';
        mobileMenuOverlay.style.opacity = '0';
        setTimeout(() => {
            mobileMenuOverlay.style.display = 'none';
        }, 300);
    });

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('skopesana_cart')) || [];
    updateCartCount();

    // Add to Cart Buttons
    document.querySelectorAll('.btn.add-to-cart, .deal .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id') || '1'; // Default to deal product if no ID
            addToCart(productId, 1);
            showNotification('Item added to cart!');
        });
    });

    // Search Functionality
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input').value.trim();
        if (searchTerm) {
            // In a real implementation, this would redirect to search results
            alert(`Searching for: ${searchTerm}`);
            this.querySelector('input').value = '';
        }
    });

    // Product Category Links
    document.querySelectorAll('.category-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.closest('.category-card').querySelector('h3').textContent;
            // In a real implementation, this would filter products
            alert(`Showing ${category} products`);
        });
    });

    // Quick Links Navigation
    document.querySelectorAll('.links-grid a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = this.textContent;
            // In a real implementation, this would filter products
            alert(`Showing ${searchTerm} products`);
        });
    });

    // Functions
    function addToCart(productId, quantity) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity: quantity });
        }
        localStorage.setItem('skopesana_cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--success);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth >= 768) {
            mobileMenuOverlay.style.display = 'none';
            document.querySelector('.mobile-menu-container').style.transform = 'translateX(-100%)';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
