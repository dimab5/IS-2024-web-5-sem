document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    loadSavedSettings();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const maxClasses = document.getElementById('maxClasses').value;
        const language = document.getElementById('language').value;

        saveSettings(days, maxClasses, language);
        generateTable(days, maxClasses, language);
    });

    function generateTable(days, maxClasses, language) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('schedule-table');
        const headerRow = document.createElement('tr');

        const daysLabels = language === 'ru' ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let i = 0; i < days; i++) {
            const th = document.createElement('th');
            th.textContent = daysLabels[i];
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        const subjects = language === 'ru'
            ? ['Математика', 'Физика', 'Химия', 'Литература', 'История', 'География', 'Биология', 'Информатика']
            : ['Math', 'Physics', 'Chemistry', 'Literature', 'History', 'Geography', 'Biology', 'Computer Science'];

        for (let i = 0; i < maxClasses; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < days; j++) {
                const cell = document.createElement('td');
                cell.textContent = getRandomSubject(subjects);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        tableContainer.appendChild(table);
    }

    function getRandomSubject(subjects) {
        return subjects[Math.floor(Math.random() * subjects.length)];
    }

    function saveSettings(days, maxClasses, language) {
        localStorage.setItem('tableSettings', JSON.stringify({ days, maxClasses, language }));
    }

    function loadSavedSettings() {
        const savedSettings = localStorage.getItem('tableSettings');
        if (savedSettings) {
            const { days, maxClasses, language } = JSON.parse(savedSettings);
            document.getElementById('days').value = days;
            document.getElementById('maxClasses').value = maxClasses;
            document.getElementById('language').value = language;

            generateTable(days, maxClasses, language);
        }
    }
});
