var i = 0;
var txt1 = 'guilherme@guilherme:~ $ me -h ';
var txt2 = 'guilherme@guilherme ~ $ glow interests.md';
var speed = 50;

function typeWriter1() {
  if (i < txt1.length) {
    document.getElementById('txt').innerHTML += txt1.charAt(i);
    i++;
    setTimeout(typeWriter1, speed);
  } else {
    i = 0;
    setTimeout(showBio, 1000); // Exibe o texto principal após a primeira linha
  }
}

function showBio() {
  const bio = document.getElementById('bio');
  bio.style.opacity = 1;
  bio.style.transition = 'opacity 2s'; // Adiciona o fade-in ao texto principal
  setTimeout(typeWriter2, 1000); // Inicia a segunda linha após o texto principal aparecer
}

function typeWriter2() {
  if (i < txt2.length) {
    document.getElementById('txt2').innerHTML += txt2.charAt(i);
    i++;
    setTimeout(typeWriter2, speed);
  }
}

typeWriter1();
