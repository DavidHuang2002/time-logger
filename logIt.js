import { GoogleCalendar } from 'datebook'
import open from 'open';




/**
 * 
 * @param {*} title event title
 * @param {*} start Date obj - start time
 * @param {*} end Date obj - end time
 */
const addNewEvent = (title, start, end) => {
  const googleCalendar = new GoogleCalendar({
    title: title,
    // location: 'The Bar, New York, NY',
    // description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
    start: start,
    end: end,
    // recurrence: {
    //   frequency: 'WEEKLY',
    //   interval: 2
    // }
  })

  const link = googleCalendar.render();
  // Open the URL in the default web browser
  open(link)
    .then(() => {
      console.log(`Successfully opened ${link} in the default browser.`);
    })
    .catch((error) => {
      console.error(`Error opening ${link} in the default browser:`, error);
  });
}


const main = ()=>{
  const args = process.argv;
  if (args.length < 3) {
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

main()