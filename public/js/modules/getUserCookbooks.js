function getUserCookbooks (user_id) {
  return fetch(`/cookbook/getAll/${user_id}`)
  .then(response => response.json())
}