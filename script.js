// Smooth scrolling and interactive elements for the landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initStockCountdown();
    initScrollEffects();
    initCTAButtons();
    initTestimonialEffects();
    initPurchaseNotifications();
    
    // Animate elements on scroll
    observeElements();
});

// Stock countdown simulation
function initStockCountdown() {
    let stock = 47;
    let finalStock = 23;
    
    const stockCounter = document.getElementById('stock-counter');
    const finalStockElement = document.getElementById('final-stock');
    
    // Simulate stock decreasing randomly
    setInterval(() => {
        if (stock > 15 && Math.random() < 0.1) { // 10% chance every interval
            stock--;
            if (stockCounter) {
                stockCounter.textContent = stock;
                
                // Add urgency animation
                stockCounter.style.color = '#FF5722';
                stockCounter.style.fontWeight = 'bold';
                setTimeout(() => {
                    stockCounter.style.color = '';
                    stockCounter.style.fontWeight = '';
                }, 1000);
            }
        }
        
        if (finalStock > 8 && Math.random() < 0.08) { // 8% chance every interval
            finalStock--;
            if (finalStockElement) {
                finalStockElement.textContent = finalStock;
                
                // Add pulsing effect
                finalStockElement.parentElement.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    finalStockElement.parentElement.style.animation = '';
                }, 500);
            }
        }
    }, 15000); // Check every 15 seconds
}

// Scroll to purchase section
function scrollToPurchase() {
    window.open('https://pay.cakto.com.br/xpwamnt_499837', '_blank');
}

