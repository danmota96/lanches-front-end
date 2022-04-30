import { Api } from "../helpers/Api"

const parseResponse = (response) => response.json();

export const LancheService = {
    /* fetch (URL, {método}).then */
    getLista: () => 
    fetch(Api.lancheLista(), {method: "GET"}).then(parseResponse),
    getById: (id) => 
    fetch(Api.lancheById(), {method: "GET"}).then(parseResponse),
    create: () =>
    fetch(Api.createLanche(), {method: "POST"}).then(parseResponse),
    update: (id) => 
    fetch(Api.updateLancheById(), {method: "PUT"}).then(parseResponse),
    delete: (id) => 
    fetch(Api.deleteLancheById(), {method: "DELETE"}).then(parseResponse),
};