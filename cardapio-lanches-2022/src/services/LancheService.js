import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

const transformLanche = (lanche) => {
  return {
    ...lanche,
    id: lanche._id,
    local: lanche.local,
    localizacao: lanche.localizacao,
    nome: lanche.nome,
    descricao: lanche.descricao,
    preco: lanche.preco,
    foto: lanche.foto,
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((lanches) => lanches.map(transformLanche));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformLanche);

export const LancheService = {
  /* fetch (URL, {método}).then */
  getLista: () =>
    fetch(Api.lancheLista(), { method: "GET" }).then(parseTransformLista),

  getById: (id) =>
    fetch(Api.lancheById(id), { method: "GET" }).then(parseTransformItem),

  /* criação de novo lanche cadastrado, enviando para o back-end */
  create: (lanche) =>
    fetch(Api.createLanche(), {
      method: "POST",
      body: JSON.stringify(lanche),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseTransformItem),

  updtateById: (id, lanche) =>
    fetch(Api.updateLancheById(id), {
      method: "PUT",
      body: JSON.stringify(lanche),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),

  deleteById: (id) =>
    fetch(Api.deleteLancheById(id), { method: "DELETE" }).then(parseResponse),
};
