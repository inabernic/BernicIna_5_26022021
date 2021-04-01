listCart()

async function listCart(){
    let products = [];
    const produitHtml = document.querySelector('#listProducts');
    let total = 0;

    try {
        //on parse la liste de produits "products" 
        products = JSON.parse(localStorage.productsKey);
        let i = 1;
        for (let produit of products) {
            produitHtml.insertAdjacentHTML('beforeend', `
                                                         <tr>
                                                         <td scope="col">${i++}</td>
                                                         <td scope="col">${produit.name}</td>
                                                         <td scope="col">${produit.quantite}</td>
                                                         <td scope="col">${produit.price}</td>
                                                         <td scope="col">${produit.quantite * produit.price}</td>
                                                         <td scope="col"><input type="submit" value="Supprimer l'article" onClick="deleteProductBasket('${produit.id}');"/></td>
                                                       </tr>
                                                `)
            total += produit.quantite * produit.price;
        }
        //afficher le  total
        document.querySelector('#total').innerText = total +` Euros`;

    } catch (error) {
        console.error(error.message)
    }
}



function deleteProductBasket(idProduct) {
    //const deleteProductBasket = (idProduct) => {       //    import export
    let products = JSON.parse(localStorage.getItem('productsKey'));
    //let products = JSON.parse(localStorage.productsKey);     //acces direct 
    let filteredProducts = products.filter(elem => elem.id !== idProduct);
    localStorage.setItem('productsKey', JSON.stringify(filteredProducts));
    //localStorage.productsKey =  JSON.stringify(filteredProducts);    //acces direct
    window.location.reload(); // il faut le mettre dans un event lisener                 ou utilise document!!!!!!!!!!!!!!!!!!!
}

