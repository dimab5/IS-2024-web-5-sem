window.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена!');

    const currentTime = new Date().toLocaleString();
    console.log(`Текущее время: ${currentTime}`);

    const highlightElements = document.querySelectorAll('.highlight');
    highlightElements.forEach(el => {
        el.style.backgroundColor = 'yellow'; // Выделяем элементы с классом .highlight
    });
});
