/**
 * Projects page terminal animation
 * Simulates typing a 'ls' command and displays project list
 */
document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const config = {
    commandElement: document.getElementById('txt3'),
    outputElement: document.getElementById('directory-output'),
    commandText: 'ls',
    typeSpeed: 50,
    revealDelay: 500,
    itemAnimationDelay: 100,
    accessibility: {
      ariaLive: 'polite',
      announceCommands: true
    }
  };

  // Animation state
  const state = {
    charIndex: 0,
    isTyping: true,
    isComplete: false
  };

  // Setup accessibility
  function setupAccessibility() {
    if (config.accessibility.announceCommands && config.commandElement) {
      config.commandElement.setAttribute('aria-live', config.accessibility.ariaLive);
    }
    
    // Set aria-hidden on projects until they're revealed
    if (config.outputElement) {
      config.outputElement.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Type the command character by character
   */
  function typeWriter() {
    if (!config.commandElement || state.charIndex >= config.commandText.length) {
      finishTyping();
      return;
    }

    config.commandElement.textContent += config.commandText.charAt(state.charIndex);
    state.charIndex++;
    setTimeout(typeWriter, config.typeSpeed);
  }

  /**
   * Complete the typing animation and show projects
   */
  function finishTyping() {
    if (state.isComplete) return;
    
    state.isTyping = false;
    
    if (config.commandElement) {
      config.commandElement.style.animation = 'none';
      
      // For screen readers
      if (config.accessibility.announceCommands) {
        config.commandElement.setAttribute('aria-label', `Command: ${config.commandText}`);
      }
    }
    
    if (config.outputElement) {
      config.outputElement.classList.add('visible');
      config.outputElement.setAttribute('aria-hidden', 'false');
      animateListItems();
    }
    
    state.isComplete = true;
  }

  /**
   * Animate project list items sequentially
   */
  function animateListItems() {
    const listItems = document.querySelectorAll('.project-list li');
    
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * config.itemAnimationDelay);
    });
  }

  /**
   * Skip the animation
   */
  function skipAnimation() {
    if (state.isComplete) return;
    
    // Complete the command
    if (config.commandElement) {
      config.commandElement.textContent = config.commandText;
      
      if (config.accessibility.announceCommands) {
        config.commandElement.setAttribute('aria-label', `Command: ${config.commandText}`);
      }
    }
    
    finishTyping();
  }

  // Initialize the projects page
  function init() {
    setupAccessibility();
    
    // Set initial styles for animation
    document.querySelectorAll('.project-list li').forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'all 0.3s ease-out';
    });
    
    // Start typing after a short delay
    setTimeout(typeWriter, config.revealDelay);
    
    // Add keyboard handler for accessibility
    document.addEventListener('keydown', (e) => {
      // Skip animation on Escape key
      if (e.key === 'Escape' && state.isTyping) {
        skipAnimation();
      }
    });
  }

  // Start the animation
  init();
});
