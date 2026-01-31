const track = document.getElementById('arcTrack');
const cards = document.querySelectorAll('.ui-card');
const viewport = document.getElementById('mainViewport');
const search = document.getElementById('vaultSearch');
const searchBtn = document.getElementById('searchBtn');
const dotsTrack = document.getElementById('dotsTrack');
const spotlight = document.getElementById('spotlight');
let activeIdx = 2;

// 1. Initialize Navigation Dots
cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === activeIdx) dot.classList.add('active');
    dot.addEventListener('click', () => { activeIdx = i; render(); });
    dotsTrack.appendChild(dot);
});

// 2. Render Function (Convex 3D Path)
function render() {
    cards.forEach((card, i) => {
        const offset = i - activeIdx;
        const x = offset * 280; 
        const z = Math.abs(offset) * -250; 
        const rotY = offset * -32; 
        const scale = 1 - (Math.abs(offset) * 0.15);

        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`;
        card.style.opacity = Math.abs(offset) > 3 ? 0 : 1;
        card.style.zIndex = 100 - Math.abs(offset);
        card.classList.toggle('active', i === activeIdx);
    });

    // Update Dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
    });

    // Update Spotlight Position
    const shift = (activeIdx / (cards.length - 1)) * 40 - 20;
    spotlight.style.transform = `translate(calc(-50% + ${shift}%), -50%)`;
}

// 3. Intelligent Click (Center first, Navigate second)
cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
        if (i !== activeIdx) {
            e.preventDefault();
            activeIdx = i;
            render();
        }
    });
});

// 4. Search Polish (Dimming & Button Activation)
search.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length > 0) {
        searchBtn.classList.add('enabled');
        searchBtn.disabled = false;
    } else {
        searchBtn.classList.remove('enabled');
        searchBtn.disabled = true;
    }

    // Auto-focus on search match
    cards.forEach((card, i) => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (val !== "" && title.includes(val.toLowerCase())) {
            activeIdx = i;
            render();
        }
    });
});

search.addEventListener('focus', () => {
    viewport.style.filter = "blur(10px) brightness(0.4)";
    viewport.style.transform = "scale(0.95)";
});
search.addEventListener('blur', () => {
    viewport.style.filter = "none";
    viewport.style.transform = "scale(1)";
});

// 5. Wheel Support
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && activeIdx < cards.length - 1) activeIdx++;
    else if (e.deltaY < 0 && activeIdx > 0) activeIdx--;
    render();
});

render();

