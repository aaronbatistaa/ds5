export function getTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    console.log('%c[STORAGE] Transacciones cargadas desde localStorage:', 'color: blue;', transactions);
    return transactions;
}

export function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log('%c[STORAGE] Transacciones guardadas en localStorage', 'color: magenta;');
}