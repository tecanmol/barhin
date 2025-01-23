class Wishlist {
  constructor() {
    this.wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    this.initializeHearts();
    this.displayWishlistItems();
  }

  initializeHearts() {
    // Target both types of heart buttons
    const heartButtons = document.querySelectorAll('.heart-btn');
    
    heartButtons.forEach(button => {
      const productId = button.dataset.productId;
      const heartIcon = button.querySelector('ion-icon'); // Changed to target ion-icon directly
      
      // Set initial state
      if (this.isInWishlist(productId)) {
        heartIcon.setAttribute('name', 'heart');
        button.classList.add('active');
      }

      // Add click listener
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleWishlistItem(productId, button, heartIcon);
      });
    });
  }

  isInWishlist(productId) {
    return this.wishlistItems.includes(productId);
  }

  toggleWishlistItem(productId, button, heartIcon) {
    if (this.isInWishlist(productId)) {
      // Remove from wishlist
      this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
      heartIcon.setAttribute('name', 'heart-outline');
      button.classList.remove('active');
    } else {
      // Add to wishlist
      this.wishlistItems.push(productId);
      heartIcon.setAttribute('name', 'heart');
      button.classList.add('active');
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    // Update wishlist count
    this.updateWishlistCount();
  }

  updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
      wishlistCount.textContent = this.wishlistItems.length;
    }
  }

  displayWishlistItems() {
    const wishlistContainer = document.querySelector('.wishlist-items');
    const emptyWishlist = document.querySelector('.empty-wishlist');
    
    if (!wishlistContainer) return; // Not on wishlist page
    
    if (this.wishlistItems.length === 0) {
      emptyWishlist.style.display = 'block';
      return;
    }

    // Clear existing items
    wishlistContainer.innerHTML = '';

    // Create product cards for each wishlist item
    this.wishlistItems.forEach(productId => {
      const productCard = this.createProductCard(productId);
      wishlistContainer.appendChild(productCard);
    });
  }

  createProductCard(productId) {
    const card = document.createElement('div');
    card.className = 'wishlist-item showcase';

    // Find product details from the data-product-id
    const productElement = document.querySelector(`[data-product-id="${productId}"]`).closest('.showcase');
    
    if (productElement) {
      const productImage = productElement.querySelector('.product-img').src;
      const productTitle = productElement.querySelector('.showcase-title').textContent;
      const productPrice = productElement.querySelector('.price').textContent;
      
      card.innerHTML = `
        <div class="showcase-banner">
          <img src="${productImage}" alt="${productTitle}" class="product-img" width="300">
          <button class="remove-btn" data-product-id="${productId}">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        
        <div class="showcase-content">
          <h3>
            <a href="#" class="showcase-title">${productTitle}</a>
          </h3>
          <div class="price-box">
            <p class="price">${productPrice}</p>
          </div>
        </div>
      `;

      // Add remove button listener
      card.querySelector('.remove-btn').addEventListener('click', () => {
        this.removeFromWishlist(productId);
        card.remove();
        this.updateWishlistCount();
        if (this.wishlistItems.length === 0) {
          document.querySelector('.empty-wishlist').style.display = 'block';
        }
      });
    }

    return card;
  }

  removeFromWishlist(productId) {
    this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    
    // Update heart button if it exists on the page
    const heartBtn = document.querySelector(`.heart-btn[data-product-id="${productId}"]`);
    if (heartBtn) {
      heartBtn.classList.remove('active');
      heartBtn.querySelector('ion-icon').setAttribute('name', 'heart-outline');
    }
  }
}

// Initialize wishlist when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Wishlist();
}); 