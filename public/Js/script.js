let i = 0;
const txt1 = 'whoami';
const txt2 = 'cat about.md';
const speed = 50;

function typeWriter1() {
  if (i < txt1.length) {
    document.getElementById('txt').innerHTML += txt1.charAt(i);
    i++;
    setTimeout(typeWriter1, speed);
  } else {
    i = 0;
    setTimeout(showList, 1000);
  }
}

function showList() {
  const list = document.getElementById('list');
  list.style.opacity = 1;
  setTimeout(showBio, 1000);
}

function showBio() {
  const bio = document.getElementById('bio');
  bio.style.opacity = 1;
  setTimeout(typeWriter2, 1000);
}

function typeWriter2() {
  if (i < txt2.length) {
    document.getElementById('txt1').innerHTML += txt2.charAt(i);
    i++;
    setTimeout(typeWriter2, speed);
  }
}

// Inicia a animação quando a página carrega
document.addEventListener('DOMContentLoaded', typeWriter1);
