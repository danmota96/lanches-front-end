import "./LancheDetalhesModal.css";
import Modal from "components/Modal/Modal";

function LancheDetalhesModal({ lanche, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="LancheDetalhesModal">
        <div>
          <div className="LancheDetalhesModal__nome"> <b>{lanche.nome}</b> </div> 
          <div className="LancheDetalhesModal__localizacao"> {" "}
            <b>Localização:</b>{lanche.localizacao} </div>
      
          <div className="LancheDetalhesModal__descricao">
            {" "}
            <b>Descrição:</b> {lanche.descricao}{" "}
          </div>
          <div className="LancheDetalhesModal__preco">
            {" "}
            R$ {Number(lanche.preco).toFixed(2)}{" "}
          </div>
        </div>
      
      </div>
    </Modal>
  );
}

export default LancheDetalhesModal;
