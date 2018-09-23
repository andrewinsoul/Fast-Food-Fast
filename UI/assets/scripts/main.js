function toggler() {
  const navElement = document.getElementById('Topnav');
  if (navElement.className === 'topnav') {
    navElement.className += ' responsive';
  }
  else {
    navElement.className = 'topnav';
  }
}

function openModal(targetEle) {
  const bodyTag = document.getElementById('body');
  const delModal = document.getElementById('delModal');
  const container = document.getElementById('main-container');
  const modalDiv = document.getElementById(targetEle);
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
function addMenu() {
  closeModal('addModal');
  const container = document.getElementsByClassName('container')[0];
  const divElement = createElement('div');
  divElement.className = 'jumbotron';
  const FirstDiv = createElement('div');
  const SecondDiv = createElement('div');
  const ThirdDiv = createElement('div');
  const FourthDiv = createElement('div');
  const FifthDiv = createElement('div');
  FifthDiv.className = 'space-item-in-flex';
  container.appendChild(divElement);

  const h31 = createElement('h3');
  const span1 = createElement('span');
  h31.textContent = 'Name';
  FirstDiv.appendChild(h31);
  span1.textContent = 'Andrew Recipe';
  FirstDiv.appendChild(span1);
  divElement.appendChild(FirstDiv);

  const h32 = createElement('h3');
  const span2 = createElement('span');
  h32.textContent = 'Category';
  SecondDiv.appendChild(h32);
  span2.textContent = 'Italian';
  SecondDiv.appendChild(span2);
  divElement.appendChild(SecondDiv);

  const h33 = createElement('h3');
  const span3 = createElement('span');
  h33.textContent = 'Price';
  ThirdDiv.appendChild(h33);
  span3.textContent = '₦ 1,000.00';
  ThirdDiv.appendChild(span3);
  divElement.appendChild(ThirdDiv);

  const h34 = createElement('h3');
  const p4 = createElement('p');
  h34.textContent = 'Description';
  FourthDiv.appendChild(h34);
  p4.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, architecto similique. Veniam, vero. Sint temporibus, aliquam necessitatibus ratione explicabo aut amet. Sed, autem. Fuga, magni voluptas quos molestiae porro officia?';
  p4.className = 'wrap';
  FourthDiv.appendChild(p4);
  divElement.appendChild(FourthDiv);
  const FifthDivChild = createElement('div');
  const button1 = createElement('button');
  button1.setAttribute('onclick', "openModal('modal')");
  button1.className = 'edit-btn';
  const i1 = createElement('i');
  i1.className = 'fa fa-edit';
  button1.appendChild(i1);
  const button2 = createElement('button');
  button2.className = 'del-btn';
  const i2 = createElement('i');
  i2.className = 'fa fa-trash';
  button2.appendChild(i2);
  FifthDivChild.appendChild(button1);
  button2.setAttribute('onclick', 'openDelModal()');
  button2.className = 'del-btn';
  i2.className = 'fa fa-trash';
  FifthDivChild.appendChild(button2);
  FifthDiv.appendChild(FifthDivChild);
  divElement.appendChild(FifthDiv);
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
