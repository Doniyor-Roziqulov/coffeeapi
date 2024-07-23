const API_URL = "https://dummyjson.com";
const content = document.querySelector(".content");

async function fetchSingleData(api) {
    let query = new URLSearchParams(window.location.search);
    let id = query.get("id");
    let response = await fetch(`${api}/products/${id}`);
    response
        .json()
        .then((res) => createContent(res))
        .catch((err) => console.log(err));
}

fetchSingleData(API_URL);

function createContent(data) {
    content.innerHTML = `
    <div>
     <div>
        <img width="300" src=${data.images[0]} alt="images">
     </div>
     ${data.images.map((item) => ` <img width="60" src=${item} alt="images">`)}
    </div>
 <div>
 <h1>${data.title}</h1>
 <p>${data.description}</p>
 <button>Buy Now</button>
 </div>
  `;
}
