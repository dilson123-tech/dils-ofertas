document.addEventListener("DOMContentLoaded", function () {
  console.log("Dils Ofertas está no ar!");
});

function ampliarImagem(img) {
  const modal = document.createElement("img");
  modal.src = img.src;
  modal.classList.add("modal-img");
  modal.onclick = () => modal.remove();
  document.body.appendChild(modal);
}

const swiper = new Swiper(".mySwiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

//function trocarImagem(src) {
  //document.getElementById("imagem-principal").src = src;
//}
