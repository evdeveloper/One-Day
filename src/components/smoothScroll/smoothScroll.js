function currentYPosition() {
  if (self.pageYOffset) return self.pageYOffset;
  if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}
function elmYPosition(eID) {
  let elm = document.querySelector(`[data-scroll-target="${eID}"]`);
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop - 30;
  } return y;
}
export function smoothScroll(eID) {
  let startY = currentYPosition();
  let stopY = elmYPosition(eID);
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY); return;
  }
  let speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  let step = Math.round(distance / 35);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i=startY; i < stopY; i+=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      console.log(stopY);
      leapY += step; if (leapY > stopY) leapY = stopY; timer++;
    } return;
  }
  for (let i=startY; i>stopY; i-=step ) {
    setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
  return false;
}