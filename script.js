// --- FUNÇÃO PARA CRIAR ITEM (LI) DENTRO DE UMA LISTA ---
function adicionarItemNaLista(listaUl) {
    const nomeItem = prompt("Digite o nome para adicionar à lista:");
    
    if (nomeItem && nomeItem.trim() !== "") {
        const novoLi = document.createElement('li');

        const novoParagrafo = document.createElement('p');
        novoParagrafo.textContent = nomeItem.trim();

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = "✕";
        botaoExcluir.addEventListener('click', function() {
            novoLi.remove();
        });

        novoLi.appendChild(novoParagrafo);
        novoLi.appendChild(botaoExcluir);
        listaUl.appendChild(novoLi);
    }
}

// --- CONFIGURAÇÃO DOS BOTÕES JÁ EXISTENTES NO HTML ---
// Mapeia os botões pequenos que já vieram fixos no HTML
const botoesAdicionarExistentes = document.querySelectorAll('.addItem');
botoesAdicionarExistentes.forEach(botao => {
    botao.addEventListener('click', function() {
        const listaUl = this.nextElementSibling;
        adicionarItemNaLista(listaUl);
    });
});


// --- FUNÇÃO DO BOTÃO GRANDÃO DO TOPO (#addList) ---
const botaoCriarLista = document.getElementById('addList');
const containerListas = document.querySelector('.Lists');

botaoCriarLista.addEventListener('click', function() {
    // 1. Pede o nome do novo Caldo/Comida
    const nomeDaLista = prompt("Digite o nome da nova lista (Ex: Quentão, Pipoca):");

    // Valida se não está vazio
    if (nomeDaLista && nomeDaLista.trim() !== "") {
        
        // 2. Cria a estrutura do quadrado da lista (div principal)
        const novaCaixaDiv = document.createElement('div');

        // 3. Cria o título da lista com o nome digitado
        const novaHeadDiv = document.createElement('div');
        novaHeadDiv.className = 'headList';
        novaHeadDiv.textContent = nomeDaLista.trim();

        // 4. Cria o botão pequeno de adicionar itens (+)
        const novoBotaoItem = document.createElement('input');
        novoBotaoItem.type = 'button';
        novoBotaoItem.className = 'addItem';
        novoBotaoItem.value = '＋';
        
        // Atribui a função de clique para este novo botão dinâmico
        novoBotaoItem.addEventListener('click', function() {
            const listaUl = this.nextElementSibling;
            adicionarItemNaLista(listaUl);
        });

        // 5. Cria a lista vazia (ul)
        const novaUl = document.createElement('ul');

        // 6. Encaixa as peças dentro da div da caixa
        novaCaixaDiv.appendChild(novaHeadDiv);
        novaCaixaDiv.appendChild(novoBotaoItem);
        novaCaixaDiv.appendChild(novaUl);

        // 7. Joga a caixa completa para dentro do container do site
        containerListas.appendChild(novaCaixaDiv);
    }
});