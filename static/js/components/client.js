/* ==========================================================
   OrçaFácil
   Componente: Cliente
========================================================== */

const Client = {

    storageKey: CONFIG.STORAGE_KEYS.CLIENT,

    elements: {},

    data: {

        name: "",
        phone: "",
        email: "",
        address: ""

    },

    init() {

        this.elements = {

            name: document.getElementById("client-name"),
            phone: document.getElementById("client-phone"),
            email: document.getElementById("client-email"),
            address: document.getElementById("client-address")

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

        const name = document.getElementById("preview-client-name");
        const phone = document.getElementById("preview-client-phone");
        const email = document.getElementById("preview-client-email");
        const address = document.getElementById("preview-client-address");

        if (name) {
            name.textContent = this.data.name || "Nome do cliente";
        }

        if (phone) {
            phone.textContent = this.data.phone || "Telefone";
        }

        if (email) {
            email.textContent = this.data.email || "E-mail";
        }

        if (address) {
            address.textContent = this.data.address || "Endereço";
        }

    },

    clear() {

        this.data = {

            name: "",
            phone: "",
            email: "",
            address: ""

        };

        Object.keys(this.elements).forEach(key => {

            if (this.elements[key]) {

                this.elements[key].value = "";

            }

        });

        localStorage.removeItem(this.storageKey);

        this.render();

    }

};
