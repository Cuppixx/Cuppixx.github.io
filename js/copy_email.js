document.addEventListener('DOMContentLoaded', function() {
    const copyEmailLink = document.querySelector('.copy-email');
    const emailAddress = 'CuppiXD@gmx.de';

    copyEmailLink.addEventListener('click', function(event) {
        event.preventDefault();

        navigator.clipboard.writeText(emailAddress).then(function() {
            alert('Email address copied to clipboard!');
        }).catch(function(err) {
            console.error('Failed to copy email: ', err);
        });
    });
});
