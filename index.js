// Your code here
function createEmployeeRecord (employeeInfo)
{
    const employee ={
        firstName:employeeInfo[0], 
        familyName:employeeInfo[1],
        title:employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
        
    return employee;
}


function createEmployeeRecords(arrayOfRecords)
{
    let newRecord=arrayOfRecords.map((record)=>createEmployeeRecord(record))


    return newRecord;
}
function createTimeInEvent(record,stamp){
    let [date,hour]= stamp.split(' ')
    let timeInEvent={
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    record.timeInEvents.push(timeInEvent);
    return record;

}

function createTimeOutEvent(record,stamp){
    let[date,hour]= stamp.split(' ')
    let timeOutEvent={
        type :"TimeOut",
        hour: parseInt(hour),
        date: date
    }
    record.timeOutEvents.push(timeOutEvent);
    return record;
}
function hoursWorkedOnDate(record,date){
   let timeIn= record.timeInEvents.find(recordl => recordl.date===date );
   let timeOut= record.timeOutEvents.find(recordl=>recordl.date===date);
   console.log(timeIn,timeOut)
    return (timeOut.hour/100)-(timeIn.hour/100);

}
function wagesEarnedOnDate(record,date) {
    let payOwed = hoursWorkedOnDate(record,date) * record.payPerHour;
    return payOwed;
}
function allWagesFor (record){
    
    let timestamps = record.timeInEvents.map(timestamp=> wagesEarnedOnDate(record,timestamp.date))
  
    return timestamps.reduce((accumulator,currentValue)=> accumulator+currentValue,0);

}
function calculatePayroll(allEmployees){
    
    return  allEmployees.reduce((accumulator,employee)=> accumulator+allWagesFor(employee),0);

    
}