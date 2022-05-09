const LancheContext = {
    lancheEndpoint: () => `${Api.baseUrl}/lanches`,
    lancheLista: () => `${LancheContext.lancheEndpoint()}/lista-lanches`,
    lancheById: (id) => `${LancheContext.lancheEndpoint()}/lista-lanches/${id}`,
    createLanche: () => `${LancheContext.lancheEndpoint()}/create`,
    updateLancheById: (id) => `${LancheContext.lancheEndpoint()}/update/${id}`,
    deleteLancheById: (id) => `${LancheContext.lancheEndpoint()}/delete/${id}`,
  };

export const Api = {
    baseUrl: "https://apilanchesblue.onrender.com",
    ...LancheContext,
};