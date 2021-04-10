async function registerOrder() {
  let contact = {
    lastName: document.querySelector("#validationCustom01").value,
    firstName: document.querySelector("#validationCustom02").value,
    address: document.querySelector("#validationCustom04").value,
    city: document.querySelector("#validationCustom05").value,
    email: document.querySelector("#validationCustomUsername03").value,
  };

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
  myHeaders = new Headers({
    "Content-Type": "application/json",
  });

  let confirmationOrder = await fetch(
    "http://localhost:3000/api/cameras/order",
    {
      method: "POST",
      headers: myHeaders,
      body: json,
    }
  )
    .then((response) => response.json())
    .catch((e) => {
      alert("erreur: " + e.message);
    });
  if (confirmationOrder != undefined) {
    confirmationCommande();
  }
}

function confirmationCommande() {
  window.localStorage.clear();
  alert(`Votre numero de commande est:` + confirmationOrder.orderId);
  let total = document.querySelector("#total").innerText;
  document.location.href =
    `remerciment.html?orderId=` + confirmationOrder.orderId + "&total=" + total;
}
