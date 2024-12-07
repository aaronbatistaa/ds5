import { initializeModal } from './modal.js';
import { initializeForm } from './form-handler.js';
import { renderTransactions } from './transactions.js';
import { updateBalances } from './balances.js';
import { updateExpensesChart } from './chart.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c[INIT] DOM completamente cargado y analizado', 'color: green; font-weight: bold;');

    // Inicializar módulos
    initializeModal();
    initializeForm(renderTransactions, updateBalances, updateExpensesChart);

    // Renderizar los datos iniciales
    renderTransactions();
    updateBalances();
    updateExpensesChart();
});