// Initialize CTA button interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button-main, .cta-button-final, .cta-button-small');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track conversion attempt (in a real scenario, this would integrate with analytics)
            console.log('CTA clicked:', this.textContent.trim());
            
            // For demo purposes, scroll to purchase section
            if (this.id === 'main-cta' || this.classList.contains('cta-button-small')) {
                e.preventDefault();
                scrollToPurchase();
            } else {
                // In a real implementation, this would redirect to payment processor
                alert('Redirecionando para o pagamento seguro...\n\nEm uma implementação real, isso levaria ao processador de pagamento.');
            }
            
            // Add ripple effect
            createRippleEffect(this, e);
        });
        
        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 50px rgba(233, 30, 99, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation to CSS if not already present
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .cta-button-main, .cta-button-final, .cta-button-small {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll effects for sticky bar
function initScrollEffects() {
    const stickyBar = document.querySelector('.sticky-bar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Show/hide sticky bar based on scroll direction, but keep it visible when near buttons
        const finalCTASection = document.getElementById('purchase-section');
        const ctaRect = finalCTASection ? finalCTASection.getBoundingClientRect() : null;
        
        if (currentScrollY > 100) {
            // Keep sticky bar visible if user is near CTA section
            if (ctaRect && ctaRect.top < window.innerHeight && ctaRect.bottom > 0) {
                stickyBar.style.transform = 'translateY(0)';
            } else {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    stickyBar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    stickyBar.style.transform = 'translateY(0)';
                }
            }
        } else {
            stickyBar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Add parallax effect to hero section
        const hero = document.querySelector('.hero');
        if (hero && currentScrollY < hero.offsetHeight) {
            hero.style.transform = `translateY(${currentScrollY * 0.3}px)`;
        }
    });
}

// Animate testimonials
function initTestimonialEffects() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(233, 30, 99, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Intersection Observer for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add special effects for specific elements
                if (entry.target.classList.contains('feature-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 200);
                }
                
                if (entry.target.classList.contains('benefit-item')) {
                    entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(`
        .feature-card,
        .benefit-item,
        .testimonial-card,
        .transition-content,
        .benefits-content,
        .stat-item
    `);
    
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility function to format price with Brazilian currency
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Add urgency timer (visual countdown)
function addUrgencyTimer() {
    const timerElements = document.querySelectorAll('.countdown-timer');
    
    if (timerElements.length === 0) return;
    
    let timeLeft = 24 * 60 * 60; // 24 hours in seconds
    
    const updateTimer = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timerElements.forEach(el => {
            el.textContent = timeString;
        });
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // Timer expired
            timerElements.forEach(el => {
                el.textContent = 'OFERTA ENCERRADA';
                el.style.color = '#FF5722';
            });
        }
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Social proof animation
function animateSocialProof() {
    const socialProofElements = document.querySelectorAll('.social-proof');
    
    socialProofElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(233, 30, 99, 0.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Initialize all animations when page loads
window.addEventListener('load', function() {
    // Add loading animation complete
    document.body.classList.add('loaded');
    
    // Initialize additional features
    addUrgencyTimer();
    animateSocialProof();
    
    // Preload images for better performance
    preloadImages();
});

// Purchase notification system
function initPurchaseNotifications() {
    // Sample customer data for notifications
    const customers = [
        { name: 'Maria S.', city: 'São Paulo' },
        { name: 'João P.', city: 'Rio de Janeiro' },
        { name: 'Ana L.', city: 'Belo Horizonte' },
        { name: 'Carlos M.', city: 'Brasília' },
        { name: 'Lucia F.', city: 'Salvador' },
        { name: 'Pedro R.', city: 'Fortaleza' },
        { name: 'Julia S.', city: 'Recife' },
        { name: 'Roberto C.', city: 'Porto Alegre' },
        { name: 'Fernanda A.', city: 'Curitiba' },
        { name: 'Miguel O.', city: 'Goiânia' },
        { name: 'Beatriz M.', city: 'Manaus' },
        { name: 'Rafael T.', city: 'Belém' },
        { name: 'Camila R.', city: 'Vitória' },
        { name: 'Diego L.', city: 'Natal' },
        { name: 'Isabela C.', city: 'João Pessoa' }
    ];

    let usedCustomers = [];

    // Show notification every 15-30 seconds
    function showRandomNotification() {
        // Reset used customers if all have been used
        if (usedCustomers.length >= customers.length) {
            usedCustomers = [];
        }
        
        // Get available customers
        const availableCustomers = customers.filter(customer => 
            !usedCustomers.some(used => used.name === customer.name)
        );
        
        const customer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
        usedCustomers.push(customer);
        
        const timeAgo = Math.floor(Math.random() * 5) + 1;
        
        const notification = createNotification({
            customerName: customer.name,
            city: customer.city,
            timeAgo: timeAgo
        });
        
        const container = document.getElementById('purchase-notifications');
        container.appendChild(notification);
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('slide-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 500);
            }
        }, 6000);
    }

    // Show first notification after 10 seconds
    setTimeout(() => {
        showRandomNotification();
        // Then show every 20-40 seconds
        setInterval(() => {
            if (Math.random() < 0.7) { // 70% chance to show
                showRandomNotification();
            }
        }, Math.random() * 20000 + 20000); // 20-40 seconds
    }, 10000);
}

function createNotification({ customerName, city, timeAgo }) {
    const notification = document.createElement('div');
    notification.className = 'purchase-notification';
    
    notification.innerHTML = `
        <button class="notification-close" onclick="this.parentNode.classList.add('slide-out'); setTimeout(() => this.parentNode.remove(), 500)">×</button>
        <div class="notification-header">
            <div class="notification-icon">
                <i class="fas fa-check"></i>
            </div>
            <div class="notification-title">Compra Realizada!</div>
        </div>
        <div class="notification-body">
            <strong>${customerName}</strong> de <strong>${city}</strong><br>
            acabou de comprar o e-book há ${timeAgo} minuto${timeAgo > 1 ? 's' : ''}
        </div>
    `;
    
    // Add click to close functionality
    notification.addEventListener('click', function() {
        this.classList.add('slide-out');
        setTimeout(() => {
            if (this.parentNode) {
                this.remove();
            }
        }, 500);
    });
    
    return notification;
}

// Preload critical images
function preloadImages() {
    const imagesToPreload = [
        'https://i.ibb.co/pvzhR8wX/Morango-do-amor.jpg',
        'https://i.ibb.co/TxptSkYt/Morango-do-amor-1.jpg',
        'https://i.ibb.co/q3QMm65k/MORANGO-DO-AMOR-Essa-delicia-puro-sabor-e.jpg'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Performance monitoring (basic)
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log('Page load time:', loadTime, 'ms');
                
                // In a real implementation, this would be sent to analytics
                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime, 'ms');
                }
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Export functions for potential external use
window.LandingPageUtils = {
    scrollToPurchase,
    formatPrice,
    createRippleEffect
};
