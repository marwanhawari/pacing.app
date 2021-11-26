console.log("pacing.app");

let date;
date = new Date();
console.log(date);
console.log(date.getDay());
console.log(date);
console.log(date);
console.log(date);
console.log(date.getDate());

let p = document.querySelector("#signature");
console.log(p.getTotalLength());

let svg = document.querySelector("#svg");
svg.addEventListener("click", () => {
    window.open("https://www.github.com/marwanhawari");
});
