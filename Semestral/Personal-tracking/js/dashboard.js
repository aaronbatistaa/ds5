// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c[INIT] DOM completamente cargado y analizado', 'color: green; font-weight: bold;');

    // Elementos del DOM
    const newTransactionButton = document.getElementById('new-transaction-button');
    const transactionModal = document.getElementById('transaction-modal');
    const closeModalButton = document.getElementById('close-modal');
    const transactionForm = document.getElementById('transaction-form');
    const transactionsBody = document.getElementById('transactions-body');

    const totalBalanceEl = document.getElementById('total-balance');
    const incomeBalanceEl = document.getElementById('income-balance');
    const expensesBalanceEl = document.getElementById('expenses-balance');

    let transactions = [];

    // Inicializar el Chart.js
    let expensesChart; // Variable global para el gráfico

    // Función para abrir el modal
    function openModal() {
        console.log('%c[MODAL] Abriendo modal de nueva transacción', 'color: blue;');
        transactionModal.style.display = 'block';
    }

    // Función para cerrar el modal
    function closeModal() {
        console.log('%c[MODAL] Cerrando modal de transacción', 'color: orange;');
        transactionModal.style.display = 'none';
        transactionForm.reset();
        toggleCategoryField(); // Asegurar que la categoría se muestre/oculte correctamente al cerrar
    }

    // Evento para abrir el modal
    newTransactionButton.addEventListener('click', () => {
        console.log('%c[CLICK] Botón "Nuevo Registro" clickeado', 'color: blue;');
        openModal();
    });

    // Evento para cerrar el modal
    closeModalButton.addEventListener('click', () => {
        console.log('%c[CLICK] Botón de cerrar modal clickeado', 'color: orange;');
        closeModal();
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target == transactionModal) {
            console.log('%c[MODAL] Clic fuera del modal, cerrando modal', 'color: orange;');
            closeModal();
        }
    });

    // Función para mostrar u ocultar el campo de categoría según el tipo de transacción
    function toggleCategoryField() {
        const type = document.querySelector('input[name="type"]:checked').value;
        const categoryField = document.getElementById('transaction-category');
        const categorySelect = document.getElementById('category');

        console.log('%c[TOGGLE] Tipo de transacción seleccionado:', 'color: teal;', type);

        if (type === 'expense') {
            console.log('%c[TOGGLE] Mostrando campo de categoría', 'color: teal;');
            categoryField.style.display = 'block';
            categorySelect.required = true;
        } else {
            console.log('%c[TOGGLE] Ocultando campo de categoría', 'color: teal;');
            categoryField.style.display = 'none';
            categorySelect.required = false;
            categorySelect.value = '';
        }
    }

    // Evento para cambiar el tipo de transacción y mostrar/ocultar la categoría
    const transactionTypeRadios = document.querySelectorAll('input[name="type"]');
    transactionTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleCategoryField);
    });

    // Evento para manejar el envío del formulario
    transactionForm.addEventListener('submit', (event) => {
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

        // Ajustar el monto según el tipo de transacción
        if (type === 'expense') {
            amount = -Math.abs(amount); // Asegurarse de que sea negativo
        } else if (type === 'income') {
            amount = Math.abs(amount); // Asegurarse de que sea positivo
        }

        // Validar campos
        if (description === '' || method === '' || date === '' || (type === 'expense' && category === '')) {
            console.error('%c[ERROR] Validación fallida: Campos incompletos', 'color: red;');
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const transaction = {
            id: Date.now(),
            description,
            method,
            date,
            amount,
            type,
            category: type === 'expense' ? category : null
        };

        console.log('%c[FORM] Nueva transacción creada:', 'color: green;', transaction);

        transactions.push(transaction);
        console.log('%c[TRANSACTIONS] Transacciones actuales:', 'color: green;', transactions);

        addTransactionToTable(transaction);
        updateBalances();
        updateExpensesChart();
        saveTransactions();

        closeModal();
    });

    // Función para agregar una transacción a la tabla
    function addTransactionToTable(transaction) {
        console.log('%c[TABLE] Agregando transacción a la tabla:', 'color: purple;', transaction);
        const tr = document.createElement('tr');

        const descTd = document.createElement('td');
        descTd.textContent = transaction.description;
        tr.appendChild(descTd);

        const methodTd = document.createElement('td');
        methodTd.textContent = transaction.method;
        tr.appendChild(methodTd);

        const dateTd = document.createElement('td');
        dateTd.textContent = transaction.date;
        tr.appendChild(dateTd);

        const amountTd = document.createElement('td');
        amountTd.textContent = `$${Math.abs(transaction.amount).toFixed(2)}`;
        amountTd.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');
        tr.appendChild(amountTd);

        const actionsTd = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            console.log('%c[TABLE] Botón "Eliminar" clickeado para ID:', 'color: purple;', transaction.id);
            deleteTransaction(transaction.id);
        });
        actionsTd.appendChild(deleteButton);
        tr.appendChild(actionsTd);

        transactionsBody.appendChild(tr);
        console.log('%c[TABLE] Transacción agregada a la tabla', 'color: purple;');
    }

    // Función para eliminar una transacción
    function deleteTransaction(id) {
        console.log('%c[DELETE] Eliminando transacción con ID:', 'color: red;', id);
        transactions = transactions.filter(transaction => transaction.id !== id);
        console.log('%c[TRANSACTIONS] Transacciones después de eliminar:', 'color: green;', transactions);
        renderTransactions();
        updateBalances();
        updateExpensesChart();
        saveTransactions();
    }

    // Función para renderizar todas las transacciones
    function renderTransactions() {
        console.log('%c[TABLE] Renderizando todas las transacciones', 'color: purple;');
        transactionsBody.innerHTML = '';
        transactions.forEach(transaction => addTransactionToTable(transaction));
    }

    // Función para actualizar los balances
    function updateBalances() {
        console.log('%c[BALANCE] Actualizando balances', 'color: teal;');
        let total = 0;
        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            total += transaction.amount;
            if (transaction.amount >= 0) {
                income += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });

        console.log('%c[BALANCE] Balances calculados:', 'color: teal;', { total, income, expenses });

        totalBalanceEl.textContent = `$${total.toFixed(2)}`;
        incomeBalanceEl.textContent = `$${income.toFixed(2)}`;
        expensesBalanceEl.textContent = `$${Math.abs(expenses).toFixed(2)}`;

        // Actualizar porcentaje (opcional)
        const incomePercentage = total !== 0 ? ((income / total) * 100).toFixed(2) : 0;
        const expensesPercentage = total !== 0 ? ((Math.abs(expenses) / total) * 100).toFixed(2) : 0;

        document.getElementById('income-percentage').textContent = `+${incomePercentage}%`;
        document.getElementById('expenses-percentage').textContent = `-${expensesPercentage}%`;

        console.log('%c[BALANCE] Balances actualizados en el DOM', 'color: teal;');
    }

    // Función para guardar transacciones en localStorage
    function saveTransactions() {
        console.log('%c[LOCALSTORAGE] Guardando transacciones en localStorage', 'color: magenta;');
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    // Inicializar con datos almacenados
    function initialize() {
        console.log('%c[INIT] Inicializando aplicación', 'color: green;');
        const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
        if (storedTransactions && Array.isArray(storedTransactions)) {
            console.log('%c[INIT] Transacciones almacenadas encontradas:', 'color: green;', storedTransactions);
            transactions = storedTransactions;
            renderTransactions();
            updateBalances();
            updateExpensesChart();
        } else {
            console.log('%c[INIT] No se encontraron transacciones almacenadas. Inicializando transacciones vacías.', 'color: green;');
            transactions = [];
            renderTransactions();
            updateBalances();
            updateExpensesChart();
        }
    }

    initialize();

    // Función para obtener los gastos por categoría
    function getExpensesByCategory() {
        console.log('%c[CHART] Obteniendo gastos por categoría', 'color: orange;');
        const expenses = transactions.filter(transaction => transaction.type === 'expense' && transaction.category);
        const expensesByCategory = {};

        expenses.forEach(expense => {
            if (expensesByCategory[expense.category]) {
                expensesByCategory[expense.category] += Math.abs(expense.amount);
            } else {
                expensesByCategory[expense.category] = Math.abs(expense.amount);
            }
        });

        console.log('%c[CHART] Gastos por categoría:', 'color: orange;', expensesByCategory);
        return expensesByCategory;
    }

    // Función para generar colores aleatorios
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        console.log('%c[COLOR] Generando color aleatorio:', 'color: grey;', color);
        return color;
    }

    // Función para actualizar el Chart de Gastos por Categorías
    function updateExpensesChart() {
        console.log('%c[CHART] Actualizando gráfico de gastos por categorías', 'color: orange;');
        const expensesByCategory = getExpensesByCategory();
        const categories = Object.keys(expensesByCategory);
        const amounts = Object.values(expensesByCategory);

        if (categories.length === 0) {
            console.warn('%c[CHART] No hay datos para mostrar en la gráfica', 'color: orange;');
            if (expensesChart) {
                expensesChart.destroy();
                expensesChart = null;
                const ctx = document.getElementById('expensesChart').getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                console.log('%c[CHART] Gráfico destruido debido a la falta de datos', 'color: orange;');
            }
            return;
        }

        // Generar colores para cada categoría
        const backgroundColors = categories.map(() => getRandomColor());

        // Actualizar la leyenda
        const chartLegend = document.getElementById('chart-legend');
        chartLegend.innerHTML = ''; // Limpiar leyenda existente
        categories.forEach((category, index) => {
            const li = document.createElement('li');
            const colorSpan = document.createElement('span');
            colorSpan.classList.add('color');
            colorSpan.style.color = backgroundColors[index];
            li.appendChild(colorSpan);
            li.appendChild(document.createTextNode(category));
            chartLegend.appendChild(li);
        });

        // Si el gráfico ya existe, actualizar sus datos
        if (expensesChart) {
            expensesChart.data.labels = categories;
            expensesChart.data.datasets[0].data = amounts;
            expensesChart.data.datasets[0].backgroundColor = backgroundColors;
            expensesChart.update();
            console.log('%c[CHART] Gráfico actualizado', 'color: orange;');
        } else {
            // Crear el gráfico por primera vez
            const ctx = document.getElementById('expensesChart').getContext('2d');
            expensesChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: categories,
                    datasets: [{
                        data: amounts,
                        backgroundColor: backgroundColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false, // Ocultar la leyenda predeterminada
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    return `${label}: $${value.toFixed(2)}`;
                                }
                            }
                        }
                    }
                }
            });
            console.log('%c[CHART] Gráfico creado', 'color: orange;');
        }
    }
});