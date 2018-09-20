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