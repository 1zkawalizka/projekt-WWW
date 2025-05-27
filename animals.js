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

  
  if (filterValue !== 'all') {
    filtered = filtered.filter(animal => animal.type.toLowerCase() === filterValue);
  }

 
  if (searchValue) {
    filtered = filtered.filter(animal => animal.name.toLowerCase().includes(searchValue));
  }

  displayAnimals(filtered);
}


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


document.getElementById('animalFilter').addEventListener('change', filterAndDisplay);
document.getElementById('animalSearch').addEventListener('input', filterAndDisplay);