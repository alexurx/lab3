```html
<!-- index.html -->  
<!DOCTYPE html>  
<html lang="ru">  
<head>  
    <meta charset="UTF-8">  
    <title>Учет транзакций</title>  
    <link rel="stylesheet" href="style.css">  
</head>  
<body>  
<table id="transactionsTable">  
    <thead>    <tr>        <th>ID</th>  
        <th>Дата и Время</th>  
        <th>Категория транзакции</th>  
        <th>Краткое описание</th>  
        <th>Действие</th>  
    </tr>    </thead>    <tbody>    <!-- Транзакции будут добавлены здесь -->  
    </tbody>  
</table>  
  
<!-- Блок для отображения подробного описания транзакции -->  
<div id="transactionDetails"></div>  
  
<!-- Форма для добавления транзакции -->  
<form id="transactionForm">  
    <input type="text" id="date" placeholder="Дата и время" required>  
    <input type="number" id="amount" placeholder="Сумма" required>  
    <select id="category" required>  
        <option value="">Выберите категорию</option>  
        <option value="food">Еда</option>  
        <option value="transport">Транспорт</option>  
        <option value="entertainment">Развлечения</option>  
        <!-- Добавьте другие категории по необходимости -->  
    </select>  
    <input type="text" id="description" placeholder="Описание" required>  
    <button type="submit">Добавить транзакцию</button>  
</form>  
  
<!-- Элемент для отображения общей суммы -->  
<div id="totalAmount"></div>  
  
<script src="script.js"></script>  
</body>  
</html>
```

```css
/* style.css */  
/* Общие стили */  
body {  
    font-family: Arial, sans-serif;  
}  
  
/* Стили для таблицы */  
table {  
    width: 100%;  
    border-collapse: collapse;  
}  
  
th, td {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: left;  
}  
  
th {  
    background-color: #f2f2f2;  
}  
  
/* Стили для формы */  
form {  
    margin-top: 20px;  
}  
  
input, select, button {  
    margin: 10px 0;  
    padding: 10px;  
    width: 100%;  
    box-sizing: border-box;  
}  
  
button {  
    background-color: #4CAF50;  
    color: white;  
    border: none;  
    cursor: pointer;  
}  
  
button:hover {  
    opacity: 0.8;  
}  
  
/* Стили для отображения общей суммы */  
#totalAmount {  
    margin-top: 20px;  
    font-size: 20px;  
}  
  
/* Стили для зеленых и красных строк таблицы */  
.green {  
    background-color: #e8f5e9;  
}  
  
.red {  
    background-color: #ffebee;  
}
```

```javascript
// script.js  
// Массив для хранения транзакций  
let transactions = [];  
  
// Загрузка транзакций из localStorage при инициализации  
document.addEventListener('DOMContentLoaded', () => {  
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));  
    if (storedTransactions) {  
        transactions = storedTransactions;  
        updateTable();  
    }  
    // Вызов функции calculateTotal() после загрузки транзакций  
    calculateTotal();  
});  
  
/**  
 * Функция добавления транзакции * @param {Object} transactionData - данные транзакции из формы  
 */function addTransaction(transactionData) {  
    // Добавление уникального ID для транзакции  
    transactionData.id = Date.now();  
  
    // Добавление транзакции в массив  
    transactions.push(transactionData);  
  
    // Добавление строки в таблицу  
    addTransactionToTable(transactionData);  
  
    // Пересчет общей суммы транзакций  
    calculateTotal();  
  
    // Сохранение транзакций в localStorage  
    saveTransactions();  
}  
  
/**  
 * Функция создания строки таблицы * @param {Object} transaction - объект транзакции  
 */function addTransactionToTable(transaction) {  
    const table = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];  
    const row = table.insertRow();  
    row.innerHTML = `  
        <td>${transaction.id}</td>  
        <td>${transaction.date}</td>  
        <td>${transaction.category}</td>  
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>  
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>  
    `;  
  
    // Установка цвета строки в зависимости от суммы транзакции  
    row.className = transaction.amount > 0 ? 'green' : 'red';  
}  
  
/**  
 * Функция удаления транзакции * @param {number} transactionId - ID транзакции для удаления  
 */function deleteTransaction(transactionId) {  
    // Удаление транзакции из массива  
    transactions = transactions.filter(transaction => transaction.id !== transactionId);  
  
    // Обновление таблицы  
    updateTable();  
  
    // Сохранение транзакций в localStorage  
    saveTransactions();  
}  
  
/**  
 * Функция обновления таблицы транзакций */function updateTable() {  
    const tableBody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];  
    tableBody.innerHTML = ''; // Очистка текущего содержимого таблицы  
  
    // Пересоздание строк таблицы    transactions.forEach(addTransactionToTable);  
}  
  
/**  
 * Функция подсчета общей суммы транзакций */function calculateTotal() {  
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);  
    document.getElementById('totalAmount').textContent = `Общая сумма: ${total}`;  
}  
  
/**  
 * Функция сохранения транзакций в localStorage */function saveTransactions() {  
    localStorage.setItem('transactions', JSON.stringify(transactions));  
}  
  
// Обработчик событий для формы добавления транзакции  
document.getElementById('transactionForm').addEventListener('submit', function(event) {  
    event.preventDefault();  
  
    // Получение данных из формы  
    const transactionData = {  
        date: document.getElementById('date').value,  
        amount: parseFloat(document.getElementById('amount').value),  
        category: document.getElementById('category').value,  
        description: document.getElementById('description').value  
    };  
  
    // Добавление транзакции  
    addTransaction(transactionData);  
});  
  
// Инициализация общей суммы  
document.getElementById('totalAmount').textContent = 'Общая сумма: 0';
```

