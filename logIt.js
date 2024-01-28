import { addNewEvent } from "./common.js";



const main = ()=>{
  const args = process.argv;
  if (args.length < 4) {
    console.error('Please provide one or more arguments.');
    process.exit(1); // Exit the script with an error code
  }
  // // Loop through and display the provided arguments
  // for (let i = 2; i < args.length; i++) {
  //   console.log(`Argument ${i - 1}: ${args[i]}`);
  // }
  const title = args[2]
  // time taken in minutes
  const timeTaken = parseInt(args[3]) || 25

  const curTime = new Date();
  const startTime = new Date(curTime.getTime() - timeTaken * 60000);

  addNewEvent(title, startTime, curTime);
}


// This code block will only execute if the script is run directly
main();

