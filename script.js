const BIN_ID = "6a26f208da38895dfe9aff52";
const API_KEY = "$2a$10$xfhxnMCjA3NzFOvkCdA1M.F/JrUlJDYGeLlHHbhFKoX.I.GKrHaGu";

let Lists = [];

let limitList;
function RenderList() {
    document.querySelectorAll("[data-id]").forEach((ul) => {
        ul.innerHTML = "";
    });

    Lists.forEach((list, index) => {
        const listElement = document.querySelector(`[data-id="${index}"]`);

        if (!listElement) return;

        const stageElement =
            listElement.parentElement.querySelector(".stage");

        stageElement.textContent =
            `${list.names.length}/${list.lim}`;

        list.names.forEach((name) => {
            CreateItem(index, name, true);
        });
    });
}

LoadJSON();

async function LoadJSON() {
    try {
        const response = await fetch(
            `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
            {
                headers: {
                    "X-Master-Key": API_KEY
                }
            }
        );

        const data = await response.json();

        console.log("JSON carregado:", data);

        Lists = data.record.lists;

        RenderList();
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

async function SaveJSON() {
    try {
        await fetch(
            `https://api.jsonbin.io/v3/b/${BIN_ID}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": API_KEY
                },
                body: JSON.stringify({
                    lists: Lists
                })
            }
        );

        console.log("JSON salvo");
    } catch (error) {
        console.error("Erro ao salvar JSON:", error);
    }
}

function CreateItem(idList, name, render = false) {
    const listElement = document.querySelector(`[data-id="${idList}"]`);

    if (name.trim() === "") return;

    if (!render) {
        if (Lists[idList].names.length >= Lists[idList].lim) {
            return;
        }

        Lists[idList].names.push(name);
    }

    const novoLi = document.createElement("li");

    const novoParagrafo = document.createElement("p");
    novoParagrafo.textContent = name.trim();

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "✕";

    botaoExcluir.addEventListener("click", async function (e) {
        const nameElement =
            e.target.previousElementSibling.textContent;

        const index = Lists[idList].names.findIndex(
            (item) => item === nameElement
        );

        if (index > -1) {
            Lists[idList].names.splice(index, 1);
        }

        novoLi.remove();

        UpdateStatusList(listElement);

        await SaveJSON();
    });

    novoLi.appendChild(novoParagrafo);
    novoLi.appendChild(botaoExcluir);

    listElement.appendChild(novoLi);

    UpdateStatusList(listElement);

    if (!render) {
        SaveJSON();
    }
}

function UpdateStatusList(listElement) {
    let idList = listElement.dataset.id;
    let stageElement = listElement.parentElement.querySelector(".stage");

    stageElement.textContent = `${Lists[idList].names.length}/${Lists[idList].lim}`;

    if (Lists[idList].names.length == Lists[idList].lim) {
        listElement.previousElementSibling.previousElementSibling.style.backgroundColor =
            "#b92c34";
    } else {
        listElement.previousElementSibling.previousElementSibling.style.backgroundColor =
            "#00875a";
    }
}

function UpdateJSON() {}

const popup = document.getElementById("popup");
const popupInput = document.getElementsByName("input")[0];

function TogglePopup() {
    popupInput.value = "";

    popup.style.display == "flex"
        ? (popup.style = "display: none;")
        : (popup.style = "display: flex;");

    popupInput.focus();
}

let currentIdList;

document.querySelectorAll(".addItem").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        currentIdList = e.target.nextElementSibling.dataset.id;
        if (Lists[currentIdList].lim != Lists[currentIdList].names.length) {
            TogglePopup();
        }
    });
});

document.getElementById("btnAddPopup").addEventListener("click", () => {
    CreateItem(currentIdList, popupInput.value);
    TogglePopup();
});
