document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Logic
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Simple Parallax for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroText = document.querySelector('.hero-content');
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroText.style.opacity = 1 - (scrolled / 700);
        }
    });
});
