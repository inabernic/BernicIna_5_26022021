export const listCart = async () => {
    let products = [];
    const produitHtml = document.querySelector('#listProducts');

    try {
        //on parse la liste de produits "products" 
        products = JSON.parse(localStorage.productsKey);
        let i = 0;
        for (let produit of products) {
            produitHtml.insertAdjacentHTML('beforeend', `
                                                         <tr>
                                                         <td scope="col">${i++}</td>
                                                         <td scope="col">${produit.name}</td>
                                                         <td scope="col">${produit.quantite}</td>
                                                         <td scope="col">${produit.price}</td>
                                                       </tr>
                                                `)
        }
    } catch (error) {
        console.error(error.message)
    }
}