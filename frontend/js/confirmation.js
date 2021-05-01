"use strict";

async function registerOrder() {
  try {
    let contact = JSON.parse(localStorage.getItem("contactKey"));

    let productIds = [];

    let products = JSON.parse(localStorage.getItem("productsKey"));
    for (let product of products) {
      productIds.push(product._id);
    }

    let body = {
      contact: contact,
      products: productIds,
    };
    let json = JSON.stringify(body);
    console.log(json);
    let myHeaders = new Headers({
      "Content-Type": "application/json",
    });

    await fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: myHeaders,
      body: json,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("server response: " + response.statusText);
        }
        return response.json();
      })
      .then((order) => confirmationCommande(order))
      .catch((error) => messageError(error));
  } catch (error) {
    console.log(error);
  }
}

function messageError(err) {
  // au moment de validation commande, en cas que le serveur ne repond pas
  document.getElementById("message").innerText = err;
}

function confirmationCommande(order) {
  if (order !== undefined) {
    let total = 0;
    let orderProducts = JSON.parse(localStorage.getItem("productsKey"));
    orderProducts.forEach((product) => {
      total += product.quantite * product.price;
    });
    window.localStorage.clear();
    document.getElementById("orderId").innerText = order.orderId;
    document.getElementById("totalMerci").innerText = total;
    document.getElementById("merci").style.display = "block";
    document.getElementById("message").style.display = "none";
  }
}

registerOrder();
