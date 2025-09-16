// Circuit Strategies - Interactive Website JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page loads
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Initialize all interactive features
    initializeNavigation();
    initializeAnimations();
    initializeChatbot();
    initializeContactForm();
    initializeServiceModals();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu if open
                nav.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            dropdownMenu.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            dropdownMenu.style.display = 'none';
        });
    });
}

// Animation and scroll effects
function initializeAnimations() {
    // Animate statistics counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('[data-aos]');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
}

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Chatbot functionality
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addMessage(question, 'user');
            setTimeout(() => {
                const response = generateBotResponse(question);
                addMessage(response, 'bot');
            }, 1000);
        });
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function generateBotResponse(message) {
        const responses = {
            'What services do you offer?': 'We offer comprehensive AI solutions including AI Chatbots, Voice Agents, Process Automation, Sales & Marketing AI, and Ethical AI Consulting. Each service is designed to transform your business operations and drive growth.',
            'Tell me about ethical AI': 'Ethical AI is at the core of everything we do. We provide AI Audits & Certification, Governance & Compliance guidance, Security & Risk Assessment, and ensure all AI solutions are transparent, fair, and aligned with your values.',
            'How can AI help my business?': 'AI can revolutionize your business by automating repetitive tasks, providing 24/7 customer support, improving decision-making with data insights, personalizing customer experiences, and optimizing operations for better efficiency and growth.',
            'default': 'Thank you for your question! Our AI solutions can help transform your business operations. Would you like to schedule a consultation to discuss your specific needs? You can contact us at info@circuitstrategies.com or call our toll-free number +1 (888) 483-7122.'
        };

        return responses[message] || responses['default'];
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Service modal functionality
function initializeServiceModals() {
    const serviceCards = document.querySelectorAll('.service-card.clickable');
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    const serviceContent = {
        'chatbots': {
            title: '🤖 AI Chatbots',
            content: `
                <div class="modal-intro">
                    <p>At Circuit Strategies, our AI Chatbots go beyond simple scripts. They are intelligent, conversational agents that engage with customers in real-time, providing 24/7 personalized support that feels natural and human-like.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 Key Benefits</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🧠</div>
                        <div class="benefit-content">
                            <h5>Natural Language Processing (NLP)</h5>
                            <p>Understands customer intent, not just keywords. This ensures smoother conversations, fewer misunderstandings, and higher customer satisfaction.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🌍</div>
                        <div class="benefit-content">
                            <h5>Multi-Language Support</h5>
                            <p>Break barriers by supporting multiple languages. Serve global customers seamlessly without needing separate support teams.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔗</div>
                        <div class="benefit-content">
                            <h5>Integration Ready</h5>
                            <p>Our bots connect effortlessly with your existing CRM, ERP, HR systems, e-commerce platforms, and APIs, ensuring smooth data flow across your business.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📈</div>
                        <div class="benefit-content">
                            <h5>Scalable & Cost-Efficient</h5>
                            <p>Handle thousands of conversations simultaneously without increasing staff costs. Perfect for businesses experiencing growth.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🤝</div>
                        <div class="benefit-content">
                            <h5>Human Handoff</h5>
                            <p>When an issue requires personal attention, the chatbot seamlessly hands over the conversation to a live agent with full context, avoiding repetition.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Analytics & Insights</h5>
                            <p>Every conversation is tracked and analyzed to provide insights into customer behavior, support trends, and product feedback.</p>
                        </div>
                    </div>
                </div>
                
                <div class="use-cases-section">
                    <h4>💼 Use Cases</h4>
                    <div class="use-case-grid">
                        <div class="use-case-item">
                            <div class="use-case-icon">🎧</div>
                            <h5>Customer Support</h5>
                            <p>Instant responses to FAQs, order tracking, and troubleshooting.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">💰</div>
                            <h5>Sales & Lead Generation</h5>
                            <p>Capture leads, qualify prospects, and book meetings automatically.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏥</div>
                            <h5>Healthcare</h5>
                            <p>Appointment scheduling, symptom checkers, and patient triage.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏦</div>
                            <h5>Finance</h5>
                            <p>Balance inquiries, fraud alerts, loan eligibility checks.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">✈️</div>
                            <h5>Travel & Hospitality</h5>
                            <p>Booking assistance, itinerary management, multilingual concierge services.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why Choose Our Chatbots?</h4>
                    <div class="highlight-box">
                        <p>Unlike generic bots, our AI solutions are designed with ethics, compliance, and customer trust in mind. We ensure that every implementation aligns with your company values while driving measurable ROI.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Get Started with AI Chatbots</a>
            `
        },
        'voice-agents': {
            title: '🎙️ AI Voice Agents',
            content: `
                <div class="modal-intro">
                    <p>Our AI Voice Agents bring customer engagement to a new level. Unlike traditional automated phone systems, these advanced voice solutions use natural speech recognition and contextual understanding to deliver smooth, human-like conversations. They don't just answer calls—they solve problems, make recommendations, and handle complex queries seamlessly.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 Key Benefits</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🎤</div>
                        <div class="benefit-content">
                            <h5>Voice Recognition</h5>
                            <p>Understands natural speech patterns with high accuracy, even across accents and noisy environments.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">💭</div>
                        <div class="benefit-content">
                            <h5>Sentiment Analysis</h5>
                            <p>Detects tone, emotion, and urgency in customer voices, adapting responses for empathetic and human-like interactions.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Call Analytics</h5>
                            <p>Provides actionable insights into customer calls, tracking satisfaction, common issues, and team performance.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔄</div>
                        <div class="benefit-content">
                            <h5>Omnichannel Integration</h5>
                            <p>Works across phone, chat, and digital platforms for a unified customer experience.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">⏰</div>
                        <div class="benefit-content">
                            <h5>24/7 Availability</h5>
                            <p>Eliminates long hold times by ensuring customer calls are answered around the clock.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔒</div>
                        <div class="benefit-content">
                            <h5>Security & Compliance</h5>
                            <p>Built with strict privacy safeguards and compliance standards (e.g., GDPR, HIPAA).</p>
                        </div>
                    </div>
                </div>
                
                <div class="use-cases-section">
                    <h4>💼 Use Cases</h4>
                    <div class="use-case-grid">
                        <div class="use-case-item">
                            <div class="use-case-icon">🎧</div>
                            <h5>Customer Support</h5>
                            <p>Answer FAQs, resolve complaints, and troubleshoot issues in real time.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">💰</div>
                            <h5>Sales & Marketing</h5>
                            <p>Provide personalized product recommendations and automate lead qualification.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏥</div>
                            <h5>Healthcare</h5>
                            <p>Manage appointment reminders, follow-ups, and patient support calls.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏦</div>
                            <h5>Banking & Finance</h5>
                            <p>Handle fraud alerts, transaction updates, and loan eligibility checks.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">✈️</div>
                            <h5>Travel & Hospitality</h5>
                            <p>Offer multilingual booking support, flight updates, and concierge services.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why Choose Circuit Strategies' Voice Agents?</h4>
                    <div class="highlight-box">
                        <p>Our AI Voice Agents are intelligent, empathetic, and reliable. By combining conversational AI with real-time analytics, they don't just respond—they build relationships. Businesses that adopt our voice agents reduce operational costs, boost customer loyalty, and create seamless, human-like experiences at scale.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Get Started with AI Voice Agents</a>
            `
        },
        'process-automation': {
            title: '⚙️ Process Automation',
            content: `
                <div class="modal-intro">
                    <h3>Process Automation – Smarter, Faster, More Efficient Workflows</h3>
                    <p>At Circuit Strategies, we help businesses unlock efficiency by automating repetitive tasks and streamlining operations. Process Automation reduces manual errors, accelerates workflows, and frees up your teams to focus on high-value work.</p>
                    <p>Our solutions are custom-built to your processes, ensuring seamless integration with your existing systems and tools.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 Key Benefits</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🔄</div>
                        <div class="benefit-content">
                            <h5>Workflow Optimization</h5>
                            <p>Automate end-to-end workflows to reduce bottlenecks and accelerate delivery times.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Data Processing</h5>
                            <p>Streamline data collection, validation, and reporting, minimizing manual effort while improving accuracy.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">✅</div>
                        <div class="benefit-content">
                            <h5>Error Reduction</h5>
                            <p>Reduce human error in routine tasks, ensuring consistency, compliance, and better decision-making.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📈</div>
                        <div class="benefit-content">
                            <h5>Scalability</h5>
                            <p>Automations grow with your business, handling more transactions and processes without extra staffing costs.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔗</div>
                        <div class="benefit-content">
                            <h5>Seamless Integration</h5>
                            <p>Connect with CRMs, ERPs, and cloud platforms to create a unified ecosystem.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📱</div>
                        <div class="benefit-content">
                            <h5>Real-Time Monitoring</h5>
                            <p>Gain insights into workflows with dashboards and alerts for proactive management.</p>
                        </div>
                    </div>
                </div>
                
                <div class="use-cases-section">
                    <h4>💼 Use Cases</h4>
                    <div class="use-case-grid">
                        <div class="use-case-item">
                            <div class="use-case-icon">💰</div>
                            <h5>Finance & Accounting</h5>
                            <p>Invoice processing, reconciliations, and reporting automation.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">👥</div>
                            <h5>Human Resources</h5>
                            <p>Onboarding, payroll, and employee records management.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🎧</div>
                            <h5>Customer Service</h5>
                            <p>Ticket routing, auto-responses, and issue tracking.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">💻</div>
                            <h5>IT Operations</h5>
                            <p>System monitoring, incident management, and routine maintenance.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">📦</div>
                            <h5>Supply Chain & Logistics</h5>
                            <p>Inventory tracking, shipment scheduling, and order processing.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why Choose Circuit Strategies for Automation?</h4>
                    <div class="highlight-box">
                        <p>Our automation solutions are built with efficiency, security, and compliance in mind. Whether it's small repetitive tasks or large-scale operational workflows, we design systems that deliver measurable ROI and transform the way your teams work.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Start Automating Today</a>
            `
        },
        'ethical-ai': {
            title: '🛡️ Ethical AI Consulting',
            content: `
                <div class="modal-intro">
                    <h3>Ethical AI Consulting – Building Trustworthy and Responsible AI</h3>
                    <p>At Circuit Strategies, we believe that AI should not only drive innovation but also uphold the highest standards of ethics, compliance, and trust. Our Ethical AI Consulting services are designed to help organizations deploy AI solutions responsibly, ensuring fairness, transparency, and accountability.</p>
                    <p>We partner with you to navigate the complex landscape of global AI regulations and standards, protecting both your business and your customers.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 Key Services</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🔍</div>
                        <div class="benefit-content">
                            <h5>AI Audits & Certification</h5>
                            <p>Conduct thorough evaluations of AI systems to assess performance, fairness, and ethical robustness. We help you meet compliance and certification requirements while identifying risks and opportunities for improvement.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">⚖️</div>
                        <div class="benefit-content">
                            <h5>Governance & Compliance</h5>
                            <p>Design and implement governance frameworks that align with GDPR, ISO, NIST, and other global standards, ensuring your AI deployments are both legally compliant and ethically sound.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔒</div>
                        <div class="benefit-content">
                            <h5>Security & Risk Assessment</h5>
                            <p>Evaluate potential vulnerabilities in AI models, data pipelines, and decision-making processes. We help you strengthen defenses against bias, misuse, and security threats.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🎯</div>
                        <div class="benefit-content">
                            <h5>Responsible Deployment</h5>
                            <p>Ensure your AI solutions are transparent, explainable, and accountable—helping you build trust with customers, stakeholders, and regulators.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🌱</div>
                        <div class="benefit-content">
                            <h5>Sustainability in AI</h5>
                            <p>Incorporate environmentally responsible practices in AI development and operations, reducing the carbon footprint of adoption at scale.</p>
                        </div>
                    </div>
                </div>
                
                <div class="use-cases-section">
                    <h4>💼 Use Cases</h4>
                    <div class="use-case-grid">
                        <div class="use-case-item">
                            <div class="use-case-icon">🏦</div>
                            <h5>Financial Services</h5>
                            <p>Ensure fairness in credit scoring, fraud detection, and automated decision-making.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏥</div>
                            <h5>Healthcare & Life Sciences</h5>
                            <p>Build compliant AI systems for patient data, diagnostics, and medical research.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏛️</div>
                            <h5>Public Sector</h5>
                            <p>Implement transparent and accountable AI in citizen services and policy-making.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🛒</div>
                            <h5>Retail & E-Commerce</h5>
                            <p>Audit recommendation engines to reduce bias and improve customer trust.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🚀</div>
                            <h5>AI Vendors & Startups</h5>
                            <p>Align early with ethical best practices to scale responsibly.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why Choose Circuit Strategies for Ethical AI?</h4>
                    <div class="highlight-box">
                        <p>We are more than consultants—we are your partners in responsible innovation. By combining deep expertise in AI governance, cybersecurity, and compliance, we ensure your AI initiatives are not just advanced but also ethical, secure, and future-proof.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Partner with Us for Ethical AI</a>
            `
        },
        'ai-insights': {
            title: '💡 AI Insights',
            content: `
                <div class="modal-intro">
                    <h3>Guiding the Future of Innovation</h3>
                    <p>At Circuit Strategies, we don't just implement AI—we help you understand where it's heading. Through our AI Insights program, we provide organizations with the knowledge, foresight, and strategies needed to adapt and thrive in an ever-changing digital landscape.</p>
                    <p>Our goal is to ensure you're not just keeping up with AI trends but staying ahead of them—making informed, ethical, and profitable decisions.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 What We Deliver</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Trend Analysis & Forecasting</h5>
                            <p>Stay updated on breakthroughs in AI technologies, frameworks, and use cases that are shaping industries.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🎯</div>
                        <div class="benefit-content">
                            <h5>Strategic Advisory</h5>
                            <p>Learn how to align AI adoption with long-term business objectives while minimizing risks.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">⚖️</div>
                        <div class="benefit-content">
                            <h5>Ethics & Compliance Updates</h5>
                            <p>Receive actionable insights on evolving global AI governance, compliance, and regulatory standards.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔍</div>
                        <div class="benefit-content">
                            <h5>Competitive Intelligence</h5>
                            <p>Benchmark AI strategies in your sector to identify gaps and opportunities.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🎓</div>
                        <div class="benefit-content">
                            <h5>Workshops & Thought Leadership</h5>
                            <p>Access exclusive briefings, whitepapers, and training sessions tailored to your leadership and technical teams.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why AI Insights Matter</h4>
                    <div class="highlight-box">
                        <p>The AI landscape evolves faster than any other technology, with innovations in generative AI, automation, and predictive analytics transforming how businesses operate. Without structured insights, companies risk falling behind competitors or facing compliance issues.</p>
                        <p>Our AI Insights services provide a proactive edge—helping you anticipate market shifts, adopt new tools responsibly, and maximize ROI from your AI investments.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Get AI Insights</a>
            `
        },
        'sales-marketing': {
            title: '📈 Sales & Marketing AI',
            content: `
                <div class="modal-intro">
                    <h3>Sales & Marketing AI – Smarter Campaigns, Higher Conversions</h3>
                    <p>At Circuit Strategies, we harness the power of AI to supercharge sales and marketing. From lead generation to customer retention, our AI-powered tools help businesses identify opportunities, personalize outreach, and maximize ROI. By combining predictive analytics, campaign optimization, and intelligent lead scoring, we ensure your marketing dollars work harder and your sales team focuses on the most promising prospects.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 Key Benefits</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🎯</div>
                        <div class="benefit-content">
                            <h5>Lead Scoring</h5>
                            <p>Automatically evaluate and prioritize leads based on behavior, demographics, and engagement, ensuring your sales team focuses on high-value opportunities.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Campaign Optimization</h5>
                            <p>Use AI to analyze campaign performance in real time and adjust targeting, messaging, and channels for maximum impact.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔮</div>
                        <div class="benefit-content">
                            <h5>Predictive Analytics</h5>
                            <p>Forecast customer needs, buying behavior, and market trends to stay ahead of the competition.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">💌</div>
                        <div class="benefit-content">
                            <h5>Personalized Engagement</h5>
                            <p>Deliver hyper-targeted messages and offers that resonate with each customer, boosting conversions.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🤖</div>
                        <div class="benefit-content">
                            <h5>Sales Automation</h5>
                            <p>Automate repetitive sales tasks such as follow-ups, scheduling, and reporting, freeing your team for relationship-building.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📈</div>
                        <div class="benefit-content">
                            <h5>Data-Driven Insights</h5>
                            <p>Gain a 360° view of customer journeys and campaign performance through advanced analytics dashboards.</p>
                        </div>
                    </div>
                </div>
                
                <div class="use-cases-section">
                    <h4>💼 Use Cases</h4>
                    <div class="use-case-grid">
                        <div class="use-case-item">
                            <div class="use-case-icon">🛒</div>
                            <h5>E-Commerce & Retail</h5>
                            <p>Personalized product recommendations, abandoned cart recovery, and customer loyalty programs.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏢</div>
                            <h5>B2B Sales</h5>
                            <p>Lead qualification, automated follow-ups, and account-based marketing insights.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏦</div>
                            <h5>Financial Services</h5>
                            <p>Predictive models for cross-selling and customer retention.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">🏥</div>
                            <h5>Healthcare & Pharma</h5>
                            <p>Patient engagement campaigns, appointment reminders, and education outreach.</p>
                        </div>
                        <div class="use-case-item">
                            <div class="use-case-icon">✈️</div>
                            <h5>Travel & Hospitality</h5>
                            <p>Personalized travel offers, upselling opportunities, and customer re-engagement.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why Choose Circuit Strategies?</h4>
                    <div class="highlight-box">
                        <p>Our Sales & Marketing AI solutions are designed to drive measurable growth by merging creativity with data intelligence. We help organizations reduce acquisition costs, improve customer retention, and increase revenue through automation and personalization—without compromising ethics or compliance.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Supercharge Your Sales & Marketing</a>
            `
        }
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = card.getAttribute('data-service');
            const service = serviceContent[serviceId];
            
            if (service) {
                modalTitle.textContent = service.title;
                modalContent.innerHTML = service.content;
                modal.classList.add('active');
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // Add body class when modal opens/closes for additional blur control
    serviceCards.forEach(card => {
        const originalClickHandler = card.onclick;
        card.addEventListener('click', () => {
            document.body.classList.add('modal-open');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }
}

// Global function to open modal
function openModal(serviceId) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const serviceContent = {
        'ai-insights': {
            title: '💡 AI Insights',
            content: `
                <div class="modal-intro">
                    <h3>Guiding the Future of Innovation</h3>
                    <p>At Circuit Strategies, we don't just implement AI—we help you understand where it's heading. Through our AI Insights program, we provide organizations with the knowledge, foresight, and strategies needed to adapt and thrive in an ever-changing digital landscape.</p>
                    <p>Our goal is to ensure you're not just keeping up with AI trends but staying ahead of them—making informed, ethical, and profitable decisions.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 What We Deliver</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Trend Analysis & Forecasting</h5>
                            <p>Stay updated on breakthroughs in AI technologies, frameworks, and use cases that are shaping industries.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🎯</div>
                        <div class="benefit-content">
                            <h5>Strategic Advisory</h5>
                            <p>Learn how to align AI adoption with long-term business objectives while minimizing risks.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">⚖️</div>
                        <div class="benefit-content">
                            <h5>Ethics & Compliance Updates</h5>
                            <p>Receive actionable insights on evolving global AI governance, compliance, and regulatory standards.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔍</div>
                        <div class="benefit-content">
                            <h5>Competitive Intelligence</h5>
                            <p>Benchmark AI strategies in your sector to identify gaps and opportunities.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🎓</div>
                        <div class="benefit-content">
                            <h5>Workshops & Thought Leadership</h5>
                            <p>Access exclusive briefings, whitepapers, and training sessions tailored to your leadership and technical teams.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why AI Insights Matter</h4>
                    <div class="highlight-box">
                        <p>The AI landscape evolves faster than any other technology, with innovations in generative AI, automation, and predictive analytics transforming how businesses operate. Without structured insights, companies risk falling behind competitors or facing compliance issues.</p>
                        <p>Our AI Insights services provide a proactive edge—helping you anticipate market shifts, adopt new tools responsibly, and maximize ROI from your AI investments.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Get AI Insights</a>
            `
        },
        'ai-regulations': {
            title: '⚖️ Navigating AI Regulations',
            content: `
                <div class="modal-intro">
                    <h3>Navigating AI Regulations – Stay Compliant, Stay Trusted</h3>
                    <p>AI is advancing faster than global laws can keep up—but regulations are catching up quickly. From GDPR in Europe to Canada's AIDA, the U.S. AI Bill of Rights, and other emerging frameworks worldwide, businesses must act now to ensure compliance.</p>
                    <p>At Circuit Strategies, we help organizations understand, interpret, and apply AI regulations so they can innovate with confidence while staying aligned with global standards.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 What We Offer</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🌍</div>
                        <div class="benefit-content">
                            <h5>Global AI Compliance Guidance</h5>
                            <p>Stay informed on evolving regulations across regions including the EU, North America, Africa, and Asia.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔍</div>
                        <div class="benefit-content">
                            <h5>Risk Assessments</h5>
                            <p>Identify compliance gaps and implement measures to reduce legal, ethical, and reputational risks.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📋</div>
                        <div class="benefit-content">
                            <h5>Policy & Governance Design</h5>
                            <p>Develop internal policies and ethical AI guidelines aligned with international best practices.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">✅</div>
                        <div class="benefit-content">
                            <h5>Regulatory Readiness Audits</h5>
                            <p>Prepare for audits and certifications by ensuring your AI systems are transparent, explainable, and accountable.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📊</div>
                        <div class="benefit-content">
                            <h5>Continuous Monitoring</h5>
                            <p>Track ongoing legal changes and adapt your AI strategy to maintain long-term compliance.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why AI Regulation Matters</h4>
                    <div class="highlight-box">
                        <p>Non-compliance isn't just a legal risk—it's a reputational risk. As customers and stakeholders demand more transparency, companies must demonstrate they are using AI responsibly, fairly, and ethically.</p>
                        <p>By staying ahead of regulations, you not only avoid penalties but also gain trust and credibility in the marketplace.</p>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>🏆 Why Choose Circuit Strategies?</h4>
                    <div class="highlight-box">
                        <p>Our team combines expertise in AI ethics, compliance, and governance with hands-on industry knowledge. We don't just interpret laws—we translate them into practical frameworks your business can apply immediately.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Ensure AI Compliance</a>
            `
        },
        'sales-automation': {
            title: '📈 Scaling Sales with AI Automation',
            content: `
                <div class="modal-intro">
                    <h3>Scaling Sales with AI Automation – Boost Conversions, Streamline Growth</h3>
                    <p>Sales teams spend too much time on manual tasks like lead follow-ups, data entry, and scheduling—time that could be spent closing deals. At Circuit Strategies, our AI-driven sales automation solutions free your team from repetitive tasks, optimize engagement, and ensure no opportunity slips through the cracks.</p>
                    <p>We help you scale your sales operations with tools that combine AI intelligence, predictive analytics, and workflow automation—empowering your business to convert leads faster and more effectively.</p>
                </div>
                
                <div class="benefits-section">
                    <h4>🚀 Key Benefits</h4>
                    <div class="benefit-item">
                        <div class="benefit-icon">🎯</div>
                        <div class="benefit-content">
                            <h5>Smart Lead Nurturing</h5>
                            <p>Automatically engage leads through personalized messages, follow-ups, and reminders based on their behavior and interests.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">📈</div>
                        <div class="benefit-content">
                            <h5>Conversion Optimization</h5>
                            <p>Use AI insights to determine the best timing, channel, and messaging for each prospect.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔮</div>
                        <div class="benefit-content">
                            <h5>Predictive Sales Forecasting</h5>
                            <p>Forecast revenue, deal closures, and customer lifetime value with AI-powered analytics.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">⚙️</div>
                        <div class="benefit-content">
                            <h5>Task & Workflow Automation</h5>
                            <p>Automate scheduling, CRM updates, and reporting, giving sales teams more time to build relationships.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🎨</div>
                        <div class="benefit-content">
                            <h5>Personalized Customer Journeys</h5>
                            <p>Tailor offers and outreach to each prospect, increasing relevance and boosting conversion rates.</p>
                        </div>
                    </div>
                    
                    <div class="benefit-item">
                        <div class="benefit-icon">🔗</div>
                        <div class="benefit-content">
                            <h5>Integrated Ecosystem</h5>
                            <p>Seamlessly connect with your CRM, marketing platforms, and communication tools for end-to-end automation.</p>
                        </div>
                    </div>
                </div>
                
                <div class="why-choose-section">
                    <h4>⭐ Why Choose Circuit Strategies?</h4>
                    <div class="highlight-box">
                        <p>Our sales automation tools go beyond simple scheduling and CRM updates—they deliver actionable insights, predictive intelligence, and personalized engagement. We ensure your business closes more deals, faster, while reducing operational costs and increasing ROI.</p>
                    </div>
                </div>
                
                <a href="#contact" class="cta-button primary">Scale Your Sales</a>
            `
        }
    };
    
    const service = serviceContent[serviceId];
    
    if (service && modal && modalTitle && modalContent) {
        modalTitle.textContent = service.title;
        modalContent.innerHTML = service.content;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}