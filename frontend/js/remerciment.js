merci();

function getURLParameter(sParam) {
  let params = new URLSearchParams(document.location.search.substring(1));
  return params.get(sParam);
}

function merci() {
  let orderId = getURLParameter("orderId");
  let total = getURLParameter("total");
  document.getElementById("orderId").innerText = orderId;
  document.getElementById("totalMerci").innerText = total;
}
