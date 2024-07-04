
<a name="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/FuryCode-bit/IoT-Outdoor-Station">
    <img src="readme/fe.png" alt="Logo" height="80">
  </a>

  <h3 align="center">IoT Outdoor Station</h3>

  <p align="center">
    An IoT solution for real-time weather condition monitoring in remote outdoor environments.
    <br />
    <a href="https://github.com/FuryCode-bit/IoT-Outdoor-Station"><strong>Explore the docs »</strong></a>
    <br />
    ·
    <a href="https://github.com/FuryCode-bit/IoT-Outdoor-Station/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li> <a href="#about-the-project">About The Project</a></li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#system-architecture">System Architecture</a></li>
        <li><a href="#web-application">Web Application</a></li>
      </ul>
      <li><a href="#license">License</a></li>
    </li>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]()

This project is my final bachelor's project in Computer Science and Engineering at UBI. It focuses on developing an IoT solution to collect temperature, humidity, soil moisture, and rain presence data in remote outdoor environments. 

This work is part of the Rural THINGS research initiative, aimed at providing municipalities with essential tools for monitoring the quality of life of elderly people in rural areas. The project involves creating a prototype that can be installed at strategic points to collect real-time weather data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![aws][aws]][aws-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## System Architecture

The system uses an ESP32 microcontroller to gather data from sensors and transmit it to AWS IoT Core using the MQTT protocol. AWS Lambda processes the data and inserts it into a DynamoDB database.

A dashboard implemented with ReactJS is used to analyze and visualize the data. AWS API Gateway retrieves data from DynamoDB, presenting it in JSON format in response to API requests. The dashboard is hosted on AWS Amplify, providing efficient and accessible data visualization.

This architecture ensures seamless integration from data collection to visualization, utilizing a robust combination of AWS services.

![System Architecture Screenshot][product-screenshot-arch]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Web Application

The web application design was carefully crafted to provide a simple and intuitive user experience. It consists of two pages accessible to all users. The main page displays information about the readings from the last 20 days and provides access to the most recent reading data. The second page presents a list with the daily average values of temperature, humidity, heat index, precipitation level, and soil moisture, including the number of readings taken each day.

![webapp1][product-screenshot-webapp1]

![webapp2][product-screenshot-webapp2]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[stars-shield]: https://img.shields.io/github/stars/FuryCode-bit/IoT-Outdoor-Station.svg?style=for-the-badge
[stars-url]: https://github.com/FuryCode-bit/IoT-Outdoor-Station/stargazers
[issues-shield]: https://img.shields.io/github/issues/FuryCode-bit/IoT-Outdoor-Station.svg?style=for-the-badge
[issues-url]: https://github.com/FuryCode-bit/IoT-Outdoor-Station/issues
[license-shield]: https://img.shields.io/github/license/FuryCode-bit/IoT-Outdoor-Station.svg?style=for-the-badge
[license-url]: https://github.com/FuryCode-bit/IoT-Outdoor-Station/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/bernardeswebdev
[product-screenshot]: readme/circuit.jpg
[product-screenshot-arch]: readme/architecture.png
[product-screenshot-webapp1]: readme/app1.png
[product-screenshot-webapp2]: readme/app2.png
[aws]: https://img.shields.io/badge/aws-000000?style=for-the-badge&logo=AmazonWebServices&logoColor=white
[aws-url]: https://aws.amazon.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
