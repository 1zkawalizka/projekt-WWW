document.addEventListener("DOMContentLoaded", () => {
  const animalList = document.getElementById("animalList");
  const animalFilter = document.getElementById("animalFilter");
  const animalSearch = document.getElementById("animalSearch");

  let animalsData = [];

 
  function displayAnimals() {
    const filter = animalFilter.value;
    const search = animalSearch.value.toLowerCase();

    
    const filtered = animalsData.filter(animal => {
      const matchesType = filter === "all" || animal.type === filter;
      const matchesSearch = animal.name.toLowerCase().includes(search);
      return matchesType && matchesSearch;
    });

    
    animalList.innerHTML = "";

    
    filtered.forEach(animal => {
      const li = document.createElement("li");
      li.textContent = animal.name;
      animalList.appendChild(li);
    });
  }

  
  fetch("db.json")
    .then(response => response.json())
    .then(data => {
      animalsData = data.animals;
      displayAnimals();
    })
    .catch(err => {
      animalList.innerHTML = "<li>Nie udało się załadować danych.</li>";
      console.error(err);
    });

  
  animalFilter.addEventListener("change", displayAnimals);
  animalSearch.addEventListener("input", displayAnimals);
});
