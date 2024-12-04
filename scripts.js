const url = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const dateInput = document.getElementById("date-input");

    const today = new Date().toISOString().slice(0, 10);
    fetchData(today);

    if (searchButton && dateInput) {
        searchButton.addEventListener("click", () => {
            const date = dateInput.value;
            fetchData(date);
        });

        dateInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                fetchData(dateInput.value);
            }
        });
    } else {
        console.error("Erro: Elementos 'search-button' ou 'date-input' não encontrados.");
    }
});

const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.querySelector(".close-btn");
const imgElement = document.getElementById("pic");

if (modal && modalImage && closeModalBtn && imgElement) {
    imgElement.addEventListener("click", () => {
        modal.style.display = "block";
        modalImage.src = imgElement.src;
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

async function fetchData(date = "") {
    let fetchUrl = `${url}${api_key}`;
    if (date) fetchUrl += `&date=${date}`;

    try {
        document.getElementById("titulo").textContent = "Carregando...";
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error("Erro ao acessar a API");

        const data = await response.json();

        if (data.media_type === "image") {
            document.getElementById("titulo").textContent = data.title;
            document.getElementById("pic").src = data.hdurl || data.url;
            document.getElementById("legenda").textContent = data.explanation;
        } else {
            alert("Não há imagem disponível para essa data.");
            document.getElementById("titulo").textContent = "Sem imagem para esta data";
            document.getElementById("pic").src = "";
            document.getElementById("legenda").textContent = "";
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        document.getElementById("titulo").textContent = "Erro ao carregar dados.";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

function closeModal() {
    document.getElementById("image-modal").style.display = "none";
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});