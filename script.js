document.addEventListener("DOMContentLoaded", function () {

  const landingBtn = document.querySelector(
    '.filter-btn[data-filter="landing"]',
  );
  if (landingBtn) {
    landingBtn.click();
  }

  document.querySelectorAll(".hero-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.dataset.category;
      const filterMap = {
        web: "web",
        landing: "landing",
        mobile: "mobile",
      };

      const projectsSection = document.getElementById("projets");
      projectsSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const filterBtn = document.querySelector(
          `.filter-btn[data-filter="${filterMap[category]}"]`,
        );
        if (filterBtn) {
          filterBtn.click();
        }
      }, 500);
    });
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter;

      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filtrer les projets
      document.querySelectorAll(".section-projects").forEach((project) => {
        if (filter === "all") {
          project.style.display = "block";
        } else {
          if (project.dataset.projectType === filter) {
            project.style.display = "block";
          } else {
            project.style.display = "none";
          }
        }
      });
    });
  });

  // ============================================
  // LIGHTBOX / MODAL POUR IMAGES ET VIDÉOS
  // ============================================

  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-image");
  const modalVideo = document.getElementById("lightbox-video");
  const closeBtn = document.querySelector(".lightbox-close");
  const caption = document.querySelector(".lightbox-caption");

  // Fonction pour ouvrir la lightbox
  function openLightbox(element, type) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Empêcher le scroll

    if (type === "image") {
      const imgSrc = element.querySelector("img").src;
      const imgAlt = element.querySelector("img").alt;

      modalImg.src = imgSrc;
      modalImg.style.display = "block";
      modalVideo.style.display = "none";
      caption.textContent = imgAlt;
    } else if (type === "video") {
      const videoSrc = element.querySelector("video source").src;

      modalVideo.querySelector("source").src = videoSrc;
      modalVideo.load();
      modalVideo.style.display = "block";
      modalImg.style.display = "none";
      caption.textContent = "Vidéo du projet";
    }
  }

  // Fonction pour fermer la lightbox
  function closeLightbox() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Réactiver le scroll

    // Arrêter la vidéo si elle joue
    if (modalVideo.style.display === "block") {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }

    // Réinitialiser les sources
    modalImg.src = "";
    modalVideo.querySelector("source").src = "";
  }

  // Ajouter les événements de clic sur tous les médias cliquables
  document.querySelectorAll(".clickable-media").forEach((media) => {
    media.addEventListener("click", function () {
      const mediaType = this.dataset.mediaType;
      openLightbox(this, mediaType);
    });
  });

  // Fermer la lightbox en cliquant sur la croix
  closeBtn.addEventListener("click", closeLightbox);

  // Fermer la lightbox en cliquant à l'extérieur du contenu
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Fermer la lightbox avec la touche Échap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeLightbox();
    }
  });
});
