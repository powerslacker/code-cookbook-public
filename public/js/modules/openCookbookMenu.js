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