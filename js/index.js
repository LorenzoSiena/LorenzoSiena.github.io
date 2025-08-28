document.addEventListener('DOMContentLoaded', () => {
    // ---------------- LIGHTBOX ----------------
    const images = document.querySelectorAll('.portfolio-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');


    if (images && lightbox && lightboxImage && closeBtn) {
        // --- Preload immagini ---
        images.forEach((image) => {
            const preloader = new Image();
            preloader.src = image.currentSrc || image.src; // forziamo il browser a caricare
        })
        images.forEach((image) => {
            image.addEventListener('click', (event) => {
                lightbox.style.display = 'flex';
                lightboxImage.src = event.target.currentSrc;
            });
        
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });


        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox || event.target === lightboxImage) {
                lightbox.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (lightbox.style.display === 'flex' && event.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        });
    }


    // ---------------- SCROLL TO TOP ----------------
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 1500;

    const portfolioBlocks = document.querySelectorAll('.portfolio-block');
    let lastOpenedBlock = null;

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Chiudi tutte le card tranne la prima
            portfolioBlocks.forEach(block => {
                const content = block.querySelector('.project-details-content');
                content.style.maxHeight = null;
                content.classList.remove('active');
            });

            lastOpenedBlock = null;
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                scrollToTopBtn.classList.add('show-btn');
            } else {
                scrollToTopBtn.classList.remove('show-btn');
            }
        });
    }

    // ---------------- MOBILE CARD EXPANSION FIX ----------------
    portfolioBlocks.forEach(block => {
        const content = block.querySelector('.project-details-content');

        block.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }

            const isActive = content.classList.contains('active');
            const currentScroll = window.scrollY;

            if (isActive) {
                if (block === lastOpenedBlock) return; // non chiudere l'ultima aperta

                content.style.maxHeight = null;
                content.classList.remove('active');

            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('active');

                lastOpenedBlock = block;
            }

            window.scrollTo({ top: currentScroll });
        });
    });

    // Fix per iOS doppio click
    document.body.style.cursor = 'default';
});
