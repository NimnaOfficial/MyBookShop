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

    // 2. 3D TILT & PARALLAX
    cards.forEach(card => {
        const img = card.querySelector('.card-bg-image img');

        card.addEventListener('mousemove', (e) => {
            if (card.classList.contains('portal-expanding')) return; 

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
            if (card.classList.contains('portal-expanding')) return;
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            if (img) img.style.transform = `translate(0, 0) scale(1)`;
        });

        // 3. THE PORTAL TRANSITION
        // Replace the "3. THE PORTAL TRANSITION" section in dash.js with this:
        card.addEventListener('click', () => {
    const targetPage = card.getAttribute('data-target');
    const title = card.querySelector('h3').innerText.trim().toLowerCase();

    // This checks if the card clicked is the Fantasy card
    if (title === "fantasy" && targetPage) {
        enterPortal(card, targetPage);
    } else if (targetPage) {
        // If you add other pages later, they will just open normally
        window.location.href = targetPage;
    }
});
    });

    // Sidebar Animation
    sidebar.addEventListener('mouseenter', () => {
        labels.forEach((label, i) => label.style.transitionDelay = `${i * 0.05}s`);
    });
    sidebar.addEventListener('mouseleave', () => {
        labels.forEach(label => label.style.transitionDelay = '0s');
    });
});

// The Cinematic Zoom Function
function enterPortal(cardElement, targetUrl) {
    const rect = cardElement.getBoundingClientRect();
    
    // Set initial fixed position to card's current spot
    cardElement.style.position = 'fixed';
    cardElement.style.top = rect.top + 'px';
    cardElement.style.left = rect.left + 'px';
    cardElement.style.width = rect.width + 'px';
    cardElement.style.height = rect.height + 'px';
    cardElement.style.margin = '0';
    
    document.getElementById('dashContainer').classList.add('portal-active');
    
    // Slight delay to ensure fixed positioning takes effect before expanding
    setTimeout(() => {
        cardElement.classList.add('portal-expanding');
        
        cardElement.style.top = '0';
        cardElement.style.left = '0';
        cardElement.style.width = '100vw';
        cardElement.style.height = '100vh';
    }, 20);

    // Navigate to the next page as the card fills the screen
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 800);
}
// Inside dash.js click listener
const targetPage = card.getAttribute('data-target'); 

// The HTML card for Fantasy should look like this:
// <div class="blur-card" data-target="../cato/fantacy/fan.html">