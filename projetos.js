let i = 0;
const txt3 = 'ls';
const speed = 50;

function typeWriter3() {
  if (i < txt3.length) {
    document.getElementById('txt3').innerHTML += txt3.charAt(i);
    i++;
    setTimeout(typeWriter3, speed);
  } else {
    setTimeout(showDirectory, 1000);
  }
}

function showDirectory() {
  const dirOutput = document.getElementById('directory-output');
  dirOutput.style.opacity = 1;
}

// Start animation when projects page loads
document.addEventListener('DOMContentLoaded', typeWriter3);
