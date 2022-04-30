import "./LancheLista.css";
import { useState, useEffect } from "react";
import LancheListaItem from "components/LancheListaItem/LancheListaItem";
import { LancheService } from "services/LancheService";


function LancheLista() {
  const [lanches, setLanches] = useState([]);
  const [lancheSelecionado, setLancheSelecionado] = useState({});

  const getLista = async () => {
    const response = await LancheService.getLista();
    setLanches(response);
  };

  const onAdd = (lancheIndex) => {
    const lanche = {
      [lancheIndex]: +(lancheSelecionado[lancheIndex] || 0) + 1,
    };
    setLancheSelecionado({ ...lancheSelecionado, ...lanche });
    console.log(lancheSelecionado);
  };

  const onRemove = (lancheIndex) => {
    const lanche = {
      [lancheIndex]: +(lancheSelecionado[lancheIndex] || 0) - 1,
    };
    setLancheSelecionado({ ...lancheSelecionado, ...lanche });
    console.log(lancheSelecionado);
  };

  useEffect(() => {
    getLista();
  }, []);
  

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
        />

      ))}
    </div>
  );
}

export default LancheLista;
