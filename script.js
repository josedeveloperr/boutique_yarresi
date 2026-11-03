// VIBE — catálogo de demonstração e encomendas pelo WhatsApp.
// IMPORTANTE: troca o número abaixo pelo número da loja, com indicativo do país,
// apenas números. Exemplo de Angola: 244923456789 (sem +, espaços ou traços).
const WHATSAPP_NUMBER = "244923456789";

const products = [
  {
    id: 1,
    name: "T-shirt Essential",
    category: "Roupa",
    price: 8500,
    tag: "Mais vendido",
    description: "Corte confortável para usar todos os dias.",
    image: "t-shirtcasual (1).jpg"
  },
  {
    id: 2,
    name: "Ténis Street",
    category: "Ténis",
    price: 28500,
    tag: "Novo",
    description: "Um clássico urbano para completar o look.",
    image: ""
  },
  {
    id: 3,
    name: "Casaco Urban",
    category: "Casacos",
    price: 32000,
    tag: "",
    description: "Uma camada extra com estilo descontraído.",
    image: "casacorural.jpg"
  },
  {
    id: 4,
    name: "Boné Classic",
    category: "Acessórios",
    price: 7500,
    tag: "",
    description: "O detalhe final para um visual simples.",
    image: "chapeu.jpg"
  },
  {
    id: 5,
    name: "Camisa Casual",
    category: "Roupa",
    price: 14500,
    tag: "",
    description: "Versátil, fácil de combinar e confortável.",
    image: "camisa.jpg"
  },
  {
    id: 6,
    name: "Ténis Everyday",
    category: "Ténis",
    price: 24000,
    tag: "Escolha da casa",
    description: "Conforto e simplicidade para o dia a dia.",
    image: ""
  },
  {
    id: 7,
    name: "Hoodie Essential",
    category: "Casacos",
    price: 22000,
    tag: "",
    description: "Um essencial para dias mais frescos.",
    image: "essencial.jpg"
  },
  {
    id: 8,
    name: "Óculos Urban",
    category: "Acessórios",
    price: 9500,
    tag: "",
    description: "Um acessório discreto com personalidade.",
    image: "cartier.jpg"
  }
];

const productGrid = document.querySelector("#productGrid");
const categoryFilter = document.querySelector("#categoryFilter");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

function formatPrice(price) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0
  }).format(price);
}

function makeWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts(category = "Todos") {
  const visibleProducts = category === "Todos"
    ? products
    : products.filter(product => product.category === category);

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <div class="product-title-row">
          <h3>${product.name}</h3>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <p class="product-description">${product.description}</p>
        <button class="order-button" type="button" data-product-id="${product.id}">
          Encomendar pelo WhatsApp <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  `).join("");
}

categoryFilter.addEventListener("change", event => {
  renderProducts(event.target.value);
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-product-id]");
  if (!button) return;

  const product = products.find(item => item.id === Number(button.dataset.productId));
  if (!product) return;

  const message = `Olá! Tenho interesse neste produto da loja:\n\nProduto: ${product.name}\nCategoria: ${product.category}\nPreço anunciado: ${formatPrice(product.price)}\n\nPodem confirmar a disponibilidade, tamanhos/cores e opções de entrega?`;
  window.open(makeWhatsAppLink(message), "_blank", "noopener,noreferrer");
});

// As categorias levam à secção de produtos e aplicam o filtro correspondente.
document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    const category = link.dataset.categoryLink;
    categoryFilter.value = category;
    renderProducts(category);
  });
});

// Liga os botões de contacto ao WhatsApp da loja.
const generalMessage = "Olá! Gostaria de saber mais sobre os produtos da loja.";
["footerWhatsApp", "footerContact", "floatingWhatsApp"].forEach(id => {
  const link = document.getElementById(id);
  if (link) link.href = makeWhatsAppLink(generalMessage);
});

// Menu móvel.
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
