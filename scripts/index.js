/* jshint esversion: 6 */

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
    $('#submit').click(checkEmployees);

    $('table').on('click', '.removeBtn', removeEmployee);

    //test by adding employees
    createEmployeeRoster();
}

//variable to hold monthly cost
let monthlyCost = 0;

//array to hold employees
let employeeArr = [];

/* function to reset form */
function resetForm(){
    //reset form
    $('form')[0].reset();

    //remove invalid warnings
    setTimeout(function () {
        $('form').removeClass('was-validated');
    }, 1);
}//end resetForm
/*************************/

/* function to test adding employees and save in localStorage*/
function createEmployeeRoster(){
    console.log('in createEmployeeRoster');
    
    if (typeof localStorage !== "undefined") {

        //get array from localStorage
        employeeArr = JSON.parse(localStorage.getItem('employeeArr'));

        //if array is empty build default array
        if(employeeArr == null){

            //reset as empty
            employeeArr = [];

            console.log('Fill table with roster of employees')

            addEmployee('Daniel', 'MacKay', 4066, 'Developer', 1);
            addEmployee('Travis', 'Smith', 5646, 'Sales', '$60,000.00');
            addEmployee('Bruce', 'Wayne', 8471, 'CEO', '1,000,000,000.00' );
            addEmployee('Tony', 'Stark', 57421, 'Chief Engineer', '1,000,000,001');

            //store employeeArr in localStorage
            localStorage.setItem('employeeArr', JSON.stringify(employeeArr));
        }

        //check if array is empty
        else if(employeeArr != null && employeeArr.length == 0){
            console.log('Fill table with roster of employees')

            addEmployee('Daniel', 'MacKay', 4066, 'Developer', 1);
            addEmployee('Travis', 'Smith', 5646, 'Sales', '$60,000.00');
            addEmployee('Bruce', 'Wayne', 8471, 'CEO', '1,000,000,000.00');
            addEmployee('Tony', 'Stark', 57421, 'Chief Engineer', '1,000,000,001');
        }

        else{
            //console.log('loop employeeArr');
        
            //get array from localStorage
            employeeArr = JSON.parse(localStorage.getItem('employeeArr'));
            console.log(employeeArr);

            for(let employee of employeeArr){
                prependEmployee(employee);
            }
        }
    }
}//end createEmployeeRoster
/*************************************/

/* function to check if employee already exists */
function checkEmployees(){
    console.log('in checkEmployees');
    //get employeeID from DOM
    let employeeID = $('#employeeID').val();
    
    //console.log('entered id: ', employeeID);
    //if employee array has employees
    if(employeeArr.length > 0 && employeeID.length >= 4){
        console.log('we have employees');
        //loop through employee array to check if employee already exists
        for (let i = 0; i <= employeeArr.length; i++) {
            //console.log(employeeArr[i]);
            if(i == employeeArr.length){
                getValues();
            }
            else if(employeeArr[i].employeeIDNum == employeeID){
                //console.log('Employee already exists');
                alert('Employee with that ID number already exists');

                resetForm();

                return false;
            }
        }
    }
    else if(employeeID.length > 0 && employeeID.length < 4){
      console.log('Please enter an ID of 4 or more digits.');
      alert('Please enter an ID of 4 or more digits.');
      resetForm();
    } 
    else{
        getValues();
    }
}//end checkEmployees
/******************************/

/* Getting values from the DOM input fields, and adding the 
employee to an array and DOM, are seperate functions so I can 
continue to test adding employees in the console instead of 
filling out the form on the DOM. */     

/* function to get values from DOM */
function getValues(){
    console.log('in getValues');

    //get values form input fields
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let employeeTitle = $('#employeeTitle').val();
    let salary = $('#salary').val();

    console.log(employeeID.length);

    //make sure values are input
    if(firstName.length > 0 && lastName.length > 0 && employeeID.length >= 4 
        && employeeTitle.length > 0 && salary.length > 0){
            
            console.log(firstName, lastName, employeeID, employeeTitle, salary);
            addEmployee(firstName, lastName, employeeID, employeeTitle, salary);
    }
  
}//end getValues
/***********************************/

