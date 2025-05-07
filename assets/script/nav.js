function abrirMenu(event) {
    var menu = document.getElementById("menu");
    if (menu.style.top === "10%") {
        menu.style.top = "100vh";
        event.target.innerHTML = "menu";
    } else {
        menu.style.top = "10%";
        event.target.innerHTML = "close";
    }
}