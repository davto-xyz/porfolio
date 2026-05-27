// Only run in browser environment
if (typeof window !== 'undefined') {
  let isButtonVisible = false;
  
  function showButton(btn) {
    if (!isButtonVisible) {
      isButtonVisible = true;
      btn.style.display = "block";
      btn.classList.remove('hide', 'animate-out');
      btn.classList.add('show', 'animate-in');
      
      // Clean up animation class after animation completes
      setTimeout(() => {
        btn.classList.remove('animate-in');
      }, 500);
    }
  }
  
  function hideButton(btn) {
    if (isButtonVisible) {
      isButtonVisible = false;
      btn.classList.remove('show', 'animate-in');
      btn.classList.add('hide', 'animate-out');
      
      // Hide element after animation completes
      setTimeout(() => {
        btn.style.display = "none";
        btn.classList.remove('animate-out');
      }, 400);
    }
  }

  function toTop(){
    let ticking = false;
    
    window.addEventListener("scroll", function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          const btn = document.getElementById("topbutton");
          if (btn) {
            const shouldShow = window.scrollY > 200;
            
            if (shouldShow && !isButtonVisible) {
              showButton(btn);
            } else if (!shouldShow && isButtonVisible) {
              hideButton(btn);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTopButton);
  } else {
    initializeTopButton();
  }

  function initializeTopButton() {
    // Initialize scroll listener
    toTop();

    // Add click handler for the button
    const topButton = document.getElementById("topbutton");
    if (topButton) {
      topButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }
}