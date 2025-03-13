// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Toggle project descriptions
    const toggleButtons = document.querySelectorAll('.toggle-desc');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const description = document.getElementById(targetId);
        
        if (description.style.display === 'none' || description.style.display === '') {
          description.style.display = 'block';
          this.textContent = 'Hide';
        } else {
          description.style.display = 'none';
          this.textContent = 'About';
        }
      });
    });
    
    // Initialize project descriptions (hide them by default)
    const projectDescriptions = document.querySelectorAll('.project-description');
    projectDescriptions.forEach(desc => {
      desc.style.display = 'none';
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
              navbarToggler.click();
            }
            
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Please fill all required fields');
          return;
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
    
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap carousels
    var achievementsCarousel = document.getElementById('achievementsCarousel');
    if (achievementsCarousel) {
      var carousel = new bootstrap.Carousel(achievementsCarousel, {
        interval: 5000,
        wrap: true
      });
    }
    
    var badgesCarousel = document.getElementById('badgesCarousel');
    if (badgesCarousel) {
      var carousel = new bootstrap.Carousel(badgesCarousel, {
        interval: 5000,
        wrap: true
      });
    }
    
    // Add animation effects to elements when they come into view
    function animateOnScroll() {
      const elements = document.querySelectorAll('.education-card, .skill-item, .experience-card, .project-card, .achievement-card, .badge-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    }
    
    // Call animation function
    animateOnScroll();
  });