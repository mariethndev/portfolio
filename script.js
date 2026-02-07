// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {

  const landingBtn = document.querySelector(
    '.filter-btn[data-filter="landing"]',
  );
  if (landingBtn) {
    landingBtn.click();
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter;

      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      document.querySelectorAll(".section-projects").forEach((project) => {
        if (filter === "all") {
          project.style.display = "flex";
        } else {
          if (project.dataset.projectType === filter) {
            project.style.display = "flex";
          } else {
            project.style.display = "none";
          }
        }
      });
    });
  });


  const lightbox = document.createElement("div");
  lightbox.id = "project-lightbox";
  lightbox.className = "project-lightbox";
  lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");


  function openLightbox(projectElement) {
    const img = projectElement.querySelector(".project-media img");
    const title = projectElement.querySelector("h3");

    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = title ? title.textContent : "";

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; 
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; 

    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  }

  document.querySelectorAll(".section-projects").forEach((project) => {
    project.addEventListener("click", function (e) {
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }
      openLightbox(this);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.className === "lightbox-content") {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Ajouter cette fonction après le code existant dans script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ... (garder le code existant des filtres) ...

    // ============================================
    // CARROUSEL POUR PROJET AVEC PLUSIEURS IMAGES
    // ============================================
    
    let currentCarouselIndex = 0;
    let carouselImages = [];
    
    // Créer la lightbox carrousel
    const carouselLightbox = document.createElement('div');
    carouselLightbox.className = 'carousel-lightbox';
    carouselLightbox.innerHTML = `
        <span class="carousel-close">&times;</span>
        <div class="carousel-counter"></div>
        <div class="carousel-container">
            <div class="carousel-image-wrapper">
                <button class="carousel-prev">‹</button>
                <img class="carousel-image" src="" alt="">
                <button class="carousel-next">›</button>
            </div>
            <div class="carousel-caption"></div>
            <div class="carousel-indicators"></div>
        </div>
    `;
    document.body.appendChild(carouselLightbox);
    
    const carouselImg = carouselLightbox.querySelector('.carousel-image');
    const carouselCaption = carouselLightbox.querySelector('.carousel-caption');
    const carouselCounter = carouselLightbox.querySelector('.carousel-counter');
    const carouselIndicators = carouselLightbox.querySelector('.carousel-indicators');
    const carouselCloseBtn = carouselLightbox.querySelector('.carousel-close');
    const prevBtn = carouselLightbox.querySelector('.carousel-prev');
    const nextBtn = carouselLightbox.querySelector('.carousel-next');
    
    // Fonction pour ouvrir le carrousel
    function openCarousel(projectId) {
        const imagesContainer = document.getElementById(`${projectId}-images`);
        if (!imagesContainer) return;
        
        carouselImages = Array.from(imagesContainer.querySelectorAll('img'));
        if (carouselImages.length === 0) return;
        
        currentCarouselIndex = 0;
        showCarouselImage(0);
        createIndicators();
        carouselLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fonction pour afficher une image
    function showCarouselImage(index) {
        if (index < 0) index = carouselImages.length - 1;
        if (index >= carouselImages.length) index = 0;
        
        currentCarouselIndex = index;
        const img = carouselImages[index];
        
        carouselImg.src = img.src;
        carouselImg.alt = img.alt;
        carouselCaption.textContent = img.alt;
        carouselCounter.textContent = `${index + 1} / ${carouselImages.length}`;
        
        updateIndicators();
    }
    
    // Créer les indicateurs
    function createIndicators() {
        carouselIndicators.innerHTML = '';
        carouselImages.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showCarouselImage(index));
            carouselIndicators.appendChild(dot);
        });
    }
    
    // Mettre à jour les indicateurs
    function updateIndicators() {
        const dots = carouselIndicators.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentCarouselIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Fonction pour fermer le carrousel
    function closeCarousel() {
        carouselLightbox.classList.remove('active');
        document.body.style.overflow = '';
        carouselImages = [];
    }
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showCarouselImage(currentCarouselIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showCarouselImage(currentCarouselIndex + 1);
    });
    
    // Fermer
    carouselCloseBtn.addEventListener('click', closeCarousel);
    
    // Navigation clavier
    document.addEventListener('keydown', function(e) {
        if (!carouselLightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') showCarouselImage(currentCarouselIndex - 1);
        if (e.key === 'ArrowRight') showCarouselImage(currentCarouselIndex + 1);
        if (e.key === 'Escape') closeCarousel();
    });
    
    // Fermer en cliquant en dehors
    carouselLightbox.addEventListener('click', function(e) {
        if (e.target === carouselLightbox) {
            closeCarousel();
        }
    });
    
    // ============================================
    // GESTION DES CLICS SUR PROJETS
    // ============================================
    
    document.querySelectorAll('.section-projects').forEach(project => {
        project.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const carouselId = this.dataset.carousel;
            
            // Si le projet a un carrousel
            if (carouselId) {
                openCarousel(carouselId);
            } else {
                // Sinon, utiliser la lightbox simple (code existant)
                const img = this.querySelector('.project-media img');
                const title = this.querySelector('h3');
                
                if (img) {
                    // ... (garder le code de la lightbox simple existante)
                }
            }
        });
    });
    
    // ... (garder le reste du code existant) ...
});