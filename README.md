# team-chat

> A cross platform real-time team chat application using Sockets.io, Mongo, Express, and Node. Front end applications were built using React and React Native. A web framework called [Feathers](http://feathersjs.com) was used to streamline the build out and make API interactions easier by creating services, and to make Sockets.io implementation easier. Feathers also enabled us to create hooks which were useful for doing things that normally might be done with a a middleware. 

## About

This project is a simple, easy to use hub for small business teams. 

## Getting Started with Team-Chat

Getting up and running is as easy as 1, 2, 3, 4.

1. Run mongod. And make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. 
2. Install your dependencies (note this will also npm install all dependencies in the /client folder)

    ```
    cd path/to/team-chat; npm install
    ```

3. Start the server

    ```
    npm start
    ```
4. Start the React client

    ```
    cd client && npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

