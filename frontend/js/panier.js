"use strict";

function listCart() {
  let products = [];
  const produitHtml = document.querySelector("#listProducts");
  const templateElem = document.getElementById("template_list");
  let total = 0;

  try {
    //on parse la liste de produits "products"
    if (localStorage.productsKey === undefined) {
      document.querySelector(".formulaire").style.display = "none";
      return;
    }
    products = JSON.parse(localStorage.productsKey);
    let i = 1;
    for (let produit of products) {
      const clone = document.importNode(templateElem.content, true);
      clone.getElementById("nr").textContent = i++;
      clone.getElementById("imgProduit").src = produit.imageUrl;
      clone.getElementById("nameProduit").textContent = produit.name;
      clone.getElementById("qt").textContent = produit.quantite;
      clone.getElementById("priceProduit").textContent = produit.price;
      clone.getElementById("sous_total").textContent =
        produit.price * produit.quantite;
      clone.getElementById("button_delete").onclick = function () {
        deleteProductBasket(produit._id);
      };
      produitHtml.appendChild(clone);

      total += produit.quantite * produit.price;
    }
    //afficher le  total
    document.querySelector("#total").innerText = total + ` Euros`;
  } catch (error) {
    console.error(error.message);
  }
}

function deleteProductBasket(idProduct) {
  //const deleteProductBasket = (idProduct) => {       //    import export
  let products = JSON.parse(localStorage.getItem("productsKey"));
  //let products = JSON.parse(localStorage.productsKey);     //acces direct
  let filteredProducts = products.filter((elem) => elem._id !== idProduct);
  console.log(filteredProducts);
  console.log(filteredProducts.length);
  if (filteredProducts.length === 0) {
    window.localStorage.clear();
  } else {
    localStorage.setItem("productsKey", JSON.stringify(filteredProducts));
  }
  //localStorage.productsKey =  JSON.stringify(filteredProducts);    //acces direct
  document.location.reload();
}

listCart();
