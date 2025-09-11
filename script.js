// DOM Elements
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const contactForm = document.getElementById('contactForm');

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Header Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (mobileMenuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Animated Counter for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate counters when hero stats come into view
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements with data-aos attributes
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Observe hero stats for counter animation
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.circuit-pattern');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.company || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Testimonial Slider (if testimonials exist)
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
}

// Card Hover Effects
document.querySelectorAll('.service-card, .value-card, .case-study-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Floating Animation for Hero Elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-particle';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 200, 151, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        hero.appendChild(element);
    }
}

// Add floating particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    @media (max-width: 768px) {
        .nav.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 8px 8px;
        }
        
        .nav.active .nav-list {
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav.active .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: #f8fafc;
            margin-top: 0.5rem;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
    createFloatingElements();
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 1000);
    });
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16)); // ~60fps

// Chatbot functionality
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Company knowledge base
    const knowledgeBase = {
        services: {
            keywords: ['services', 'offer', 'what do you do', 'solutions', 'consulting'],
            response: `Circuit Strategies offers comprehensive AI consulting services including:

• **AI Strategy Development** - Custom roadmaps for AI adoption
• **Machine Learning Implementation** - End-to-end ML solutions
• **Data Analytics & Insights** - Transform data into actionable intelligence
• **AI Ethics & Governance** - Responsible AI frameworks
• **Process Automation** - Streamline operations with intelligent automation
• **AI Training & Education** - Upskill your team for the AI era

We specialize in ethical AI solutions that drive real business value while maintaining transparency and fairness.`
        },
        ethical_ai: {
            keywords: ['ethical', 'ethics', 'responsible', 'bias', 'fairness', 'transparency'],
            response: `Ethical AI is at the core of everything we do at Circuit Strategies:

🎯 **Our Ethical AI Principles:**
• **Transparency** - Clear, explainable AI decisions
• **Fairness** - Unbiased algorithms that serve everyone
• **Privacy Protection** - Safeguarding sensitive data
• **Human-Centered Design** - AI that augments human capabilities
• **Accountability** - Clear responsibility for AI outcomes

We ensure your AI systems are not just powerful, but also trustworthy and aligned with your values. Our ethical framework helps you build AI that your customers and stakeholders can trust.`
        },
        business_benefits: {
            keywords: ['benefits', 'help', 'business', 'roi', 'value', 'impact', 'transform'],
            response: `AI can transform your business in multiple ways:

📈 **Key Benefits:**
• **Increased Efficiency** - Automate repetitive tasks (up to 40% time savings)
• **Better Decision Making** - Data-driven insights for strategic choices
• **Enhanced Customer Experience** - Personalized interactions and faster service
• **Cost Reduction** - Optimize operations and reduce manual errors
• **Competitive Advantage** - Stay ahead with cutting-edge technology
• **Scalable Growth** - AI solutions that grow with your business

Our clients typically see ROI within 6-12 months through improved productivity, reduced costs, and new revenue opportunities.`
        },
        process: {
            keywords: ['process', 'how', 'methodology', 'approach', 'steps', 'workflow'],
            response: `Our proven AI implementation process:

🔄 **Our 5-Step Methodology:**
1. **Discovery & Assessment** - Understand your business needs and AI readiness
2. **Strategy Development** - Create a custom AI roadmap aligned with your goals
3. **Solution Design** - Architect the right AI solutions for your challenges
4. **Implementation & Testing** - Deploy with rigorous testing and validation
5. **Optimization & Support** - Continuous improvement and ongoing support

Each project includes stakeholder training, change management, and comprehensive documentation to ensure long-term success.`
        },
        contact: {
            keywords: ['contact', 'reach', 'talk', 'consultation', 'meeting', 'discuss'],
            response: `Ready to start your AI journey? Let's connect!

📞 **Get in Touch:**
• **Email:** mmugomeza@circuitstrategies.com
• **Phone:** +1 438 763 4432
• **LinkedIn:** Circuit Strategies

We offer free initial consultations to discuss your AI needs and explore how we can help transform your business. Our team is ready to answer your questions and provide personalized recommendations.`
        },
        pricing: {
            keywords: ['price', 'cost', 'pricing', 'budget', 'investment', 'fee'],
            response: `Our pricing is tailored to your specific needs and project scope:

💰 **Flexible Pricing Options:**
• **Consultation Services** - Hourly or project-based rates
• **Implementation Projects** - Fixed-price packages
• **Ongoing Support** - Monthly retainer options
• **Training Programs** - Per-participant or group rates

We believe in transparent pricing with no hidden costs. Contact us for a personalized quote based on your requirements. We also offer flexible payment terms to accommodate different budget cycles.`
        },
        team: {
            keywords: ['team', 'who', 'experts', 'experience', 'background'],
            response: `Our team combines deep technical expertise with business acumen:

👥 **Our Expertise:**
• **AI/ML Engineers** - Advanced degrees in computer science and AI
• **Data Scientists** - Statistical modeling and analytics experts
• **Business Consultants** - Industry experience across multiple sectors
• **Ethics Specialists** - Ensuring responsible AI development
• **Project Managers** - Agile delivery and stakeholder management

With combined experience of 50+ years in AI and consulting, we've successfully delivered projects across healthcare, finance, retail, and manufacturing industries.`
        }
    };

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Generate response after delay
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(message);
                addMessage(response, 'bot');
            }, 1500);
        }
    }

    // Add message to chat
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.innerHTML = content.replace(/\n/g, '<br>');
        messageContent.appendChild(messageText);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    // Generate AI response
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check knowledge base for matching keywords
        for (const [category, data] of Object.entries(knowledgeBase)) {
            if (data.keywords.some(keyword => message.includes(keyword))) {
                return data.response;
            }
        }
        
        // Fallback responses for common greetings and general queries
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm here to help you learn about Circuit Strategies' AI consulting services. What would you like to know about our solutions?";
        }
        
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Is there anything else you'd like to know about our AI services or how we can help your business?";
        }
        
        if (message.includes('bye') || message.includes('goodbye')) {
            return "Thank you for your interest in Circuit Strategies! Feel free to reach out anytime at mmugomeza@circuitstrategies.com or +1 438 763 4432. Have a great day!";
        }
        
        // Default response
        return `I'd be happy to help you learn more about Circuit Strategies! I can provide information about:

• Our AI consulting services
• Ethical AI practices
• Business benefits of AI
• Our implementation process
• Pricing and contact information

What specific aspect would you like to explore?`;
    }

    // Handle Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Send button click
    chatbotSend.addEventListener('click', sendMessage);

    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addMessage(question, 'user');
            
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(question);
                addMessage(response, 'bot');
            }, 1500);
        });
    });
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeChatbot();
});
