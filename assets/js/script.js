const baseUrl = "http://localhost:3000/lanches";

async function findAllLanches() {
  const response = await fetch(`${baseUrl}/lista-lanches`);

  const lanches = await response.json();

  lanches.forEach((lanche) => {
    document.getElementById("LancheList").insertAdjacentHTML(
      "beforeend",
      `  <div class="LancheLista" id="LancheList">
      <div class="ListaLancheItem">
        <div class="ListaLancheItem__local">${lanche.local}</div>
        <div class="ListaLancheItem__localizacao">${lanche.localizacao}</div>
      
        <div class="ListaLancheItem__nome">${lanche.nome}</div>
        <div class="ListaLancheItem__descricao">${lanche.descricao}</div>
        <div class="ListaLancheItem__preco">${lanche.preco.toFixed(2)}</div>
      </div>
    </div> 
    <div class="LancheListaItem__acoes Acoes">
    <button class="Acoes__editar btn" onclick="abrirModal(${
      lanche.id
    })">Editar</button> 
    <button class="Acoes__apagar btn">Apagar</button> 
    </div>
    <img src=${lanche.foto} alt=${
        lanche.nome
      } class="LancheCardItem__foto" width="25%">`
    );
  });
}

//localizar um lanche pelo seu ID

async function findByIdLanches() {
  const id = document.querySelector("#idLanche").value;
  const response = await fetch(`${baseUrl}/lista-lanches/${id}`);
  const lanche = await response.json();

  const lancheEscolhidoDiv = document.querySelector("#lancheEscolhido");

  lancheEscolhidoDiv.innerHTML = `
  <div class="LancheCardItem" id="LancheCardItem_${lanche.id}">
  <div>
  <div class="LancheCardItem">
  <div class="LancheCardItem__local">${lanche.local}</div>
  <div class="LancheCardItem__localizacao">${lanche.localizacao}</div>
  <div class="LancheCardItem__nome">${lanche.nome}</div>
  <div class="LancheCardItem__descricao">${lanche.descricao}</div>
  <div class="LancheCardItem__preco">${lanche.preco.toFixed(2)}</div>
</div> 
</div>
<img src=${lanche.foto} alt=${
    lanche.nome
  } class="LancheCardItem__foto" width="25%">`;
}

findAllLanches();

//MODAL PARA CADASTRO
function abrirModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#local").value = "";
  document.querySelector("#localizacao").value = "";
  document.querySelector("#foto").value = "";
  document.querySelector("#nome").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#preco").value = 0;
}

async function createLanche() {
  const local = document.querySelector("#local").value;
  const localizacao = document.querySelector("#localizacao").value;
  const foto = document.querySelector("#foto").value;
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = document.querySelector("#preco").value;

  const lanche = {
    local,
    localizacao,
    foto,
    nome,
    descricao,
    preco,
  };

  const response = await fetch(baseUrl + "/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novoLanche = await response.json();

  const html = `
<div class="LancheCardItem" id="LancheListaItem_{$novoLanche.id}">
<div>
<div class="LancheCardItem__local">${novoLanche.local}</div>
<div class="LancheCardItem__localizacao">${novoLanche.localizacao}</div>
<div class="LancheCardItem__nome">${novoLanche.nome}</div>
<div class="LancheCardItem__descricao">${novoLanche.descricao}</div>
<div class="LancheCardItem__preco">${novoLanche.preco.toFixed(2)}</div>
</div> 
</div>
<div class="LancheListaItem__acoes Acoes">
    <button class="Acoes__editar btn" onclick="abrirModal(${
      lanche.id
    })">Editar</button> 
    <button class="Acoes__apagar btn">Apagar</button> 
</div>
<img src=${novoLanche.foto} alt=${
    novoLanche.nome
  } class="LancheCardItem__foto" width="25%">`;

  document.getElementById("LancheList").insertAdjacentHTML("beforeend", html);

  fecharModalCadastro();
}
