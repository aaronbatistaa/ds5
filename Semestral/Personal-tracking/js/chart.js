import { getTransactions } from './storage.js';

let expensesChart = null;

export function updateExpensesChart() {
    console.log('%c[CHART] Actualizando gráfico de gastos por categorías', 'color: orange;');

    const transactions = getTransactions();
    const expensesByCategory = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
    }, {});

    const categories = Object.keys(expensesByCategory);
    const amounts = Object.values(expensesByCategory);

    if (!categories.length) {
        console.warn('%c[CHART] No hay datos para mostrar', 'color: orange;');
        return;
    }

    const ctx = document.getElementById('expensesChart').getContext('2d');
    if (expensesChart) expensesChart.destroy();

    expensesChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{ data: amounts }],
        },
    });
}