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
    setTimeout(typeWriter2, 1000);
  }
}

function typeWriter2() {
  if (i < txt2.length) {
    document.getElementById('txt1').innerHTML += txt2.charAt(i);
    i++;
    setTimeout(typeWriter2, speed);
  }
}

typeWriter1();
