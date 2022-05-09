import "./LancheLista.css";
import { useState, useEffect, useCallback } from "react";
import LancheListaItem from "components/LancheListaItem/LancheListaItem";
import { LancheService } from "services/LancheService";
import LancheDetalhesModal from "components/LancheDetalhesModal/LancheDetalhesModal";
import { ActionMode } from "constants/index";

function LancheLista({
  lancheCriado,
  mode,
  updateLanche,
  deleteLanche,
  lancheEditado,
  lancheRemovido,
}) {
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
    console.log(response);
    const mapper = {
      [ActionMode.NORMAL]: () => setLancheModal(response),
      [ActionMode.ATUALIZAR]: () => updateLanche(response),
      [ActionMode.DELETAR]: () => deleteLanche(response),
    };

    mapper[mode]();
  };

  useEffect(() => {
    getLista();
  }, [lancheEditado, lancheRemovido]);

  /* criação de novo lanche */

  const adicionaLancheNaLista = useCallback(
    (lanche) => {
      const lista = [...lanches, lanche];
      setLanches(lista);
    },
    [lanches]
  );

  /* validação para verificar se o objeto cadastrado já foi inserido, impedindo que seja incluído duas vezes */
  useEffect(() => {
    if (
      lancheCriado &&
      !lanches.map(({ id }) => id).includes(lancheCriado.id)
    ) {
      adicionaLancheNaLista(lancheCriado);
    }
  }, [adicionaLancheNaLista, lancheCriado, lanches]);

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
          mode={mode}
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
