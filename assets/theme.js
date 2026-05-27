/* By Shopify Partner ak44sh - High-Performance Brutalist Theme */

(function() {
  'use strict';

  
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('is-open');
      
      const svg = hamburger.querySelector('svg');
      if (isOpen) {
        svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
      } else {
        svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
      }
    });
  }


  
  const cartToggle = document.getElementById('cart-drawer-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartClose = document.getElementById('cart-drawer-close');
  const cartContinue = document.getElementById('cart-continue-shopping');

  function openCartDrawer() {
    if (cartDrawer) cartDrawer.classList.add('is-open');
    if (cartOverlay) cartOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (cartDrawer) cartDrawer.classList.remove('is-open');
    if (cartOverlay) cartOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (cartToggle) cartToggle.addEventListener('click', openCartDrawer);
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
  if (cartContinue) cartContinue.addEventListener('click', closeCartDrawer);


  
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  initReveal();


  
  const productForm = document.querySelector('[data-product-form]');

  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(productForm);
      const submitBtn = productForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Adding...';

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(function(response) { return response.json(); })
      .then(function(data) {
        // Fetch fresh HTML to update the drawer seamlessly
        fetch(window.location.href)
          .then(function(res) { return res.text(); })
          .then(function(html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newDrawer = doc.getElementById('cart-drawer');
            if (newDrawer && cartDrawer) {
              cartDrawer.innerHTML = newDrawer.innerHTML;
            }
            updateCartCount();
            openCartDrawer();
            
            submitBtn.textContent = '✓ Added';
            setTimeout(function() {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }, 2000);
          });
      })
      .catch(function(error) {
        console.error('Error:', error);
        submitBtn.textContent = 'Error';
        setTimeout(function() {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      });
    });
  }

  // Handle Cart Drawer Quantity and Remove Actions
  document.addEventListener('click', function(e) {
    const qtyBtn = e.target.closest('.quantity-selector__btn');
    const removeBtn = e.target.closest('.cart-item__remove');
    
    if (qtyBtn) {
      const line = qtyBtn.getAttribute('data-line');
      const action = qtyBtn.getAttribute('data-action');
      const input = document.querySelector(`input.quantity-selector__input[data-line="${line}"]`);
      
      if(input) {
        let qty = parseInt(input.value);
        if (action === 'increase') qty++;
        if (action === 'decrease') qty--;
        if (qty < 0) qty = 0;
        
        input.value = qty;
        updateCartItem(line, qty);
      }
    }
    
    if (removeBtn) {
      const line = removeBtn.getAttribute('data-line');
      updateCartItem(line, 0);
    }
  });

  function updateCartItem(line, quantity) {
    if (cartDrawer) {
      cartDrawer.style.opacity = '0.5';
      cartDrawer.style.pointerEvents = 'none';
    }
    
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line: line, quantity: quantity })
    })
    .then(function(response) { return response.json(); })
    .then(function(cart) {
      fetch(window.location.href)
        .then(function(res) { return res.text(); })
        .then(function(html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newDrawer = doc.getElementById('cart-drawer');
          if (newDrawer && cartDrawer) {
            cartDrawer.innerHTML = newDrawer.innerHTML;
            cartDrawer.style.opacity = '1';
            cartDrawer.style.pointerEvents = 'auto';
            
            // Re-bind the close/continue buttons inside the newly swapped HTML
            const newCartClose = document.getElementById('cart-drawer-close');
            const newCartContinue = document.getElementById('cart-continue-shopping');
            if (newCartClose) newCartClose.addEventListener('click', closeCartDrawer);
            if (newCartContinue) newCartContinue.addEventListener('click', closeCartDrawer);
          }
          updateCartCount();
        });
    })
    .catch(function(error) {
      console.error('Error:', error);
      if (cartDrawer) {
        cartDrawer.style.opacity = '1';
        cartDrawer.style.pointerEvents = 'auto';
      }
    });
  }


  
  function updateCartCount() {
    fetch('/cart.js')
      .then(function(r) { return r.json(); })
      .then(function(cart) {
        var countEls = document.querySelectorAll('.cart-count');
        countEls.forEach(function(el) {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      });
  }


  
  document.querySelectorAll('.marquee-bar__inner, .marquee-section__inner').forEach(function(el) {
    var innerHTML = el.innerHTML;
    el.innerHTML = innerHTML + innerHTML;
  });

})();
