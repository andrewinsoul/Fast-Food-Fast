const navToggler = document.getElementById('toggler');
const navBtn = document.getElementById('btn-i');
const assitLink = document.getElementById('support-links');
function openToggler() {
  navBtn.className = 'fa fa-close';
  assitLink.style.display = 'block';
  navToggler.onclick = "closeToggler()"
}
 function closeToggler() {
   navBtn.className = 'fa fa-bars'
   assitLink.style.display = 'none'
 }