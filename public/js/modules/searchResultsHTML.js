function searchResultsHTML (searchResults) {
  // generate HTML for an array of search results
  return searchResults.map(result => {
    return `
        <a href="/recipe/view/${result.slug}" class="search__result is-info">
          <p>${result.title}</p>
        </a>
    `
  }).join('')
}