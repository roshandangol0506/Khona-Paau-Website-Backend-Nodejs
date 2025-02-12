document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-item-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const serviceId = button.getAttribute("data-service-id");
      const userId = button.getAttribute("data-user-id");

      if (!serviceId || !userId) {
        alert("Missing required information to delete item.");
        return;
      }

      const confirmed = confirm(
        "Are you sure you want to remove this item from the cart?"
      );
      if (!confirmed) return;

      try {
        const response = await fetch("/deletefromcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serviceId, userId }),
        });

        if (response.ok) {
          alert("Item removed from cart successfully.");
          // Optionally reload the page or update the UI dynamically
          window.location.reload();
        } else {
          const data = await response.json();
          alert(data.message || "Failed to remove item.");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("An error occurred while removing the item.");
      }
    });
  });
});
