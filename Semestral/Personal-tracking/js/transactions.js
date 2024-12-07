import { getTransactions } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c[INIT] Transacciones - DOM completamente cargado', 'color: green; font-weight: bold;');

    const transactionsBody = document.getElementById('transactions-body');

    // Obtener y renderizar transacciones
    function renderTransactions() {
        const transactions = getTransactions();
        console.log('%c[RENDER] Transacciones obtenidas:', 'color: purple;', transactions);

        transactionsBody.innerHTML = ''; // Limpiar la tabla

        if (transactions.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="4" style="text-align: center;">No hay transacciones registradas</td>`;
            transactionsBody.appendChild(emptyRow);
            return;
        }

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>${transaction.method}</td>
                <td>${transaction.date}</td>
                <td class="${transaction.amount >= 0 ? 'positive' : 'negative'}">$${Math.abs(transaction.amount).toFixed(2)}</td>
            `;
            transactionsBody.appendChild(row);
        });
    }

    renderTransactions(); // Renderizar transacciones al cargar la página
});