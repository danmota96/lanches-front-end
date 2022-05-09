/* FUNÇÕES DO CARD */
import "./LancheListaItem.css";
import { ActionMode } from "constants/index";

function LancheListaItem({
  lanche,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="LancheListaItem__badge">{quantidadeSelecionada}</span>
    );

  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        remover
      </button>
    );
  /* renderizar o span, com o que estiver no "mode" */
  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`LancheListaItem__tag ${
            mode === ActionMode.DELETAR && "LancheListaItem__tag--deletar"
          }`}
        >
          {" "}
          {mode}{" "}
        </span>
      );
  };

  return (
    <div
      className={`LancheListaItem
      ${mode !== ActionMode.NORMAL && "LancheListaItem--disable"}
      ${mode === ActionMode.DELETAR && "LancheListaItem--deletar"}`}
      onClick={() => clickItem(lanche.id)}
    >
      {badgeCounter(quantidadeSelecionada, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
      <div>
        <div className="LancheListaItem__local">{lanche.local}</div>
        <div className="LancheListaItem__nome"> {lanche.nome}</div>
        <div className="LancheListaItem__descricao">{lanche.descricao}</div>
        <div className="LancheListaItem__preco">
          R$ {lanche.preco.toFixed(2)}
        </div>

        <button
          disabled={mode !== ActionMode.NORMAL}
          className={`Acoes__adicionar ${
            !quantidadeSelecionada && "Acoes__adicionar--preencher"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(index);
          }}
        >
          adicionar
        </button>
        {removeButton(quantidadeSelecionada, index)}
      </div>
      <img className="LancheListaItem__foto" src={lanche.foto} alt="erro" />
    </div>
  );
}

export default LancheListaItem;
