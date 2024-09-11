const API_DOG_URL = `https://dog.ceo/api/breeds/image/random`;

// Функция для получения случайной картинки
export const getRandomImage = async () => {
    try {
        const response = await fetch(API_DOG_URL);
        const data = await response.json();

        return data.message;
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
        return null;
    }
};
