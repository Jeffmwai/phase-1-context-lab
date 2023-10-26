function createEmployeeRecord(employee) {
    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate.call(this, date);
    }, 0);
    return totalWages;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  }
  