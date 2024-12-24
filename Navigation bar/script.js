    document.addEventListener('DOMContentLoaded', function() {
        const navItems = document.querySelectorAll('li');

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
