
<a name="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="readme/fe.png" alt="Logo" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    ·
    <a href="https://github.com/FuryCode-bit/readme-template/issues">Report Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]()

This project represents my final bachelor's project in Computer Science and Engineering at UBI, focused on developing an IoT solution for collecting temperature, humidity, soil moisture, and rain presence data in remote outdoor environments.

This project is part of the Rural THINGS research initiative, which aims to provide municipalities with essential tools for monitoring the quality of life of elderly people in rural areas. The specific component of the project covered here involves creating a prototype to be installed at strategic points, capable of collecting real-time weather condition data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![aws][aws]][aws]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## System Architecture

In this system, the ESP32 microcontroller gathers data from sensors and transmits it to AWS IoT Core using the MQTT protocol. Following this, AWS Lambda processes the data and inserts it into a DynamoDB database.

To analyze and visualize the data, a dashboard was implemented using ReactJS. AWS API Gateway retrieves data from DynamoDB, presenting it in JSON format in response to API requests. This data is then consumed by the dashboard hosted on AWS Amplify, facilitating efficient and accessible data visualization.

This architecture ensures seamless integration across the system components, from data collection to visualization, utilizing a robust combination of AWS services.


[![product-screenshot-arch][product-screenshot-arch]]()
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/FuryCode-bit/IoTOutdoorStation/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/FuryCode-bit/IoTOutdoorStation/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/FuryCode-bit/IoTOutdoorStation/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/FuryCode-bit/IoTOutdoorStation/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/bernardeswebdev
[product-screenshot]: readme/circuit.jpg
[product-screenshot-arch]: readme/architecture.png
[aws]: https://img.shields.io/badge/aws-000000?style=for-the-badge&logo=AmazonWebServices&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/