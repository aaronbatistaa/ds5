import { addTransactionToTable } from './transactions.js';
import { saveTransactions, getTransactions } from './storage.js';

export function initializeForm(renderTransactions, updateBalances, updateExpensesChart) {
    const transactionForm = document.getElementById('transaction-form');

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('%c[FORM] Enviando formulario de nueva transacción', 'color: green;');

        const description = document.getElementById('description').value.trim();
        const method = document.getElementById('method').value;
        const date = document.getElementById('date').value;
        const amountInput = document.getElementById('amount').value;
        const type = document.querySelector('input[name="type"]:checked').value;
        const category = document.getElementById('category').value;

        console.log('%c[FORM] Datos del formulario:', 'color: green;', { description, method, date, amountInput, type, category });

        let amount = parseFloat(amountInput);
        if (isNaN(amount)) {
            console.error('%c[ERROR] Monto inválido:', 'color: red;', amountInput);
            alert('Por favor, ingresa un monto válido.');
            return;
        }

        if (description === '' || method === '' || date === '' || (type === 'expense' && category === '')) {
            console.error('%c[ERROR] Validación fallida: Campos incompletos', 'color: red;');
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        if (type === 'expense') {
            amount = -Math.abs(amount);
        } else if (type === 'income') {
            amount = Math.abs(amount);
        }

        const transaction = {
            id: Date.now(),
            description,
            method,
            date,
            amount,
            type,
            category: type === 'expense' ? category : null,
        };

        console.log('%c[FORM] Nueva transacción creada:', 'color: green;', transaction);

        const transactions = getTransactions();
        transactions.push(transaction);
        saveTransactions(transactions);

        renderTransactions();
        updateBalances();
        updateExpensesChart();

        document.getElementById('transaction-modal').style.display = 'none';
    }

    transactionForm.addEventListener('submit', handleFormSubmit);
}