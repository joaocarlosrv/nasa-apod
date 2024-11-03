const url = "https://api.nasa.gov/planetary/apod?api_key=";
const api_key = "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk"; // Use sua chave de API

    document.getElementById("search-button").addEventListener("click", () => {
    const date = document.getElementById("date-input").value;
        fetchData(date);
});
function pesquisa() {
    window.location.href = "pesquisa.html"; 
}
function inicio(){
    window.location.href = "index.html";
}

        // Função para buscar dados da API
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
                document.getElementById("data").textContent = data.date;
                document.getElementById("pic").src = data.hdurl;
                document.getElementById("descrição").textContent = data.explanation;
            } else {
                 alert("Não há imagem disponível para essa data.");
             }
        } catch (error) {
            console.error("Houve um problema com a requisição Fetch:", error);
            document.getElementById("titulo").textContent = "Erro ao carregar dados.";
    }
}

    document.addEventListener("DOMContentLoaded", () => {
        fetchData(); // Busca a imagem do dia ao carregar
});