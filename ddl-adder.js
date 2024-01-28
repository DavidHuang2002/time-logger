import { GoogleCalendar } from 'datebook'
import open from 'open';
import { parse } from 'date-fns';




/**
 * 
 * @param {*} title event title
 * @param {*} start Date obj - start time
 * @param {*} end Date obj - end time
 */
const addNewDDL = (title, date) => {
  const googleCalendar = new GoogleCalendar({
    title: title,
    // location: 'The Bar, New York, NY',
    // description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
    start: date,
    // recurrence: {
    //   frequency: 'WEEKLY',
    //   interval: 2
    // }
  })
  
  googleCalendar.setParam("src", "david.j.huang@vanderbilt.edu");
  // googleCalendar.setParam("crm", "AVAILABLE")

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
  const title = args[2] + " due"
  // time taken in minutes
  const dateInput = args[3]
  const date = parse(`24-${dateInput}`, 'yy-MM-dd', new Date());
  addNewDDL(title, date);
}

main()