document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const updateTotalQuantityAndAmount = () => {
    const quantities = document.querySelectorAll(".quantity-input");
    let totalQuantity = 0;
    let totalAmount = 0;

    quantities.forEach((input) => {
      const index = input.dataset.index;
      const quantity = parseInt(input.value, 10) || 0;
      const amount = document.querySelector(
        `.form-control[name="amount"][data-index="${index}"]`
      );
      const serviceAmount = parseFloat(amount.dataset.serviceAmount);
      const checkbox = document.querySelector(
        `input[name="selectedItems"][value="${input.name.replace(
          "quantity-",
          ""
        )}"]`
      );

      amount.value = (quantity * serviceAmount).toFixed(2);

      if (checkbox && checkbox.checked) {
        totalQuantity += quantity;
        totalAmount += quantity * serviceAmount;
      }
    });

    document.getElementById("totalquantity").value = totalQuantity;
    document.getElementById("totalamount").value = totalAmount.toFixed(2);
  };

  document.querySelector("ol").addEventListener("click", (event) => {
    if (
      event.target.classList.contains("decrease-btn") ||
      event.target.classList.contains("increase-btn")
    ) {
      const index = event.target.dataset.index;
      const quantityInput = document.querySelector(
        `.quantity-input[data-index="${index}"]`
      );
      let currentValue = parseInt(quantityInput.value, 10) || 1;

      if (event.target.classList.contains("decrease-btn") && currentValue > 1) {
        currentValue -= 1;
      }

      if (event.target.classList.contains("increase-btn")) {
        currentValue += 1;
      }

      quantityInput.value = currentValue;
      updateTotalQuantityAndAmount();
    }

    if (event.target.type === "checkbox") {
      updateTotalQuantityAndAmount();
    }
  });

  form.addEventListener("submit", (event) => {
    const checkboxes = document.querySelectorAll(
      "input[name='selectedItems']:checked"
    );
    if (checkboxes.length === 0) {
      event.preventDefault();
      alert("Please select at least one item before submitting.");
    }
  });

  updateTotalQuantityAndAmount();
});
