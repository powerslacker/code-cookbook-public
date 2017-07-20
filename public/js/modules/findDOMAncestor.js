function findDOMAncestorByClass (el, cls) {
  // finds the closest DOM ancestor with a given class
  return el.classList.contains(cls) ? el : findDOMAncestorByClass(el.parentElement, cls) 
}