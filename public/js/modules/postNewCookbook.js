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