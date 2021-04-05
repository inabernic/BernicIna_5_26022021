detailProduit()

async function detailProduit() {
    let idProduit = getURLParameter('id');
    const produitHtml = document.querySelector('#produit');
    const templateElem = document.getElementById('template_info');

    try {
        let produit = await fetch(`http://localhost:3000/api/cameras/${idProduit}`)
            .then(response => response.json())
        const clone = document.importNode(templateElem.content, true);
        clone.getElementById("idProduit").textContent = produit._id;
        clone.getElementById("imgProduit").src = produit.imageUrl;
        clone.getElementById("nameProduit").textContent = produit.name;
        clone.getElementById("descriptionProduit").textContent = produit.description;
        clone.getElementById("priceProduit").textContent =  produit.price/100;

        let select =   clone.getElementById("lenses");
        for(let lense of produit.lenses){
            select[select.options.length] = new Option(lense, select.options.length);
        }

        produitHtml.appendChild(clone);

    } catch (error) {
        console.error(error.message);
    }
}

function getURLParameter(sParam) {
    let params = new URLSearchParams(document.location.search.substring(1));
    return params.get(sParam);
}

const buttonElement = document.querySelector('.add-to-cart');
buttonElement.addEventListener('click', () => {
    let myProduct = {
        _id: document.querySelector('#idProduit').innerText,
        name: document.querySelector('#nameProduit').innerText,
        price: document.querySelector('#priceProduit').innerText,
        imageUrl: document.querySelector('#imgProduit').getAttribute('src'),
        quantite: document.querySelector('#qt').value,
    }
    addProductToBasket(myProduct);
})

function addProductToBasket(product) {
    let products = [];
    if (localStorage.productsKey != null) {
        products = JSON.parse(localStorage.productsKey);
    }
    //si le produit avec le meme id existe dans le panier, alors on augmente la quantité
    let filteredProducts = products.filter(elem => elem.id === product._id);
    if (filteredProducts.length > 0) {
        let q = document.querySelector('#qt').value;
        let qfinal = parseInt(filteredProducts[0].quantite) + parseInt(q);
        filteredProducts[0].quantite = qfinal;
    } else {
        //sinon on ajoute un nouveau produit dans le panier
        products.push(product);
    }
    localStorage.setItem('productsKey', JSON.stringify(products));
    alert (`Article ${product.name} bien ajouté au panier`);
};

