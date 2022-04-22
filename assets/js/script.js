const baseUrl = "http://localhost:3000/lanches";

async function findAllLanches() {
  const response = await fetch(`${baseUrl}/lista-lanches`);

  const lanches = await response.json();

  lanches.forEach((lanche) => {
    document.getElementById("LancheList").insertAdjacentHTML(
      "beforeend",
      `<div class="LancheLista" id="LancheList">
        <div class="ListaLancheItem__local">${lanche.local}</div>
        <div class="ListaLancheItem__localizacao">${lanche.localizacao}</div>
      
        <div class="ListaLancheItem__nome">${lanche.nome}</div>
        <div class="ListaLancheItem__descricao">${lanche.descricao}</div>
        <div class="ListaLancheItem__preco">${lanche.preco}</div>
        <div class="LancheListaItem__acoes Acoes">
          <button class="Acoes__editar btn" onclick="abrirModal(${
            lanche.id
          })">Editar</button> 
        <button class="Acoes__apagar btn" onclick="abrirModalDelete(${
          lanche.id
        })">Apagar</button> 
      </div>
      </div>
      <img src=${lanche.foto} alt=${lanche.nome} class="LancheCardItem__foto" >
  </div> `
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
      <div class="LancheCardItem__preco">${lanche.preco}</div>
      </div> 
      </div>
      <div class="LancheListaItem__acoes Acoes">
              <button class="Acoes__editar btn" onclick="abrirModal(${
                lanche.id
              })">Editar</button> 
            <button class="Acoes__apagar btn" onclick="abrirModalDelete(${
              lanche.id
            })">Apagar</button> 
      </div>
  </div>
  <img src=${lanche.foto} alt=${
    lanche.nome
  } class="LancheCardItem__foto" width="25%">`;
}

findAllLanches();

//MODAL PARA CADASTRO
//TODO -- ARRUMAR BOTÕES CADASTRAR E EDITAR // 
function abrirModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
}


/* async function abrirModal(id = null) {
  if (id != null) {
    document.querySelector("#title-header-modal").innerText =
      "Atualizar um Lanche";
    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseURL}/lanches/${id}`);
    const lanche = await response.json();

    document.querySelector("#local").value = lanche.local;
    document.querySelector("#localizacao").value = lanche.localizacao;
    document.querySelector("#descricao").value = lanche.descricao;
    document.querySelector("#nome").value = lanche.nome;
    document.querySelector("#preco").value = lanche.preco;
    document.querySelector("#foto").value = lanche.foto;
    document.querySelector("#id").value = lanche.id;
  } else {
    document.querySelector("#title-header-modal").innerText =
      "Cadastrar um Lanche";
    document.querySelector("#button-form-modal").innerText = "";
  }

  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#local").value = "";
  document.querySelector("#localizacao").value = "";
  document.querySelector("#nome").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#preco").value = 0;
}

async function createLanche() {
  const id = document.getElementById("id").value;
  const local = document.querySelector("#local").value;
  const localizacao = document.querySelector("#localizacao").value;
  const foto = document.querySelector("#foto").value;
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = document.querySelector("#preco").value;

  const lanche = {
    id,
    local,
    localizacao,
    foto,
    nome,
    descricao,
    preco,
  };
  const modoEdicaoAtivado = id > 0;

  const endpoint = baseUrl + (modoEdicaoAtivado ? `/update/${id}` : "/create");

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(lanche),
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
        <button class="Acoes__apagar btn" onclick="abrirModalDelete(${
          lanche.id
        })">Apagar</button> 
      </div>
      <img src=${novoLanche.foto} alt=${
    novoLanche.nome
  } class="LancheCardItem__foto">`;

  if (modoEdicaoAtivado) {
    document.querySelector(`#LancheListaItem_${id}`).outerHTML = html;
  } else {
    document.querySelector("#LancheList").insertAdjacentHTML("beforeend", html);
  }

  fecharModal();
}

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnSim = document.querySelector(".btn_delete_yes");

  btnSim.addEventListener("click", function () {
    deleteLanche(id);
  });
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

const deleteLanche = async (id) => {
  const response = await fetch(`${baseUrl}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const result = await response.json();
  alert(result.message);
  document.getElementById("lancheList").innerHTML = "";

  findAllLanches();
  fecharModalDelete();
};
 */