const buttonCart = document
  .getElementById("product-box")
  .querySelectorAll("button");
let grandTotalPrice = 0;
let discountPrice = 0;
let discountFactor = 1;
let totalPrice = 0;
discountCalculation();
for (const btn of buttonCart) {
  btn.addEventListener("click", (e) => {
    const parentDiv = e.target.parentNode.parentNode;
    const itemName = parentDiv.querySelector(".card-title").innerText;
    const itemPrice = parentDiv.querySelector(".card-price").innerText;
    const itemImage = parentDiv.parentNode.querySelector("img").src;
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <div
              class="cart-item flex justify-around items-center bg-slate-100 rounded-xl py-3 mb-5"
            >
              <img src="${itemImage}" alt="" class="w-1/4" />
              <div>
                <h2 class="mb-4 font-bold">${itemName}</h2>
                <p class="text-gray-500">${itemPrice}<span> TK</span></p>
              </div>
            </div>
    `
    );
    const price = parseFloat(itemPrice);
    updateCart(price);
  });
}

function discountCalculation() {
  document.getElementById("coupon-apply").addEventListener("click", (e) => {
    if (totalPrice >= 200) {
      const couponCode = document.getElementById("coupon").value.trim();
      if ("sell200" === couponCode.toLowerCase()) {
        discountFactor = 0.8;
        grandTotalPrice = totalPrice * discountFactor;
        discountPrice = totalPrice - grandTotalPrice;
      } else {
        discountFactor = 1;
        grandTotalPrice = totalPrice * discountFactor;
        discountPrice = totalPrice - grandTotalPrice;
      }
      const grndDisplayPrice = grandTotalPrice.toFixed(2);
      document.getElementById("grand-total-price").innerText = grndDisplayPrice;
      const displayDiscointPrice = discountPrice.toFixed(2);
      document.getElementById("discount-price").innerText =
        displayDiscointPrice;
      document.getElementById("coupon").value = "";
      document.getElementById("coupon-heading").innerText =
        "Coupon Code Applied";
    } else {
      console.log("Please Buy More");
    }
  });
}

function updateCart(itemPrice) {
  totalPrice += itemPrice;
  grandTotalPrice = totalPrice;
  grandTotalPrice = totalPrice * discountFactor;
  discountPrice = totalPrice - grandTotalPrice;
  const displayPrice = totalPrice.toFixed(2);
  const grndDisplayPrice = grandTotalPrice.toFixed(2);
  const displayDiscointPrice = discountPrice.toFixed(2);
  document.getElementById("total-price").innerText = displayPrice;
  document.getElementById("grand-total-price").innerText = grndDisplayPrice;
  document.getElementById("discount-price").innerText = displayDiscointPrice;
}
