import "./Home.css";
import LancheLista from "components/LancheLista/LancheLista";
import Navbar from "components/NavBar/Navbar";
import AdicionaEditaLancheModal from "components/AdicionaEditaLancheModal/AdicionaEditaLancheModal";
import DeletaLancheModal from "components/DeletaLancheModal/DeletaLancheModal";
import { useState } from "react";
import { ActionMode } from "constants/index";

function Home() {
  /* HOOKS */
  const [canShowAdicionaLancheModal, setCanShowAdicionaLancheModal] =
    useState(false);
  const [lancheParaAdicionar, setLancheParaAdicionar] = useState();
  const [lancheEditado, setLancheEditado] = useState();
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);
  const [lancheRemovido, setLancheRemovido] = useState();

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  /* hooks para editar e deletar lanche */

  const [lancheParaDeletar, setLancheParaDeletar] = useState();
  const handleDeleteLanche = (lancheToDelete) => {
    setLancheParaDeletar(lancheToDelete);
  };

  const [lancheParaEditar, setLancheParaEditar] = useState();
  const handleUpdateLanche = (lancheToUpdate) => {
    setLancheParaEditar(lancheToUpdate);
    setCanShowAdicionaLancheModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaLancheModal(false);
    setLancheParaAdicionar();
    setLancheParaDeletar();
    setLancheParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createLanche={() => setCanShowAdicionaLancheModal(true)}
        updateLanche={() => handleActions(ActionMode.ATUALIZAR)}
        deleteLanche={() => handleActions(ActionMode.DELETAR)}
      />

      <div className="Home__container">
        <LancheLista
          mode={modoAtual}
          lancheCriado={lancheParaAdicionar}
          lancheEditado={lancheEditado}
          lancheRemovido={lancheRemovido}
          deleteLanche={handleDeleteLanche}
          updateLanche={handleUpdateLanche}
        />

        {canShowAdicionaLancheModal && (
          <AdicionaEditaLancheModal
            mode={modoAtual}
            lancheToUpdate={lancheParaEditar}
            onUpdateLanche={(lanche) => setLancheEditado(lanche)}
            closeModal={handleCloseModal}
            onCreateLanche={(lanche) => setLancheParaAdicionar(lanche)}
          />
        )}
        {lancheParaDeletar && (
          <DeletaLancheModal
            lancheParaDeletar={lancheParaDeletar}
            closeModal={handleCloseModal}
            onDeleteLanche={(lanche) => setLancheRemovido(lanche)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
