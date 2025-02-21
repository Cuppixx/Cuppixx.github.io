function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

const lastModified = new Date(document.lastModified);
const currentYear = new Date().getFullYear();

if (!isNaN(lastModified)) {
    document.getElementById('footer-text').textContent =
        'Last Edited: ' + formatDate(lastModified) + ' © ' + currentYear + ' Cuppixx';
} else {
    document.getElementById('footer-text').textContent =
        'Last Edited: Unknown © ' + currentYear + ' Cuppixx';
}
 