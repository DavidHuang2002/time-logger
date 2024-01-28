import { input, confirm} from '@inquirer/prompts';
import select from '@inquirer/select';
import { addNewEvent, printInBold, findMinuteDiff, parseTimeOfToday, addRecord} from './common.js'

// const taskName = await input({ message: 'What task will you be focusing on' });
// const time = await input({ message: 'How long do you think it will take' });

const saveDir = "/Users/davidhuang/Desktop/Project/coding-projects/time-logger/time-record"

const main = async (args)=>{
  if (args.length < 3) {
    console.error('Please provide one or more arguments.');
    process.exit(1); // Exit the script with an error code
  }

  const taskName = args[2]
  // time taken in minutes
  const estimatedDuration = parseInt(args[3]) || 25

  const startTime = new Date();
  const estimatedEndTime = new Date(startTime.getTime() + estimatedDuration * 60000);
  
  printInBold(`Expect to finish at: ${formatTimeToStr(estimatedEndTime)}.`)
  const ans = await select({message: "select a choice", choices: actionChoices})

  await handleAnswer(ans, taskName, startTime, estimatedDuration)
}

// finished earlier but forgot to log
const LOG = "log"
const actionChoices = [
  {
    value: 'done',
    default: true
  },
  // {
  //   name: 'log a todo',
  //   value: "todo"
  // },
  {
    name: 'Finished but forgot to log? Log it with a prior end time',
    value: LOG
  },
  // when abort ask for reason
  {
    value: 'Abort'
  }
]


const handleAnswer = (ans, taskName, startTime, estimatedDuration) =>{
  switch(ans){
    case "done":
      return handleDone(taskName, startTime, estimatedDuration)
    case LOG:
      return handleLog(taskName, startTime, estimatedDuration)
  }
}

const handleDone = (taskName, startTime, estimatedDuration)=>{
  const endTime = new Date();
  recordFinishedEvent(taskName, startTime, endTime, estimatedDuration)
}

const handleLog = async (taskName, startTime, estimatedDuration) => {
  const inputEndTime  = await input({
    message: "what time did you finish? (in HH:MM)"
  })

  const endTime = parseTimeOfToday(inputEndTime)

  recordFinishedEvent(taskName, startTime, endTime, estimatedDuration)
}

const recordFinishedEvent = (taskName, startTime, endTime, estimatedDuration) => {
  addNewEvent(taskName, startTime, endTime); 
  const minutesSpent = findMinuteDiff(startTime, endTime)
  const overTime = minutesSpent - estimatedDuration

  printInBold(`You spent ${minutesSpent} minutes on ${taskName}`)
  printInBold(`${overTime} minutes more than expected ${estimatedDuration} minutes`)
  askDescriptionAndSave(taskName, startTime, endTime, minutesSpent, overTime)
}

const askDescriptionAndSave = async (taskName, startTime, endTime, minutesSpent, overTime) =>{
  const inputDesc = await input({
    message: "Care to log a more detailed description? (enter to skip)\n",
  })

  let saveMsg = "Spend " + minutesSpent + " on " + taskName
  if(inputDesc.trim() != ""){
    saveMsg += "Details: " + inputDesc
  }
  saveMsg += "\n"

  addRecord(saveDir, saveMsg)

  printInBold("Nice job finishing " + taskName + "!")
}



const formatTimeToStr = (time)=>{
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  return formattedTime
}


// -----------------------------

const args = process.argv;
const a = await main(args);
