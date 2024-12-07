const App = (({ reverseString }) => {
    const htmlElements = {
        form: document.querySelector('form'),
        result: document.querySelector('#result'),
    }
    const handlers = {
        onInputChange(e) {
            const reversed = reverseString(e.target.value);
            htmlElements.result.textContent = reversed;
        }
    }
    const bindEvents = () => {
        htmlElements.form.elements.cadena.addEventListener(
            'input',
            handlers.onInputChange
        );
    }
    return {
        init() {
            bindEvents();
        }
    }
})(window.Utils);

App.init();