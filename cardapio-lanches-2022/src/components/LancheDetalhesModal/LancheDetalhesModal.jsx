import "./LancheDetalhesModal.css";
import Modal from "components/Modal/Modal";

function LancheDetalhesModal({ lanche, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="LancheDetalhesModal">
        <div>
          <div className="LancheDetalhesModal__titulo"> {lanche.titulo} </div>
          <div className="LancheDetalhesModal__preco">
            {" "}
            R$ {Number(lanche.preco).toFixed(2)}{" "}
          </div>
          <div className="LancheDetalhesModal__descricao">
            {" "}
            <b>Sabor:</b> {lanche.sabor}{" "}
          </div>
            <div className="LancheDetalhesModal__descricao">
            {" "}
            <b>Descrição:</b> {lanche.descricao}{" "}
          </div>
        </div>
        <img
          className="LancheDetalhesModal__foto"
          src={lanche.foto}
          alt='erro'
        />
      </div>
    </Modal>
  );
}

export default LancheDetalhesModal;