document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
  
    projectCards.forEach(card => {
      const projectUrl = card.getAttribute('data-project-url');
      if (!projectUrl) return;
  
      fetch(projectUrl)
        .then(response => response.text())
        .then(html => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the title
            const titleElem = doc.getElementById('project-title');
            if (titleElem) {
                const fullTitle = titleElem.innerText.trim();
                card.querySelector('h3').innerText = fullTitle;
            }
    
            // Extract the overview text
            const overviewElem = doc.getElementById('project-overview');
            if (overviewElem) {
                const overviewText = overviewElem.querySelector('p').innerText.trim();
                card.querySelector('.project-card-content p').innerText = overviewText;
            }
    
            // Extract the image
            const imageElem = doc.querySelector('#project-image img');
            if (imageElem) {
                card.querySelector('img').src = imageElem.src;
            }
    
            // Extract the source link
            const repoLinkElem = doc.getElementById('project-repository');
            if (repoLinkElem) {
                card.querySelector('.project-card-content a').href = repoLinkElem.href;
            }
        })
        .catch(err => console.error('Error fetching project data from', projectUrl, err));
    });
});
  