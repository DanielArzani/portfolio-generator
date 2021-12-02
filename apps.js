const fs = require("fs");
const generatePage = require(`./src/page-template.js`);

// Cut everything off in the array after process.argv[1]
const profileDataArgs = process.argv.slice(2);

const [Name, Github] = profileDataArgs;

// Data, Options, Callback-Function
fs.writeFile("index.html", generatePage(Name, Github), (err) => {
  if (err) throw err;
  console.log("Portfolio complete! Check out index.html to see the output!");
});
