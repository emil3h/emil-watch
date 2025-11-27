import { watches } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const watchList = document.getElementById('watch-list');
    const brandFilters = document.getElementById('brand-filters');
    const modal = document.getElementById('watch-modal');
    const closeModal = document.querySelector('.close-button');
    
    // Modal elements
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalBrand = document.getElementById('modal-brand');
    const modalPrice = document.getElementById('modal-price');
    const modalMovement = document.getElementById('modal-movement');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    let activeFilter = 'All';

    // Initialize the app
    function init() {
        renderFilters();
        renderWatches(watches);
    }

    // Get unique brands
    function getBrands() {
        const brands = new Set(watches.map(watch => watch.brand));
        return ['All', ...Array.from(brands).sort()];
    }

    // Render Filters
    function renderFilters() {
        const brands = getBrands();
        brandFilters.innerHTML = '';

        brands.forEach(brand => {
            const button = document.createElement('button');
            button.className = `filter-pill ${brand === activeFilter ? 'active' : ''}`;
            button.textContent = brand;
            button.addEventListener('click', () => {
                activeFilter = brand;
                updateFilters();
                filterWatches();
            });
            brandFilters.appendChild(button);
        });
    }

    // Update active filter visual state
    function updateFilters() {
        const buttons = brandFilters.querySelectorAll('.filter-pill');
        buttons.forEach(btn => {
            if (btn.textContent === activeFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Filter watches based on active filter
    function filterWatches() {
        if (activeFilter === 'All') {
            renderWatches(watches);
        } else {
            const filtered = watches.filter(watch => watch.brand === activeFilter);
            renderWatches(filtered);
        }
    }

    // Render Watch Cards
    function renderWatches(items) {
        watchList.innerHTML = '';
        items.forEach(watch => {
            const card = document.createElement('div');
            card.className = 'watch-card';
            card.innerHTML = `
                <img src="${watch.image}" alt="${watch.brand} ${watch.model}" loading="lazy" style="${watch.imageStyle || ''}">
                <div class="card-info">
                    <div class="card-brand">${watch.brand}</div>
                    <h3 class="card-title">${watch.model}</h3>
                </div>
            `;
            card.addEventListener('click', () => openModal(watch));
            watchList.appendChild(card);
        });
    }

    // Open Modal
    function openModal(watch) {
        modalImage.src = watch.image;
        modalImage.style = watch.imageStyle || ''; // Apply custom style
        modalTitle.textContent = watch.model;
        modalBrand.textContent = watch.brand;
        modalPrice.textContent = watch.price;
        modalMovement.textContent = watch.movement;
        modalDescription.textContent = watch.description;
        modalLink.href = watch.link;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close Modal
    function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeModal.addEventListener('click', closeModalHandler);

    // Close on click outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });
    
    // Close on Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalHandler();
        }
    });

    init();
});

