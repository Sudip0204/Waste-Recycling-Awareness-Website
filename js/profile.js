document.addEventListener('DOMContentLoaded', function() {
    // Load profile info from sessionStorage or use defaults
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileType = document.getElementById('profileType');
    const detailName = document.getElementById('detailName');
    const detailEmail = document.getElementById('detailEmail');
    const detailPhone = document.getElementById('detailPhone');
    const detailType = document.getElementById('detailType');

    let user = JSON.parse(sessionStorage.getItem('newUser')) || {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1 234 567 8901',
        userType: 'User'
    };

    function renderProfile() {
        profileName.textContent = user.fullName;
        profileEmail.textContent = user.email;
        profileType.textContent = user.userType;
        detailName.textContent = user.fullName;
        detailEmail.textContent = user.email;
        detailPhone.textContent = user.phone;
        detailType.textContent = user.userType;
    }
    renderProfile();

    // Edit profile logic
    const editBtn = document.getElementById('editBtn');
    const editForm = document.getElementById('editForm');
    const cancelBtn = document.getElementById('cancelEditBtn');

    editBtn.addEventListener('click', function() {
        editForm.style.display = 'flex';
        editBtn.style.display = 'none';
        document.getElementById('editName').value = user.fullName;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editPhone').value = user.phone;
        document.getElementById('editType').value = user.userType;
    });

    cancelBtn.addEventListener('click', function() {
        editForm.style.display = 'none';
        editBtn.style.display = 'inline-block';
    });

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        user.fullName = document.getElementById('editName').value.trim();
        user.email = document.getElementById('editEmail').value.trim();
        user.phone = document.getElementById('editPhone').value.trim();
        user.userType = document.getElementById('editType').value;
        sessionStorage.setItem('newUser', JSON.stringify(user));
        renderProfile();
        editForm.style.display = 'none';
        editBtn.style.display = 'inline-block';
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        sessionStorage.clear();
        window.location.href = 'login.html';
    });
});
