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
/* ==========================================================
   Recolher / Expandir Cards (Accordion)
========================================================== */
function initCollapsibleCards() {
    const buttons = document.querySelectorAll(".collapse-button");

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Encontra o card pai
            const card = this.closest(".card");
            if (!card) return;

            // Encontra o conteúdo do card
            const content = card.querySelector(".card-content");
            if (!content) return;

            // Alterna a exibição do conteúdo
            if (content.style.display === "none") {
                content.style.display = "block";
                this.textContent = "▼"; // Seta para baixo quando aberto
            } else {
                content.style.display = "none";
                this.textContent = "▶"; // Seta para o lado quando fechado
            }
        });
    });
}

// Inicializa o recurso quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    initCollapsibleCards();
});
