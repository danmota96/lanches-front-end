const baseUrl = "http://localhost:3000/lanches";
const msgAlert = document.querySelector(".msg-alert");

async function findAllLanches() {
  const response = await fetch(`${baseUrl}/lista-lanches`);

  const lanches = await response.json();

  lanches.forEach((lanche) => {
    document.getElementById("LancheList").insertAdjacentHTML(
      'beforeend',
      `<div class="LancheLista" id="LancheListaItem_'${lanche._id}'">
        <div class="ListaLancheItem__local">${lanche.local}</div>
        <div class="ListaLancheItem__localizacao">${lanche.localizacao}</div>
        <div class="ListaLancheItem__nome">${lanche.nome}</div>
        <div class="ListaLancheItem__descricao">${lanche.descricao}</div>
        <div class="ListaLancheItem__preco">${lanche.preco}</div>
        
        <div class="LancheListaItem__acoes Acoes">
        <button class="Acoes__editar btn" onclick="abrirModal('${
          lanche._id
        }')">Editar</button> 
        <button class="Acoes__apagar btn" onclick="abrirModalDelete('${
          lanche._id
        }')" >Apagar</button> 
        </div>
      
      <img src=${lanche.foto} alt=${lanche.nome} class="LancheCardItem__foto" >
  </div> `
    );
  });
}

findAllLanches();

//localizar um lanche pelo seu ID
async function findByIdLanches() {
  const id = document.querySelector("#idLanche").value;

//validar o ID inserido no campo
  if (id == '') {
    localStorage.setItem('message', 'Digite um ID para pesquisar!');
    localStorage.setItem('type', 'danger');
    closeMessageAlert();
    return;
  }

  const response = await fetch(`${baseUrl}/lista-lanches/${id}`);
  const lanche = await response.json();

  if (lanche.message != undefined) {
    localStorage.setItem('message', lanche.message);
    localStorage.setItem('type', 'danger');
    showMessageAlert();
    return;
  }
  

  const lancheEscolhidoDiv = document.querySelector("#lancheEscolhido");

  lancheEscolhidoDiv.innerHTML = `
  <div class="LancheCardItem" id="LancheCardItem_'${lanche._id}'">
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
                'lanche.id'
              })">Editar</button> 
            <button class="Acoes__apagar btn" onclick="abrirModalDelete(${
              'lanche.id'
            })">Apagar</button> 
      </div>
  </div>
  <img src=${lanche.foto} alt=${
    lanche.nome
  } class="LancheCardItem__foto" width="25%">`;
}


//MODAL PARA CADASTRO
async function abrirModal(id = '') {
  if (id != '') {
    //ALTERAR TEXTOS DO MODAL (EDITAR E CADASTRAR)
    document.querySelector('#title-header-modal').innerHTML = 
    'Atualizar Lanche';
    document.querySelector('#button-form-modal').innerHTML = 
    'Atualizar';

    const response = await fetch(`${baseUrl}/lista-lanches/${id}`);
    const lanche = await response.json();

    document.querySelector("#local").value = lanche.local;
    document.querySelector("#localizacao").value = lanche.localizacao;
    document.querySelector("#descricao").value = lanche.descricao;
    document.querySelector("#nome").value = lanche.nome;
    document.querySelector("#preco").value = lanche.preco;
    document.querySelector("#foto").value = lanche.foto;
    //ID (HIDDEN) no html
    document.querySelector("#id").value = lanche.id;  
  }  else {
    document.querySelector('#title-header-modal').innerHTML = 
    'Cadastrar um Lanche';
    document.querySelector('#button-form-modal').innerHTML = 
    'Cadastrar';
  }
  document.querySelector(".modal-overlay").style.display = "flex";
}

function limparModal (){
  const local = document.querySelector('#local').value = '';
  const localizacao = document.querySelector('#localizacao').value = '';
  const descricao = document.querySelector('#descricao').value = '';
  const nome = document.querySelector('#nome').value = '';
  const preco = document.querySelector('#preco').value = 0;
  const foto = document.querySelector('#foto').value = '';
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
  limparModal();
}

