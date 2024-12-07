export function initializeModal() {
    const transactionModal = document.getElementById('transaction-modal');
    const newTransactionButton = document.getElementById('new-transaction-button');
    const closeModalButton = document.getElementById('close-modal');

    function openModal() {
        console.log('%c[MODAL] Abriendo modal de nueva transacción', 'color: blue;');
        transactionModal.style.display = 'block';
    }

    function closeModal() {
        console.log('%c[MODAL] Cerrando modal de transacción', 'color: orange;');
        transactionModal.style.display = 'none';
        document.getElementById('transaction-form').reset();
        toggleCategoryField(); // Asegurar que el campo de categoría esté en su estado inicial
    }

    newTransactionButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === transactionModal) {
            closeModal();
        }
    });
}