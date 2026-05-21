let items = [
    { name: 'Помідори', amount: 1, isBought: false },
    { name: 'Печиво', amount: 1, isBought: false },
    { name: 'Сир', amount: 1, isBought: false }
];

const itemsList = document.getElementById('items-list');

function renderItems() {
    let html = ''; 

    items.forEach(function(item, index) {
        
        if (item.isBought === true) {
            html += `
                <div class="item-row">
                    <span class="item-name" style="text-decoration: line-through;">${item.name}</span>
                    <div class="item-actions">
                        <button class="btn-bought" onclick="toggleBought(${index})" data-tooltip="Скасувати покупку">Не куплено</button>
                    </div>
                </div>
            `;
        } else {
            const disableMinus = item.amount === 1 ? 'disabled' : '';

            let nameHTML = '';
            if (item.isEditing === true) {
                nameHTML = `<input type="text" id="edit-input-${index}" class="item-name-edit" value="${item.name}" 
                                   onblur="saveName(${index}, this.value)" 
                                   onkeypress="if(event.key === 'Enter') this.blur()">`;
            } else {
                nameHTML = `<span class="item-name" onclick="editName(${index})" data-tooltip="Редагувати назву">${item.name}</span>`;
            }

            html += `
                <div class="item-row">
                    ${nameHTML}

                    <div class="item-controls">
                        <button class="btn-minus" onclick="decreaseAmount(${index})" data-tooltip="Зменшити" ${disableMinus}>-</button>
                        <span class="item-amount">${item.amount}</span>
                        <button class="btn-plus" onclick="increaseAmount(${index})" data-tooltip="Збільшити">+</button>
                    </div>

                    <div class="item-actions">
                        <button class="btn-bought" onclick="toggleBought(${index})" data-tooltip="Позначити як куплене">Куплено</button>
                        <button class="btn-delete" onclick="deleteItem(${index})" data-tooltip="Видалити товар">✖</button>
                    </div>
                </div>
            `;
        }
    });

    itemsList.innerHTML = html;

    renderStats();
}

const productInput = document.getElementById('product-input');
const addBtn = document.getElementById('add-btn');

function addItem() {
    const newItemName = productInput.value.trim();

    if (newItemName !== '') {
        
        const newItem = {
            name: newItemName,
            amount: 1,
            isBought: false
        };

        items.push(newItem);

        renderItems();

        productInput.value = '';
    }

    productInput.focus();
}

addBtn.addEventListener('click', addItem);

productInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});


function increaseAmount(index) {
    items[index].amount += 1;
    renderItems();
}

function decreaseAmount(index) {
    if (items[index].amount > 1) {
        items[index].amount -= 1;
        renderItems();
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    renderItems(); 
}

function toggleBought(index) {
    items[index].isBought = !items[index].isBought;
    renderItems();
}

function editName(index) {
    items[index].isEditing = true;
    renderItems();
    
    const input = document.getElementById(`edit-input-${index}`);
    if (input) {
        input.focus();
    }
}

function saveName(index, newName) {
    if (newName.trim() !== '') {
        items[index].name = newName.trim();
    }
    items[index].isEditing = false;
    renderItems();
}

function renderStats() {
    const statsUnbought = document.getElementById('stats-unbought');
    const statsBought = document.getElementById('stats-bought');

    let unboughtHTML = '';
    let boughtHTML = '';

    items.forEach(function(item) {
        
        const statItemHTML = `<span class="stats-item">${item.name} <span class="stats-badge">${item.amount}</span></span>`;

        if (item.isBought === false) {
            unboughtHTML += statItemHTML;
        } else {
            boughtHTML += statItemHTML;
        }
    });

    statsUnbought.innerHTML = unboughtHTML;
    statsBought.innerHTML = boughtHTML;
}

renderItems();