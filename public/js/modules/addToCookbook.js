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