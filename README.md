# jquery.quick.ids.js
Quickly get elements by their id as if they were members


```javascript
// Lets you get elements by their id as if they were members

// For example you could do this
let email = $.signupForm.email.val();

// As an alternative to this
let email = $("#signup-form").find("#email").value();

// How it works is whenever you try to access a member that doesn't exist
// such as signupForm
// it converts it into the string 'signup-form'
// then does a jQuery.find('#signup-form') search on it and returns the first element
// If the element does not exist, it returns null

// All this does is shortens the amount of code you have to write by a bit
```
