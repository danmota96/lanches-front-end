import './LancheLista.css';
import { lanches } from "mocks/lanches.js";
import { useState } from "react";


function LancheLista(){
    
    const [lancheSelecionado, setLancheSelecionado] = useState({});

    const badgeCounter = (canRender, index) => {
        Boolean(canRender) && (<span className='LancheListaItem__badge'>{lancheSelecionado[index]}</span>);
    }
   
    const adicionarItem = (lancheIndex) => {
        const lanche = { [lancheIndex] : Number(lancheSelecionado[lancheIndex] || 0 ) +1}
        setLancheSelecionado({...lancheSelecionado, ...lanche});
    }


    return (
        <div className="LancheLista">
            {lanches.map((lanche, index) => (

            <div className="LancheListaItem" key={`LancheListaItem-${index}`}>
            {badgeCounter(lancheSelecionado[index], index)}
            
                <div>
                <span className="LancheListaItem__badge">{lancheSelecionado[index] || 0 }</span>
                    <div className="LancheListaItem__local">{lanche.local}</div>
                    <div className="LancheListaItem__localizacao">{lanche.localizacao}</div>
                    <div className="LancheListaItem__nome">{lanche.nome}</div>
                    <div className="LancheListaItem__descricao">{lanche.descricao}</div>
                    <div className="LancheListaItem__preco">R$ {lanche.preco.toFixed(2)}</div>

                    <button className="Acoes__adicionar Acoes__adicionar--preencher" 
                    onClick={() => adicionarItem(index)}
                    >adicionar</button>
                   
                </div>
               <img className="LancheListaItem__foto" src={lanche.foto} alt="erro" width={30}/>
            </div>
            ))};	
        </div>   
        );
}

export default LancheLista;