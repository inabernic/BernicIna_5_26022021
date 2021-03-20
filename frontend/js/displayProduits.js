import {
    getProduits
} from './getProduits.js'

export const displayProduits = async () => {
    let produits = []
    const appHtml = document.querySelector('#app')

    try {
        produits = await getProduits()

        for (let produit of produits) {
            appHtml.insertAdjacentHTML('beforeend', `
                                                         <div class="col-sm-2 shadow-lg p-3 mb-5 bg-body ">
                                                            <div class="card text-center" style="width: 18rem;">
                                                                    <img src="${produit.imageUrl}" class="card-img-top rounded mx-auto d-block"></img>
                                                                    <h2>${produit.name}</h2>
                                                                    <p>${produit.description}</p>
                                                                       <div class="card-body">
                                                                         <input name="bouton_info" type="button" class="btn btn-primary" value="Plus d'info"
                                                                    onclick="document.location.href='produit.html?id=${produit._id}'">
                                                            </div>
                                                        </div>
                                                    </div>
                                                `)
        }
    } catch (error) {
        console.error(error.message)
    }
}