# art-shop
A responsive CRUD inventory application for a fake art store. Built following MVC architecture.
Images sourced from the Unsplash API

## Tech 

* JavaScript 
* Pug 
* CSS 
* Express
* Mongoose/MongoDB

## Live

https://gentle-sands-51125.herokuapp.com/inventory/

## Images 

## Technical Challenges

Problem: 

In JS, DOM Parser is one of the most well known ways to decode XML/HTML.
Without decoding, apostrophes and other special characters get rendered in
their hex form, which makes the client experience poor. But - it only runs
client side, on the browser. 

Solution: 

On Node, I created a separate folder for helpers, then passed a helper function 
made from a node dependency to my view and have it decode HTML/XML escaping directly in the Pug view.

## Learning 

* In MVC, models that are users should be the ones to store references of other 
models (e.g., an art piece instance should make reference to an art piece).
This makes it much easier for information to flow when creating forms. 

* Data in the DB should always be escaped (e.g., as their respective unicode codes) for security,
but should be unescaped when loaded back to the user. 

## Creator's Comment 

Unsplash API requires you to sign up for an account. [Sign up here](https://unsplash.com/)

Recently, I've had a bit of a love for the functional but simple websites I saw back in 
the early 2010s. While the design is definitely not a Paul Graham-type simple HTML blog, 
I kept the design simple and functional. Surprisingly, you don't need a ton of 
CSS to make something look presentable.


