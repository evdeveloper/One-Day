export function siblings(elem) {
  let siblings = [];
  if (!elem.parentNode) { return siblings; }
  let sibling = elem.parentNode.firstElementChild;
  do {
    if (sibling != elem) { siblings.push(sibling); }
  } while (sibling = sibling.nextElementSibling);
  return siblings;
};