//function to add employee to array
function addEmployee(firstName, lastName, employeeID, employeeTitle, annualSalary){
    console.log('in add employee');
    
    //change annualSalary to string
    let salary = annualSalary.toString();

    //remove any commas from salary
    salary = salary.replace(/[,$]/g, '');
    console.log(salary);

    //change salary to a number
    salary = parseFloat(salary);

    if(typeof salary === 'number' && salary >= 0){
        console.log(salary);
        //create new Employee class instance
        let newEmployee = new Employee(firstName, lastName, employeeID, employeeTitle, salary);

        //add employee to array
        employeeArr.push(newEmployee);

        //store employeeArr in localStorage
        localStorage.setItem('employeeArr', JSON.stringify(employeeArr));

        //call prependEmployee to add to DOM
        prependEmployee(newEmployee);
    }   
    else {
        console.log('Please enter a valid salary.');
        alert('Please enter a valid salary');
    }

    //reset form
    $('form')[0].reset();

    //remove invalid warnings
    setTimeout(function () {
        $('form').removeClass('was-validated');
    }, 1);

}//end addEmployee

//function to add employee to DOM
function prependEmployee(newEmployee){
    
    //assign property values to var
    let firstName = newEmployee.firstName;
    let lastName = newEmployee.lastName;
    let employeeID = newEmployee.employeeIDNum;
    let employeeTitle = newEmployee.employeeTitle;
    let salary = newEmployee.annualSalary;

    //add decimal places to salary
    salary = salary.toFixed(2);

    //turn salary into an array
    salary = salary.split('');

    //if $1,000 or above
    if (salary.length > 6) {
        //iterate over salary to add any needed commas
        for (let i = salary.length - 6; i > 0; i -= 3) {
            //add commas
            salary.splice(i, 0, ',');
        }
    }

    //turn salary back into a string
    salary = salary.join('');

    //append employee to table on DOM
    //append delete button
    $('#tableBody').prepend('<tr>' + '<td>' + firstName + '</td>' +
        '<td>' + lastName + '</td>' +
        '<td class="idNUM">' + employeeID + '</td>' +
        '<td>' + employeeTitle + '</td>' +
        '<td>' + salary + '</td>' +
        '<td><button class="removeBtn" ><i class="fas fa-times"></i></button></td>' +
        '</tr>');

    //call function to calc monthly cost
    calcCost(employeeArr);     

}//end prependEmployee
/**********************************/

/* function to remove employees */
function removeEmployee(){
    console.log('in removeEmployee');

    //get id number of employee to remove
    let idNUM = $(this).closest('td').siblings('td.idNUM').text();
    console.log(idNUM);

    //remove employee from DOM
    $(this).closest('tr').remove();

    //temporary array for employees
    let tempArr = [];

    //loop through employeeArr to remove employee class instance
    for(let employee of employeeArr){
        //check for matching employee id number
        if(employee.employeeIDNum != idNUM){
            //copy all employees except matching employee    
            tempArr.unshift(employee);
        }
    }

    //rebuild employeeArr
    employeeArr = tempArr;

    //cal calcCost to recalc 
    calcCost(employeeArr);

    //store employeeArr in localStorage
    localStorage.setItem('employeeArr', JSON.stringify(employeeArr));

}//end removeEmployee()
/**********************************/

/* function to loop through array of employees and calc monthly cost */
function calcCost(employeeArr){
    console.log('in calcCost');

    //reset monthlyCost
    totalCost = 0;

    //for loop to iterate over employees
    for(let employee of employeeArr){
        
        let salary = parseFloat(employee.annualSalary);
        
        //calc monthlyCost
        totalCost += salary;
    }
    
    //get monthlyCost
    let monthlyCost = totalCost / 12;

    if(monthlyCost > 20000){
        $('#monthlyCost').addClass('costWarning');
    }
    else{
        $('#monthlyCost').removeClass('costWarning');
    }

    //turn monthlyCost into a string
    monthlyCost = monthlyCost.toFixed(2);

    //turn monthlyCost into an array
    monthlyCost = monthlyCost.split('');

    
    //if $1,000.00 or above    
    if(monthlyCost.length > 6){
        //iterate over monthlyCost array to add any needed commas
        for(let i = monthlyCost.length - 6; i > 0; i -= 3){
            //add commas
            monthlyCost.splice(i, 0, ',');
        }
    }
    
    //turn monthlyCost back into a string
    monthlyCost = monthlyCost.join('');
    
    console.log(monthlyCost);
    
    //append to DOM
    $('#monthlyCost').html('$' + monthlyCost);
}//end calcCost
/******************************************************************/

/* function to make sure all form input's are filled in */
/*disable form submissions if there are invalid fields*/
/* boostrap 4 function */
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms apply validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        //prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    //prevent default browser alerts and refresh
                    event.preventDefault();
                    event.stopPropagation();
                }
                //show feedback
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})(); //end disable form submission function
