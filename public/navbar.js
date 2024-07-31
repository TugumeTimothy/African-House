const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.getElementById('navbar-nav');
    navbarToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
    });