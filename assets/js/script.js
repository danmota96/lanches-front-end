const baseUrl = "http://localhost:3000/lanches";

async function findAllLanches() {
  const response = await fetch(`${baseUrl}/lista-lanches`);

  const lanches = await response.json();
  
  lanches.forEach((lanche) => {
    document.getElementById("LancheList").insertAdjacentHTML(
      "beforeend",
      `<div class="LancheLista">
      <div class="ListaLancheItem">
        <div class="ListaLancheItem__local">${lanche.local}</div>
        <div class="ListaLancheItem__localizacao">${lanche.localizacao}</div>
        <img src=${lanche.foto} alt=${lanche.nome} class="ListaLancheItem__foto" width="25%">
        <div class="ListaLancheItem__nome">${lanche.nome}</div>
        <div class="ListaLancheItem__descricao">${lanche.descricao}</div>
        <div class="ListaLancheItem__preco">${lanche.preco.toFixed(2)}</div>
      </div>
    </div>  `
    );
  });
};

findAllLanches();
