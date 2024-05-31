document.querySelector(".info").addEventListener("click", () => {
  document.querySelector(".overlay").classList.remove("closed");
})

document.querySelector(".close-modal").addEventListener("click", () => {
  document.querySelector(".overlay").classList.add("closed");
});
