// Elementos principais do carrinho
const btnAbrirCarrinho = document.getElementById("btn-carrinho"); 
const itensCarrinho = document.getElementById("itens-carrinho");
const containerCarrinho = document.getElementById("carrinho-lateral"); 
const containerQuantidade = document.getElementById("contador-quantidade");
const btnFinalizarCompra = document.getElementById("btn-finalizar"); 
const totalCarrinho = document.getElementById("total-carrinho"); 
const avisoCarrinhoVazio = document.getElementById("carrinho-vazio");

// Objeto que armazena os produtos adicionados ao carrinho
let carrinhoProdutos = {};

// Função auxiliar para formatar valores em Real
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Evento adicionar ao carrinho
document.querySelectorAll(".botao-carrinho").forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const produto = evento.currentTarget.closest(".produto");
    const descricao = produto.querySelector(".descricao").textContent.trim();
    const preco = parseFloat(
      produto.querySelector(".preco").textContent.replace("R$", "").replace(",", ".").trim()
    );
    const img = produto.querySelector("img").src;

    if (carrinhoProdutos[descricao]) {
      carrinhoProdutos[descricao].quantidade++;
    } else {
      carrinhoProdutos[descricao] = {
        preco,
        quantidade: 1,
        img, // salva a imagem
      };
    }

    atualizarInterfaceCarrinho();
    containerCarrinho.classList.add("aberto");
  });
});

// Atualiza interface do carrinho
function atualizarInterfaceCarrinho() {
  itensCarrinho.innerHTML = "";
  let quantidadeTotal = 0;
  let total = 0;

  for (const item in carrinhoProdutos) {
    const { preco, quantidade, img } = carrinhoProdutos[item];
    const subtotal = preco * quantidade;
    total += subtotal;
    quantidadeTotal += quantidade;

    const divItem = document.createElement("div");
    divItem.classList.add("item-carrinho");
    divItem.innerHTML = `
      <img src="${img}" alt="${item}">
      <div class="item-carrinho-info">
        <p class="descricao">${item}</p>
        <p class="preco">${formatarPreco(preco)} x ${quantidade} = ${formatarPreco(subtotal)}</p>
        <div class="quantidade-container">
          <button class="btn-quantidade" data-id="${item}" data-acao="diminuir">-</button>
          <span>${quantidade}</span>
          <button class="btn-quantidade" data-id="${item}" data-acao="aumentar">+</button>
        </div>
      </div>
    `;
    itensCarrinho.appendChild(divItem);
  }

  // Atualiza total e contador
  totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
  containerQuantidade.textContent = quantidadeTotal;
  containerQuantidade.style.display = quantidadeTotal > 0 ? "inline-block" : "none";

  // Mostra/esconde aviso de carrinho vazio
  avisoCarrinhoVazio.style.display = quantidadeTotal > 0 ? "none" : "block";

  // Eventos de + e - quantidade
  document.querySelectorAll(".btn-quantidade").forEach((botao) => {
    botao.addEventListener("click", (evento) => {
      const acao = evento.currentTarget.getAttribute("data-acao");
      const descricao = evento.currentTarget.getAttribute("data-id");

      if (acao === "aumentar") {
        carrinhoProdutos[descricao].quantidade++;
      } else if (acao === "diminuir") {
        carrinhoProdutos[descricao].quantidade--;
        if (carrinhoProdutos[descricao].quantidade < 1) {
          delete carrinhoProdutos[descricao];
        }
      }

      atualizarInterfaceCarrinho();
    });
  });
}

// Finalizar compra
btnFinalizarCompra.addEventListener("click", () => {
  if (Object.keys(carrinhoProdutos).length === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert("Compra finalizada com sucesso!");
    carrinhoProdutos = {};
    atualizarInterfaceCarrinho();
    containerCarrinho.classList.remove("aberto");
  }
});

// Abrir/fechar carrinho
btnAbrirCarrinho.addEventListener("click", () => {
  containerCarrinho.classList.toggle("aberto");
});
