import "./Home.css";
import LancheLista from "components/LancheLista/LancheLista";
import Navbar from "components/NavBar/Navbar";
import AdicionaEditaLancheModal from "components/AdicionaEditaLancheModal/AdicionaEditaLancheModal";
import { useState } from "react";

function Home() {
  const [canShowAdicionaLancheModal, setCanShowAdicionaLancheModal] =
    useState(false);
  const [lancheParaAdicionar, setLancheParaAdicionar] = useState();
  return (
    <div className="Home">
      <Navbar createLanche={() => setCanShowAdicionaLancheModal(true)} />
      <div className="Home__container">
        <LancheLista lancheCriado={lancheParaAdicionar} />

        {canShowAdicionaLancheModal && (
          <AdicionaEditaLancheModal
            closeModal={() => setCanShowAdicionaLancheModal(false)}
            onCreateLanche={(lanche) => setLancheParaAdicionar(lanche)}
          />
        )}

      </div>
    </div>
  );
}

export default Home;
