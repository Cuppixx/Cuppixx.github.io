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

            // Extract the project category
            const categoryElem = doc.getElementById('project-category');
            if (categoryElem) {
                let categoryText = categoryElem.innerText.trim();
                const commaIndex = categoryText.indexOf(',');
                if (commaIndex !== -1) {
                    categoryText = categoryText.substring(0, commaIndex).trim();
                }
                card.querySelector('.project-category').innerText = "Category: " + categoryText;
            }

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

            // Extract and apply skills
            const skillColors = {
                languages: "#354a78",
                engines: "#6e5494",
                frameworks: "#3b6e3f",
                tools: "#753636",
                practices: "#7a612a"
            };

            const skillCategories = {
                languages: ["C++", "Rust", "C#", "GDScript", "GLSL", "Python", "Java", "SQL", "JavaScript", "HTML", "CSS"],
                engines: ["Bevy", "Godot", "Unreal"],
                frameworks: ["Tensorflow", "Keras", "Django", "React"],
                tools: ["Git", "GitHub", "OpenGL", "Vulkan", "Docker", "Kubernetes", "MariaDB", "SQLite"],
                practices: ["Agile", "Scrum", "REST", "GraphQL"]
            };

            const skillToColorMap = {};
            for (const [category, skills] of Object.entries(skillCategories)) {
                const color = skillColors[category] || "#957bb5";
                skills.forEach(skill => {
                    skillToColorMap[skill] = color;
                });
            }

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

                        const categoryColor = skillToColorMap[skill] || "#957bb5";
                        div.style.setProperty("--bg-color", categoryColor);

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
