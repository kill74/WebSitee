// Configuration object for better organization
const config = {
  commands: ['whoami', 'ls -la', 'cowsay "Hello, World!"', 'neofetch'],
  typeSpeed: 50,
  pauseBetweenCommands: 1000,
  elements: {
    terminals: ['txt', 'txt1', 'txt2', 'txt3'],
    reveals: ['list', 'bio', 'cowsay', 'system-info']
  },
  cursor: '▋' // Terminal cursor character
};

// Animation state
let state = {
  currentCommand: 0,
  currentCharIndex: 0,
  cursorVisible: true
};

// Terminal animation controller
class TerminalAnimator {
  constructor(config) {
    this.config = config;
    this.state = state;
    this.cursorInterval = null;
  }

  // Initialize the animation
  init() {
    this.startCursorBlink();
    this.typeNextCommand();
  }

  // Start the cursor blinking effect
  startCursorBlink() {
    this.cursorInterval = setInterval(() => {
      this.state.cursorVisible = !this.state.cursorVisible;
      this.updateCurrentCommandDisplay();
    }, 500);
  }

  // Type the current command character by character
  typeNextCommand() {
    const { currentCommand, currentCharIndex } = this.state;
    const command = this.config.commands[currentCommand];

    if (currentCharIndex < command.length) {
      this.state.currentCharIndex++;
      this.updateCurrentCommandDisplay();
      setTimeout(() => this.typeNextCommand(), this.config.typeSpeed);
    } else {
      // Command finished typing
      this.executeCommand();
    }
  }

  // Update the current command's display with characters typed so far
  updateCurrentCommandDisplay() {
    const { currentCommand, currentCharIndex, cursorVisible } = this.state;
    const command = this.config.commands[currentCommand];
    const typed = command.substring(0, currentCharIndex);
    const cursor = cursorVisible ? this.config.cursor : '';

    const elementId = this.config.elements.terminals[currentCommand];
    const element = document.getElementById(elementId);

    if (element) {
      element.innerHTML = typed + cursor;
    }
  }

  // Execute the command and show associated elements
  executeCommand() {
    const { currentCommand } = this.state;
    const revealElement = this.config.elements.reveals[currentCommand];

    setTimeout(() => {
      // Show the result element with animation
      this.revealElement(revealElement);

      // Prepare for next command
      if (currentCommand < this.config.commands.length - 1) {
        this.state.currentCommand++;
        this.state.currentCharIndex = 0;
        setTimeout(() => this.typeNextCommand(), this.config.pauseBetweenCommands);
      }
    }, this.config.pauseBetweenCommands);
  }

  // Show the element with a smooth animation
  revealElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('visible');
    }
  }
}

// Start the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animator = new TerminalAnimator(config);
  animator.init();

  // Optional: add skip button functionality
  const skipButton = document.getElementById('skip-animation');
  if (skipButton) {
    skipButton.addEventListener('click', () => {
      // Show all elements immediately
      config.elements.reveals.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.classList.add('visible');
      });

      // Clear intervals and stop animation
      clearInterval(animator.cursorInterval);

      // Hide the skip button
      skipButton.style.display = 'none';
    });
  }
});

