# Real Time Web course repo
![Gif animation of website](https://github.com/fennadew/real-time-web/blob/week-1/public/images/gif.gif)

For this course I created a real time drawing application. To make this happen, I used the html5 <canvas> element, Node, Express, EJS and Socket.io. I did not know how to draw on a canvas element, so I followed a [drawing app tutorial](http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/). When it was all there and running I added Socket.io so that it was visible in different browsers.

I ran into the problem that you just could not color at the same time. Therefore, I looked for apps that looked a like and found a [drawing app](http://drawwithme.herokuapp.com/) that helped me with that.

Finally, I added a color picker so you can choose your color yourself

# Table of Content
- [Dependencies](#dependencies)
- [Features](#features)
- [Get started](#get-started)
- [Socket](#socket)
- [To do](#to-do)
- [Resources](#resources)

## Dependencies
*   [x] Server: [Node](https://nodejs.org/en/)
*   [x] Routing: [Express](https://expressjs.com/)
*   [x] Templating: [EJS](http://ejs.co/)
*   [x] CSS: [SASS](https://sass-lang.com/)
*   [x] Monitor: [https://nodemon.io/](https://nodemon.io/)
*   [x] Real time engine: [Sockets.io](https://socket.io/)

## Features
* See what other people are drawing
* Draw at the same time
* Pick your own color

## Get started
* Run `$ git clone https://github.com/fennadew/real-time-web.git` in your terminal in the desired directory.
* `cd` to the repository and run `npm install` to install all dependencies.
* Run `npm run nodemon` start the server with automatic reload.
App listens on `http://localhost:3000/`.

## Socket.io, Node.js and Express
Socket.io is a real time engine that ensures that you can see the same information in real time or different browsers, can input and be updated in all browsers. This library works with Node.js and communicates changes to the server. Express is used for routing.

## To do
*   [ ] Better styling
*   [ ] More functionalities
*   [ ] Improve perfomance
*   [ ] Make available for mobile

## Resources
* [Tutorial drawing app](http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/)
* [Drawing app](http://drawwithme.herokuapp.com/)

