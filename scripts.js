const url = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const dateInput = document.getElementById("date-input");

// Verifica se os elementos foram encontrados 
    if (searchButton && dateInput) {
        searchButton.addEventListener("click", () => {
            const date = dateInput.value;
            fetchData(date);
        });

// imagem inicial sem data
        fetchData();
    } else {
        console.error("Erro: Elementos 'search-button' ou 'date-input' não encontrados.");
    }
});

async function fetchData(date = "") {
    let fetchUrl = `${url}${api_key}`;
    if (date) {
        fetchUrl += `&date=${date}`;
    }

    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (data.media_type === "image") {
            document.getElementById("titulo").textContent = data.title;
            document.getElementById("pic").src = data.hdurl || data.url;
            document.getElementById("legenda").textContent = data.explanation;
        } else {
            alert("Não há imagem disponível para essa data.");
        }
    } catch (error) {
        console.error("Houve um problema com a requisição Fetch:", error);
        document.getElementById("titulo").textContent = "Erro ao carregar dados.";
    }
}

document.getElementById("voltar-inicio").addEventListener("click", function() {
    window.location.href = 'index.html'; 
});
function pesquisa() {
    window.location.href = 'pesquisa.html';  
}

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

function goToPage(url) {
    document.body.classList.add("fade-out");  
    setTimeout(() => {
        window.location.href = url;
    }, 800); // Tempo em milissegundos
}