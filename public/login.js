//alert("hey g")

document.addEventListener('DOMContentLoaded', () => {
    const  loginForm = document.getElementById('log-in-form');
    console.log("Test login")
    console.log("Test")
    loginForm.addEventListener('submit', async (event) => {
      //console.log("login form")
      event.preventDefault(); // Prevent the form from submitting the traditional way
  
      // Validate form inputs
      const username =  loginForm.elements['username'].value;
      const password =  loginForm.elements['password'].value;
      console.log(username)
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
        //console.log(response.json)
        //console.log(response)
        //const data =await response.json()

        // Log the response status
        console.log('Response Status:', response.status);

        // Parse the JSON response
        const data = await response.json();

        // Log the response data
        console.log('Response Data:', data);
        if(response.status===200){
          console.log("Successful Login")
          alert("Successful Login")
          window.location.href = './index.html'
        }
      }catch(error){
        console.error('Error logging In',error)
        alert('Login failed. Please try again.');
      }
      //return false;
      // Example: Send form data to the server using Fetch API
      
      
      

    });
});
