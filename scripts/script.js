// Select the navbar
const navbar = document.querySelector('.nav');
let lastScrollTop = 0;
let hideTimeout; // To handle delayed hiding

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;


  if (scrollTop > lastScrollTop) {
    // Scrolling down: hide the navbar
    navbar.classList.add('hidden');
    clearTimeout(hideTimeout);
  } else if (scrollTop < lastScrollTop) {
    // Scrolling up: show the navbar
    navbar.classList.remove('hidden');
  }

  if (scrollTop === 0) {
    // At the top of the page: ensure the navbar is visible
    navbar.classList.remove('hidden');
  }

  // Update last scroll position
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all nav links
      navLinks.forEach(link => link.classList.remove('active'));
      // remove the color when not in view
      // if the theme is light remove the color when not in view
      if (document.body.classList.contains('light-theme')) {
        navLinks.forEach(link => link.style.color = 'black');
      } else {
        navLinks.forEach(link => link.style.color = 'white');
      }
      // Add active class to the current section's nav link
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        // make the active link pink when in view
        activeLink.style.color = 'rgba(4, 39, 156, 0.865);';

      }
    }
  });
}, {
  threshold: 0.5 // Adjust this value to determine when a section is considered "in view"
});

//Observe each section
sections.forEach(section => observer.observe(section));



// Function to toggle the theme and save it in localStorage
function toggleTheme() {
  // Toggle the 'light-theme' class on the body
  document.body.classList.toggle('light-theme');
  // Toggle the 'light-theme' class on other elements
  document.querySelector('.main-div').classList.toggle('light-theme');
  document.querySelectorAll('.nav,.navbar,section,.tech-stack-container, .nav-link, .btn-outline-primary, .intro h1, .intro h3, .about-section, .scroll-down, li a,ul a, .dropdown-menu, .dropdown-item,.links-section, .contact-section, .footer, .links-section h2, .contact-section h2, .footer h2, .links-container')
    .forEach(el => el.classList.toggle('light-theme'));

  // Save the current theme in localStorage
  const isLightTheme = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

// Event listener for the theme toggle button
document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);

// Check localStorage for theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    // Apply light theme on page load if saved in localStorage
    document.body.classList.add('light-theme');
    document.querySelector('.main-div').classList.add('light-theme');
    document.querySelectorAll('.nav, .nav-link, .btn-outline-primary, .intro h1, .intro h3, .about-section, .scroll-down, li a, .dropdown-menu')
      .forEach(el => el.classList.add('light-theme'));
  } else {
    // If no theme is saved or saved as 'dark', set it to dark theme by default
    document.body.classList.remove('light-theme');
    document.querySelector('.main-div').classList.remove('light-theme');
    document.querySelectorAll('.nav, .nav-link, .btn-outline-primary, .intro h1, .intro h3, .about-section, .scroll-down, li a, .dropdown-menu')
      .forEach(el => el.classList.remove('light-theme'));
  }
});
