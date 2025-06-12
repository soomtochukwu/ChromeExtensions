// Enhanced Portal Extension Script
class RickyPortal {
  constructor() {
    this.dimensions = [
      "C-137",
      "J19ζ7",
      "C-500A",
      "C-35",
      "J-22",
      "C-1239",
      "Φ-214",
      "Ω-616",
      "C-999",
      "J-420",
      "X-241",
      "Z-808",
      "C-064",
      "Ψ-999",
      "Δ-137",
    ];
    this.currentDimension = "C-137";
    this.searchSuggestions = [
      "ethereum price",
      "opensea trending",
      "metamask setup",
      "uniswap tutorial",
      "nft marketplace",
      "defi protocols",
      "blockchain explorer",
      "crypto news",
      "web3 development",
      "smart contracts",
      "portal gun blueprints",
      "multiverse theory",
    ];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeBackground();
    this.loadUserPreferences();
    this.setupSearch();
    this.createFloatingParticles();
  }

  setupEventListeners() {
    const searchInput = document.getElementById("searchInput");
    const dimensionBtn = document.querySelector(".dimension-btn");
    const homeDimensionBtn = document.querySelector(".home-dimension-btn");

    // Search functionality
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.handleSearch(e.target.value);
      }
    });

    searchInput.addEventListener("input", (e) => {
      this.showSearchSuggestions(e.target.value);
    });

    // Dimension jumping
    dimensionBtn.addEventListener("click", () => {
      this.jumpDimension();
    });
    homeDimensionBtn.addEventListener("click", () => {
      this.returnToHomeDimension();
    });

    // Portal effects on card hover
    document.querySelectorAll(".action-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });

    // Background click to hide suggestions
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        this.hideSuggestions();
      }
    });
  }

  initializeBackground() {
    // Add dynamic background elements
    const bgAnimation = document.querySelector(".bg-animation");

    // Create additional portal rings
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement("div");
      ring.className = "portal-ring";
      ring.style.width = `${400 + i * 200}px`;
      ring.style.height = `${400 + i * 200}px`;
      ring.style.animationDelay = `${i * 2}s`;
      ring.style.opacity = `${0.3 - i * 0.1}`;
      bgAnimation.appendChild(ring);
    }
  }

  createFloatingParticles() {
    const particleContainer = document.querySelector(".particles");

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 4 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.background = this.getRandomColor();
      particle.style.borderRadius = "50%";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${
        Math.random() * 10 + 10
      }s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particleContainer.appendChild(particle);
    }
  }

  getRandomColor() {
    const colors = ["#00ff9d", "#ff006e", "#8338ec", "#3a86ff", "#06ffa5"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  handleSearch(query) {
    if (!query.trim()) return;

    // Show portal effect
    this.showPortalEffect();

    // Detect search type and redirect accordingly
    setTimeout(() => {
      if (this.isUrl(query)) {
        window.location.href = query.startsWith("http")
          ? query
          : `https://${query}`;
      } else if (query.includes(".eth") || query.includes("0x")) {
        // Ethereum address or ENS domain
        window.location.href = `https://etherscan.io/search?q=${encodeURIComponent(
          query
        )}`;
      } else if (
        query.toLowerCase().includes("nft") ||
        query.toLowerCase().includes("opensea")
      ) {
        window.location.href = `https://opensea.io/search?q=${encodeURIComponent(
          query
        )}`;
      } else {
        // Default to Google search
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`;
      }
    }, 1000);
  }

  isUrl(string) {
    try {
      new URL(string.startsWith("http") ? string : `https://${string}`);
      return string.includes(".");
    } catch {
      return false;
    }
  }

  showSearchSuggestions(query) {
    const suggestionsContainer = document.getElementById("suggestions");

    if (!query.trim()) {
      this.hideSuggestions();
      return;
    }

    const filteredSuggestions = this.searchSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    suggestionsContainer.innerHTML = filteredSuggestions
      .slice(0, 5)
      .map(
        (suggestion) => `
              <div class="suggestion-item" onclick="portal.selectSuggestion('${suggestion}')">
                  <span class="suggestion-icon">🔍</span>
                  <span class="suggestion-text">${suggestion}</span>
              </div>
          `
      )
      .join("");

    this.showSuggestions();
  }

  showSuggestions() {
    const suggestionsContainer = document.getElementById("suggestions");
    if (!suggestionsContainer.classList.contains("suggestions-visible")) {
      // Create suggestions container styling if not exists
      if (!document.querySelector(".suggestions-style")) {
        const style = document.createElement("style");
        style.className = "suggestions-style";
        style.textContent = `
                  .search-suggestions {
                      position: absolute;
                      top: 100%;
                      left: 0;
                      right: 0;
                      background: rgba(0, 0, 0, 0.9);
                      border: 1px solid rgba(0, 255, 157, 0.3);
                      border-top: none;
                      border-radius: 0 0 15px 15px;
                      backdrop-filter: blur(20px);
                      max-height: 200px;
                      overflow-y: auto;
                      z-index: 100;
                      opacity: 0;
                      transform: translateY(-10px);
                      transition: all 0.3s ease;
                  }
                  .search-suggestions.suggestions-visible {
                      opacity: 1;
                      transform: translateY(0);
                  }
                  .suggestion-item {
                      padding: 1rem;
                      display: flex;
                      align-items: center;
                      gap: 0.5rem;
                      cursor: pointer;
                      transition: background 0.2s ease;
                      border-bottom: 1px solid rgba(0, 255, 157, 0.1);
                  }
                  .suggestion-item:hover {
                      background: rgba(0, 255, 157, 0.1);
                  }
                  .suggestion-item:last-child {
                      border-bottom: none;
                  }
                  .suggestion-icon {
                      color: #00ff9d;
                  }
                  .suggestion-text {
                      color: #ffffff;
                      font-size: 0.9rem;
                  }
              `;
        document.head.appendChild(style);
      }

      suggestionsContainer.classList.add("suggestions-visible");
    }
  }

  hideSuggestions() {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.classList.remove("suggestions-visible");
    setTimeout(() => {
      suggestionsContainer.innerHTML = "";
    }, 300);
  }

  selectSuggestion(suggestion) {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = suggestion;
    this.hideSuggestions();
    this.handleSearch(suggestion);
  }

  jumpDimension() {
    const dimensionElement = document.getElementById("dimension");
    const newDimension =
      this.dimensions[Math.floor(Math.random() * this.dimensions.length)];

    // Portal effect
    this.showPortalEffect();

    setTimeout(() => {
      this.currentDimension = newDimension;
      dimensionElement.textContent = newDimension;

      // Change background slightly
      this.updateDimensionTheme();

      // Save preference
      this.saveUserPreferences();
    }, 500);
  }

  returnToHomeDimension() {
    const dimensionElement = document.getElementById("dimension");
    const newDimension = this.dimensions[this.dimensions.indexOf("C-137")];

    // Portal effect
    this.showPortalEffect();

    setTimeout(() => {
      this.currentDimension = newDimension;
      dimensionElement.textContent = newDimension;

      // Change background slightly
      this.updateDimensionTheme();

      // Save preference
      this.saveUserPreferences();
    }, 500);
  }

  updateDimensionTheme() {
    const themes = {
      "C-137": { primary: "#00ff9d", secondary: "#3a86ff" },
      J19ζ7: { primary: "#ff006e", secondary: "#8338ec" },
      "C-500A": { primary: "#06ffa5", secondary: "#ff7f00" },
      "C-35": { primary: "#3a86ff", secondary: "#00ff9d" },
      "J-22": { primary: "#8338ec", secondary: "#ff006e" },
    };

    const theme = themes[this.currentDimension] || themes["C-137"];

    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primary
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.secondary
    );

    // Update CSS custom properties for theme
    const style = document.createElement("style");
    style.textContent = `
          :root {
              --primary-color: ${theme.primary};
              --secondary-color: ${theme.secondary};
          }
          .portal-icon {
              border-color: var(--primary-color) !important;
          }
          .status-value {
              color: var(--primary-color) !important;
          }
          .search-input:focus {
              border-color: var(--primary-color) !important;
              box-shadow: 0 0 20px ${theme.primary}30, inset 0 0 20px ${theme.primary}10 !important;
          }
          .search-icon {
              color: var(--primary-color) !important;
          }
          .action-card:hover {
              border-color: var(--primary-color) !important;
              box-shadow: 0 10px 30px ${theme.primary}20, inset 0 0 20px ${theme.primary}05 !important;
          }
      `;

    // Remove old theme style if exists
    const oldStyle = document.querySelector(".dimension-theme-style");
    if (oldStyle) oldStyle.remove();

    style.className = "dimension-theme-style";
    document.head.appendChild(style);
  }

  showPortalEffect() {
    const overlay = document.getElementById("portalOverlay");
    overlay.classList.add("active");

    setTimeout(() => {
      overlay.classList.remove("active");
    }, 1500);
  }

  saveUserPreferences() {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({
        currentDimension: this.currentDimension,
        lastVisit: Date.now(),
      });
    } else {
      // Fallback to localStorage for development
      const preferences = {
        currentDimension: this.currentDimension,
        lastVisit: Date.now(),
      };
      // Note: In actual extension, avoid localStorage as mentioned in instructions
      console.log("Saving preferences:", preferences);
    }
  }

  loadUserPreferences() {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["currentDimension", "lastVisit"], (result) => {
        if (result.currentDimension) {
          this.currentDimension = result.currentDimension;
          document.getElementById("dimension").textContent =
            this.currentDimension;
          this.updateDimensionTheme();
        }
      });
    }
  }

  // Web3 specific functions
  detectWeb3() {
    if (typeof window.ethereum !== "undefined") {
      this.addWeb3Features();
    }
  }

  addWeb3Features() {
    // Add Web3 connection status
    const statusBar = document.querySelector(".status-bar");
    const web3Status = document.createElement("div");
    web3Status.className = "status-item";
    web3Status.innerHTML = `
          <span class="status-label">WEB3</span>
          <span class="status-value online">CONNECTED</span>
      `;
    statusBar.appendChild(web3Status);

    // Add wallet connection option
    const walletCard = document.createElement("div");
    walletCard.className = "action-card";
    walletCard.onclick = () => this.connectWallet();
    walletCard.innerHTML = `
          <div class="card-icon">👛</div>
          <div class="card-title">Connect Wallet</div>
          <div class="card-desc">Link your Web3 wallet</div>
      `;

    const quickActions = document.querySelector(".quick-actions");
    quickActions.appendChild(walletCard);
  }

  async connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        this.showNotification("Wallet connected successfully!", "success");
      } catch (error) {
        this.showNotification("Failed to connect wallet", "error");
      }
    } else {
      this.showNotification("No Web3 wallet detected", "warning");
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add notification styles
    const style = document.createElement("style");
    style.textContent = `
          .notification {
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 1rem 1.5rem;
              border-radius: 8px;
              color: white;
              font-family: 'Rajdhani', sans-serif;
              font-weight: 600;
              z-index: 1001;
              animation: slideIn 0.3s ease-out;
          }
          .notification-success { background: rgba(0, 255, 157, 0.9); }
          .notification-error { background: rgba(255, 0, 110, 0.9); }
          .notification-warning { background: rgba(255, 165, 0, 0.9); }
          .notification-info { background: rgba(58, 134, 255, 0.9); }
          
          @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
          }
      `;

    if (!document.querySelector(".notification-style")) {
      style.className = "notification-style";
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideIn 0.3s ease-out reverse";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Easter eggs and special features
  initializeEasterEggs() {
    let konamiCode = [];
    const correctSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];

    document.addEventListener("keydown", (e) => {
      konamiCode.push(e.code);
      if (konamiCode.length > correctSequence.length) {
        konamiCode.shift();
      }

      if (JSON.stringify(konamiCode) === JSON.stringify(correctSequence)) {
        this.activateSecretMode();
        konamiCode = [];
      }
    });
  }

  activateSecretMode() {
    document.body.style.filter = "hue-rotate(180deg)";
    this.showNotification(
      "🚀 Secret Rick Mode Activated! Wubba Lubba Dub Dub!",
      "success"
    );

    // Add special effects
    const specialEffect = document.createElement("div");
    specialEffect.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="50">🛸</text></svg>') repeat;
          animation: float 20s linear infinite;
          z-index: 999;
          opacity: 0.3;
      `;

    document.body.appendChild(specialEffect);

    setTimeout(() => {
      document.body.style.filter = "";
      specialEffect.remove();
    }, 10000);
  }
}

// Portal opening function for quick actions
function openPortal(url) {
  portal.showPortalEffect();
  setTimeout(() => {
    window.open(url, "_blank");
  }, 800);
}

// Initialize the portal when DOM is loaded
let portal;
document.addEventListener("DOMContentLoaded", () => {
  portal = new RickyPortal();
  portal.detectWeb3();
  portal.initializeEasterEggs();
});

// Add some portal-specific utilities
const PortalUtils = {
  generateRandomQuote() {
    const quotes = [
      "Wubba Lubba Dub Dub!",
      "I'm not looking for judgment, just a yes or no - can you assimilate a giraffe?",
      "Sometimes science is more art than science.",
      "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die.",
      "To live is to risk it all, otherwise you're just an inert chunk of randomly assembled molecules.",
      "I turned myself into a pickle! Funniest shit I've ever seen!",
      "Your boos mean nothing, I've seen what makes you cheer.",
      "Being smart is a curse, especially when surrounded by idiots.",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  getDimensionFacts() {
    const facts = [
      "In dimension C-137, Rick is the rickest Rick",
      "Dimension J19ζ7 has the best interdimensional cable",
      "The Citadel of Ricks exists outside normal dimensional space",
      "Some dimensions have fascist governments, others have anarchist societies",
      "Portal travel requires precise mathematical calculations... or just wing it",
      "The multiverse is infinite, meaning infinite Ricks and Mortys",
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  },
};

// Export for potential use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RickyPortal, PortalUtils };
}
