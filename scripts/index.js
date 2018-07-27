console.log('js');

class Employee {
    constructor(firstName, lastName, employeeIDNum, employeeTitle, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeIDNum = employeeIDNum;
        this.employeeTitle = employeeTitle;
        this.annualSalary = annualSalary;
    }//end constructor
}//end class


$(document).ready(onReady);

function onReady(){
    //submit button click event listener
    $('#submit').click(addEmployee);
}

//variable to hold monthly cost
let monthlyCost = 0;

//array to hold employees
const employeeArr = [];

/* later add local storage of employees for testing */

/* function to add employee to table/DOM/array */
function addEmployee(){
    console.log('in addEmployee');

    //get values form input fields
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let employeeTitle = $('#employeeTitle').val();
    let salary = $('#salary').val();

    //create new Employee class instance
    let newEmployee = new Employee ( firstName, lastName, employeeID, employeeTitle, salary); 
    //add employee to array
    employeeArr.push(newEmployee);

    //append employee to table on DOM
        //append delete button
    $('#tableBody').append('<tr>' +'<th>' + firstName +'</th>' + 
                            '<th>' + lastName + '</th>' + 
                            '<th>' + employeeID + '</th>' + 
                            '<th>' + employeeTitle + '</th>' + 
                            '<th>' + salary + '</th>' + 
                            '<th><button class="removeBtn" ></button></th>' +
                            '</tr>');

    //call function to calc monthly cost
    calcCost(employeeArr);
} 

/* function to remove employees and re-calc monthly cost */

/* function to run through array of employees and calc monthly cost */
function calcCost(employeeArr){

    //for loop to iterate over employees

        //assign salary to a number
        //make 

}

