console.log('JavaScript code is running');
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.getElementById('navbar-nav');

    navbarToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');

    // Fetch and display products
    fetch('api/products')
        .then(response => response.json())
        .then(products => {
            console.log(products)
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
            alert('Error fetching the products')
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
});

  const form = document.getElementById('sign-up-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passRegex="^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$"
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match,please input the same password');
        return;
    }
   if (!password.match(passRegex)) {
    alert('Password must contain at least 6 characters, including a number and a letter');
    return;
   }
   try {
    const response = await fetch('api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
    if (response.status === 201) {
      window.location.href = './index.html'
    }
    const user = await response.json()
    console.log('User created:', user)
    alert('Sign up successful!')
  } catch (error) {
    console.error('Error creating user:', error)
    alert('Sign up failed. Please try again.');
  }
});



 

/*
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username =  loginForm.elements['username'].value;
    const password =  loginForm.elements['password'].value;
    console.log(username)
    console.log(password)
    if (!username || !password) {
      alert('Please fill out all fields.');
      return;
      }
      // Process form data
      const formData = new FormData(loginForm);
      // Example: Log the form data
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
        }
        // Convert FormData to a plain object
        const formObject = Object.fromEntries(formData);
        try{
          const response = await fetch('api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject),
            })
            console.log(response)
            if(response.status===200){
              console.log("Successful Login")
              alert("Successful Login")
              window.location.href = './index.html'
              }
              }catch(error){
                console.error('Error logging In',error)
                alert('Login failed. Please try again.');
                }
                // Example: Send form data to the server using Fetch API
                // Example: Log the form data
                // Convert FormData to a plain object
              }
            }
})
*/
/*
const loginForm = document.getElementById('log-in-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  try {
    //console.log({ username, password })
    const response = await fetch('api/users/login', {
      method: "POST",
      body:formData
    });
    const user = await response.json();
    console.log('User logged in:', user);
    alert('Login successful!');
    window.location.href = './index.html'; 
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed. Please try again.');
  }
});
*/

