const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

// Путь к файлу библиотеки
const filePath = path.join(__dirname, 'data', 'library.json');

// Путь к папке для статики (CSS и т.п.)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Подключение статики (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Парсинг тела запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Чтение данных библиотеки
let library = [];

function loadLibrary() {
    if (fs.existsSync(filePath)) {
        library = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } else {
        console.error('Файл library.json не найден. Создается новый.');
        library = [];  // Если файл не найден, используем пустой массив
        fs.writeFileSync(filePath, JSON.stringify(library)); // Создаем новый файл
    }
}

// Загрузка данных при старте сервера
loadLibrary();

// Отображение списка книг с фильтрацией
app.get('/', (req, res) => {
    const { filter } = req.query;
    let filteredLibrary = library;

    if (filter === 'available') {
        filteredLibrary = library.filter(book => book.available);
    } else if (filter === 'overdue') {
        filteredLibrary = library.filter(book => new Date(book.dueDate) < new Date());
    }

    res.render('index', { library: filteredLibrary });
});

// Страница добавления новой книги
app.get('/add', (req, res) => {
    res.render('add');
});

// Добавление новой книги
app.post('/add', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: library.length + 1, title, author, available: true, dueDate: null };
    library.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(library));
    res.redirect('/');
});

// Страница редактирования книги
app.get('/book/:id', (req, res) => {
    const book = library.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.render('book', { book });
});

// Обновление данных книги
app.post('/book/:id', (req, res) => {
    const { title, author, dueDate } = req.body;
    const book = library.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.title = title;
    book.author = author;
    book.dueDate = dueDate || null; // Если нет dueDate, оставляем null
    fs.writeFileSync(filePath, JSON.stringify(library));
    res.redirect('/');
});

// Удаление книги
app.delete('/book/:id', (req, res) => {
    library = library.filter(book => book.id !== parseInt(req.params.id));
    fs.writeFileSync(filePath, JSON.stringify(library));
    res.status(200).send('Book deleted');
});

// Запуск сервера
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
