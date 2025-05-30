// Gerenciamento de pagamento
document.addEventListener('DOMContentLoaded', function () {
  // Carregar resumo do pedido
  carregarResumoPedido();

  // Carregar dados do cliente
  carregarDadosClienteResumo();

  // Configurar métodos de pagamento
  configurarMetodosPagamento();

  // Atualizar contador do carrinho
  atualizarContadorCarrinho();
});

// Função para carregar resumo do pedido
function carregarResumoPedido() {
  const resumoItens = document.getElementById('resumo-itens');
  const resumoTotal = document.getElementById('resumo-valor-total');

  if (resumoItens && resumoTotal) {
    // Carregar carrinho do localStorage
    carregarCarrinho();

    // Limpar o container
    resumoItens.innerHTML = '';

    if (carrinho.length === 0) {
      // Se o carrinho estiver vazio, redirecionar para a página de produtos
      alert('Seu carrinho está vazio! Adicione produtos antes de prosseguir.');
      window.location.href = 'index.html';
      return;
    }

    // Renderizar cada item do carrinho
    carrinho.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'resumo-item';

      itemElement.innerHTML = `
                <div class="resumo-item-info">
                    <div class="resumo-item-nome">${item.nome}</div>
                    <div class="resumo-item-detalhes">Quantidade: ${
                      item.quantidade
                    }</div>
                </div>
                <div class="resumo-item-preco">R$ ${(
                  item.precoUnitario * item.quantidade
                ).toFixed(2)}</div>
            `;

      resumoItens.appendChild(itemElement);
    });

    // Atualizar o total
    resumoTotal.textContent = `R$ ${calcularTotal().toFixed(2)}`;
  }
}

// Função para carregar dados do cliente no resumo
function carregarDadosClienteResumo() {
  const clienteInfo = document.getElementById('cliente-info');

  if (clienteInfo) {
    const clienteSalvo = localStorage.getItem('cliente');

    if (!clienteSalvo) {
      // Se não houver dados do cliente, redirecionar para a página de dados
      alert(
        'Por favor, preencha seus dados antes de prosseguir para o pagamento.'
      );
      window.location.href = 'dados-cliente.html';
      return;
    }

    const cliente = JSON.parse(clienteSalvo);

    clienteInfo.innerHTML = `
            <div class="cliente-info-item">
                <span class="cliente-info-label">Nome:</span>
                <span>${cliente.nome}</span>
            </div>
            <div class="cliente-info-item">
                <span class="cliente-info-label">Email:</span>
                <span>${cliente.email}</span>
            </div>
            <div class="cliente-info-item">
                <span class="cliente-info-label">Endereço:</span>
                <span>${cliente.endereco}</span>
            </div>
            <div class="cliente-info-item">
                <span class="cliente-info-label">Cidade/Estado:</span>
                <span>${cliente.cidade}/${cliente.estado}</span>
            </div>
            <div class="cliente-info-item">
                <span class="cliente-info-label">CEP:</span>
                <span>${cliente.cep}</span>
            </div>
            <div class="cliente-info-item">
                <span class="cliente-info-label">Telefone:</span>
                <span>${cliente.telefone}</span>
            </div>
        `;
  }
}

function configurarMetodosPagamento() {
  const metodosRadio = document.querySelectorAll('input[name="metodo"]');
  const cartaoForm = document.getElementById('cartao-form');
  const pixForm = document.getElementById('pix-form');

  metodosRadio.forEach((radio) => {
    radio.addEventListener('change', function () {
      cartaoForm.style.display = 'none';
      pixForm.style.display = 'none';

      if (this.value === 'cartao-credito' || this.value === 'cartao-debito') {
        cartaoForm.style.display = 'block';
      } else if (this.value === 'pix') {
        pixForm.style.display = 'block';
      }

      document.querySelectorAll('.metodo-item').forEach((item) => {
        if (item.querySelector('input') === this) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  });

  document
    .querySelector('input[name="metodo"]:checked')
    .dispatchEvent(new Event('change'));
}

function processarPagamento(event) {
  // Prevenir o envio do formulário
  event.preventDefault();

  const metodoSelecionado = document.querySelector(
    'input[name="metodo"]:checked'
  ).value;

  if (
    metodoSelecionado === 'cartao-credito' ||
    metodoSelecionado === 'cartao-debito'
  ) {
    const numeroCartao = document.getElementById('numero-cartao').value;
    const nomeCartao = document.getElementById('nome-cartao').value;
    const validade = document.getElementById('validade').value;
    const cvv = document.getElementById('cvv').value;

    if (!/^\d{16}$/.test(numeroCartao.replace(/\s/g, ''))) {
      alert('Por favor, insira um número de cartão válido!');
      return;
    }

    if (!nomeCartao) {
      alert('Por favor, insira o nome no cartão!');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(validade)) {
      alert('Por favor, insira uma data de validade válida no formato MM/AA!');
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert('Por favor, insira um CVV válido de 3 dígitos!');
      return;
    }
  }

  const pagamento = {
    id: Date.now(),
    metodo: metodoSelecionado,
    valor: calcularTotal(),
    status: 'aprovado',
    data: new Date().toISOString(),
    dadosCliente: JSON.parse(localStorage.getItem('cliente')),
  };

  const pedido = {
    id: Date.now(),
    data: new Date().toISOString(),
    itens: carrinho,
    cliente: JSON.parse(localStorage.getItem('cliente')),
    pagamento: pagamento,
    status: 'confirmado',
    total: calcularTotal(),
  };

  localStorage.setItem('pedido', JSON.stringify(pedido));

  limparCarrinho();

  window.location.href = 'confirmacao.html';
}
