# Fast-Food-Fast 
[![Build Status](https://travis-ci.org/andrewinsoul/Fast-Food-Fast.svg?branch=ch-travis-setup-%23160604147)](https://travis-ci.org/andrewinsoul/Fast-Food-Fast) [![Coverage Status](https://coveralls.io/repos/github/andrewinsoul/Fast-Food-Fast/badge.svg?branch=ch-travis-setup-%23160604147)](https://coveralls.io/github/andrewinsoul/Fast-Food-Fast?branch=ch-travis-setup-%23160604147) [![Maintainability](https://api.codeclimate.com/v1/badges/d466de052d04cda61804/maintainability)](https://codeclimate.com/github/andrewinsoul/Fast-Food-Fast/maintainability)

Fast-Food-Fast is a food delivery service app for a resturant
<p align="center"> 
  <li><a href="#Hosted Template">Link to hosted Template</a></li>
  <li><a href="#Technologies Used">Hosted Application</a></li>
  <li><a href="#Technologies Used">Technologies Used</a></li>
  <li><a href="#Installation">How to Use</a></li>
  <li><a href="#Tests">How to Test</a></li>
  <li><a href="#Api Routes">Api Routes</a></li>
  <li><a href="#Coding Style">Code Style</a></li>
  <li><a href="#How to Contribute">How to Contribute</a></li>
  <li><a href="#Author">Meet me!</a></li>
  <li><a href="#License">License</a></li>
</p>

## Hosted Template

https://andrewinsoul.github.io/Fast-Food-Fast/UI/index.html

<h2 id="Pivotal Tracker Link"> Pivotal Tracker Link </h2>

https://www.pivotaltracker.com/n/projects/2196515

## Hosted Application
https://fast-food-andy.herokuapp.com/api/v1/orders

## Technologies Used
- NodeJS
- Express
- Babel
- Eslint

## Installation

```bash
1. Git clone this repository `https://github.com/andrewinsoul/Fast-Food-Fast.git`
2. Change your directory `cd Fast-Food-Fast`
3. Install all dependencies using `npm install`
4. Start the app `npm start` for development
5. Navigate to `localhost:8000` in your browser
```

## Tests

- Run test using `npm test`

## API ROUTES
<table>
  <tr>
    <th>HTTP VERB</th>
    <th>ENDPOINT</th>
    <th>FUNCTIONALITY</th>
    <th>REQUEST PAYLOAD</th>
  </tr>
  <tr>
    <td>POST</td> 
    <td>api/v1/orders</td>  
    <td>places an order</td>
    <td>

      name: <string>
      order: <string>
      address: <string>
      status: <string> allowed value for status are: wait, declined or accepted
  </td>
  </tr>

  <tr>
    <td>PUT</td> 
    <td>api/v1/orders/:orderId</td>  
    <td>Update status of an order</td>
    <td>

      status: <string> allowed value of status are wait, declined or accepted

  </td>
  </tr>

  <tr>
    <td>GET</td> 
    <td>api/v1/orders/:orderId</td> 
    <td>Get an order</td>
    <td>

      No payload but orderId must be an integer
  </td>
  </tr>

  <tr>
    <td>GET</td> 
    <td>api/v1/orders</td> 
    <td>Get all orders</td>
    <td>

      None
  </td>
  </tr>
</table>

## Coding Style

- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

## How to Contribute

```bash
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works
````
Ensure your codes follow [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)


## Author

- Andrew Okoye

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details