### Отчет о работе веб-проекта

**Файл `index.html`:** Этот файл является основным документом, который браузер загружает при доступе к веб-сайту. Он содержит структуру страницы и ее содержимое в формате HTML (HyperText Markup Language). В `index.html` определены различные элементы, такие как заголовки, параграфы, таблицы и формы, которые формируют скелет веб-страницы. Этот файл также связывается с внешними файлами CSS и JavaScript, которые добавляют стили и интерактивность соответственно.

**Файл `style.css`:** CSS (Cascading Style Sheets) отвечает за визуальное оформление веб-страницы. Файл `style.css` содержит стили, которые определяют внешний вид элементов HTML, включая цвета, шрифты, отступы, выравнивание и другие аспекты дизайна.

Файл `script.js` является ключевым элементом веб-проекта, так как он отвечает за интерактивность и логику работы веб-страницы. В контексте проекта учета транзакций, `script.js` выполняет несколько важных функций:

1. **Управление данными транзакций:**
    
    - Файл содержит массив `transactions`, который служит хранилищем данных о транзакциях. Каждая транзакция представлена объектом с ключами, такими как `id`, `date`, `amount`, `category` и `description`.
2. **Добавление транзакций:**
    
    - С помощью функции `addTransaction()`, данные из формы на странице преобразуются в объект транзакции и добавляются в массив `transactions`. Эта функция также отвечает за обновление таблицы на странице и сохранение данных в `localStorage`.
3. **Отображение транзакций:**
    
    - Функция `addTransactionToTable()` создает HTML-строку для каждой транзакции и добавляет ее в таблицу на странице. Она также устанавливает цвет строки в зависимости от того, является ли сумма транзакции положительной или отрицательной.
4. **Удаление транзакций:**
    
    - Функция `deleteTransaction()` позволяет удалять транзакции. Она удаляет объект транзакции из массива `transactions` и обновляет отображение таблицы и общую сумму.
5. **Расчет общей суммы:**
    
    - Функция `calculateTotal()` вычисляет общую сумму всех транзакций и отображает ее на странице. Это важно для предоставления пользователям быстрого обзора их финансового состояния.
6. **Сохранение данных:**
    
    - Все транзакции сохраняются в `localStorage`, что позволяет данным оставаться доступными даже после перезагрузки страницы. Это обеспечивает постоянство данных без необходимости использования сервера или базы данных.
7. **Обработка событий:**
    
    - `script.js` также содержит обработчики событий, такие как обработка отправки формы для добавления новых транзакций и кликов по кнопкам удаления.
8. **Инициализация:**
    
    - При загрузке страницы, скрипт проверяет `localStorage` на наличие сохраненных транзакций и инициализирует таблицу и общую сумму, если данные доступны.

В целом, `script.js` обеспечивает динамическое взаимодействие пользователя с веб-страницей и управляет всеми аспектами данных транзакций, от их создания до удаления и сохранения. Это делает его неотъемлемой частью функциональности веб-приложения. Если у вас есть дополнительные вопросы или нужна помощь, пожалуйста, дайте мне знать.

В совокупности, эти три файла работают вместе, чтобы создать полноценный пользовательский интерфейс для веб-приложения. HTML предоставляет структуру, CSS добавляет стиль и внешний вид, а JavaScript вносит логику и интерактивность.
## Ответы на контрольные вопросы

1. Доступ к элементу на веб-странице можно получить с помощью методов `document.getElementById`, `document.getElementsByClassName`, `document.getElementsByTagName`, `document.querySelector` и `document.querySelectorAll`.
2. Делегирование событий - это подход, при котором вместо того, чтобы назначать обработчик каждому элементу, обработчик назначается родительскому элементу. Обработчик затем использует информацию о событии, чтобы определить, какой дочерний элемент вызвал событие, и соответствующим образом реагирует на событие.
3. Содержимое элемента DOM можно изменить с помощью свойства `innerHTML` или `textContent`. Например, `document.getElementById('myElement').innerHTML = 'Новое содержимое';`.
4. Новый элемент можно добавить в DOM дерево с помощью методов `appendChild` или `insertBefore`. Сначала нужно создать новый элемент с помощью `document.createElement`, затем добавить его в DOM.
