// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize countdown timer
    initializeCountdown();
    
    // Initialize video section
    initializeVideoSection();
});

// Animation Functions
function initializeAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll('.invitation-card, .detail-card, .address-card, .rsvp-card');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Animate header elements
    setTimeout(() => {
        const headerElements = document.querySelectorAll('.main-title, .subtitle, .decorative-line');
        headerElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('bounce-in');
            }, index * 200);
        });
    }, 500);
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight items hover effect
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Detail cards hover effect
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact items click to copy
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            copyToClipboard(text);
            showNotification('Copied to clipboard: ' + text);
        });
    });
}

// Remove Particles Function
function removeParticles() {
    // Remove floating particles
    const floatingParticles = document.querySelectorAll('.floating-particle');
    floatingParticles.forEach(particle => {
        particle.remove();
    });
    
    // Remove matrix rain canvas
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        matrixCanvas.remove();
    }
    
    // Remove any existing confetti
    const existingConfetti = document.querySelectorAll('div[style*="position: fixed"][style*="border-radius: 50%"]');
    existingConfetti.forEach(confetti => {
        confetti.remove();
    });
    
    // Clear particles container
    const particleContainer = document.querySelector('.particles');
    if (particleContainer) {
        particleContainer.innerHTML = '';
    }
}

// Download Function
function downloadInvitation() {
    try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'Aarambh2K25 Invitation.jpeg';
        link.download = 'Aarambh2K25 Invitation.jpeg';
        link.style.display = 'none';
        
        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        showNotification('Download started! Check your Downloads folder.');
        
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.');
    }
}

// RSVP Functions
function rsvpResponse(response) {
   
        // Download the invitation
        downloadInvitation();
        
    
    // Add button click animation
    const clickedBtn = response === 'yes' ? yesBtn : yesBtn;
    clickedBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedBtn.style.transform = 'scale(1)';
    }, 150);
}

// Countdown Timer
function initializeCountdown() {
    // Event date: July 13th, 2025 at 10:00 AM
    const eventDate = new Date('2025-07-13T10:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeDiff = eventDate - now;
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const messageElement = document.getElementById('countdownMessage');
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // Update display elements
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Update message
            if (messageElement) {
                if (days > 0) {
                    messageElement.textContent = `${days} days until the AARAMBH 2k25 begins!`;
                } else if (hours > 0) {
                    messageElement.textContent = `Only ${hours} hours left! Get ready to enter the matrix!`;
                } else if (minutes > 0) {
                    messageElement.textContent = `${minutes} minutes remaining! The countdown is almost over!`;
                } else {
                    messageElement.textContent = `${seconds} seconds left! AARAMBH 2k25 is about to begin!`;
                }
            }
            
            // Add pulsing effect when time is running low
            const countdownCard = document.querySelector('.countdown-card');
            if (countdownCard) {
                if (hours < 1 && days === 0) {
                    countdownCard.classList.add('urgent-countdown');
                } else {
                    countdownCard.classList.remove('urgent-countdown');
                }
            }
            
        } else {
            // Event has started or passed
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            if (messageElement) {
                messageElement.innerHTML = '<span class="event-live">🎉 AARAMBH 2k25 is LIVE! 🎉</span>';
            }
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// Utility Functions
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Particle Animation for Header
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 8s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    
    return particle;
}

// Add particle animation to header
setTimeout(() => {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            particlesContainer.appendChild(createParticle());
        }
    }
}, 1000);

// Load saved RSVP status
// document.addEventListener('DOMContentLoaded', function() {
//     const savedRSVP = localStorage.getItem('aarambh2k25_rsvp');
//     if (savedRSVP) {
//         const statusElement = document.getElementById('rsvpStatus');
//         const yesBtn = document.querySelector('.yes-btn');
//         // const noBtn = document.querySelector('.no-btn');
        
//         if (savedRSVP === 'confirmed') {
//             statusElement.innerHTML = '<i class="fas fa-check-circle"></i> You\'ve downloaded the invitation successfully! 🎉';
//             statusElement.className = 'rsvp-status success show';
//             yesBtn.style.background = '#28a745';
//             // noBtn.style.background = '#6c757d';
//         }
//     }
// });

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konami.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🎉 Easter egg activated! Party mode ON! 🎉');
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        // Remove after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 10000);
    }
});

