import { getProduits } from "./getProduits.js";

export const displayProduits = async () => {
  let produits = [];
  const appHtml = document.querySelector("#app");
  const templateElem = document.getElementById("template");

  try {
    produits = await getProduits();

    for (let produit of produits) {
      const clone = document.importNode(templateElem.content, true);
      clone.getElementById("idProduit").textContent = produit._id;
      clone.getElementById("imgProduit").src = produit.imageUrl;
      clone.getElementById(
        "nameProduit"
      ).textContent = `Modèle : ${produit.name}`;
      clone.getElementById("priceProduit").textContent = `Prix : ${
        produit.price / 100
      } €`;
      clone.getElementById("bouton_info").onclick = function () {
        document.location.href = `produit.html?id=` + produit._id;
      };

      appHtml.appendChild(clone);
    }
  } catch (error) {
    console.error(error.message);
  }
};
