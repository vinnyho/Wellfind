function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  const section = document.getElementById(sectionId);
  if (
    sectionId === "email-container" ||
    sectionId === "settings-container" ||
    sectionId === "saved-container"
  ) {
    section.style.display = "flex";
    section.style.flexDirection = "column";
  } else {
    section.style.display = "block";
  }
}
document
  .getElementById("scrape-btn")
  .addEventListener("click", () => showSection("scrape-container"));
document
  .getElementById("email-btn")
  .addEventListener("click", () => showSection("email-container"));
document
  .getElementById("saved-btn")
  .addEventListener("click", () => showSection("saved-container"));
document
  .getElementById("settings-btn")
  .addEventListener("click", () => showSection("settings-container"));
showSection("scrape-container");
