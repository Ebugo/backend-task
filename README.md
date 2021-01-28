# BACKEND TEST

## LIVE URL

https://flutterwave-be-test.herokuapp.com

## PURPOSE

## TECHNOLOGY USED

Node/Express was leveraged on for this challenge.

- [ExpressJS](https://expressjs.com/)

## TASK

Create a simple rule-validation API with the response structure for your API fashioned after the popular JSEND pattern.

## USAGE

### API guide for consuming this back-end layer

### Sample request

A request to fetch the  should look like

`GET` < https://flutterwave-be-test.herokuapp.com/ >

Response format:

`{
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
        "name": "Gospel Chinyereugo",
        "github": "@Ebugo",
        "email": "gospelokpara@gmail.com",
        "mobile": "08109503956",
        "twitter": "@Codebug_"
    }
}`

`POST` < https://flutterwave-be-test.herokuapp.com/validate-rule >

Request body:

`{
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "count": 45,
      "successful": 44,
      "failed": 1
    }
  }
}`

Response format:

(HTTP 200)
`{
  "message": "field missions.count successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions.count",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}`

---

## Setup

Install `npm` or `yarn` if you dont have any of them already installed. I used Npm though.

After clonning the repo to your local machine and moving into the cloned folder, Run `npm install` to get started by installing dependencies.

`app.js` is the entry to the project.

## Hints

- Run `npm install` or `yarn install` to get started. I'll assume you are using npm.

- Install additional dependencies: `yarn add <dependency-name> [-D]`

- Run your app in local dev mode: `npm run dev`. This sets up a local web server at localhost:5000, and continues to watch for your code changes which it syncs with the local server.

- Otherwise run your app with: `npm start` if you do not want live server reload.

## AUTHOR

[![github profile](https://avatars2.githubusercontent.com/u/51026002?s=64&u=8f470843793ee988d0d4fc00f4d26e7d285bcd00&v=4)](https://github.com/Ebugo 'github profile')
[![website](https://img.icons8.com/fluent/64/000000/globe.png)](https://gitshowcase.com/ebugo 'portfolio website')
[![twitter profile](https://img.icons8.com/fluent/48/000000/twitter.png)](https://twitter.com/Codebug_ 'twitter profile') - Gospel Chinyerugo (Codebug) - Backend Developer
