const searchBox = document.getElementById("searchBox");
const countryContainer = document.getElementById("countryContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let countries = [];

async function fetchCountries() {
    loading.textContent = "Loading countries...";
    error.textContent = "";
    countryContainer.innerHTML = "";

    try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");

        const result = await response.json();

        countries = result.data;

        loading.textContent = "";
        displayCountries(countries);

    } catch (err) {
        console.error(err);
        loading.textContent = "";
        error.textContent = "Failed to load countries";
    }
}

function displayCountries(list) {
    countryContainer.innerHTML = "";

    if (!list || list.length === 0) {
        countryContainer.innerHTML = `
            <h2 style="text-align:center; color:red;">
                No country found 😕
            </h2>
        `;
        return;
    }

    list.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${country.flag}" alt="${country.name}">
            <h2>${country.name}</h2>
        `;

        countryContainer.appendChild(card);
    });
}

searchBox.addEventListener("input", () => {
    const text = searchBox.value.toLowerCase().trim();

    const filtered = countries.filter(c =>
        c.name.toLowerCase().includes(text)
    );

    displayCountries(filtered);
});

fetchCountries();