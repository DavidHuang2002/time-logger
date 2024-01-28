
import { GoogleCalendar } from 'datebook'
import open from 'open';
import fs from "fs"
import path from "path"

/**
 * 
 * @param {*} title event title
 * @param {*} start Date obj - start time
 * @param {*} end Date obj - end time
 */
export const addNewEvent = (title, start, end) => {
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
  
  googleCalendar.setParam("src", "david.j.huang@vanderbilt.edu");
  // googleCalendar.setParam("crm", "AVAILABLE")

  const link = googleCalendar.render();
  // Open the URL in the default web browser
  open(link)
    .then(() => {
      // console.log(`Successfully opened ${link} in the default browser.`);
    })
    .catch((error) => {
      console.error(`Error opening ${link} in the default browser:`, error);
  });
}

export const findMinuteDiff = (start, end)=>{
  const timeDifferenceMilliseconds = end - start;
  const timeDifferenceMinutes = Math.floor(timeDifferenceMilliseconds / (1000 * 60));
  return timeDifferenceMinutes
}

export const printInBold = (msg) => {
  console.log(
    "\x1b[1m" + msg + "\x1b[0m"
  )
}

export function parseTimeOfToday(timeStr) {
    // Extract hours and minutes from the input string
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Get the current date and time
    const now = new Date();
    const currentHours = now.getHours();

    // Determine AM or PM
    let amPm;
    if (currentHours < 12) {
        // If current time is in AM, choose AM if the time is closer to current time, else choose PM
        amPm = (hours <= 12 && hours > currentHours - 12) ? 'AM' : 'PM';
    } else {
        // If current time is in PM, choose PM if the time is closer to current time, else choose AM
        amPm = (hours <= 12 && hours < currentHours - 12) ? 'AM' : 'PM';
    }

    // Create a new Date object with the parsed time
    const parsedDate = new Date();
    parsedDate.setHours(amPm === 'AM' ? hours : hours + 12);
    parsedDate.setMinutes(minutes);
    parsedDate.setSeconds(0);
    parsedDate.setMilliseconds(0);

    return parsedDate;
}


export const addRecord = (dir, record) => {
    // Format today's date as mm-dd-yy
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${String(date.getFullYear()).slice(2)}`;

    // Construct the file path
    const filePath = path.join(dir, `${formattedDate}.txt`);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, so create it and write the record
            fs.writeFile(filePath, record + '\n', (writeErr) => {
                if (writeErr) throw writeErr;
                console.log('File created and record added.');
            });
        } else {
            // File exists, so append the record
            fs.appendFile(filePath, record + '\n', (appendErr) => {
                if (appendErr) throw appendErr;
                console.log('Record appended to file.');
            });
        }
    });
}
