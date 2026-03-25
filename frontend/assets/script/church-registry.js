// Church Registry System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initializeMobileMenu();
    
    // Initialize form validations
    initializeFormValidations();
    
    // Initialize modals
    initializeModals();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize tooltips
    initializeTooltips();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 1001;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        padding: 0.75rem;
        font-size: 1.25rem;
        cursor: pointer;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('show');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggle.contains(e.target) && 
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
    
    // Show/hide mobile menu based on screen size
    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 768) {
            toggle.style.display = 'block';
            sidebar.classList.remove('show');
        } else {
            toggle.style.display = 'none';
            sidebar.classList.remove('show');
        }
    });
    
    // Initial check
    if (window.innerWidth <= 768) {
        mobileMenuToggle.style.display = 'block';
    }
}

// Form Validations
function initializeFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner"></span> Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    showToast('Success!', 'Form submitted successfully', 'success');
                    
                    // Reset form if it's not the login form
                    if (!form.id || form.id !== 'loginForm') {
                        form.reset();
                        // Close modal if it's in one
                        const modal = form.closest('[style*="position: fixed"]');
                        if (modal) {
                            modal.style.display = 'none';
                        }
                    }
                }, 1500);
            }
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
            
            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (field.type === 'tel') {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(field.value) || field.value.length < 10) {
                    showFieldError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = 'var(--danger-color)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--danger-color);
        font-size: 0.75rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Modal Functions
function initializeModals() {
    // Add global modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: white;
            border-radius: var(--radius-lg);
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(modalStyles);
}

function showAddMemberModal() {
    const modal = document.getElementById('addMemberModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal-backdrop');
        const content = modal.querySelector('div[style*="background: white"]');
        if (content) {
            content.classList.add('modal-content');
        }
    }
}

function hideAddMemberModal() {
    const modal = document.getElementById('addMemberModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal-backdrop');
    }
}

function showAddSacramentModal() {
    const modal = document.getElementById('addSacramentModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal-backdrop');
        const content = modal.querySelector('div[style*="background: white"]');
        if (content) {
            content.classList.add('modal-content');
        }
    }
}

function hideAddSacramentModal() {
    const modal = document.getElementById('addSacramentModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal-backdrop');
    }
}

function showAddEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal-backdrop');
        const content = modal.querySelector('div[style*="background: white"]');
        if (content) {
            content.classList.add('modal-content');
        }
    }
}

function hideAddEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal-backdrop');
    }
}

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation (in a real app, this would route to different pages)
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchButtons = document.querySelectorAll('button');
    
    searchButtons.forEach(button => {
        if (button.textContent.includes('Search')) {
            button.addEventListener('click', function() {
                showToast('Search', 'Search functionality coming soon!', 'info');
            });
        }
    });
    
    // Search input functionality
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Simple search filtering (in a real app, this would query a backend)
            if (searchTerm.length > 2) {
                console.log('Searching for:', searchTerm);
                // Implement search logic here
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value;
                if (searchTerm) {
                    showToast('Search', `Searching for "${searchTerm}"...`, 'info');
                }
            }
        });
    });
}

// Tooltips
function initializeTooltips() {
    // Add tooltip functionality
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--text-primary);
                color: white;
                padding: 0.5rem;
                border-radius: var(--radius-sm);
                font-size: 0.75rem;
                z-index: 3000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
}

// Toast Notifications
function showToast(title, message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    }[type] || 'ℹ️';
    
    toast.innerHTML = `
        <span style="font-size: 1.25rem;">${icon}</span>
        <div>
            <div style="font-weight: 600;">${title}</div>
            <div style="font-size: 0.875rem; color: var(--text-secondary);">${message}</div>
        </div>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.25rem; padding: 0; margin-left: auto;">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 2000;
    `;
    document.body.appendChild(container);
    return container;
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// Export/Print functionality
function exportData(type) {
    showToast('Export', `Exporting ${type} data...`, 'info');
    // In a real app, this would generate and download a file
}

function printData(type) {
    showToast('Print', `Preparing ${type} for printing...`, 'info');
    // In a real app, this would open a print-friendly view
    window.print();
}

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .sidebar, .header, .btn, .mobile-menu-toggle {
            display: none !important;
        }
        
        .main-content {
            margin-left: 0 !important;
        }
        
        .card {
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #ddd;
        }
        
        .table {
            font-size: 0.75rem;
        }
    }
`;
document.head.appendChild(printStyles);

// Login form specific handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                showToast('Error', 'Please fill in all fields', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner"></span> Signing in...';
            submitButton.disabled = true;
            
            // Simulate login
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showToast('Success!', 'Login successful', 'success');
                
                // Redirect to dashboard (in a real app)
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        });
    }
});

// Table row actions
document.addEventListener('click', function(e) {
    if (e.target.closest('button')) {
        const button = e.target.closest('button');
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('👁️') || buttonText.includes('View')) {
            showToast('View', 'Opening details...', 'info');
        } else if (buttonText.includes('✏️') || buttonText.includes('Edit')) {
            showToast('Edit', 'Opening edit form...', 'info');
        } else if (buttonText.includes('🗑️') || buttonText.includes('Delete')) {
            if (confirm('Are you sure you want to delete this item?')) {
                showToast('Deleted', 'Item deleted successfully', 'success');
                // In a real app, this would delete the item
                const row = button.closest('tr');
                if (row) {
                    row.style.opacity = '0.5';
                    setTimeout(() => row.remove(), 500);
                }
            }
        } else if (buttonText.includes('📄') || buttonText.includes('Document')) {
            showToast('Document', 'Generating document...', 'info');
        } else if (buttonText.includes('📥') || buttonText.includes('Export')) {
            exportData('table');
        } else if (buttonText.includes('🖨️') || buttonText.includes('Print')) {
            printData('table');
        }
    }
});

// Pagination
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-sm')) {
        const button = e.target.closest('.btn-sm');
        const buttonText = button.textContent.trim();
        
        if (/^\d+$/.test(buttonText)) {
            // Page number
            showToast('Pagination', `Loading page ${buttonText}...`, 'info');
            // In a real app, this would load the specific page
        } else if (buttonText === '←' || buttonText === '→') {
            // Previous/Next
            showToast('Pagination', `Loading ${buttonText === '←' ? 'previous' : 'next'} page...`, 'info');
        }
    }
});

// Filter functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn') && e.target.closest('.btn').textContent.includes('Apply Filters')) {
        showToast('Filters', 'Applying filters...', 'info');
        // In a real app, this would apply the selected filters
    }
    
    if (e.target.closest('.btn') && e.target.closest('.btn').textContent.includes('Clear')) {
        // Clear all filter inputs
        const filterCard = e.target.closest('.card');
        if (filterCard) {
            const inputs = filterCard.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
        }
        showToast('Filters', 'Filters cleared', 'success');
    }
});
