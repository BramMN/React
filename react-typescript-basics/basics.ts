//Primitives: numbers, strings, booleans
//More complex types: arrays, objects
//Function types, parameters

//Primitives

let age: number;
age = 12
//age = '12'

let userName: string;
userName = 'Bram';
//userName = 12

let isMale: boolean;
isMale = true;
//isMale = 'true';


//More complex types

let hobbies: string[];
hobbies = ['Sports', 'Cooking']
//hobbies = ['Sports', 'Cooking', 12]

let person: {
    name: string;
    age: number;
}; 
person = {
    name: 'Bram',
    age: 24
}
// person = {
//     employeeName: 'John',
//     age: true
//}

let people: {
    name: string;
    age: number;
}[];

//Type inference

let course = 'React - Complete Guide';
//course = 123; //err

//By default typescript tries to infer types on as many as possible lines

//Union types (string OR number)
let course2: string | number = 'React - Complete Guide';
course2 = 123;

//Type aliases
type Person = {
    name: string;
    age: number;
}; 

let person2: Person;
person2 = {
    name: 'Bram',
    age: 24
}


let people2: Person[];

//Functions & types

function add(a: number,b: number): number {
    return a + b;
}

function print(value: any) {
    console.log(value);
}