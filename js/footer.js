function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

const lastModified = new Date(document.lastModified);
const currentYear = new Date().getFullYear();

const lastModifiedElement = document.getElementById('footer-last-modified');
if (!isNaN(lastModified)) {
    lastModifiedElement.textContent = formatDate(lastModified);
} else {
    lastModifiedElement.textContent = 'Unknown';
}

const currentYearElement = document.getElementById('footer-current-year');
currentYearElement.textContent = currentYear;
