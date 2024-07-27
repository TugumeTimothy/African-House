document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');

    // Fetch and display products
    fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(products => {
            if (products.length === 0) {
                productList.innerHTML = '<li>No products found</li>';
            } else {
                products.forEach(product => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <div>
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>$${product.price}</p>
                        </div>
                    `;
                    productList.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<li>Error fetching products</li>';
        });

    // Handle form submission
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('image', document.getElementById('image').files[0]);

        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                </div>
            `;
            productList.appendChild(li);
            productForm.reset();
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    });
});