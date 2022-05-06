import "./LancheLista.css";
import { useState, useEffect } from "react";
import LancheListaItem from "components/LancheListaItem/LancheListaItem";
import { LancheService } from "services/LancheService";
import LancheDetalhesModal from "components/LancheDetalhesModal/LancheDetalhesModal";

function LancheLista({ lancheCriado }) {
  const [lanches, setLanches] = useState([]);
  const [lancheSelecionado, setLancheSelecionado] = useState({});
  const [lancheModal, setLancheModal] = useState(false);

  const onAdd = (lancheIndex) => {
    const lanche = {
      [lancheIndex]: +(lancheSelecionado[lancheIndex] || 0) + 1,
    };
    setLancheSelecionado({ ...lancheSelecionado, ...lanche });
  };

  const onRemove = (lancheIndex) => {
    const lanche = {
      [lancheIndex]: +(lancheSelecionado[lancheIndex] || 0) - 1,
    };
    setLancheSelecionado({ ...lancheSelecionado, ...lanche });
  };

  const getLista = async () => {
    const response = await LancheService.getLista();
    setLanches(response);
  };

  const getLancheById = async (lancheId) => {
    const response = await LancheService.getById(lancheId);
    setLancheModal(response);
  };

  useEffect(() => {
    getLista();
  }, []);
  
  /* criação de novo lanche */

  const adicionaLancheNaLista = (lanche) => {
    const lista = [...lanches, lanche];
    setLanches(lista);
  };

  useEffect(() => {
    if (lancheCriado) adicionaLancheNaLista(lancheCriado);
  }, [lancheCriado]);


  return (
    <div className="LancheLista">
      {lanches.map((lanche, index) => (
        <LancheListaItem
          key={`LancheListaItem-${index}`}
          lanche={lanche}
          quantidadeSelecionada={lancheSelecionado[index]}
          index={index}
          onAdd={(index) => onAdd(index)}
          onRemove={(index) => onRemove(index)}
          clickItem={(lancheId) => getLancheById(lancheId)}
        />
      ))}
      {/* modal para exibir detalhes */}
      {lancheModal && (
        <LancheDetalhesModal
          lanche={lancheModal}
          closeModal={() => setLancheModal(false)}
        />
      )}
    </div>
  );
}

export default LancheLista;
