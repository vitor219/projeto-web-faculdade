// Gerenciamento de dados do cliente
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados do cliente se existirem
    carregarDadosCliente();
    
    // Atualizar contador do carrinho
    atualizarContadorCarrinho();
});

// Função para salvar dados do cliente
function salvarDadosCliente(event) {
    // Prevenir o envio do formulário
    event.preventDefault();
    
    // Obter dados do formulário
    const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        telefone: document.getElementById('telefone').value
    };
    
    // Validar dados
    if (!validarDadosCliente(cliente)) {
        return;
    }
    
    // Salvar dados no localStorage
    localStorage.setItem('cliente', JSON.stringify(cliente));
    
    // Redirecionar para a página de pagamento
    window.location.href = 'pagamento.html';
}

// Função para validar dados do cliente
function validarDadosCliente(cliente) {
    // Verificar se todos os campos estão preenchidos
    for (const campo in cliente) {
        if (!cliente[campo]) {
            alert(`O campo ${campo} é obrigatório!`);
            return false;
        }
    }
    
    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cliente.email)) {
        alert('Por favor, insira um e-mail válido!');
        return false;
    }
    
    // Validar CEP (formato brasileiro: 00000-000)
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(cliente.cep)) {
        alert('Por favor, insira um CEP válido no formato 00000-000!');
        return false;
    }
    
    // Validar telefone (formato brasileiro)
    const telefoneRegex = /^\(?(\d{2})\)?\s?(\d{4,5})-?(\d{4})$/;
    if (!telefoneRegex.test(cliente.telefone)) {
        alert('Por favor, insira um telefone válido no formato (00) 00000-0000!');
        return false;
    }
    
    return true;
}

// Função para carregar dados do cliente
function carregarDadosCliente() {
    const clienteSalvo = localStorage.getItem('cliente');
    
    if (clienteSalvo) {
        const cliente = JSON.parse(clienteSalvo);
        
        // Preencher formulário com dados salvos
        document.getElementById('nome').value = cliente.nome || '';
        document.getElementById('email').value = cliente.email || '';
        document.getElementById('endereco').value = cliente.endereco || '';
        document.getElementById('cidade').value = cliente.cidade || '';
        document.getElementById('estado').value = cliente.estado || '';
        document.getElementById('cep').value = cliente.cep || '';
        document.getElementById('telefone').value = cliente.telefone || '';
    }
}
