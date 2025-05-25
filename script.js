oferty = [
    {kraj: "Chorwacja", cena: 1200 },
    {kraj: "HamBurgBurgBurger", cena: 1800 },
    {kraj: "WenezuelaFRytkownica", cena: 2200 },
    {kraj: "Grecjaxd", cena: 1500 },
    {kraj: "Warszaszaszawa", cena: 2300 },
];

function wypiszOferty(lista) {
    const ul = document.getElementById("oferty-list");
    ul.innerHTML = "";
    for (const oferta of lista) {
        const li = document.createElement("li");
        li.className = "oferta";
        li.textContent = `${oferta.kraj} – ${oferta.cena} zł`;
        ul.appendChild(li);
    }
}

function filtrujISortuj() {
    const search = document.getElementById("search").value.toLowerCase();
    const sort = document.getElementById("sort").value;

    const wynik = oferty
        .filter(oferta => oferta.kraj.toLowerCase().includes(search))
        if (sort === "rosnaco") {
            wynik.sort(function (a, b) {
                return a.cena - b.cena;
            });
        } else if (sort === "malejaco") {
            wynik.sort(function (a, b) {
                return b.cena - a.cena;
            });
    }

    wypiszOferty(wynik);
}

document.getElementById("search").addEventListener("input", filtrujISortuj);
document.getElementById("sort").addEventListener("change", filtrujISortuj);

wypiszOferty(oferty);