async function createLanche() {

//capturar todos os campos preenchidos
  const id = document.querySelector("#id").value;
  const local = document.querySelector("#local").value;
  const localizacao = document.querySelector("#localizacao").value;
  const foto = document.querySelector("#foto").value;
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = document.querySelector("#preco").value;

  //criar um novo objeto (novo id pelo json)
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
//se o modoEdicaoAtivado estiver ativado, eu quero atualizar uma id
  const endpoint = baseUrl + (modoEdicaoAtivado ? `/update/${id}` : `/create` );

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? 'put' : 'post',
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(lanche),
  });

  const novoLanche = await response.json();

  /* validar mensagem do back-end */

  if (novoLanche.message != undefined) {
    localStorage.setItem('message', novoLanche.message);
    localStorage.setItem('type', 'danger');
    showMessageAlert();
    return;
  }

/* MENSAGENS PARA CRIAÇÃO E ATUALIZAÇÃO DE ID */
  if (modoEdicaoAtivado) {
    localStorage.setItem('message', 'Lanche atualizado com sucesso');
    localStorage.setItem('type', 'success');
  } else {
    localStorage.setItem('message', 'Lanche criado com sucesso');
    localStorage.setItem('type', 'success');
  }
/* ATUALIZAR PÁGINA APÓS CRIAR OU EDITAR UM ID */
  document.location.reload(true);

  const html = `
  <div class="LancheCardItem" id="LancheListaItem_${novoLanche.id}">
  <div>
          <div class="LancheCardItem__local">${novoLanche.local}</div>
          <div class="LancheCardItem__localizacao">${novoLanche.localizacao}</div>
          <img src=${novoLanche.foto} alt=${
              novoLanche.nome
          } class="LancheCardItem__foto" width="25%">
          <div class="LancheCardItem__nome">${novoLanche.nome}</div>
          <div class="LancheCardItem__descricao">${novoLanche.descricao}</div>
          <div class="LancheCardItem__preco">${novoLanche.preco}</div>
  </div> 
  <div class="LancheListaItem__acoes Acoes">
      <button class="Acoes__editar btn" onclick="abrirModal(${
        'lanche.id'
      })">Editar</button> 
      <button class="Acoes__apagar btn">Apagar</button> 
  </div>

  </div>`;
  

  if (modoEdicaoAtivado) {
    document.getElementById(`LancheListaItem_${id}`).outerHTML = html;
  }else{
    document.getElementById("LancheList").insertAdjacentHTML("beforeend", html);
  }
  
  documento.getElementById('id').value = '';

  fecharModalCadastro();
}


function abrirModalDelete(id) {
  document.querySelector('#overlay-delete').style.display = 'flex';

  const btnSim = document.querySelector('.btn_delete_yes');

  btnSim.addEventListener('click', function () {
    deleteLanche(id);
  });
}

function fecharModalDelete() {
  document.querySelector('#overlay-delete').style.display = 'none';
}

const deleteLanche = async (id) => {
  const response = await fetch(`${baseUrl}/delete/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  const result = await response.json();
  localStorage.setItem('message', result.message);
  localStorage.setItem("type", "success");

  document.location.reload(true);

  document.getElementById('LancheList').innerHTML = '';
  findAllLanches();
  fecharModalDelete();
};

/* MENSAGENS PARA AVISO */
function showMessageAlert() {
  msgAlert.innerText = localStorage.getItem("message");
  msgAlert.classList.add(localStorage.getItem("type"));
  closeMessageAlert();
}
function closeMessageAlert() {
  setTimeout(function () {
    msgAlert.innerText = localStorage.getItem("message");
    msgAlert.classList.remove(localStorage.getItem("type"));
    localStorage.clear();
  }, 3000);
}
