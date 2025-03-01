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
                let overviewText = overviewElem.querySelector('p').innerText.trim();
                const dotIndex = overviewText.indexOf('.');
                if (dotIndex !== -1) {
                    overviewText = overviewText.substring(0, dotIndex + 1);
                }
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

            // Extract the technologies
            const skillsContainer = doc.getElementById("skills");
            if (skillsContainer) {
                const codeElements = skillsContainer.querySelectorAll("code");
                const skills = Array.from(codeElements).map(el => el.textContent.trim());

                const cardSkillsContainer = card.querySelector(".portfolio-skills-content");
                if (cardSkillsContainer) {
                    cardSkillsContainer.innerHTML = "";
                    skills.forEach(skill => {
                        const div = document.createElement("div");
                        div.className = "skill-item";
                        const p = document.createElement("p");
                        p.textContent = skill;
                        div.appendChild(p);
                        cardSkillsContainer.appendChild(div);
                    });
                }
            }
        })
      .catch(err => console.error('Error fetching project data from', projectUrl, err));
    });
});
