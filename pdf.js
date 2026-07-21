/* ==========================================================
   OrçaFácil
   Componente: Gerador de PDF
========================================================== */

const PDF = {
    init() {
        const btn = document.getElementById("download-pdf-button");
        if (btn) {
            btn.addEventListener("click", () => this.generate());
        }
    },

    async generate() {
        const element = document.querySelector(".paper");
        if (!element) {
            alert("Erro: Elemento da folha (.paper) não foi encontrado.");
            return;
        }

        try {
            // Força a cor de fundo e opacidade direto no estilo do elemento para o html2canvas ler
            element.style.backgroundColor = "#ffffff";
            element.style.color = "#0f172a";

            // Tira print com alta resolução (scale: 2)
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false
            });

            // Converte a captura em imagem PNG
            const imgData = canvas.toDataURL("image/png");

            // Instancia o jsPDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const imgWidth = 210; // Largura do A4 em mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Adiciona a imagem cobrindo toda a folha
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            // Salva o PDF com o nome da empresa ou padrão
            pdf.save("Orcamento.pdf");

        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Ocorreu um erro ao gerar o PDF. Verifique o console.");
        }
    }
};