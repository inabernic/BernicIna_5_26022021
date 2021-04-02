listComande()

async function listComande() {
    let produits = [];
    const appHtml = document.querySelector('#recap');
    const templateElem = document.getElementById('template_recap')


    try {
        //on parse la liste de produits "products" 
        products = JSON.parse(localStorage.productsKey);
        let i = 1;
        let total = 0;
        for (let produit of products) {
            const clone = document.importNode(templateElem.content, true)
            clone.getElementById("nr").textContent = i++
            clone.getElementById("imgProduit").src = produit.imageUrl
            clone.getElementById("nameProduit").textContent = ` Model: ` + produit.name
            clone.getElementById("qt").textContent = produit.quantite
            clone.getElementById("sous_total").textContent = ` Prix: ` + produit.price + ` Euros`

            appHtml.appendChild(clone)

            total += produit.quantite * produit.price;
        }

        //afficher le  total
        document.querySelector('#total').innerText = total + ` Euros`;

    } catch (error) {
        console.error(error.message)
    }
}

function validateComande() {
    alert(`Votre comande est bien prise en charge! `);
    document.location.href = "index.html";
}