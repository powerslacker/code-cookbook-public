function addToCookbook (cookbookID, btnTag) {
  let form    = findDOMCousin(btnTag, '.box', '.cookbook__form' )
  let inputs  = form.getElementsByTagName('input')
  let payload = {
    recipe: ''
  }

  for (var i of inputs) {
    if (i.name == 'recipe') payload.recipe = i.value
  }

  // assign author from form
  payload['author'] = form.querySelector("[name='author']").value

  fetch(
    `/cookbook/addRecipe/${cookbookID}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }
  )
  .then(res => res.json())
  .then(data => closeCookbookMenu(btnTag, data))
  return false
}
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};
function closeCookbookMenu (tag, flashData) {
  tag.classList.add('is-loading')
  setTimeout(() => {
    document.querySelector('.is-active').classList.remove('is-active')
    tag.classList.remove('is-loading')
    document.getElementsByClassName('flashes__container')[0].innerHTML = `
    <div class='notification is-${flashData.type}'>
      <p class='flash__text'>${flashData.message}</p>
      <button class='delete' onClick="this.parentElement.remove()"></button>
    </div>
    `
  }, 1000)
}
function findDOMAncestorByClass (el, cls) {
  // finds the closest DOM ancestor with a given class
  return el.classList.contains(cls) ? el : findDOMAncestorByClass(el.parentElement, cls) 
}
function findDOMCousin (el, parentSelector, cousinSelector) {
  // finds the first DOM child with a given selector, given a DOM parent selector
  return el.closest(parentSelector).querySelector(cousinSelector)
}
function getUserCookbooks (user_id) {
  return fetch(`/cookbook/getAll/${user_id}`)
  .then(response => response.json())
}
function openCookbookMenu(user_id, linkTag) {
  let modalTag = findDOMCousin(linkTag, '.box', '.cookbook__modal')
  modalTag.classList.add('is-active')
  getUserCookbooks(user_id)
  .then(results => {
    let listDiv = modalTag.getElementsByClassName('cookbook__modal__list')[0]
    let listHTML = results.map(cookbook => {
      return `
      <div class='level'>
        <div class='level-left'>
          <div class='level-item'>
            ${cookbook.title}
          </div>
        </div>
        <div class='level-right'>
          <div class='level-item'>
            <button class='button is-info' onclick='addToCookbook("${cookbook._id}", this)'>
              <span class='icon'>
                <i class='fa fa-plus'></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <hr>
      `
    }).join('')
    listDiv.innerHTML = listHTML
  })
}
function postNewCookbook (btnTag) {
  let form    = findDOMAncestorByClass(btnTag, 'cookbook__form')
  let inputs  = form.getElementsByTagName('input')
  let payload = {
    recipes: []
  }
  // get recipe from form
  for (var i of inputs) {
    i.name == 'recipe' ?
    payload.recipes.push(i.value) :
    payload[i.name] = i.value
  }

  fetch(
    '/cookbook/new',
    {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }
  )
  .then(res => res.json())
  .then(data => closeCookbookMenu(btnTag, data))
  return false
}
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
