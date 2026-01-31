document.addEventListener('DOMContentLoaded', () => {
    const hiBtn = document.getElementById('hiBtn');
    const pageContent = document.getElementById('page-content');
    const overlay = document.querySelector('.page-flip-overlay');

    if (hiBtn) {
        hiBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Flip the current page away
            pageContent.classList.add('flip-active');
            
            // 2. Flip the new page color into view
            overlay.classList.add('overlay-active');

            // 3. Navigate after the animation completes
            setTimeout(() => {
                window.location.href = '/WEB_1/login/login.html';
            }, 800);
        });
    }
});