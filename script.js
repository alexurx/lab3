let transactions = [];

document.addEventListener('DOMContentLoaded', () => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
        transactions = storedTransactions;
        updateTable();
    }
    calculateTotal();
});

/**
 * Функция добавления транзакции
 * @param {Object} transactionData - данные транзакции из формы
 */
function addTransaction(transactionData) {
    transactionData.id = Date.now();

    transactions.push(transactionData);

    addTransactionToTable(transactionData);

    calculateTotal();

    saveTransactions();
}

/**
 * Функция создания строки таблицы
 * @param {Object} transaction - объект транзакции
 */
function addTransactionToTable(transaction) {
    const table = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;

    row.className = transaction.amount > 0 ? 'green' : 'red';
}

/**
 * Функция удаления транзакции
 * @param {number} transactionId - ID транзакции для удаления
 */
function deleteTransaction(transactionId) {
    transactions = transactions.filter(transaction => transaction.id !== transactionId);

    updateTable();

    saveTransactions();

    calculateTotal();
}

/**
 * Функция обновления таблицы транзакций
 */
function updateTable() {
    const tableBody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Очистка текущего содержимого таблицы

    transactions.forEach(addTransactionToTable);
}

/**
 * Функция подсчета общей суммы транзакций
 */
function calculateTotal() {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('totalAmount').textContent = `Общая сумма: ${total}`;
}

/**
 * Функция сохранения транзакций в localStorage
 */
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const transactionData = {
        date: document.getElementById('date').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        description: document.getElementById('description').value
    };

    addTransaction(transactionData);
});

document.getElementById('totalAmount').textContent = 'Общая сумма: 0';
