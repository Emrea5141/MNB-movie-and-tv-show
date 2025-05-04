document.querySelectorAll('.person img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'rotate(360deg)';
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'rotate(0deg)';
    });
});
