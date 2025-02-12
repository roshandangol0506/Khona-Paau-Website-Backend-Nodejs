function handleCartFormSubmit(event, serviceId) {
  event.preventDefault(); // Prevent default form submission

  // Show popup
  const popup = document.getElementById("popupMessage");
  popup.classList.add("show");

  // Automatically hide popup after 500ms and submit form
  setTimeout(() => {
    popup.classList.remove("show");

    // Ensure the form exists before submitting
    const form = document.getElementById(`cartForm-${serviceId}`);
    if (form) {
      form.onsubmit = null; // Prevent re-triggering the `onsubmit` handler
      form.submit(); // Submit the form programmatically
    } else {
      console.error(`Form with ID cartForm-${serviceId} not found.`);
    }
  }, 500); // Adjust timing if necessary
}
