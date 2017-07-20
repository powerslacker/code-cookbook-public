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