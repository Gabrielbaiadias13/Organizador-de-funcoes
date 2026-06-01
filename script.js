const firebaseConfig = {
    apiKey: "AIzaSyAQGXkA5OIhb9JrdxbBpYiMda89FJ8-nLA",
    authDomain: "organizador-de-funcoes.firebaseapp.com",
    projectId: "organizador-de-funcoes",
    storageBucket: "organizador-de-funcoes.firebasestorage.app",
    messagingSenderId: "408667041941",
    appId: "1:408667041941:web:7e6812a0a4f3f92b21ab9c",
    measurementId: "G-B5DFESKKTR",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function salvarNoBanco(dadosDasListas) {
    database
        .ref("organizador/listas")
        .set(dadosDasListas)
        .catch((error) => {
            console.error(error);
        });
}

database.ref("organizador/listas").on("value", (snapshot) => {
    const listasAtualizadas = snapshot.val();
    if (listasAtualizadas) {
        renderizarListasNaTela(listasAtualizadas);
    } else {
        renderizarListasNaTela([]);
    }
});

function renderizarListasNaTela(listas) {
    console.log(listas);
}

const popup = document.getElementById("popup");
const popupInput = document.getElementsByName("input")[0];
const popupLabel = document.querySelector("#popup > div > label");
const btnAddPopup = document.getElementById("addPopup");
let lastBtn;
// ao inves de btnList ser ele quem identifica qual o outimo botao clicado intercalando entre o botao de add item e o de add lista

btnAddPopup.addEventListener("click", () => {
    if (lastBtn.id == "addList") {
        CreateList();
    } else {
        const ulList = lastBtn.nextElementSibling;
        console.log(ulList);
        adicionarItemNaLista(ulList);
    }

    if (lastBtn.nextElementSibling.childElementCount > 2) {
        lastBtn.previousElementSibling.style.backgroundColor = "#b92c34";
    }
    TogglePopup();
});

// --- FUNÇÃO PARA CRIAR ITEM (LI) DENTRO DE UMA LISTA ---
function adicionarItemNaLista(listaUl) {
    if (popupInput.value.trim() !== "") {
        const novoLi = document.createElement("li");

        const novoParagrafo = document.createElement("p");
        novoParagrafo.textContent = popupInput.value.trim();

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "✕";
        botaoExcluir.addEventListener("click", function () {
            novoLi.remove();
        });

        novoLi.appendChild(novoParagrafo);
        novoLi.appendChild(botaoExcluir);
        listaUl.appendChild(novoLi);
    }
}

function TogglePopup(msgLabel) {
    popupLabel.textContent = "";
    popupInput.value = "";
    if (popup.style.display == "flex") {
        popup.style = "display: none;";
    } else {
        popup.style = "display: flex;";
        popupLabel.textContent = msgLabel;
    }
    popupInput.focus();
}

// --- CONFIGURAÇÃO DOS BOTÕES JÁ EXISTENTES NO HTML ---
// Mapeia os botões pequenos que já vieram fixos no HTML
const botoesAdicionarExistentes = document.querySelectorAll(".addItem");
botoesAdicionarExistentes.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        lastBtn = e.target;
        if (e.target.nextElementSibling.childElementCount <= 2) {
            TogglePopup("Digite seu nome:");
        }
    });
});

// --- FUNÇÃO DO BOTÃO GRANDÃO DO TOPO (#addList) ---
const botaoCriarLista = document.getElementById("addList");
const containerListas = document.querySelector(".Lists");

botaoCriarLista.addEventListener("click", (e) => {
    lastBtn = e.target;
    TogglePopup("Nome da nova lista:");
});

function CreateList() {
    // 1. Pede o nome do novo Caldo/Comida

    // Valida se não está vazio
    if (popupInput.value.trim() !== "") {
        // 2. Cria a estrutura do quadrado da lista (div principal)
        const novaCaixaDiv = document.createElement("div");

        // 3. Cria o título da lista com o nome digitado
        const novaHeadDiv = document.createElement("div");
        novaHeadDiv.className = "headList";
        novaHeadDiv.textContent = popupInput.value.trim();

        // 4. Cria o botão pequeno de adicionar itens (+)
        const novoBotaoItem = document.createElement("input");
        novoBotaoItem.type = "button";
        novoBotaoItem.className = "addItem";
        novoBotaoItem.value = "＋";

        // Atribui a função de clique para este novo botão dinâmico
        novoBotaoItem.addEventListener("click", (e) => {
            lastBtn = e.target;
            if (e.target.nextElementSibling.childElementCount < 3) {
                TogglePopup("Digite seu nome:");
            }
        });

        // 5. Cria a lista vazia (ul)
        const novaUl = document.createElement("ul");

        // 6. Encaixa as peças dentro da div da caixa
        novaCaixaDiv.appendChild(novaHeadDiv);
        novaCaixaDiv.appendChild(novoBotaoItem);
        novaCaixaDiv.appendChild(novaUl);

        // 7. Joga a caixa completa para dentro do container do site
        containerListas.appendChild(novaCaixaDiv);
    }
}
