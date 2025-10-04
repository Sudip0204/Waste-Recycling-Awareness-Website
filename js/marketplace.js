// Sample product data - In a real application, this would come from a backend API
const sampleProducts = [
    {
        id: 1,
        title: "Recycled Paper Bundle",
        category: "Paper & Cardboard",
        condition: "New",
        location: "Mumbai Central",
        price: 299,
        image: "https://placehold.co/300x200"
    },
    {
        id: 2,
        title: "Used Electronics Lot",
        category: "Electronics",
        condition: "Used",
        location: "Andheri East",
        price: 1499,
        image: "https://placehold.co/300x200"
    },
    {
        id: 3,
        title: "Metal Scrap Collection",
        category: "Metal & Scrap",
        condition: "Used",
        location: "Bandra West",
        price: 899,
        image: "https://placehold.co/300x200"
    },
    // Add more sample products as needed
];

// State management
let state = {
    products: [...sampleProducts],
    filters: {
        categories: new Set(),
        priceMin: null,
        priceMax: null,
        conditions: new Set(),
        searchQuery: '',
        location: ''
    },
    sort: 'newest',
    page: 1,
    itemsPerPage: 9
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const locationInput = document.getElementById('locationInput');
const sortSelect = document.getElementById('sortSelect');
const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const btnApplyFilters = document.querySelector('.btn-apply');
const btnResetFilters = document.querySelector('.btn-reset');
const btnLoadMore = document.querySelector('.btn-load-more');
const shownCount = document.getElementById('shown');
const totalCount = document.getElementById('total');

// Helper Functions
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-meta">
                    <span>Category: ${product.category}</span><br>
                    <span>Location: ${product.location}</span><br>
                    <span>Condition: ${product.condition}</span>
                </div>
                <div class="product-price">₹${product.price}</div>
            </div>
            <div class="product-actions">
                <button class="btn-request" onclick="requestItem(${product.id})">Request Item</button>
            </div>
        </div>
    `;
}

function updateProductsDisplay() {
    let filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);
    const paginatedProducts = paginateProducts(sortedProducts);
    
    renderProducts(paginatedProducts);
    updateCounters(filteredProducts.length);
    updateLoadMoreButton(filteredProducts.length);
}

function filterProducts() {
    return state.products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase());
        const matchesLocation = !state.filters.location || 
            product.location.toLowerCase().includes(state.filters.location.toLowerCase());
        const matchesCategory = state.filters.categories.size === 0 || 
            state.filters.categories.has(product.category);
        const matchesCondition = state.filters.conditions.size === 0 || 
            state.filters.conditions.has(product.condition);
        const matchesPrice = (!state.filters.priceMin || product.price >= state.filters.priceMin) &&
            (!state.filters.priceMax || product.price <= state.filters.priceMax);

        return matchesSearch && matchesLocation && matchesCategory && 
               matchesCondition && matchesPrice;
    });
}

function sortProducts(products) {
    const sortedProducts = [...products];
    switch (state.sort) {
        case 'price_low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            // In a real app, this would sort by popularity metrics
            break;
        case 'newest':
        default:
            // Assuming the array is already sorted by newest
            break;
    }
    return sortedProducts;
}

function paginateProducts(products) {
    const startIndex = 0;
    const endIndex = state.page * state.itemsPerPage;
    return products.slice(startIndex, endIndex);
}

function renderProducts(products) {
    productsGrid.innerHTML = products.map(createProductCard).join('');
}

function updateCounters(totalItems) {
    const shownItems = Math.min(state.page * state.itemsPerPage, totalItems);
    shownCount.textContent = shownItems;
    totalCount.textContent = totalItems;
}

function updateLoadMoreButton(totalItems) {
    const hasMore = state.page * state.itemsPerPage < totalItems;
    btnLoadMore.style.display = hasMore ? 'inline-block' : 'none';
}

// Event Handlers
function handleSearch() {
    state.filters.searchQuery = searchInput.value;
    state.page = 1;
    updateProductsDisplay();
}

function handleLocationChange() {
    state.filters.location = locationInput.value;
    state.page = 1;
    updateProductsDisplay();
}

function handleSortChange() {
    state.sort = sortSelect.value;
    updateProductsDisplay();
}

function handleFilterChange() {
    state.filters.categories.clear();
    state.filters.conditions.clear();
    
    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const filterGroup = checkbox.closest('.filter-group');
            if (filterGroup.querySelector('h3').textContent === 'Categories') {
                state.filters.categories.add(checkbox.value);
            } else if (filterGroup.querySelector('h3').textContent === 'Condition') {
                state.filters.conditions.add(checkbox.value);
            }
        }
    });

    state.filters.priceMin = priceMinInput.value ? Number(priceMinInput.value) : null;
    state.filters.priceMax = priceMaxInput.value ? Number(priceMaxInput.value) : null;
    
    state.page = 1;
    updateProductsDisplay();
}

function handleLoadMore() {
    state.page++;
    updateProductsDisplay();
}

function requestItem(productId) {
    // In a real app, this would open a modal or navigate to a request form
    alert(`Request sent for product ID: ${productId}`);
}

// Event Listeners
searchInput.addEventListener('input', debounce(handleSearch, 300));
locationInput.addEventListener('input', debounce(handleLocationChange, 300));
sortSelect.addEventListener('change', handleSortChange);
btnApplyFilters.addEventListener('click', handleFilterChange);
btnResetFilters.addEventListener('click', () => {
    filterCheckboxes.forEach(checkbox => checkbox.checked = true);
    priceMinInput.value = '';
    priceMaxInput.value = '';
    handleFilterChange();
});
btnLoadMore.addEventListener('click', handleLoadMore);

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateProductsDisplay();
});