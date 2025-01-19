var i = 0;
var txt1 = 'guilherme@guilherme:~ $ me -h'; // Texto da primeira linha
var txt2 = 'guilherme@guilherme ~ $ glow interests.md'; // Texto da segunda linha
var speed = 50; // Velocidade de escrita

function typeWriter1() {
  if (i < txt1.length) {
    document.getElementById('txt').innerHTML += txt1.charAt(i);
    i++;
    setTimeout(typeWriter1, speed);
  } else {
    i = 0;
    setTimeout(showBio, 1000); // Mostra o texto principal após a primeira linha
  }
}

function showBio() {
  const bio = document.getElementById('bio');
  bio.style.opacity = 1; // Aparece com fade-in
  setTimeout(typeWriter2, 1000); // Após o fade-in, exibe a segunda linha
}

function typeWriter2() {
  if (i < txt2.length) {
    document.getElementById('txt1').innerHTML += txt2.charAt(i);
    i++;
    setTimeout(typeWriter2, speed);
  }
}

typeWriter1();
