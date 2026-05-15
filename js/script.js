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

document.addEventListener("DOMContentLoaded", function () {
  if (typeof Swiper !== "undefined" && document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      direction: "horizontal",
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }
});

//function trocarImagem(src) {
  //document.getElementById("imagem-principal").src = src;
//}


// === Catálogo dinâmico de produtos Amazon ===
async function carregarProdutosAmazon() {
  const container = document.getElementById("lista-produtos-amazon");

  if (!container) {
    return;
  }

  function escaparHTML(valor) {
    return String(valor || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  try {
    const resposta = await fetch("data/produtos-amazon.json", {
      cache: "no-store",
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar o catálogo Amazon.");
    }

    const produtos = await resposta.json();

    if (!Array.isArray(produtos) || produtos.length === 0) {
      container.innerHTML = "<p>Nenhuma oferta Amazon cadastrada no momento.</p>";
      return;
    }

    container.innerHTML = produtos
      .map((produto) => {
        const categoria = escaparHTML(produto.categoria || "Oferta");
        const loja = escaparHTML(produto.loja || "Amazon");
        const nome = escaparHTML(produto.nome);
        const descricao = escaparHTML(produto.descricao);
        const link = escaparHTML(produto.link);
        const imagem = escaparHTML(produto.imagem || "");

        const imagemHTML = imagem
          ? `
            <a href="${link}" target="_blank" rel="noopener sponsored" class="imagem-amazon-link">
              <img src="${imagem}" alt="${nome}" class="imagem-produto-amazon" loading="lazy">
            </a>
          `
          : "";

        return `
          <article class="card-amazon">
            ${imagemHTML}
            <span class="selo-amazon">${loja} • ${categoria}</span>
            <h3>${nome}</h3>
            <p>${descricao}</p>
            <a
              href="${link}"
              target="_blank"
              rel="noopener sponsored"
              class="botao-amazon"
            >
              Ver oferta na Amazon
            </a>
          </article>
        `;
      })
      .join("");
  } catch (erro) {
    console.error("Erro ao carregar produtos Amazon:", erro);
    container.innerHTML = "<p>Não foi possível carregar as ofertas Amazon agora.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarProdutosAmazon);
