let i = 0;
const commands = ['whoami', 'cowsay "Hello, World!"'];
let currentCommand = 0;
const speed = 50;
const elementIds = ['txt', 'txt1'];

function typeWriter() {
  if (i < commands[currentCommand].length) {
    document.getElementById(elementIds[currentCommand]).innerHTML +=
      commands[currentCommand].charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    i = 0;
    switch (currentCommand) {
      case 0:
        setTimeout(() => {
          showElement('list');
          showElement('bio');
          currentCommand++;
          typeWriter();
        }, 1000);
        break;
      case 1:
        setTimeout(() => showElement('cowsay'), 1000);
        break;
    }
  }
}

function showElement(elementId) {
  const element = document.getElementById(elementId);
  element.style.opacity = 1;
  element.style.transform = 'translateY(0)';
}

document.addEventListener('DOMContentLoaded', typeWriter);
