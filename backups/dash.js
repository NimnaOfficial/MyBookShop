document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.blur-card');
    const container = document.getElementById('dashContainer');
    const sidebar = document.querySelector('.sidebar');
    const labels = document.querySelectorAll('.label');

    // 1. STAGGERED ENTRANCE
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px) rotateX(-10deg)";
        
        setTimeout(() => {
            card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            card.style.opacity = "1";
            card.style.transform = "translateY(0) rotateX(0)";
        }, 300 + (index * 100)); 
    });

    // 2. 3D TILT & PARALLAX EFFECT
    cards.forEach(card => {
        const img = card.querySelector('.card-bg-image img');

        card.addEventListener('mousemove', (e) => {
            if (card.classList.contains('expanding')) return; // Stop tilt during transition

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height) * 15;
            const yRotation = ((x - rect.width / 2) / rect.width) * -15;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.03)`;

            if (img) {
                const moveX = (x - rect.width / 2) / 10;
                const moveY = (y - rect.height / 2) / 10;
                img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.15)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('expanding')) return;
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            if (img) img.style.transform = `translate(0, 0) scale(1)`;
        });

        // 3. THE PORTAL TRANSITION (Click Logic)
        card.addEventListener('click', () => {
            const targetPage = card.getAttribute('data-target');
            const title = card.querySelector('h3').innerText;

            if (title === "/WEB_1/cato/fantacy/fan.html" && targetPage) {
                // Dim the dashboard
                container.classList.add('portal-active');
                
                // Animate this card specifically
                card.classList.add('expanding');

                // Redirect after animation
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 850);
            }
        });
    });

    // Sidebar Label Animation Delay
    sidebar.addEventListener('mouseenter', () => {
        labels.forEach((label, i) => label.style.transitionDelay = `${i * 0.05}s`);
    });
    sidebar.addEventListener('mouseleave', () => {
        labels.forEach(label => label.style.transitionDelay = '0s');
    });
});
function enterPortal(cardElement, targetUrl) {
    // 1. Get current position
    const rect = cardElement.getBoundingClientRect();
    
    // 2. Lock the card in place visually
    cardElement.style.top = rect.top + 'px';
    cardElement.style.left = rect.left + 'px';
    cardElement.style.width = rect.width + 'px';
    cardElement.style.height = rect.height + 'px';
    
    // 3. Trigger the animation
    document.body.classList.add('portal-active');
    
    setTimeout(() => {
        cardElement.classList.add('portal-expanding');
        
        // Scale to fill screen
        cardElement.style.top = '0';
        cardElement.style.left = '0';
        cardElement.style.width = '100vw';
        cardElement.style.height = '100vh';
        cardElement.style.borderRadius = '0';
    }, 10);

    // 4. Redirect just before the zoom finishes
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 750);
}