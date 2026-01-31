document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    const slides = document.querySelectorAll('.slide');

    // Set background images (for the spread/blur effect)
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img && img.src) {
            slide.style.backgroundImage = `url('${img.src}')`;
        }
    });

    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Update index
        currentSlide = (index + slides.length) % slides.length;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Auto advance
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Manual navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoSlide); // Stop auto when user interacts
            showSlide(index);
            autoSlide = setInterval(nextSlide, slideInterval); // Restart
        });
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);

            // Simple toggle for display - in a real app, use a class
            if (!isExpanded) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            } else {
                navLinks.style.display = ''; // Revert to stylesheet
                // Remove inline styles to let media query take over
                navLinks.removeAttribute('style');
            }
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    mobileBtn.click();
                }
            }
        });
    });
});
