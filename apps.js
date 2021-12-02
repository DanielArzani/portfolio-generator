// Cut everything off in the array after process.argv[1]
const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);

const printProfileData = (profileDataArr) => {
  profileDataArr.forEach((element, index, array) => {
    console.log(element, index, array);
  });
};

printProfileData(profileDataArgs);
