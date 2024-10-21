let requestCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    const booksContainer = document.querySelector('.grid');
    const preloader = document.getElementById('preloader');
    const loadMoreButton = document.getElementById('loadMoreButton');

    const authors = [
        "Лев Толстой",
        "Фёдор Достоевский",
        "Иван Гончаров",
        "Михаил Булгаков",
        "Антон Чехов",
        "Дмитрий Глуховский"
    ];

    let errorDisplayed = false; // Флаг для отслеживания, отображалось ли сообщение об ошибке

    async function loadBooks() {
        preloader.style.display = 'block';

        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.style.display = 'none';
        booksContainer.innerHTML = ''; // Очищаем контейнер с книгами при каждом новом запросе
        booksContainer.appendChild(errorMessage);

        // Таймер для прелоадера
        const timeoutId = setTimeout(() => {
            preloader.style.display = 'none';
            if (!errorDisplayed) {
                errorMessage.textContent = '⚠ Загрузка данных занимает слишком много времени. Попробуйте снова.';
                errorMessage.style.display = 'block';
            }
        }, 3000); // 3 секунды

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=200');
            clearTimeout(timeoutId); // Очистка таймера, если запрос выполнен успешно

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const allBooks = await response.json();

            let filteredBooks;

            if (requestCount % 2 === 0) {
                filteredBooks = allBooks.filter(book => book.id % 2 === 0);
            } else {
                filteredBooks = allBooks.filter(book => book.id % 2 !== 0);
            }

            const booksToShow = filteredBooks.slice(0, 6);
            booksContainer.innerHTML = ''; // Очищаем контейнер с книгами перед загрузкой

            booksToShow.forEach((book, index) => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');

                bookCard.innerHTML = `
                    <img class="book-card__img" src="${book.url}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p><strong>Автор:</strong> ${authors[index % authors.length]}</p>
                    <p><strong>Описание:</strong> Описание </p>
                    <p><strong>Цена:</strong> 500 рублей</p>
                    <button class="table__button">Купить</button>
                `;
                booksContainer.appendChild(bookCard);
            });

            errorMessage.style.display = 'none'; // Скрыть сообщение об ошибке, если загрузка прошла успешно
            errorDisplayed = false; // Сбросить флаг при успешной загрузке
            requestCount++;
        } catch (error) {
            console.error("Ошибка загрузки книг:", error);
            if (!errorDisplayed) {
                errorMessage.textContent = '⚠ Что-то пошло не так. Пожалуйста, проверьте подключение к интернету и попробуйте позже.';
                errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
                errorDisplayed = true; // Устанавливаем флаг, чтобы не дублировать сообщение
            }
            booksContainer.innerHTML = ''; // Очищаем контейнер с книгами при ошибке
        } finally {
            preloader.style.display = 'none'; // Скрыть прелоадер в любом случае
        }
    }

    loadBooks();

    loadMoreButton.addEventListener('click', loadBooks);
});
