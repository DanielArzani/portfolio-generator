const inquirer = require("inquirer");
//? Don't need this since we are now using generate-site.js from the utils
// const fs = require("fs");
const { writeFile, copyFile } = require("./utils/generate-site.js");
const generatePage = require(`./src/page-template.js`);

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
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });

// promptUser()
//   .then(promptProject)
//   .then((portfolioData) => {
//     const pageHTML = generatePage(portfolioData);

//     // Data, Options, Callback-Function
//     fs.writeFile("./dist/index.html", pageHTML, (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log(
//         "Page created! Check out index.html in this directory to see it!"
//       );

//       // Src, Destination, Callback-Function
//       fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
//         if (err) {
//           console.log(err);
//           // If theres an error this will stop the if statement
//           return;
//         }
//         console.log("Style sheet copied successfully!");
//       });
//     });
//   });
