document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('nav a');

    // Función para mostrar la sección correspondiente
    function showSection(id) {
        sections.forEach(section => {
            section.classList.toggle('hidden', section.id !== id);
        });
    }

    // Manejar el clic en los enlaces del menú
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showSection(link.getAttribute('href').substring(1));
        });
    });

    const inventoryTable = document.getElementById('inventoryTable');
    const orderStatusTableBody = document.getElementById('orderStatusTableBody');
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productQuantityInput = document.getElementById('productQuantity');
    const productPriceInput = document.querySelector('.price-input');
    const productProviderInput = document.getElementById('supplierName');
    const productImageInput = document.getElementById('productImage');
    const addProductButton = document.getElementById('addNewProduct');

    // Datos de ejemplo para el inventario
    const inventory = [
        {
            name: 'Tomates',
            image: 'tomate.jpeg',
            quantity: 50,
            price: 25,
            provider: 'Proveedor A'
        },
        {
            name: 'Cebollas',
            image: 'cebolla.webp',
            quantity: 14,
            price: 18,
            provider: 'Proveedor A'
        },
        {
            name: 'Jitomates',
            image: 'jitomate.webp',
            quantity: 20,
            price: 25,
            provider: 'Proveedor A'
        },
        {
            name: 'Limón',
            image: 'limon.png',
            quantity: 20,
            price: 22,
            provider: 'Proveedor A'
        },
        {
            name: 'Aguacate',
            image: 'aguacate.jpeg',
            quantity: 12,
            price: 30,
            provider: 'Proveedor A'
        },
        {
            name: 'Azucar',
            image: 'azucar.jpg',
            quantity: 10,
            price: 30,
            provider: 'Proveedor D'
        },
        { 
            name: 'Carne de Puerco',
            image: 'carne de puerco.jpeg',
            quantity: 8,
            price: 180,
            provider: 'Proveedor C',
        },
        { 
            name: 'Carne de Res',
            image: 'carne de res.jpg',
            quantity: 5,
            price: 120,
            provider: 'Proveedor C',
        },
    ];

    // Datos de ejemplo para el estatus del pedido
    const orders = [
        { 
            image: 'tomate.jpeg',
            name: 'Tomates',
            quantity: 10,
            price: 25,
            supplier: 'Proveedor A',
            status: 'Listo para Enviar',
            total: 250
        },
        { 
            image: 'cebolla.webp',
            name: 'Cebollas',
            quantity: 5,
            price: 18,
            supplier: 'Proveedor A',
            status: 'En Proceso',
            total: 90
        },
        { 
            image: 'carne de puerco.jpeg',
            name: 'Carne de Puerco',
            quantity: 8,
            price: 180,
            supplier: 'Proveedor C',
            status: 'En entrega',
            total: 1400
        },
        { 
            image: 'carne de res.jpg',
            name: 'Carne de Res',
            quantity: 5,
            price: 123,
            supplier: 'Proveedor C',
            status: 'En entrega',
            total: 615
        },
        { 
            image: 'leche.webp',
            name: 'Leche',
            quantity: 5,
            price: 20,
            supplier: 'Proveedor B',
            status: 'En entrega',
            total: 100
        },
    ];

    // Función para renderizar el inventario
    function renderInventory() {
        inventoryTable.innerHTML = '';
        inventory.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="product-image"></td>
                <td>${item.name}</td>
                <td>${item.quantity} kg/lts</td>
                <td>${item.price} MXN</td>
                <td>${item.provider}</td>
                <td><button class="delete-btn" data-index="${index}">Eliminar</button></td>
            `;
            inventoryTable.appendChild(row);
        });

        // Agregar eventos a los botones de eliminación
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeProduct(index);
            });
        });
    }

    // Función para agregar un producto al inventario
    function addProduct(event) {
        event.preventDefault();
        const name = productNameInput.value.trim();
        const quantity = parseInt(productQuantityInput.value);
        const price = parseFloat(productPriceInput.value);
        const provider = productProviderInput.value.trim();
        const image = productImageInput.value.trim();

        if (name && quantity > 0 && price > 0 && provider && image) {
            inventory.push({ name, image, quantity, price, provider });
            productNameInput.value = '';
            productQuantityInput.value = '';
            productPriceInput.value = '';
            productProviderInput.value = '';
            productImageInput.value = '';
            renderInventory();
        } else {
            alert('Por favor ingresa todos los campos con valores válidos.');
        }
    }

    // Función para eliminar un producto del inventario
    function removeProduct(index) {
        inventory.splice(index, 1);
        renderInventory();
    }

    // Función para renderizar el estatus del pedido
    function renderOrderStatus() {
        orderStatusTableBody.innerHTML = '';
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${order.image}" alt="${order.name}" class="product-image"></td>
                <td>${order.name}</td>
                <td>${order.quantity} KG</td>
                <td>${order.price} MXN</td>
                <td>${order.supplier}</td>
                <td>${order.status}</td>
                <td>${order.total} MXN</td>
            `;
            orderStatusTableBody.appendChild(row);
        });
    }

    // Evento de click del botón para agregar producto
    addProductButton.addEventListener('click', addProduct);

    // Renderizar inventario y estatus del pedido inicial
    renderInventory();
    renderOrderStatus();

    // Mostrar la sección de inventario por defecto
    showSection('inventory');
});
