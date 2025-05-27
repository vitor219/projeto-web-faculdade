// Gerenciamento do carrinho de compras
let carrinho = [];

// Inicializar carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Carregar carrinho do localStorage
    carregarCarrinho();
    
    // Atualizar contador do carrinho
    atualizarContadorCarrinho();
});

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.produtoId === id);
    
    if (itemExistente) {
        // Se já existe, aumentar a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Se não existe, adicionar novo item
        carrinho.push({
            produtoId: id,
            nome: nome,
            precoUnitario: preco,
            quantidade: 1
        });
    }
    
    // Salvar carrinho no localStorage
    salvarCarrinho();
}

// Função para remover produto do carrinho
function removerDoCarrinho(id) {
    // Filtrar o carrinho para remover o item
    carrinho = carrinho.filter(item => item.produtoId !== id);
    
    // Salvar carrinho no localStorage
    salvarCarrinho();
    
    // Se estiver na página do carrinho, atualizar a exibição
    if (window.location.pathname.includes('carrinho.html')) {
        renderizarCarrinho();
    }
}

// Função para atualizar quantidade de um item no carrinho
function atualizarQuantidade(id, quantidade) {
    // Encontrar o item no carrinho
    const item = carrinho.find(item => item.produtoId === id);
    
    if (item) {
        // Atualizar quantidade
        item.quantidade = quantidade;
        
        // Se a quantidade for 0 ou menos, remover o item
        if (item.quantidade <= 0) {
            removerDoCarrinho(id);
            return;
        }
        
        // Salvar carrinho no localStorage
        salvarCarrinho();
        
        // Se estiver na página do carrinho, atualizar a exibição
        if (window.location.pathname.includes('carrinho.html')) {
            renderizarCarrinho();
        }
    }
}

// Função para calcular o total do carrinho
function calcularTotal() {
    return carrinho.reduce((total, item) => {
        return total + (item.precoUnitario * item.quantidade);
    }, 0);
}

// Função para salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para carregar carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
}

// Função para limpar o carrinho
function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    
    // Se estiver na página do carrinho, atualizar a exibição
    if (window.location.pathname.includes('carrinho.html')) {
        renderizarCarrinho();
    }
}

// Função para atualizar o contador do carrinho no header
function atualizarContadorCarrinho() {
    const contador = document.querySelector('.cart-count');
    
    if (contador) {
        const totalItens = carrinho.reduce((total, item) => {
            return total + item.quantidade;
        }, 0);
        
        contador.textContent = totalItens;
    }
}

// Função para renderizar o carrinho na página de carrinho
function renderizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-itens');
    const totalElement = document.getElementById('carrinho-total');
    const botaoFinalizar = document.getElementById('btn-finalizar');
    
    if (carrinhoContainer) {
        // Limpar o container
        carrinhoContainer.innerHTML = '';
        
        if (carrinho.length === 0) {
            // Se o carrinho estiver vazio
            carrinhoContainer.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio</div>';
            
            // Desabilitar botão de finalizar
            if (botaoFinalizar) {
                botaoFinalizar.disabled = true;
                botaoFinalizar.classList.add('disabled');
            }
        } else {
            // Renderizar cada item do carrinho
            carrinho.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'carrinho-item';
                
                itemElement.innerHTML = `
                    <div class="item-nome">${item.nome}</div>
                    <div class="item-preco">R$ ${item.precoUnitario.toFixed(2)}</div>
                    <div class="item-quantidade">
                        <button class="btn-quantidade" data-id="${item.produtoId}" data-acao="diminuir">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-quantidade" data-id="${item.produtoId}" data-acao="aumentar">+</button>
                    </div>
                    <div class="item-subtotal">R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}</div>
                    <button class="btn-remover" data-id="${item.produtoId}">Remover</button>
                `;
                
                carrinhoContainer.appendChild(itemElement);
            });
            
            // Habilitar botão de finalizar
            if (botaoFinalizar) {
                botaoFinalizar.disabled = false;
                botaoFinalizar.classList.remove('disabled');
            }
            
            // Configurar botões de quantidade e remover
            configurarBotoesCarrinho();
        }
        
        // Atualizar o total
        if (totalElement) {
            totalElement.textContent = `R$ ${calcularTotal().toFixed(2)}`;
        }
    }
}

// Função para configurar botões do carrinho
function configurarBotoesCarrinho() {
    // Configurar botões de quantidade
    const botoesQuantidade = document.querySelectorAll('.btn-quantidade');
    
    botoesQuantidade.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const acao = this.getAttribute('data-acao');
            const item = carrinho.find(item => item.produtoId === id);
            
            if (item) {
                if (acao === 'aumentar') {
                    atualizarQuantidade(id, item.quantidade + 1);
                } else if (acao === 'diminuir') {
                    atualizarQuantidade(id, item.quantidade - 1);
                }
            }
        });
    });
    
    // Configurar botões de remover
    const botoesRemover = document.querySelectorAll('.btn-remover');
    
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            removerDoCarrinho(id);
        });
    });
}

// Função para finalizar compra
function finalizarCompra() {
    // Verificar se o carrinho não está vazio
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Redirecionar para a página de dados do cliente
    window.location.href = 'dados-cliente.html';
}
