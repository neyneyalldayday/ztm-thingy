// Using functions and template literals, print out your first and last name.
//
// Requirements:
// - Use a single function to generate your first name
// - Use a single function to generate your last name
// - Use a single function to generate your full name by using the other
//   functions
// - Print out your full name using the functions

import { strict as assert } from "assert";

const myFirstName = ():string=> {
    const firstname = "NeNe";
    return firstname
}

const myLastName = ():string => {
const lastName = "Daddy"
return lastName
}


const printMyName = ():any => {
const myFullName = `${myFirstName()}   ${myLastName()}`
return myFullName
}



console.log(printMyName)