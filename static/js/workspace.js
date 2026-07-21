document.addEventListener("DOMContentLoaded", () => {

    Company.init();

    Client.init();

    Items.init();

    Notes.init();

    PDF.init();

    const button = document.getElementById("new-quote-button");

    button.addEventListener("click", () => {

        const confirmNew = confirm(
            "Deseja iniciar um novo orçamento?\n\nTodos os dados do cliente e dos itens serão apagados."
        );

        if (!confirmNew) return;

        Client.clear();

        Items.clear();

        Notes.clear();

    });

});
