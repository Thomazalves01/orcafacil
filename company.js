/* ==========================================================
   OrçaFácil
   Componente: Empresa
   Responsável por:
   - Carregar dados da empresa
   - Salvar automaticamente
   - Atualizar a prévia
========================================================== */

const Company = {

    storageKey: CONFIG.STORAGE_KEYS.COMPANY,

    elements: {},

    data: {

        name: "",
        phone: "",
        email: "",
        city: "",
        cnpj: ""

    },

    init() {

        this.elements = {

            name: document.getElementById("company-name"),
            phone: document.getElementById("company-phone"),
            email: document.getElementById("company-email"),
            city: document.getElementById("company-city"),
            cnpj: document.getElementById("company-cnpj")

        };

        this.load();

        this.render();

        this.bind();

    },

    bind() {

        Object.keys(this.elements).forEach(key => {

            this.elements[key].addEventListener("input", () => {

                this.data[key] = this.elements[key].value;

                this.save();

                this.render();

            });

        });

    },

    save() {

        Storage.save(this.storageKey, this.data);

    },

    load() {

        const saved = Storage.load(this.storageKey);

        if (!saved) return;

        this.data = {

            ...this.data,
            ...saved

        };

        Object.keys(this.elements).forEach(key => {

            if (this.elements[key]) {

                this.elements[key].value = this.data[key] || "";

            }

        });

    },

    render() {

        const companyName = document.getElementById("preview-company-name");
        const companyPhone = document.getElementById("preview-company-phone");
        const companyEmail = document.getElementById("preview-company-email");
        const companyCity = document.getElementById("preview-company-city");

        if (companyName) {
            companyName.textContent = this.data.name || "Minha Empresa";
        }

        if (companyPhone) {
            companyPhone.textContent = this.data.phone || "Telefone";
        }

        if (companyEmail) {
            companyEmail.textContent = this.data.email || "E-mail";
        }

        if (companyCity) {
            companyCity.textContent = this.data.city || "Cidade";
        }

    }

};