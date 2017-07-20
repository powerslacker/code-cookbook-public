function typeAhead (search) {
  if (!search) { return }

  let searchInput = search.querySelector('.input')
  let searchResults = search.querySelector('.search__results')

  searchInput.on('input', function () {
    // prevent unneccessary queries
    if (this.value.length < 3) {
      searchResults.style.display = 'none'
      return
    }
    // get the search data
    let query = `/search?q=${this.value}`
    fetch(query)
    .then(response => response.json())
    .then(results => {
      // hide results div if there is no search result
      if (!results.length) {
        searchResults.style.display = 'none'
        return
      }
      // show results
      searchResults.style.display = 'block'
      // append html
      searchResults.innerHTML = searchResultsHTML(results)

    })
  })
}

// attach typeAhead script to the DOM node with class 'search'
typeAhead($('.search'))