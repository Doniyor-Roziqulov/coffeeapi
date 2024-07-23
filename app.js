const skeleton = document.querySelector(".skeleton");
const wrapper = document.querySelector(".wrapper");
const seeMoreBtn = document.querySelector(".seemore__btn");
const collection = document.querySelector(".collection");
const API_URL = "https://dummyjson.com";

for (let i = 0; i < 6; i++) {
    let skeletonItem = document.createElement("div");
    skeletonItem.classList.add("skeleton__item");
    skeletonItem.innerHTML = `
  <div class="skeleton__image skeleton__anime"></div>
                            <div class="skeleton__line skeleton__anime"></div>
                            <div class="skeleton__line skeleton__anime"></div>
                            <div class="skeleton__line skeleton__anime"></div>
  `;
    skeleton.append(skeletonItem);
}
let perPageCount = 6;
let offset = 1;
let categoryValuee = "";

async function fetchData(api, limit, category) {
    let reponse = await fetch(`${api}/products${category}?limit=${limit}`);
    reponse
        .json()
        .then((res) => createCard(res))
        .catch((err) => console.log(err))
        .finally(() => {
            skeleton.style.display = "none";
        });
}

fetchData(API_URL, perPageCount, categoryValuee);

function createCard(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove();
    }
    data.products.forEach((product) => {
        let cardItem = document.createElement("li");
        cardItem.classList.add("card");
        cardItem.dataset.id = product.id;
        cardItem.innerHTML = `
        <div>
        <img class="card__img" src=${product.images[0]} alt="${product.title}">
        </div>
        <h3>${product.title}</h3>
        <p class="desc" title="${product.description}">${product.description}</p>
        <p class="price">${product.price}$</p>
        <button>Buy now</button>
        `;
        wrapper.appendChild(cardItem);
    });
}

seeMoreBtn.addEventListener("click", () => {
    offset++;
    fetchData(API_URL, perPageCount * offset, categoryValuee);
});

async function fetchCategory(api) {
    let response = await fetch(`${api}/products/category-list`);
    response.json().then((res) => createCategory(res));
}

fetchCategory(API_URL);

function createCategory(data) {
    data.forEach((category) => {
        let list = document.createElement("li");
        list.className = "col-item";
        list.innerHTML = `
        <data value="/category/${category}">${category}</data>
        `;
        collection.appendChild(list);
    });
}

collection.addEventListener("click", (e) => {
    if (e.target.tagName === "DATA") {
        categoryValuee = e.target.value;
        fetchData(API_URL, perPageCount, categoryValuee);
    }
});

wrapper.addEventListener("click", (e) => {
    if (e.target.className.includes("card__img")) {
        window.open(
            `/pages/product.html?id=${e.target.closest(".card").dataset.id}`,
            "_self"
        );
    }
});
