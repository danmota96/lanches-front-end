/* FUNÇÕES DO CARD */
import "./LancheListaItem.css";

function LancheListaItem({
  lanche,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
}) {
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="LancheListaItem__badge">{quantidadeSelecionada}</span>
    );

  const removeButton = (canRender, index) => 
      Boolean(canRender) && (<button className="Acoes__remover" onClick={() => onRemove(index)}>remover</button>);

  return (
    <div className="LancheListaItem" key={`LancheListaItem-${index}`}>
      {badgeCounter(quantidadeSelecionada, index)}

      <div>
        <div className="LancheListaItem__local">{lanche.local}</div>
        <div className="LancheListaItem__localizacao">{lanche.localizacao}</div>
        <div className="LancheListaItem__nome">{lanche.nome}</div>
        <div className="LancheListaItem__descricao">{lanche.descricao}</div>
        <div className="LancheListaItem__preco">
          R$ {lanche.preco.toFixed(2)}
        </div>

        <button
          className={`Acoes__adicionar ${
            !quantidadeSelecionada && "Acoes__adicionar--preencher"
          }`}
          onClick={() => onAdd(index)}
        >
          adicionar
        </button>
        {removeButton(quantidadeSelecionada, index)}
      </div>
      <img
        className="LancheListaItem__foto"
        src={lanche.foto}
        alt="erro"
        width={30}
      />
    </div>
  );
}

export default LancheListaItem;
