function updateFav(){
    let favSec = document.querySelector("#favsec");
    let favCon = favSec.querySelector(".section-content");

    document.querySelectorAll(".category[fav='true']").forEach(favcat => {
        favCon.appendChild(favcat.closest("a").cloneNode(true));
    });

    if (favCon.children.length > 0) {
        favSec.style.display = "block";
    }
    else favSec.style.display = "none";
}

window.onload = updateFav();

document.querySelectorAll(".category").forEach(cat => {
    let tt = cat.querySelector(".category-title").innerHTML;
    cat.setAttribute("title", tt);
})