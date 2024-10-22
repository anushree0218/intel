document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const response = await fetch(`/search?q=${query}`);
        const results = await response.json();

        searchResults.innerHTML = '';

        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <h3>${result.typeofservices}</h3>
                    <p>Phone: ${result.phoneno}</p>
                    <p>Location: ${result.location}</p>
                `;
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
        }
    });
});