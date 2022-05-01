import "./Navbar.css";
import sacola from "assets/icons/sacola.svg";
import logo from "assets/logo.svg";

function Navbar() {
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
          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              width="40px"
              className="Sacola__icone"
              alt="Sacola de compras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;