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
 let listProducts = [];

 const buttonElement = document.querySelector('.add-to-cart')
 buttonElement.addEventListener('click', () => {
     let myProduct = {
         id: document.querySelector('#idProduit').innerText,
         name: document.querySelector('#nameProduit').innerText,
         price: document.querySelector('#priceProduit').innerText,
         imageUrl: document.querySelector('#imgProduit').getAttribute('src'),
         quantite: document.querySelector('#qt').value,
     }
     addProduct(myProduct);
 })

 function addProduct(product) {
     listProducts.push(product);
     console.log(product);

     //local storage nu pot pastra obiect
     alert('Article' + product.name + 'bien ajouté au panier');
     //conversion  listProducts  des "objet=>string"
     localStorage.listProducts = JSON.stringify(listProducts);
 };