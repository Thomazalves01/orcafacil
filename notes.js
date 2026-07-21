/* ==========================================================
   OrçaFácil
   Componente: Observações
========================================================== */

const Notes = {

    init() {

        this.textarea = document.getElementById("quote-notes");

        this.section = document.getElementById("preview-notes-section");

        this.preview = document.getElementById("preview-notes");

        this.bind();

    },

    bind() {

        this.textarea.addEventListener("input", () => {

            this.render();

        });

    },

    render() {

        const text = this.textarea.value.trim();

        if (text === "") {

            this.section.style.display = "none";

            return;

        }

        this.section.style.display = "block";

        this.preview.textContent = text;

    },

    clear() {

        this.textarea.value = "";

        this.render();

    }

};