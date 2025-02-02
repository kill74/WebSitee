document.addEventListener('DOMContentLoaded', () => {
  const commandElement = document.getElementById('txt3');
  const directoryOutput = document.getElementById('directory-output');
  const commandText = 'ls';
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < commandText.length) {
      commandElement.textContent += commandText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    } else {
      commandElement.style.animation = 'none';
      directoryOutput.classList.add('visible');
      animateListItems();
    }
  }

  function animateListItems() {
    const listItems = document.querySelectorAll('.project-list li');
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100);
    });
  }

  // Inicia animação após 500ms
  setTimeout(typeWriter, 500);

  // Configura animação inicial dos itens
  document.querySelectorAll('.project-list li').forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.3s ease-out';
  });
});
