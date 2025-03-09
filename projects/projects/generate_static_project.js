const fs = require("fs").promises;
const path = require("path");

async function generateProject(templatePath, outputPath, data) {
    try {
        let template = await fs.readFile(templatePath, "utf-8");

        for (let key in data) {
            template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
        }

        await fs.writeFile(outputPath, template, "utf-8");
        console.log(`Successfully generated: ${outputPath}`);
    } catch (error) {
        console.error("Error generating project file:", error);
    }
}

// FILL OUT!!!
const fileData = {
    folder_name: "Template",
    file_name: "template.html",
};

const projectData = {
    html_title: "Cuppixx - Project Template",
    project_title: "Repo / Project Title",
    project_type: "Academic, Personal, Professional, Self-Educational, etc.",
    project_category: "Educational, Game, Software, Template, etc.",

    project_technologies: "<code>Language/Framework/Tool 1</code>, <code>Language/Framework/Tool 2</code>, <code>Language/Framework/Tool 3</code>",

    project_role: "Advisor, Backend, Designer, Frontend, Fullstack, Solo developer, Team lead, etc.",
    project_date: "Start Date - End Date",
    project_overview: `
        A brief description of the project (2-3 sentences), highlighting the purpose, goals, and key features.
        Also mention any unique or interesting aspects of the project.
    `,
    project_links: `
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-thumbtack"></i>Project Repository</a><b class="large-bold">|</b>
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-globe"></i>Live Demo / Website</a><b class="large-bold">|</b>
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i>Video / Showcase</a>
    `,
    project_images: '["../../../../images/placeholder.jpg", "../../../../images/profile.png", "../../../../images/profile_alt.png"]',
    project_image_main: "../../../../images/placeholder.jpg",

    project_contributions_list: `
        <li>List specific tasks or roles you had within the project.</li>
        <li>Highlight what you personally added or developed.</li>
        <li>Focus on measurable outcomes or key functionality you delivered.</li>
    `,
    project_challenges_list: `
        <li>Describe any major technical challenges you faced.</li>
        <li>Mention the solutions or approaches you implemented to overcome them.</li>
    `,
    project_results_list: `
        <li>Quantify the success of the project (e.g., user engagement, performance improvements, etc.).</li>
        <li>Mention any relevant feedback, metrics, or achievements tied to this project.</li>    
    `,
};
///////////////////////////////////////////////////////

const templatePath = path.join(__dirname, "generation_template.html");
const outputPath = path.join(__dirname, fileData.folder_name, fileData.file_name);

generateProject(templatePath, outputPath, projectData);
