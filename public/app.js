console.log('JavaScript code is running');


document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.getElementById('navbar-nav');
    const signupForm = document.querySelector('#sign-up-form');
    console.log('Signup form element:', signupForm);
    navbarToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
    });    
    //const signupForm = document.getElementById('sign-up-form');
    console.log('about to log')
    /*
  if(typeof Handlebars==="undefined"){
    const signUpTemplate = Handlebars.compile(document.getElementById('sign-up-template').innerHTML);
    const signUpHtml = signUpTemplate();
    document.getElementById('sign-up-container').innerHTML = signUpHtml;
  }else{
    console.error('Handlebars is not defined')
  }
  */

  console.log('Signup form element:', signupForm);
//});
//document.addEventListener('DOMContentLoaded', function() {

//console.log('Signup form element at the mid:', signupForm);
    if(signupForm){
      signupForm.addEventListener('submit', async (e) => {
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
          window.location.href = '/home'
        }
        const user = await response.json()
        console.log('User created:', user)
        alert('Sign up successful!')
        } catch (error) {
          console.error('Error creating user:', error)
          alert('Sign up failed. Please try again.');
        }
      });
      //console.log('signup')
    }
    
//document.addEventListener('DOMContentLoaded', () => {
    
});





 



