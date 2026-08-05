document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Loader Handler (Safe & Instant Dismissal)
    const hideLoader = () => {
        const pageLoader = document.getElementById('pageLoader');
        if (pageLoader && !pageLoader.classList.contains('hidden')) {
            pageLoader.classList.add('hidden');
        }
    };

    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 1000); // Safety limit


    // 2. Custom Cursor Tracking
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }

        if (cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });


    // 3. Header Role Switcher & Counter Animation
    const headerRoles = [
        "CYBERSECURITY ANALYST",
        "OSINT RESEARCHER",
        "SECURITY OPERATIONS",
        "FULL-STACK BUILDER"
    ];

    let headerRoleIndex = 0;
    const roleTextEl = document.getElementById('role-text');
    const currentStepEl = document.getElementById('current-step');

    if (roleTextEl && currentStepEl) {
        setInterval(() => {
            roleTextEl.classList.add('fade-out');

            setTimeout(() => {
                headerRoleIndex = (headerRoleIndex + 1) % headerRoles.length;
                roleTextEl.textContent = headerRoles[headerRoleIndex];
                currentStepEl.textContent = String(headerRoleIndex + 1).padStart(2, '0');
                roleTextEl.classList.remove('fade-out');
            }, 300);
        }, 2500);
    }


    // 4. Scroll Progress & Header Shrink
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }


    // 5. Hero Section Typing Effect
    const typingText = document.getElementById('typingText');
    const typingRoles = [
        "Software Engineer",
        "Cybersecurity Enthusiast",
        "Cloud & AI Learner",
        "Problem Solver"
    ];
    let typingRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingText) return;
        const currentRole = typingRoles[typingRoleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingRoleIndex = (typingRoleIndex + 1) % typingRoles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();


    // 6. Certification Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // 7. Command Palette (Ctrl+K)
    const cmdModal = document.getElementById('cmdModal');
    const cmdTriggerBtn = document.getElementById('cmdTriggerBtn');
    const cmdInput = document.getElementById('cmdInput');
    const cmdList = document.getElementById('cmdList');

    const toggleCmdModal = (show) => {
        if (!cmdModal) return;
        if (show) {
            cmdModal.classList.add('active');
            if (cmdInput) cmdInput.focus();
        } else {
            cmdModal.classList.remove('active');
        }
    };

    if (cmdTriggerBtn) {
        cmdTriggerBtn.addEventListener('click', () => toggleCmdModal(true));
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleCmdModal(!cmdModal.classList.contains('active'));
        }
        if (e.key === 'Escape') toggleCmdModal(false);
    });

    if (cmdList) {
        cmdList.addEventListener('click', (e) => {
            const item = e.target.closest('li');
            if (!item) return;

            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');

            toggleCmdModal(false);

            if (action === 'goto') {
                const targetEl = document.querySelector(target);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'link') {
                window.open(target, '_blank');
            }
        });
    }

    if (cmdInput && cmdList) {
        cmdInput.addEventListener('input', () => {
            const filter = cmdInput.value.toLowerCase();
            const items = cmdList.querySelectorAll('li');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? 'flex' : 'none';
            });
        });
    }

});