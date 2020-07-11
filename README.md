## Installation and Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

![Bridge International Academies Logo](Banner%20Logo%20280x60.png)

# Front-End Developer Technical Test

As a general rule, we allow three days from the date that you receive these instructions to submit your code, though you may request more time if needed.

*Good Luck!*

## Evaluation Process

We assess a number of things, including the design of your solution, program correctness, coding style, user consideration, and general maintainability. While it is a small-ish problem, we expect you to submit what you believe is production quality code – code that a team would be able to maintain and evolve. You don’t need to “gold plate” your solution; but we _are_ looking for something more than a quick and dirty prototype.

You should not spend more than 2 hours total on this exercise. As you plan your work, if you are considering how to trade off between scope and quality, you should err on the side of quality. For any scope that you have cut, please list it in your README, along with a high-level strategy for how you would continue the work.

## Instructions and Guidance

* Use any external libraries you deem necessary, as long as you include the necessary tooling and instructions to make installing them easy peasy.
    * This includes any frameworks that you deem appropriate
    * You can assume the presence of standard package managers (e.g. npm); if you’re using something more exotic, include links for how to install on a Mac and PC (both).
    * Do not assume the presence of - or ask us to install anything - globally (I'm looking at you, Angular-CLI)
* Write your solution in either JavaScript or TypeScript - again, noting that your app needs to build and run out of the box with minimal effort.
* Include automated tests, as and where you deem them appropriate, given the problem statement below.
* Scaffold the application in a way that anticipates it growing into something larger… without too much future proofing.
* Assume that it only needs to run on the latest version of Chrome. But it needs to be mobile responsive.
* Ensure it runs nicely in a development environment, but skip packaging it up for deployment to production (e.g. don’t spend any extra effort on minification, obfuscation, etc.).
* Include a README, which includes a brief explanation of your design and assumptions, as well as instructions on how to run your application (including how to run the tests), and any scope that was cut.

## Problem: Field Support for Batteries

From time to time, our in-country tech teams are called upon to perform school visits to address  issues that they find. We collect a bunch of data on an on-going basis about these devices and we’re interested in building a tool to identify teacher tablet batteries that are in need of replacement.

### The task

* Write a web application that identifies the schools with the highest number of battery issues, so that the field team knows which schools to visit first
* For each school, identify which devices are unhealthy and in need of battery replacement
* Given the unreliable network connectivity in the places that we operate, the application should work offline, allowing the user to interact with results locally, once they have successfully been loaded

### Inputs and Requirements

* We’re providing a JSON data file that represents a week’s worth of battery data for a number of schools. Integrate with this file like you would against any API, including any relevant service layers - just don’t worry about any of the network or security aspects that a real API would entail.
* In that file:
    * serialNumber represents a unique device
    * avgDailyDischarge represents the average daily battery usage for the tablet
* A battery is considered to be in need of replacement if it uses more than 30% of its battery per day - these are e-ink devices that are expected to last a week or more between charges.
* A battery is considered to be at risk if it uses more than 20% of its battery per day on average.

Note: If this were an actual project, there would be a UX designer/product designer working with you to flesh out a great user experience... but for this exercise, we’re asking you to come up with your own design for the screen(s), based on the requirements above. Don’t worry about making it pixel perfect - just make sure it’s something reasonable for the stated users.
