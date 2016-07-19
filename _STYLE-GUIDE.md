*This style guide is adapted from W3School's style guide.
# Variable Names
- We use camelCase for identifier names (variables and functions). However, react components start with a capital letter.
- All names start with a letter. However, react methods that are not built-in will start with an underscore.
- At the bottom of this file, you will find a wider discussion about naming rules.
```javascript
firstName = "John";
lastName = "Doe";

price = 19.90;
tax = 0.20;

fullPrice = price + (price * tax);
```
# Spaces Around Operators
- Always put spaces around operators ( = + - * / ), and after commas:
- Examples:
```javascript
var x = y + z;
var values = ["Volvo", "Saab", "Fiat"];
```
# Code Indentation
- Always use 2 spaces for indentation of code blocks:

# Functions:
```javascript
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}
```
- Do not use tabs (tabulators) for indentation. Different editors interpret tabs differently.

# Statement Rules
## General rules for simple statements:
- Always end a simple statement with a semicolon.
- Examples:
```javascript
var values = ["Volvo", "Saab", "Fiat"];

var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};
```
## General rules for complex (compound) statements:
- Put the opening bracket at the end of the first line.
- Use one space before the opening bracket.
- Put the closing bracket on a new line, without leading spaces.
- Do not end a complex statement with a semicolon.
- .then() and .catch() statements begin on the same level of indentation as the promise they follow.
- Functions:
```javascript
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}
```
- Loops:
```javascript
for (i = 0; i < 5; i++) {
    x += i;
}
```
- Conditionals:
```javascript
if (time < 20) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}
```
- .then() and .catch():
```javascript
returnsPromise()
.then(function(result) {
  return result;
})
.catch(function(err) {
  return err;
});
```
# Object Rules
## General rules for object definitions:
- Place the opening bracket on the same line as the object name.
- Use colon plus one space between each property and its value.
- Use quotes around string values, not around numeric values.
- Do not add a comma after the last property-value pair.
- Place the closing bracket on a new line, without leading spaces.
- Always end an object definition with a semicolon.
- Example
```javascript
var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};
```
- Short objects can be written compressed, on one line, using spaces only between properties, like this:
```javascript
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
Line Length < 80
```
- For readability, avoid lines longer than 80 characters.
- If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma.
- Example
```javascript
document.getElementById("demo").innerHTML =
    "Hello Dolly.";
```
# Naming Conventions
- Variable and function names written as camelCase
- Global variables written in UPPERCASE
- Constants (like PI) written in UPPERCASE

## Hyphens in HTML and CSS:
- HTML5 attributes can start with data- (data-quantity, data-price).
- CSS uses hyphens in property-names (font-size).
- Hyphens can be mistaken as subtraction attempts. Hyphens are not allowed in JavaScript names.

## Other:
- camelCase is used by JavaScript itself, by jQuery, and other JavaScript libraries.
- Do not start names with a $ sign. It will put you in conflict with many JavaScript library names.

## Loading JavaScript in HTML
- Use simple syntax for loading external scripts (the type attribute is not necessary):
```html
<script src="myscript.js"></script>
```
# File Extensions
- HTML files should have a .html extension (not .htm).
- CSS files should have a .css extension.
- JavaScript files should have a .js extension.
