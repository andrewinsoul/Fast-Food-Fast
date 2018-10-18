const hostURL = 'https://fast-food-andy.herokuapp.com/api/v1';
const intercontinental = document.getElementById('intercontinental-div');
const african = document.getElementById('african-div');
const fries = document.getElementById('fries-div');
const others = document.getElementById('others-div');
function toggler() {
  const navElement = document.getElementById('Topnav');
  if (navElement.className === 'topnav') {
    navElement.className += ' responsive';
  }
  else {
    navElement.className = 'topnav';
  }
}

function showAll() {
  intercontinental.style.display = 'block';
  fries.style.display = 'block';
  others.style.display = 'block';
  african.style.display = 'block';
  // document.documentElement.scrollTop = ;
}

/**
   * 
   * @param {string} node 
   * @param {string} nameOfClass
   * @returns {HTMLBodyElement} element 
   */
function createNode(node, nameOfClass='') {
  const element = document.createElement(node);
  element.className = nameOfClass;
  return element;
}

/* check the logout function */
function logout() {
  localStorage.removeItem('x-access-token');
  window.location.href = 'client/login.html'
}

function showIntercontinental() {
  fries.style.display = 'none';
  others.style.display = 'none';
  african.style.display = 'none';
  intercontinental.style.display = 'block';
  document.documentElement.scrollTop = 0;
}

function showFries() {
  intercontinental.style.display = 'none';
  others.style.display = 'none';
  fries.style.display = 'block';
  african.style.display = 'none';
  document.documentElement.scrollTop = 0;
}

function unformatPrice(price) {
  let rawPrice = price.replace(',', '');
  rawPrice = rawPrice.replace('₦', '');
  return rawPrice;
}
// function fixBody() {
//   const body = document.getElementsByClassName('place-order');
//   alert(body);
//   console.log(body);
// }

function showOthers() {
  intercontinental.style.display = 'none';
  fries.style.display = 'none';
  others.style.display = 'block';
  african.style.display = 'none';
  document.documentElement.scrollTop = 0;
}

function showAfrican() {
  intercontinental.style.display = 'none';
  fries.style.display = 'none';
  others.style.display = 'none';
  african.style.display = 'block';
  document.documentElement.scrollTop = 0;
}


function openModal(targetEle) {
  const bodyTag = document.getElementById('body');
  const delModal = document.getElementById('delModal');
  const container = document.getElementById('main-container');
  const modalDiv = document.getElementById('modal');
  const addModal = document.getElementById('addModal');
  delModal.style.display = 'none';
  addModal.style.display = 'none';
  modalDiv.style.display = 'block';
  bodyTag.className = 'admin-menu-list modalOpen';
  modalDiv.style.background = 'brown';
  modalDiv.style.color = 'white';
  bodyTag.style.background = 'rgba(35,8,8,0.9)';
  bodyTag.style.overflowY = 'hidden';
  container.style.pointerEvents = 'none';
  modalDiv.style.pointerEvents = 'auto';
  const parent = (targetEle.parentElement).parentElement;
  const foodName = document.querySelector('input#name');
  const foodCategory = document.querySelector('input#category');
  const price = document.querySelector('input#price');
  const desc = document.querySelector('textarea#description');
  foodName.value = 
  (parent.parentElement).children[0].children[1].textContent;
  foodCategory.value = (parent.parentElement).children[1].children[1].textContent;
  price.value = unformatPrice((parent.parentElement).children[2].children[1].textContent);
  desc.value = (parent.parentElement).children[3].children[1].textContent
}

function openAddModal(targetEle) {
  const bodyTag = document.getElementById('body');
  const container = document.getElementById('main-container');
  const addModal = document.getElementById(targetEle);
  const delModal = document.getElementById('delModal');
  const modalDiv = document.getElementById('modal');
  modalDiv.style.display = 'none';
  delModal.style.display = 'none';
  addModal.style.display = 'block';
  bodyTag.className = 'admin-menu-list modalOpen';
  addModal.style.background = 'brown';
  addModal.style.color = 'white';
  bodyTag.style.background = 'rgba(35,8,8,0.9)';
  bodyTag.style.overflowY = 'hidden';
  container.style.pointerEvents = 'none';
  addModal.style.pointerEvents = 'auto';
}

