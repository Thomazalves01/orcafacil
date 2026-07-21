/* ==========================================================
   OrçaFácil
   Componente: Gerador de PDF (Corrigido para Celular)
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

        // Guarda os estilos originais da tela do celular/PC
        const originalStyle = element.getAttribute("style") || "";

        try {
            // 1. FORÇA LARGURA FIXA DE A4 (794px) PARA O PRINT FICAR PERFEITO NO MOBILE
            element.style.width = "794px";
            element.style.minWidth = "794px";
            element.style.maxWidth = "794px";
            element.style.boxSizing = "border-box";
            element.style.backgroundColor = "#ffffff";
            element.style.color = "#0f172a";

            // 2. Tira o print com o canvas simulando a largura de desktop
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
                width: 794,        // Força largura do canvas
                windowWidth: 1024  // Engana o html2canvas para renderizar em modo desktop
            });

            // Restaura o estilo da tela do celular imediatamente após a captura
            element.setAttribute("style", originalStyle);

            // 3. Converte a captura em imagem PNG
            const imgData = canvas.toDataURL("image/png");

            // 4. Instancia o jsPDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const imgWidth = 210; // Largura do A4 em mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // 5. Adiciona a imagem no PDF
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            // 6. Salva o arquivo
            pdf.save("Orcamento.pdf");

        } catch (error) {
            // Se der erro, garante que restaura o estilo da tela
            element.setAttribute("style", originalStyle);
            console.error("Erro ao gerar PDF:", error);
            alert("Ocorreu um erro ao gerar o PDF. Verifique o console.");
        }
    }
};

// Inicializa o componente quando o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
    PDF.init();
});
