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
}

//variable to hold monthly cost
let monthlyCost = 0;

//array to hold employees
let employeeArr = [];

/* later add local storage of employees for testing */

/* function to check if employee already exists */
function checkEmployees(){
    console.log('in checkEmployees');
    //get employeeID from DOM
    let employeeID = $('#employeeID').val();

    //if employee array has employees
    if(employeeArr.length > 0){
        console.log('we have employees');
        //loop through employee array to check if employee already exists
        for (let i = 0; i <= employeeArr.length; i++) {
            console.log(employeeArr[i]);
            //if matching employee found
            if (employeeArr[i].employeeIDNum == employeeID) {
                console.log(employeeArr[i]);
                console.log('Employee already exists.')
                alert('Employee with that ID number already exists');
                
                //reset form
                $('form')[0].reset();

                //remove invalid warnings
                setTimeout(function () {
                    $('form').removeClass('was-validated');
                }, 1);
            }
            else if (i == employeeArr.length) {
                console.log('no matching employees');
                addEmployee();
            }
        }
    }
    else{
        addEmployee();
    }
   
   
}

/* function to add employee to table/DOM/array */
function addEmployee(){
    console.log('in addEmployee');

    //get values form input fields
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let employeeTitle = $('#employeeTitle').val();
    let salary = $('#salary').val();

    //make sure values are input
    if(firstName.length > 0 && lastName.length > 0 && employeeID.length >= 4 
        && employeeTitle.length > 0 && salary.length > 0){
        //remove any commas from salary
        salary = salary.replace(',', '');

        //make sure salary is a number
        salary = parseFloat(salary);

        //create new Employee class instance
        let newEmployee = new Employee(firstName, lastName, employeeID, employeeTitle, salary);
        //add employee to array
        employeeArr.push(newEmployee);

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
        $('#tableBody').append('<tr>' + '<td>' + firstName + '</td>' +
            '<td>' + lastName + '</td>' +
            '<td class="idNUM">' + employeeID + '</td>' +
            '<td>' + employeeTitle + '</td>' +
            '<td>' + salary + '</td>' +
            '<td><button class="removeBtn" ><i class="fas fa-times"></i></button></td>' +
            '</tr>');

        //reset form
        $('form')[0].reset();

        //remove invalid warnings
        setTimeout(function () {
            $('form').removeClass('was-validated');
        }, 1);

        //call function to calc monthly cost
        calcCost(employeeArr);    
    }    
} 

/* function to remove employees and re-calc monthly cost */
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
}


/* function to run through array of employees and calc monthly cost */
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
    $('#totalCost').html('$' + monthlyCost);
}



/******************************************************************/

/* function to make sure all input's are filled in for addNewCar() */
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
