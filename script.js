let listaOfert = []; // lista ofert to na ten moment pusta tabilca

function pokazOferty(ofertyDoWyswietlenia) { // do funkcji pokazoferty przekazujemy nasze oferty do wyswietlenia ktore sa przekazane z funkcji filtrujacej
    const listaHTML = document.getElementById("oferty-list"); // tak jakby dajemy dostep do tego elementu z naszego htmla
    listaHTML.innerHTML = ""; // ustawiamy go na nic

    if (ofertyDoWyswietlenia.length === 0) {
        listaHTML.innerHTML = "<li>Na ten moment nie mamy zadnych ofert!</li>";
        return;
    }

    for (const pojedynczaOferta of ofertyDoWyswietlenia) {
        const elementListy = document.createElement("li");
        elementListy.className = "oferta";
        elementListy.textContent = `${pojedynczaOferta.kraj} – ${pojedynczaOferta.cena} zł`; // $ tak wstawiamy zmienna do srodka tekstu
        listaHTML.appendChild(elementListy); // to dodaje nowy element (dziecko do pobranego listaHTML ktory jest ul), dodajemy do tego element listy
    }
}

function filtrujISortujOferty() {
    const tekstSzukania = document.getElementById("search").value.toLowerCase();
    const wybranySposobSortowania = document.getElementById("sort").value;

    localStorage.setItem("sortowanie", wybranySposobSortowania);

    let przefiltrowaneOferty = [];

    for (let i = 0; i < listaOfert.length; i++) {
        let oferta = listaOfert[i];
        let kraj = oferta.kraj.toLowerCase();

        if (kraj.includes(tekstSzukania)) {
            przefiltrowaneOferty.push(oferta); // push po prostu dodaje element do tablicy na koncu
        }
    }

    if (wybranySposobSortowania === "rosnaco") {
        przefiltrowaneOferty.sort(function(a, b) { // funkcja sort wykonuje sie wielkortonie przez co sortuje wszystkie elementy az nie zostana one posortowane, na koniec mamy
            return a.cena - b.cena; // jak przesortuje cale to tablica przefiltrowaneoferty ma oferty w dobrym ulozeniu
        });
    } else if (wybranySposobSortowania === "malejaco") {
        przefiltrowaneOferty.sort(function(a, b) {
            return b.cena - a.cena;
        });
    }

    pokazOferty(przefiltrowaneOferty);
}

fetch("oferty.json") // fetch wysyła żądanie oraz pobiera dane
    .then(function(odpowiedzSerwera) { // działa, gdy zakończy się powodzeniem to wtedy dziala
        if (!odpowiedzSerwera.ok) {
            throw new Error("Nie udało się pobrać ofert.");
        }

        return odpowiedzSerwera.json(); // to przekazuje dane do kolejnego .thena
    })
    .then(function(listaZJsona) {
        listaOfert = listaZJsona;

        const zapamietaneSortowanie = localStorage.getItem("sortowanie");
        if (zapamietaneSortowanie) {
            document.getElementById("sort").value = zapamietaneSortowanie;
        }

        filtrujISortujOferty();
    })
    .catch(function(blad) {
        document.getElementById("oferty-list").innerHTML = `<li>${blad.message}</li>`;
    });

document.getElementById("search").addEventListener("input", filtrujISortujOferty);
document.getElementById("sort").addEventListener("change", filtrujISortujOferty);
