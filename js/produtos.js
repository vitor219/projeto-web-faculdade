// Gerenciamento de produtos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar produtos
    inicializarProdutos();
    
    // Configurar filtros
    configurarFiltros();
    
    // Configurar botões de adicionar ao carrinho
    configurarBotoesAdicionar();
});

// Função para inicializar produtos (simulando dados do backend)
function inicializarProdutos() {
    // No futuro, esses dados podem vir de uma API ou backend
    const produtos = [
        {
            id: 1,
            nome: "Sorvete de Chocolate",
            descricao: "Delicioso sorvete de chocolate cremoso.",
            preco: 12.90,
            categoria: "tradicional",
            imagem: "img/placeholder/chocolate.jpg",
            disponivel: true
        },
        {
            id: 2,
            nome: "Sorvete de Morango",
            descricao: "Sorvete de morango com pedaços da fruta.",
            preco: 12.90,
            categoria: "tradicional",
            imagem: "img/placeholder/morango.jpg",
            disponivel: true
        },
        {
            id: 3,
            nome: "Sorvete de Baunilha",
            descricao: "Clássico sorvete de baunilha cremoso.",
            preco: 11.90,
            categoria: "tradicional",
            imagem: "img/placeholder/baunilha.jpg",
            disponivel: true
        },
        {
            id: 4,
            nome: "Sundae Especial",
            descricao: "Sundae com calda, chantilly e confeitos.",
            preco: 18.90,
            categoria: "especial",
            imagem: "img/placeholder/sundae.jpg",
            disponivel: true
        },
        {
            id: 5,
            nome: "Açaí com Frutas",
            descricao: "Açaí cremoso com mix de frutas frescas.",
            preco: 19.90,
            categoria: "especial",
            imagem: "img/placeholder/acai.jpg",
            disponivel: true
        },
        {
            id: 6,
            nome: "Sorvete Diet de Coco",
            descricao: "Sorvete sem açúcar, perfeito para dietas.",
            preco: 14.90,
            categoria: "diet",
            imagem: "img/placeholder/diet.jpg",
            disponivel: true
        }
    ];
    
    // Salvar no localStorage para simular backend
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função para configurar filtros de produtos
function configurarFiltros() {
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remover classe active de todos os botões
            botoesFiltro.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar produtos
            const filtro = this.getAttribute('data-filter');
            filtrarProdutos(filtro);
        });
    });
}

// Função para filtrar produtos por categoria
function filtrarProdutos(categoria) {
    const cards = document.querySelectorAll('.produto-card');
    
    cards.forEach(card => {
        if (categoria === 'todos') {
            card.style.display = 'flex';
        } else {
            if (card.getAttribute('data-categoria') === categoria) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Função para configurar botões de adicionar ao carrinho
function configurarBotoesAdicionar() {
    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
    
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const nome = this.getAttribute('data-nome');
            const preco = parseFloat(this.getAttribute('data-preco'));
            
            // Adicionar ao carrinho
            adicionarAoCarrinho(id, nome, preco);
            
            // Mostrar notificação
            mostrarNotificacao();
            
            // Atualizar contador do carrinho
            atualizarContadorCarrinho();
        });
    });
}

// Função para mostrar notificação
function mostrarNotificacao() {
    const notificacao = document.getElementById('notificacao');
    notificacao.classList.add('show');
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notificacao.classList.remove('show');
    }, 3000);
}
