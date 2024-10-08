const currentPage = window.location.pathname.split('/').pop();

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll("nav ul li a").forEach(link => { console.log(link);
        if (link.getAttribute('href') === currentPage) {
            link.classList.add("active");
        }
    });
});