function openDelModal() {
  const bodyTag = document.getElementById('body');
  const container = document.getElementById('main-container');
  const delModal = document.getElementById('delModal');
  const addModal = document.getElementById('addModal');
  const modalDiv = document.getElementById('modal');
  modalDiv.style.display = 'none';
  addModal.style.display = 'none';
  delModal.style.display = 'block';
  bodyTag.className = 'admin-menu-list modalOpen';
  delModal.style.background = 'white';
  delModal.style.color = 'black';
  bodyTag.style.background = 'rgba(35,8,8,0.9)';
  bodyTag.style.overflowY = 'hidden';
  container.style.pointerEvents = 'none';
  delModal.style.pointerEvents = 'auto';
}

function closeModal(target) {
  const bodyTag = document.getElementById('body');
  const container = document.getElementById('main-container');
  const modalDiv = document.getElementById(target);
  bodyTag.className = 'admin-menu-list';
  bodyTag.style.background = '#5b0603';
  bodyTag.style.overflowY = 'auto';
  container.style.pointerEvents = 'auto';
}

function openLink(url) {
  document.location.href = url;
}

function displayMenu(e) {
  e.parentElement.parentElement.previousElementSibling.lastChild.previousSibling.className = "";
  e.removeAttribute('onclick');
  e.setAttribute('onclick', 'hideMenu(this)');
  e.lastChild.previousElementSibling.className = 'fa fa-caret-up';
}

function hideMenu(e) {
  e.parentElement.parentElement.previousElementSibling.lastChild.previousSibling.className = "wrap";
  e.removeAttribute('onclick');
  e.setAttribute('onclick', 'displayMenu(this)');
  e.lastChild.previousElementSibling.className = 'fa fa-caret-down';
}

function addRemoveQty(e) {
  if (e.className === 'add-plate-btn fa fa-caret-up') {
    const sibling = e.nextElementSibling;
    const value = Number(sibling.innerHTML);
    sibling.innerHTML = value + 1;
  }
  else {
    const sibling = e.previousElementSibling;
    const value = Number(sibling.innerHTML);
    if (value == 1) {
      sibling.innerHTML = 1;
    }
    else {
      sibling.innerHTML = value - 1;
    }
  }
}

function acceptOrder (e) {
  const acceptedSpan = document.createElement('span');
  acceptedSpan.textContent = 'ACCEPTED';
  const parent = e.parentNode;
  const grandParent = parent.parentNode;
  grandParent.replaceChild(acceptedSpan, parent);
  grandParent.className = 'accepted';
}

function declineOrder(e) {
  const declinedSpan = document.createElement('span');
  declinedSpan.textContent = 'DECLINED';
  const parent = e.parentNode;
  const grandParent = parent.parentNode;
  grandParent.replaceChild(declinedSpan, parent);
  grandParent.className = 'declined';
}

function createElement(name) {
  return document.createElement(name);
}

function updateMenu() {
  const modalWrapper = document.getElementById('modal-wrapper');
  modalWrapper.remove();
  const modal = document.getElementById('modal');
  modal.style.height = 'fit-content';
  modal.style.margin = '-25% 0 0 -25%';
  modal.style.width = '20%';
  const div = createElement('div');
  div.style.backgroundColor = 'green';
  div.style.borderRadius = '7px';
  div.setAttribute('id', 'modal-wrapper');
  const h3 = createElement('h3');
  h3.textContent = 'Update Successful';
  h3.style.color = 'white';
  h3.style.margin = 0;
  h3.className = 'center-txt';
  h3.style.padding = '15px';
  div.appendChild(h3);
  modal.appendChild(div);
  window.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
      location.reload();
    }
  };
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function addRemoveFood(e) {
  if (e.className === 'pad-right add-item-btn') {
    e.style.display = 'none';
    const sibling = e.nextElementSibling;
    sibling.style.display = 'inline-block';
  }
  else {
    e.style.display = 'none';
    const sibling = e.previousElementSibling;
    sibling.style.display = 'inline-block';
  }
}
