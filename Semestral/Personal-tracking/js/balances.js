import { getTransactions } from './storage.js';

export function updateBalances() {
    console.log('%c[BALANCE] Actualizando balances', 'color: teal;');

    const transactions = getTransactions();
    let total = 0;
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        total += transaction.amount;
        if (transaction.amount >= 0) income += transaction.amount;
        else expenses += transaction.amount;
    });

    document.getElementById('total-balance').textContent = `$${total.toFixed(2)}`;
    document.getElementById('income-balance').textContent = `$${income.toFixed(2)}`;
    document.getElementById('expenses-balance').textContent = `$${Math.abs(expenses).toFixed(2)}`;
}