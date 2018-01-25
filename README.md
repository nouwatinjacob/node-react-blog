
# Blog Post


## Application Features
This is an application where a anyone can see read a blog post posted by a registered users. A registered and signed in user can do any of the follwing
- Add a new blog post
- Modify and update his/her own blog post
- Delete a blog
- Get a catalog of his/her own blog
- Post a review for an existing post
- Upvote or downvote a blog post

## Users who are yet to register can only do the following
- View a Blog post
- Register to have access to more features

## Registered Users can
- Add a new blog post
- Modify and update his/her own blog post
- Delete a blog
- Get a catalog of his/her own blog
- Post a review for an existing post
- Upvote or downvote a blog post

# Technologies
- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

## Installation
- Install [NodeJS](http://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org/) on your computer
- Clone this repository
- Navigate to the directoty
- Install all depencies with ```npm install```
- Globally install ```sequelize-cli```
- Using ```sequelize db:migrate``` migrate the database
- Start the application by running ```npm run start-dev```

## Project Limitation
- An unregistered user can not modify or delete a blog post
- An unregistered user can not post a review blog post
- An unregistered user can not like or unlike a blog post

## User template is available on
- [BlogMe](https://codestaintin.github.io/more_recipes_ui)

### Update comming soon
