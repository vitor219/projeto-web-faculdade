// Gerenciamento da página de confirmação
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados do pedido
    carregarDadosPedido();
});

// Função para carregar dados do pedido
function carregarDadosPedido() {
    const pedidoSalvo = localStorage.getItem('pedido');
    
    if (!pedidoSalvo) {
        // Se não houver pedido, redirecionar para a página inicial
        alert('Nenhum pedido encontrado!');
        window.location.href = 'index.html';
        return;
    }
    
    const pedido = JSON.parse(pedidoSalvo);
    
    // Preencher detalhes do pedido
    document.getElementById('pedido-numero').textContent = pedido.id;
    document.getElementById('pedido-data').textContent = formatarData(pedido.data);
    document.getElementById('pedido-status').textContent = traduzirStatus(pedido.status);
    document.getElementById('pedido-metodo').textContent = traduzirMetodo(pedido.pagamento.metodo);
    document.getElementById('pedido-total').textContent = `R$ ${pedido.total.toFixed(2)}`;
    
    // Preencher detalhes de entrega
    const entregaInfo = document.getElementById('entrega-info');
    
    if (entregaInfo) {
        entregaInfo.innerHTML = `
            <div class="entrega-info-item">
                <span class="entrega-info-label">Nome:</span>
                <span>${pedido.cliente.nome}</span>
            </div>
            <div class="entrega-info-item">
                <span class="entrega-info-label">Email:</span>
                <span>${pedido.cliente.email}</span>
            </div>
            <div class="entrega-info-item">
                <span class="entrega-info-label">Endereço:</span>
                <span>${pedido.cliente.endereco}</span>
            </div>
            <div class="entrega-info-item">
                <span class="entrega-info-label">Cidade/Estado:</span>
                <span>${pedido.cliente.cidade}/${pedido.cliente.estado}</span>
            </div>
            <div class="entrega-info-item">
                <span class="entrega-info-label">CEP:</span>
                <span>${pedido.cliente.cep}</span>
            </div>
            <div class="entrega-info-item">
                <span class="entrega-info-label">Telefone:</span>
                <span>${pedido.cliente.telefone}</span>
            </div>
        `;
    }
    
    // Preencher itens do pedido
    const listaItens = document.getElementById('confirmacao-lista-itens');
    
    if (listaItens) {
        // Limpar a lista
        listaItens.innerHTML = '';
        
        // Renderizar cada item do pedido
        pedido.itens.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'confirmacao-item';
            
            itemElement.innerHTML = `
                <div class="confirmacao-item-info">
                    <div class="confirmacao-item-nome">${item.nome}</div>
                    <div class="confirmacao-item-detalhes">Quantidade: ${item.quantidade}</div>
                </div>
                <div class="confirmacao-item-preco">R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}</div>
            `;
            
            listaItens.appendChild(itemElement);
        });
    }
}

// Função para formatar data
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para traduzir status
function traduzirStatus(status) {
    const statusMap = {
        'confirmado': 'Confirmado',
        'pendente': 'Pendente',
        'cancelado': 'Cancelado'
    };
    
    return statusMap[status] || status;
}

// Função para traduzir método de pagamento
function traduzirMetodo(metodo) {
    const metodoMap = {
        'cartao-credito': 'Cartão de Crédito',
        'cartao-debito': 'Cartão de Débito',
        'pix': 'PIX'
    };
    
    return metodoMap[metodo] || metodo;
}
