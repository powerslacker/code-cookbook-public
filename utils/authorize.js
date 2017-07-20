function authorize (user_id, author_id) {
  // verifies the current user is the author of a given object
  if (!author_id || !user_id) return false
  if (author_id != user_id)   return false
  return true
}

module.exports = authorize