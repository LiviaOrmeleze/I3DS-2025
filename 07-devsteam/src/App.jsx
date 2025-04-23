import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Promotion from "./components/Promotion";
import CarrinhoOffCanvas from "./components/CarrinhoOffCanvas";


function App() {
const [carrinhoItem, setCarrinhoItem] = useState([]);

useEffect(() => {
  localStorage.setItem("devCarrinho", JSON.stringify(carrinhoItem));
}, [carrinhoItem]);

useEffect(() => {
  const salvaCarrinho = localStorage.getItem("devCarrinho");
  salvaCarrinho && setCarrinhoItem(JSON.parse(salvaCarrinho));
  console.log(localStorage.getItem("devCarrinho"));
}, [])

const handleAddCarrinho = (produto) => {
  setCarrinhoItem((itemAnterior) => { 
    const produtoExistente = itemAnterior.find((item) => item.id === produto.id);
    
    if (produtoExistente) {
      return itemAnterior.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      return [...itemAnterior, { ...produto, quantidade: 1 }];
    }
  }
  );

}

const handleRemoveCarrinho = (produto) => {
  setCarrinhoItem((itemAnterior) =>
    itemAnterior.filter((item) => item.id !== produto.id)
  );
}
  
const handleUpdateCarrinho = (produto, novaQuantidade) => {
setCarrinhoItem ((itemAnterior) =>
  itemAnterior.map((item) =>
    item.id === produto.id ? { ...item, quantidade: novaQuantidade> 0 ? novaQuantidade : 1 } : item
  )
);
};

  return (
  <>
  <Header contadorJogos={carrinhoItem.length}/>
  <Promotion  onAddCarrinho={handleAddCarrinho} /> 
  <CarrinhoOffCanvas 
  onRemoveCarrinho={handleRemoveCarrinho} 
  carrinhoItem={carrinhoItem}
  onUpdateCarrinho={handleUpdateCarrinho}
  />
  </>
  );
}


export default App;
