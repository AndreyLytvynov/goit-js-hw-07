import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

function CreateMarkupGallery(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</div>
    `;
    })
    .join("");
}

galleryEl.innerHTML = CreateMarkupGallery(galleryItems);

galleryEl.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.className === "gallery__image") {
    const modalGallery = basicLightbox.create(
      `
      <img src=${e.target.dataset.source} width="800" height="600">
      `,
      {
        onShow: () => {
          window.addEventListener("keydown", closeModal);
        },
        onClose: () => {
          removeEventListener("keydown", closeModal);
        },
      }
    );

    modalGallery.show();

    function closeModal(e) {
      if (e.code === "Escape") {
        modalGallery.close();
      }
    }
  }
});
