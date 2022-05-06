import { Api } from "../helpers/Api"

const parseResponse = (response) => response.json();

const parseTransformItem = (response) => parseResponse(response).then(parseTransformItem);

export const LancheService = {
    /* fetch (URL, {método}).then */
    getLista: () => 
    fetch(Api.lancheLista(), {method: "GET"}).then(parseResponse),
    getById: (id) => 
    fetch(Api.lancheById(), {method: "GET"}).then(parseTransformItem),

/* criação de novo lanche cadastrado, enviando para o back-end */
    create: (lanche) => fetch(Api.createLanche(), { method: "POST", body: JSON.stringify(lanche), mode: "cors", headers: {
        "Content-Type": "application/json",
    } }).then(parseTransformItem),

    
    update: (id) => 
    fetch(Api.updateLancheById(), {method: "PUT"}).then(parseResponse),
    delete: (id) => 
    fetch(Api.deleteLancheById(), {method: "DELETE"}).then(parseResponse),
};


