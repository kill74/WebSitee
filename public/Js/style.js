var i = 0;
var txt = 'guilherme@guilherme:~ $ me -h ';
var speed = 50; // duração do efeito em milissegundos

function typeWriter() {
  if (i < txt.length) {
    document.getElementById('demo').innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();
