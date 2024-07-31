document.addEventListener('DOMContentLoaded', function() {
const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    if(productForm){
      console.log('product form is active')
       // Handle form submission
      productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('image', document.getElementById('image').files[0]);

        fetch('api/products', {
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
            alert('Product uploaded successfully')
            productList.appendChild(li);
            productForm.reset();
        })
        .catch(error => {
          alert('Product upload Failed')
            console.error('Error adding product:', error);
        });
    });
    }
    // Fetch and display products
    // Fetch and display products
    fetch('/api/products')
    .then(response => response.json())
    .then(products => {
    console.log(products)
    if (products.length === 0) {
        const noProductsHtml = '<li>No products found</li>';
        document.getElementById('product-list').innerHTML = noProductsHtml;
    } else {
        const productListHtml = products.map(product => {
        return `
        <li>
          <img src="${product.imageUrl}" alt="${product.name}">
          <div>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <p>hahahaaa</p>
          </div>
        </li>
      `;
    }).join('');
    document.getElementById('product-list').innerHTML = productListHtml;
    }
    })
  .catch(error => {
  alert('Error fetching the products')
  console.error('Error fetching products:', error);
  document.getElementById('product-list').innerHTML = '<li>Error fetching products</li>';
   });
        
    
});