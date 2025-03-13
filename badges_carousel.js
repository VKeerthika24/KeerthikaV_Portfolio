document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements using more specific selectors
    const carousel = document.querySelector('.badges-section .badges-carousel');
    const badgeBoxes = document.querySelectorAll('.badges-section .badge-box');
    const prevButton = document.querySelector('.badges-section .carousel-button.prev');
    const nextButton = document.querySelector('.badges-section .carousel-button.next');
    const indicatorsContainer = document.getElementById('badge-indicators');
    
    // Debug to verify elements are found
    console.log('Carousel found:', carousel);
    console.log('Prev button found:', prevButton);
    console.log('Next button found:', nextButton);
    console.log('Badge boxes found:', badgeBoxes.length);
    
    // Define variables
    let currentIndex = 0;
    let itemsPerView = 3; // Default for desktop
    let totalSlides = Math.ceil(badgeBoxes.length / itemsPerView);
    
    // Create indicators based on number of slides
    function createIndicators() {
      indicatorsContainer.innerHTML = '';
      totalSlides = Math.ceil(badgeBoxes.length / itemsPerView);
      
      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === currentIndex) {
          indicator.classList.add('active');
        }
        
        indicator.addEventListener('click', () => {
          goToSlide(i);
        });
        
        indicatorsContainer.appendChild(indicator);
      }
    }
    
    // Update which indicators are active
    function updateIndicators() {
      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Calculate item width based on container and items per view
    function getItemWidth() {
      return carousel.clientWidth / itemsPerView;
    }
    
    // Position all items with proper widths
    function positionItems() {
      const itemWidth = getItemWidth();
      badgeBoxes.forEach(box => {
        box.style.width = `${itemWidth}px`;
        box.style.flex = `0 0 ${itemWidth}px`;
      });
    }
    
    // Go to a specific slide
    function goToSlide(index) {
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }
      
      currentIndex = index;
      
      // Calculate the scroll amount
      const scrollAmount = index * (carousel.clientWidth);
      
      // Apply the scroll - using both methods for compatibility
      try {
        carousel.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      } catch (e) {
        // Fallback for browsers that don't support smooth scrolling
        carousel.scrollLeft = scrollAmount;
      }
      
      updateIndicators();
      console.log(`Moved to slide ${index}, scroll amount: ${scrollAmount}px`);
    }
    
    // Next slide function
    function nextSlide() {
      console.log('Next button clicked');
      goToSlide(currentIndex + 1);
    }
    
    // Previous slide function
    function prevSlide() {
      console.log('Previous button clicked');
      goToSlide(currentIndex - 1);
    }
    
    // Check viewport and adjust items per view
    function checkViewport() {
      const oldItemsPerView = itemsPerView;
      
      if (window.innerWidth <= 767) {
        itemsPerView = 1;
      } else if (window.innerWidth <= 1023) {
        itemsPerView = 2;
      } else {
        itemsPerView = 3;
      }
      
      if (oldItemsPerView !== itemsPerView) {
        positionItems();
        createIndicators();
        goToSlide(0);
      }
    }
    
    // Auto scroll functionality
    let autoScrollInterval;
    
    function startAutoScroll() {
      stopAutoScroll(); // Clear any existing interval first
      autoScrollInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
    
    // Initialize
    function init() {
      // Position items correctly first
      positionItems();
      
      // Create indicators
      createIndicators();
      
      // Add direct onclick handlers to buttons
      if (prevButton) {
        prevButton.onclick = function(e) {
          e.preventDefault();
          prevSlide();
          return false;
        };
      }
      
      if (nextButton) {
        nextButton.onclick = function(e) {
          e.preventDefault();
          nextSlide();
          return false;
        };
      }
      
      // Expose functions globally for direct HTML onclick access
      window.carouselNext = nextSlide;
      window.carouselPrev = prevSlide;
      
      // Add event listeners
      window.addEventListener('resize', checkViewport);
      
      // Add keyboard navigation
      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });
      
      // Add mouse hover handlers
      carousel.addEventListener('mouseenter', stopAutoScroll);
      carousel.addEventListener('mouseleave', startAutoScroll);
      
      // Start auto-scrolling
      startAutoScroll();
    }
    
    // Initialize the carousel
    init();
  });