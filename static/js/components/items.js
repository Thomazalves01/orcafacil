/* ==========================================================
   OrçaFácil
   Componente: Itens
========================================================== */

const Items = {

    init() {

        this.button = document.getElementById("add-item-button");
        this.container = document.getElementById("items-container");
        this.totalElement = document.getElementById("total-value");
        this.previewBody = document.getElementById("preview-items");
        this.previewTotal = document.getElementById("preview-total");

        this.bind();

        this.updateTotal();

    },

    bind() {

        this.button.addEventListener("click", () => {

            this.addItem();

        });

    },

    addItem() {

        const item = document.createElement("div");

        item.className = "card item-card";

        item.innerHTML = `

            <div class="form-group">

                <label>Produto ou Serviço</label>

                <input class="item-name" type="text" placeholder="Ex: Instalação elétrica">

            </div>

            <div class="form-group">

                <label>Quantidade</label>

                <input class="item-quantity" type="number" min="1" value="1">

            </div>

            <div class="form-group">

                <label>Valor Unitário</label>

                <input class="item-price" type="number" min="0" step="0.01" value="0">

            </div>

            <p class="item-subtotal">

                <strong>Subtotal:</strong> R$ 0,00

            </p>

            <button class="remove-item" type="button">

                🗑 Remover

            </button>

        `;

        this.container.appendChild(item);

        this.bindItem(item);

    },

    bindItem(item) {

        const quantity = item.querySelector(".item-quantity");
        const price = item.querySelector(".item-price");
        const removeButton = item.querySelector(".remove-item");

        quantity.addEventListener("input", () => {

            this.calculateItem(item);

        });

        price.addEventListener("input", () => {

            this.calculateItem(item);

        });

        removeButton.addEventListener("click", () => {

    item.remove();

    this.updateTotal();

    this.renderPreview();

});

    },

    calculateItem(item) {

        const quantity = parseFloat(item.querySelector(".item-quantity").value) || 0;
        const price = parseFloat(item.querySelector(".item-price").value) || 0;

        const subtotal = quantity * price;

        item.dataset.subtotal = subtotal;

        item.querySelector(".item-subtotal").innerHTML =

            `<strong>Subtotal:</strong> ${subtotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}`;

        this.updateTotal();
        this.renderPreview();

    },

        updateTotal() {

        let total = 0;

        const items = this.container.querySelectorAll(".item-card");

        items.forEach(item => {

            total += parseFloat(item.dataset.subtotal || 0);

        });

        this.totalElement.textContent = total.toLocaleString("pt-BR", {

    style: "currency",
    currency: "BRL"

});

if (this.previewTotal) {

    this.previewTotal.textContent = this.totalElement.textContent;

}

    },

       renderPreview() {

        if (!this.previewBody) return;

        this.previewBody.innerHTML = "";

        const items = this.container.querySelectorAll(".item-card");

        items.forEach(item => {

            const name = item.querySelector(".item-name").value || "-";

            const quantity = item.querySelector(".item-quantity").value || 0;

            const subtotal = parseFloat(item.dataset.subtotal || 0);

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</td>
            `;

            this.previewBody.appendChild(row);

        });

        if (this.previewTotal) {

            this.previewTotal.textContent = this.totalElement.textContent;

        }

    },

    clear() {

        this.container.innerHTML = "";

        this.updateTotal();

        this.renderPreview();

    }

};
    
   

