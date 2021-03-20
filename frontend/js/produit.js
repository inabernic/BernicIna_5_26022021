 export const detailProduit = async () => {
    let idProduit = getURLParameter('id');
    const produitHtml = document.querySelector('#produit')

    try {
        let produit = await fetch('http://localhost:3000/api/cameras/' + idProduit)
            .then(response => response.json())
        produitHtml.insertAdjacentHTML('beforeend', `
                                                                <div>
                                                                <div id="idProduit"  style="display:none;">${produit._id}</div>
                                                                    <img src="${produit.imageUrl}" class="card-img-top rounded mx-auto d-block" id="imgProduit"></img>
                                                                    <h2 id="nameProduit">${produit.name}</h2>
                                                                    <p id="descriptionProduit">${produit.description}</p>
                                                                    <div id="lensesProduit">${produit.lenses}</div>
                                                                    <h3 id="priceProduit">${produit.price}</h3>
                                                                </div>
                                                `)
    } catch (error) {
        console.error(error.message)
    } 
}

function getURLParameter(sParam) {
    let params = new URLSearchParams(document.location.search.substring(1));
    return params.get(sParam);
}


const  buttonElement = document.querySelector('.add-to-cart')
buttonElement.addEventListener('click', () => {
    let myProduct = {
        id: document.querySelector('#idProduit').innerText,
        name: document.querySelector('#nameProduit').innerText,
        price: document.querySelector('#priceProduit').innerText,
        imageUrl: document.querySelector('#imgProduit').getAttribute('src'),
    } 

    addProduct(myProduct);
     // récupération des infos du produit

     //let nameProduit= localStorage.setItem("name", `${produit.name}`);
     
     /* addQt = parseInt($('#qt').val());
     inCartItemsNum += qt;




    // mise à jour du nombre de produit dans le widget
    $('#in-cart-items-num').html(inCartItemsNum);

    var newArticle = true;

    // vérifie si l'article est pas déjà dans le panier
    cartArticles.forEach(function(v) {
        // si l'article est déjà présent, on incrémente la quantité
        if (v.id == id) {
            newArticle = false;
            v.qt += qt;
            $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a>');
        }
    });

    // s'il est nouveau, on l'ajoute
    if (newArticle) {
        $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ qt +'</span></small></a></li>');

        cartArticles.push({
            id: id,
            name: name,
            price: price,
            qt: qt,
            //url: url
        });
    }

    // sauvegarde le panier
    saveCart(inCartItemsNum, cartArticles);

    // affiche le contenu du panier si c'est le premier article
    cartEmptyToggle();*/
} §/nvc 
)

function addProduct(product){
console.log(product);
alert('Article bien ajouté au panier');
};


