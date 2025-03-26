// Configuration object for better organization
const config = {
  commands: ['whoami', 'ls -la', 'cowsay "Hello, World!"', 'neofetch'],
  typeSpeed: 50,
  pauseBetweenCommands: 1000,
  elements: {
    terminals: ['txt', 'txt1', 'txt2', 'txt3'],
    reveals: ['list', 'bio', 'cowsay', 'system-info']
  },
  cursor: '▋', // Terminal cursor character
  accessibility: {
    ariaLive: 'polite',
    announceCommands: true
  }
};

// Animation state
const state = {
  currentCommand: 0,
  currentCharIndex: 0,
  cursorVisible: true,
  animationActive: true
};

/**
 * Terminal animation controller
 * Handles typing animation and revealing elements
 */
class TerminalAnimator {
  constructor(config) {
    this.config = config;
    this.state = state;
    this.cursorInterval = null;
    this.initialized = false;
  }

  /**
   * Initialize the animation
   */
  init() {
    if (this.initialized) return;
    
    this.setupAccessibility();
    this.startCursorBlink();
    this.typeNextCommand();
    
    // Add keyboard handler for accessibility
    document.addEventListener('keydown', (e) => {
      // Skip animation on Escape key
      if (e.key === 'Escape' && this.state.animationActive) {
        this.skipAnimation();
      }
    });
    
    this.initialized = true;
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Add ARIA live regions for screen readers
    if (this.config.accessibility.announceCommands) {
      this.config.elements.terminals.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.setAttribute('aria-live', this.config.accessibility.ariaLive);
        }
      });
    }
  }

  /**
   * Start the cursor blinking effect
   */
  startCursorBlink() {
    this.cursorInterval = setInterval(() => {
      this.state.cursorVisible = !this.state.cursorVisible;
      this.updateCurrentCommandDisplay();
    }, 500);
  }

  /**
   * Type the current command character by character
   */
  typeNextCommand() {
    if (!this.state.animationActive) return;
    
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

  /**
   * Update the current command's display with characters typed so far
   */
  updateCurrentCommandDisplay() {
    const { currentCommand, currentCharIndex, cursorVisible } = this.state;
    const command = this.config.commands[currentCommand];
    const typed = command.substring(0, currentCharIndex);
    const cursor = cursorVisible ? this.config.cursor : '';

    const elementId = this.config.elements.terminals[currentCommand];
    const element = document.getElementById(elementId);

    if (element) {
      element.innerHTML = typed + cursor;
      
      // Update for screen readers (if needed)
      if (currentCharIndex === command.length && this.config.accessibility.announceCommands) {
        element.setAttribute('aria-label', `Command: ${typed}`);
      }
    }
  }

  /**
   * Execute the command and show associated elements
   */
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
      } else {
        // All commands are finished
        this.state.animationActive = false;
        
        // Hide skip button if it exists
        const skipButton = document.getElementById('skip-animation');
        if (skipButton) {
          skipButton.style.display = 'none';
        }
      }
    }, this.config.pauseBetweenCommands);
  }

  /**
   * Show the element with a smooth animation
   */
  revealElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('visible');
      element.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * Skip animation and show all elements
   */
  skipAnimation() {
    // Show all elements immediately
    this.config.elements.reveals.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('visible');
        element.setAttribute('aria-hidden', 'false');
      }
    });

    // Show all command text
    this.config.elements.terminals.forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = this.config.commands[index];
        element.setAttribute('aria-label', `Command: ${this.config.commands[index]}`);
      }
    });

    // Clear intervals and stop animation
    clearInterval(this.cursorInterval);
    this.state.animationActive = false;

    // Hide the skip button
    const skipButton = document.getElementById('skip-animation');
    if (skipButton) {
      skipButton.style.display = 'none';
    }
  }
}

// Start the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animator = new TerminalAnimator(config);
  animator.init();

  // Add skip button functionality
  const skipButton = document.getElementById('skip-animation');
  if (skipButton) {
    skipButton.addEventListener('click', () => {
      animator.skipAnimation();
    });
  } else {
    // Create skip button if it doesn't exist
    const button = document.createElement('button');
    button.id = 'skip-animation';
    button.textContent = 'Skip Animation';
    button.setAttribute('aria-label', 'Skip the terminal typing animation');
    button.addEventListener('click', () => {
      animator.skipAnimation();
    });
    document.body.appendChild(button);
  }
});

