# Engage-21
**Task:** Build a functional prototype of a platform that gives students an array of digital academic and social tools to stay engaged with their studies, peers and broader university community during pandemic.

## **The Engage Classroom**
**“The Engage Classroom”** is a project regarding online submissions. Using this tool, the faculty can distribute assignments, and upon receiving submissions from the students - analyze, and grade assignments.
#### Offer autograded programming assignments to your students..

- This helps professors to teach students and test them on their programming skills
- This helps college students who are preparing for their coding exams.
- This helps the students to run and compile their codes for various test cases without any IDE setup on their systems. 
- They can access this website and solve their college problems from anywhere in the world on time.
- This platform can also be used for college programming competitions.
- As all the submissions will be made online directly on our portal so it will be an environment friendly approach saving a lot of paper work.


## Features

 - [x] Authentication and Authorization.
 - [x] [Teacher] Create a new classroom for a new course. Share the classCode to your students.
 - [x] [Teacher] Set up an assignment.
 - [x] [Teacher] Create Coding Problems in assignment.
 - [x] The coding problems have specific test cases, time limit and memory limit ensuring that only efficient solution can pass the test cases.
 - [x] [Teacher] Check the submissions made by students.
 - [x] [Teacher] My profile page with the classes you created.
 - [x]  [Student] My profile page with the classes you joined.
 - [x] [Student] Join in classes with the class Code your professor shared.
 - [x] [Teacher & Student] Filter problems based on tags
 - [x] [Teacher & Student] Search problems by name
 - [x] [Student] Run & Submit the code in the language you choose.
 - [x] Results shows Time (Sec) and Memory (MB) using JDoodle Compiler API.
 - [x] Verdicts
    -   Time Limit Exceeded (TLE)  [![](https://camo.githubusercontent.com/b8512d31b10b70ce3989924388e374b287760ada3866ffe871c52f144657ca27/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f636c6f636b5f6572726f722e706e67)](https://camo.githubusercontent.com/b8512d31b10b70ce3989924388e374b287760ada3866ffe871c52f144657ca27/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f636c6f636b5f6572726f722e706e67)
    -   Memory Limit Exceeded (MLE)  [![](https://camo.githubusercontent.com/9d434c561b2b62dc4844eedb974a33c6cfc52c0f0bb71958b8f59e74303aa954/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f72756e74696d652d6572726f722e706e67)](https://camo.githubusercontent.com/9d434c561b2b62dc4844eedb974a33c6cfc52c0f0bb71958b8f59e74303aa954/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f72756e74696d652d6572726f722e706e67)
    -   Compilation Error (CE)  [![](https://camo.githubusercontent.com/065d4655328203227c354353a654db5a82e756b171832e2df58770821c5073aa/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f636f6465636865665f7368617265642f6d6973632f616c6572742d69636f6e2e676966)](https://camo.githubusercontent.com/065d4655328203227c354353a654db5a82e756b171832e2df58770821c5073aa/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f636f6465636865665f7368617265642f6d6973632f616c6572742d69636f6e2e676966)
    -   Runtime Error (RTE)  [![](https://camo.githubusercontent.com/9d434c561b2b62dc4844eedb974a33c6cfc52c0f0bb71958b8f59e74303aa954/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f72756e74696d652d6572726f722e706e67)](https://camo.githubusercontent.com/9d434c561b2b62dc4844eedb974a33c6cfc52c0f0bb71958b8f59e74303aa954/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f72756e74696d652d6572726f722e706e67)
    -   Wrong Answer (WA)  [![](https://camo.githubusercontent.com/2c7172f4801ea9a31d2f70336a8c4f0a72c3b061cf2a00d9187042117d27a927/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f63726f73732d69636f6e2e676966)](https://camo.githubusercontent.com/2c7172f4801ea9a31d2f70336a8c4f0a72c3b061cf2a00d9187042117d27a927/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f63726f73732d69636f6e2e676966)
    -   Accepted (AC)  [![](https://camo.githubusercontent.com/4baf6f4a807dc54ba48ebf8bc669fa368cbaf6c0a5cc8e476e4a9682185ba449/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f7469636b2d69636f6e2e676966)](https://camo.githubusercontent.com/4baf6f4a807dc54ba48ebf8bc669fa368cbaf6c0a5cc8e476e4a9682185ba449/68747470733a2f2f7777772e636f6465636865662e636f6d2f6d6973632f7469636b2d69636f6e2e676966)
 - [x] [Student] See your submissions
 - [x] 404 Error Route

## Supported Languages

-   C
-   C++ 17
-   Java
-   Python 3

## Technical Aspects:

 1. ReactJS
 2. NodeJS
 3. Express
 4. MongoDB Atlas
 5. Microsoft Azure for Deployment
 6. JSDocs Style documentation
 7. JEST framework for Unit Testing
 8. JDoodle Compiler API.
 9. Github Actions for CI/CD Implementation


#### Client Hosted at:  [http://engage-submission.centralus.cloudapp.azure.com:3000/](http://engage-submission.centralus.cloudapp.azure.com:3000/)

#### Server Hosted at:  [http://engage-submission.centralus.cloudapp.azure.com:5000/](http://engage-submission.centralus.cloudapp.azure.com:5000/)

##  How to Setup Locally?
1. Clone this repository.
2. Make sure you have @node16.13.0 and @npm8.1.4 on your local system.
3. SERVER:
4. cd inside the folder.
5.  `npm install` to load all the necessary packages.
6. Create .env file in the root of server [Engage-Server](https://github.com/nymika/Engage-Server) with the following keys: 
```
PORT = 5000
JWT_SECRET = <Your_JWT_Token>
ATLAS_URI = <Your_MongoDB_Atlas_Connection String>
ATLAS_URI_TEST = <Your_MongoDB_Atlas_Connection String for Test Database>
```
7. `npm start` to start the server. 
8. `npm run test` to test.
9. CLIENT:
10. cd inside the folder.
11. `npm install` to load all the necessary packages.
> #### In [Engage-Client](https://github.com/nymika/Engage-Client)/[src](https://github.com/nymika/Engage-Client/tree/main/src)/[config](https://github.com/nymika/Engage-Client/tree/main/src/config)/**config.js**
#### Change BACK_SERVER_URL to "[http://localhost](http://localhost/):< PORT>" 
11. `npm start` to start. 
12. You will now be able to visit [](http://localhost:3000/)[http://localhost:3000/](http://localhost:3000/) URL and see your application up and running.
