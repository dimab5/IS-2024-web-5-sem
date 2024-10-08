(function() {
    window.addEventListener('load', function() {
        const performanceData = window.performance.timing;

        const renderTime = performanceData.domContentLoadedEventEnd - performanceData.navigationStart;

        const footer = document.querySelector('.footer');
        if (footer) {
            const statContainer = document.createElement('div');
            statContainer.innerHTML = `
                <p><strong>Статистика загрузки:</strong></p>
                <ul>
                    <li>Page load: ${renderTime} мс</li>
                </ul>
            `;
            footer.appendChild(statContainer);
        }
    });
})();
