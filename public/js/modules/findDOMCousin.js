function findDOMCousin (el, parentSelector, cousinSelector) {
  // finds the first DOM child with a given selector, given a DOM parent selector
  return el.closest(parentSelector).querySelector(cousinSelector)
}