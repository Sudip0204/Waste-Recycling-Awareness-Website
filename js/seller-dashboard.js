// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar navigation
    initSidebarNav();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize table sorting
    initTableSort();
    
    // Initialize action buttons
    initActionButtons();
});

// Sidebar navigation functionality
function initSidebarNav() {
    const navItems = document.querySelectorAll('.sidebar-nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.header-search input');
    const searchButton = document.querySelector('.header-search button');
    
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

function performSearch(query) {
    // This would typically make an API call to search products
    console.log('Searching for:', query);
    
    // For demonstration, let's filter the table rows
    const tables = document.querySelectorAll('.table tbody');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Table sorting functionality
function initTableSort() {
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
            header.style.cursor = 'pointer';
        });
    });
}

function sortTable(table, column) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumeric = column === 0 || column === 4; // ID or price columns

    // Sort the rows
    rows.sort((a, b) => {
        const aValue = a.cells[column].textContent.trim();
        const bValue = b.cells[column].textContent.trim();

        if (isNumeric) {
            return parseFloat(aValue.replace(/[^\d.-]/g, '')) - 
                   parseFloat(bValue.replace(/[^\d.-]/g, ''));
        }
        return aValue.localeCompare(bValue);
    });

    // Remove existing rows
    rows.forEach(row => tbody.removeChild(row));
    // Add sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Action buttons functionality
function initActionButtons() {
    // Edit buttons
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function(e) {
            const row = e.target.closest('tr');
            const id = row.cells[0].textContent;
            editItem(id);
        });
    });

    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function(e) {
            const row = e.target.closest('tr');
            const id = row.cells[0].textContent;
            deleteItem(id);
        });
    });

    // View buttons
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', function(e) {
            const row = e.target.closest('tr');
            const id = row.cells[0].textContent;
            viewItem(id);
        });
    });

    // Process buttons
    document.querySelectorAll('.btn-process').forEach(button => {
        button.addEventListener('click', function(e) {
            const row = e.target.closest('tr');
            const id = row.cells[0].textContent;
            processItem(id);
        });
    });
}

// Action functions
function editItem(id) {
    console.log('Editing item:', id);
    // Implement edit functionality
    // This would typically open a modal or navigate to an edit page
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        console.log('Deleting item:', id);
        // Implement delete functionality
        // This would typically make an API call to delete the item
    }
}

function viewItem(id) {
    console.log('Viewing item:', id);
    // Implement view functionality
    // This would typically open a modal or navigate to a details page
}

function processItem(id) {
    console.log('Processing item:', id);
    // Implement process functionality
    // This would typically update the item's status
}

// Notification badge updates
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-bell .badge');
    badge.textContent = count;
    badge.style.display = count > 0 ? '' : 'none';
}

// Message badge updates
function updateMessageBadge(count) {
    const badge = document.querySelector('.messages .badge');
    badge.textContent = count;
    badge.style.display = count > 0 ? '' : 'none';
}