// Cyber Security Theme Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and effects
    initializeAnimations();
    initializeParticles();
    initializeGlitchEffects();
    
    // Add scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add typing effect to title
    addTypingEffect();
    
    // Add matrix rain effect
    // createMatrixRain();
});

// Handle scroll animations
function handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.particles');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Add glow effect to header on scroll
    const header = document.querySelector('.header');
    if (scrolled > 50) {
        header.style.boxShadow = '0 0 50px rgba(0, 255, 255, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// Add typing effect to theme text
function addTypingEffect() {
    const themeText = document.querySelector('.theme-text');
    if (themeText) {
        const originalText = themeText.textContent;
        themeText.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                themeText.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Add blinking cursor effect
                themeText.innerHTML += '<span class="cursor">|</span>';
                
                // Animate cursor blink
                setInterval(() => {
                    const cursor = themeText.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }
                }, 500);
            }
        }, 100);
    }
}

// Create matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Initialize particle effects
function initializeParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 5}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.6;
            }
            33% {
                transform: translateY(-20px) translateX(10px);
                opacity: 1;
            }
            66% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize glitch effects
function initializeGlitchEffects() {
    const glitchElements = document.querySelectorAll('.main-title, .card-header h2, .section-header h2');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 2px #00ff00,
                0 -2px #ff00ff
            `;
            element.style.animation = 'glitch 0.3s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.textShadow = '';
            element.style.animation = '';
        });
    });
    
    // Add glitch animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translateX(0); }
            10% { transform: translateX(-2px); }
            20% { transform: translateX(2px); }
            30% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            50% { transform: translateX(0); }
            60% { transform: translateX(-2px); }
            70% { transform: translateX(2px); }
            80% { transform: translateX(-2px); }
            90% { transform: translateX(2px); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// Mobile-specific optimizations
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce particle count for mobile
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach((particle, index) => {
            if (index > 10) {
                particle.remove();
            }
        });
        
        // Disable matrix effect on mobile for performance
        const matrixCanvas = document.getElementById('matrix-canvas');
        if (matrixCanvas) {
            matrixCanvas.style.display = 'none';
        }
    }
}

// Initialize mobile optimizations
window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();

// Service Worker for offline capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Add keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    // Press 'Y' to confirm attendance
    if (e.key.toLowerCase() === 'y') {
        rsvpResponse('yes');
    }
    
    // Press 'N' to decline attendance
    if (e.key.toLowerCase() === 'n') {
        rsvpResponse('no');
    }
    
    // Press 'C' to copy contact information
    if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
        const contactInfo = document.querySelector('.contact-info').textContent;
        navigator.clipboard.writeText(contactInfo);
    }
});

// Auto-scroll functionality has been disabled
// Users can now scroll manually at their own pace

// Video Section Functionality
function initializeVideoSection() {
    const video = document.querySelector('.event-video');
    const playButton = document.querySelector('.play-button');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (video && playButton && videoOverlay) {
        // Custom play button functionality
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoOverlay.style.opacity = '0';
                setTimeout(() => {
                    videoOverlay.style.display = 'none';
                }, 300);
            }
        });
        
        // Show overlay when video is paused
        video.addEventListener('pause', function() {
            videoOverlay.style.display = 'flex';
            setTimeout(() => {
                videoOverlay.style.opacity = '1';
            }, 50);
        });
        
        // Hide overlay when video starts playing
        video.addEventListener('play', function() {
            videoOverlay.style.opacity = '0';
            setTimeout(() => {
                videoOverlay.style.display = 'none';
            }, 300);
        });
        
        // Show overlay when video ends
        video.addEventListener('ended', function() {
            videoOverlay.style.display = 'flex';
            setTimeout(() => {
                videoOverlay.style.opacity = '1';
            }, 50);
        });
        
        // Add cyber glow effect on hover
        // const videoCard = document.querySelector('.video-card');
        // if (videoCard) {
        //     videoCard.addEventListener('mouseenter', function() {
        //         this.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)';
        //     });
            
        //     videoCard.addEventListener('mouseleave', function() {
        //         this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        //     });
        // }
    }
} 