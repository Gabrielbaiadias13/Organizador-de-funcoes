let Lists = [
    { lim: 3, names: ["Gabriel"] },
    { lim: 3, names: [] },
    { lim: 3, names: [] },
    { lim: 3, names: ["Gabriel", "maria"] },
    { lim: 2, names: [] },
    { lim: 3, names: [] },
    { lim: 3, names: [] },
    { lim: 1, names: [] },
    { lim: 1, names: [] },
    { lim: 1, names: [] },
    { lim: 1, names: [] },
    { lim: 1, names: ["Cleber"] },
    { lim: 1, names: ["Joao"] },
    { lim: 1, names: [] },
    { lim: 1, names: [] },
    { lim: 1, names: [] },
    { lim: 1, names: [] },
];

let limitList;
function RenderList() {
    let index = 0;
    Lists.forEach((list) => {
        const listElement = document.querySelector(`[data-id="${index}"]`);
        let stageElement = listElement.parentElement.querySelector(".stage");

        stageElement.textContent = `${Lists[index].names.length}/${Lists[index].lim}`;

        if (listElement) {
            listElement.innerHTML = "";
            list.names.forEach((name) => {
                CreateItem(index, name, true);
            });
        }
        index++;
    });
}

RenderList();

function CreateItem(idList, name, render = false) {
    const listElement = document.querySelector(`[data-id="${idList}"]`);
    if (name.trim() !== "") {
        if (!render) {
            if (Lists[idList].lim != Lists[idList].names.length) {
                Lists[idList].names.push(name);
            }
        }
        const novoLi = document.createElement("li");

        const novoParagrafo = document.createElement("p");
        novoParagrafo.textContent = name.trim();

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "✕";
        botaoExcluir.addEventListener("click", function (e) {
            let nameElement = e.target.previousElementSibling.textContent;
            let index = Lists[idList].names.findIndex(
                (item) => item === nameElement,
            );
            if (index > -1) {
                Lists[idList].names.splice(index, 1);
            }
            novoLi.remove();
            UpdateStatusList(listElement);
        });

        novoLi.appendChild(novoParagrafo);
        novoLi.appendChild(botaoExcluir);
        listElement.appendChild(novoLi);
        UpdateStatusList(listElement);
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
