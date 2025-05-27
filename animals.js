let allAnimals = [];

function displayAnimals(animals) {
  const list = document.getElementById('animalList');
  list.innerHTML = '';

  animals.forEach(animal => {
    const li = document.createElement('li');
    li.textContent = `${animal.name} (${animal.type})`;
    list.appendChild(li);
  });
}

function filterAndDisplay() {
  const filterValue = document.getElementById('animalFilter').value.toLowerCase();
  const searchValue = document.getElementById('animalSearch').value.toLowerCase();

  let filtered = allAnimals;

  // Filtruj po typie (ssak, ptak, gad), jeśli nie "all"
  if (filterValue !== 'all') {
    filtered = filtered.filter(animal => animal.type.toLowerCase() === filterValue);
  }

  // Filtruj po wyszukiwaniu nazwy
  if (searchValue) {
    filtered = filtered.filter(animal => animal.name.toLowerCase().includes(searchValue));
  }

  displayAnimals(filtered);
}

// Pobieramy dane z backendu
fetch('http://localhost:3000/animals')
  .then(response => {
    if (!response.ok) throw new Error('Nie udało się wczytać danych');
    return response.json();
  })
  .then(data => {
    allAnimals = data;
    displayAnimals(allAnimals);
  })
  .catch(error => {
    console.error('Błąd:', error);
  });

// Nasłuchujemy zmiany filtra i wpisu wyszukiwania
document.getElementById('animalFilter').addEventListener('change', filterAndDisplay);
document.getElementById('animalSearch').addEventListener('input', filterAndDisplay);