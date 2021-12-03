const { prompt } = require("inquirer");
const inquirer = require("inquirer");
//^ Will come back to this code later
const fs = require("fs");
const generatePage = require(`./src/page-template.js`);

//^ Will come back to this code later

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github username (Required)",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your github username");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        "Would you like to enter some information about your self for the 'About' section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
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
        message: "What is the name of your project (Required)",
        validate: (projectNameInput) => {
          if (projectNameInput) {
            return true;
          } else {
            console.log("Please enter your project name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (projectDescriptionInput) => {
          if (projectDescriptionInput) {
            return true;
          } else {
            console.log("Please enter a description of the project");
            return false;
          }
        },
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
        validate: (projectLinkInput) => {
          if (projectLinkInput) {
            return true;
          } else {
            console.log("Please enter your github link");
            return false;
          }
        },
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
    const pageHTML = generatePage(portfolioData);

    // Data, Options, Callback-Function
    fs.writeFile("index.html", pageHTML, (err) => {
      if (err) throw new Error(err);
    });
  });
