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

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your first name?",
    },
  ])
  .then((answers) => {
    console.log(answers);
  });
