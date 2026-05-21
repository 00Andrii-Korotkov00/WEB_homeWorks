let items = [
    { name: 'Помідори', amount: 1, isBought: false },
    { name: 'Печиво', amount: 1, isBought: false },
    { name: 'Сир', amount: 1, isBought: false }
];

const itemsList = document.getElementById('items-list');

function renderItems() {
    let html = ''; 

    items.forEach(function(item) {
        
        html += `
            <div class="item-row">
                <span class="item-name">${item.name}</span>

                <div class="item-controls">
                    <button class="btn-minus" data-tooltip="Зменшити">-</button>
                    <span class="item-amount">${item.amount}</span>
                    <button class="btn-plus" data-tooltip="Збільшити">+</button>
                </div>

                <div class="item-actions">
                    <button class="btn-bought" data-tooltip="Позначити як куплене">Куплено</button>
                    <button class="btn-delete" data-tooltip="Видалити товар">✖</button>
                </div>
            </div>
        `;
    });

    itemsList.innerHTML = html;
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

renderItems();