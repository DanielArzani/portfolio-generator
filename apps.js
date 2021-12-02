const { prompt } = require("inquirer");
const inquirer = require("inquirer");
//^ Will come back to this code later
// const fs = require("fs");
// const generatePage = require(`./src/page-template.js`);

// const pageHTML = generatePage(Name, Github);

// // Data, Options, Callback-Function
// fs.writeFile("index.html", pageHTML, (err) => {
//   if (err) throw err;
//   console.log("Portfolio complete! Check out index.html to see the output!");
// });
//^ Will come back to this code later

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your first name?",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github username",
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself",
    },
  ]);
};
// Name is the key of the key:value pair
// Default lets you set the default value if nothing is entered
// Notice that the key names use camelCasing
const promptProject = (portfolioData) => {
  console.log(`
  =================
  Add a New Project
  =================
  `);

  //This is for adding multiple projects
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project",
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the Github link to your project (Required)",
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        // We have to return the portfolioData in the else statement explicitly so that the object is returned. This is a critical step to retrieving the user's answer and building an HTML template.
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    console.log(portfolioData);
  });
