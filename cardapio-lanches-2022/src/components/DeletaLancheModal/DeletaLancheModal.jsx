import "./DeletaLancheModal.css";
import Modal from "components/Modal/Modal";
import { LancheService } from "services/LancheService";

function DeletaLancheModal({ closeModal, lancheParaDeletar, onDeleteLanche }) {
  const handleDelete = async (lanche) => {
    await LancheService.deleteById(lanche.id);
    onDeleteLanche(lanche);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="DeletaLancheModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover <b>{lancheParaDeletar.nome}</b> do
          cardápio?
        </p>
        <br />
        <div>
          <button
            onClick={() => handleDelete(lancheParaDeletar)}
            className="DeletaLancheModal__confirmar"
          >
            {" "}
            Confirmar{" "}
          </button>
          <button onClick={closeModal} className="DeletaLancheModal__cancelar">
            {" "}
            Cancelar{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeletaLancheModal;