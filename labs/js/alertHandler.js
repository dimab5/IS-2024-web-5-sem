document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.table__button');

    const checkCredentials = (username, password) => {
        return username === 'dev' && password === 'dev'; // Валидные креды: dev/dev
    };

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            Swal.fire({
                title: 'Авторизация',
                html: `
                    <input type="text" id="login" class="swal2-input" placeholder="Логин">
                    <input type="password" id="password" class="swal2-input" placeholder="Пароль">
                `,
                confirmButtonText: 'Войти',
                focusConfirm: false,
                preConfirm: () => {
                    const login = Swal.getPopup().querySelector('#login').value;
                    const password = Swal.getPopup().querySelector('#password').value;
                    if (!login || !password) {
                        Swal.showValidationMessage(`Пожалуйста, введите логин и пароль`);
                    }
                    return { login, password };
                }
            }).then((result) => {
                const { login, password } = result.value;

                // Проверяем креды
                if (checkCredentials(login, password)) {
                    Swal.fire({
                        title: 'Книга добавлена в корзину!',
                        text: 'Вы успешно добавили книгу в корзину. Перейдите в корзину для завершения покупки.',
                        icon: 'success',
                        confirmButtonText: 'Ок',
                        background: '#f9f9f9',
                        confirmButtonColor: '#3085d6',
                        backdrop: `
                          rgba(0,0,0,0.4)
                          url("/images/book-loader.gif")
                          left top
                          no-repeat
                        `
                    });
                } else {
                    Swal.fire({
                        title: 'Ошибка авторизации',
                        text: 'Неправильный логин или пароль.',
                        icon: 'error',
                        confirmButtonText: 'Попробовать снова'
                    });
                }
            });
        });
    });
});