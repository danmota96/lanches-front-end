import "./Navbar.css";
import logo from "assets/logo.svg";
import btn_add from "assets/icons/btn_add.svg";
import edit from "assets/icons/edit.svg";
import deletar from "assets/icons/deletar.svg";
import { ActionMode } from "constants/index";

function Navbar({ createLanche, updateLanche, mode, deleteLanche }) {
  return (
    <div className="Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="500px"
            alt="Logo LFAV"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> Lanches Favoritos </span>
        </div>

        <div className="Header__opcoes Opcoes">
          {/* BOTÃO DE ATUALIZAR */}
          <button
            type="button"
            className={`Opcoes__lanche Lanche ${
              mode === ActionMode.ATUALIZAR && "Lanche--ativo"
            }`}
            onClick={() => updateLanche()}
          >
            <img
              src={edit}
              width="40px"
              className="Lanche__icone"
              alt="Editar lanche"
            />
          </button>

          <button
            type="button"
            className={`Opcoes__lanche Lanche ${
              mode === ActionMode.DELETAR && "Lanche--deletar"
            }`}
            onClick={() => deleteLanche()}
          >
            <img
              src={deletar}
              width="40px"
              className="Lanche__icone"
              alt="Deletar lanche"
            />
          </button>

          {/* BOTÃO DE CADASTRO */}
          <button
            type="button"
            className="Opcoes__lanche Lanche"
            onClick={() => createLanche()}
          >
            <img
              src={btn_add}
              width="40px"
              className="Lanche__icone"
              alt="Adiconar Lanche"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
