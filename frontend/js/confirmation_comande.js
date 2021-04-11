async function registerOrder() {
  try {
    let contact = {
      lastName: document.querySelector("#validationCustom0").value,
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
      .then((order) => confirmationCommande(order.orderId))
      .catch((error) => alert(error));
  } catch (error) {
    alert(error);
  }
}

function confirmationCommande(orderId) {
  if (orderId !== undefined) {
    window.localStorage.clear();
    let total = document.querySelector("#total").innerText;
    document.location.href =
      `remerciment.html?orderId=` + orderId + "&total=" + total;
  }
}
