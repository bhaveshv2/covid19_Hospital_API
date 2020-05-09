# covid19_Hospital_API
## Description
An API for the creating doctors & patients and retrieving the details of patients with their status of test of covid19.

## Requirement
1. NodeJS
2. MongoDB


## Dependencies Used 
1. npm install express
2. npm install mongoose
3. npm install body-parser
4. npm install passport
5. npm install jsonwebtoken
6. npm install passport-jwt (passport strategy used for authorization: jwt)
### Dev Dependencies (All for the unit testing)
7. npm install mocha -dev
8. npm install chai -dev
9. npm install chai-http -dev
10. npm install config
11. npm install morgan(for setting NODE_ENV variable)

## Setup and Execution
1. Clone this repository.
2. Install above given dependencies.
3. For Naive testing, (base url - http://localhost:8000
   -Start the server by 'npm start' and test using postman services
4. For whole unit testing use 'Mocha' & 'Chai',
   -The token bearer, use the postman service(For further testing of api).
   -Use that token bearer into the testing in the variable 'token' in the patient_Test.js file.
   -Start the unit testing by 'npm test'.

## Routes Used
```
1. /api/v1/doctors/register 
  -This route is used for register the new doctor.
  -In the postman pass the body variables as 'name', 'username', 'password' and 'confirm_password'.
  
2. /api/v1/doctors/login 
  -This route is used for login the doctor
  
3. /api/v1/patients/register (Authorization needed)
  -This route is used for creating the patients after authorization of doctor.
  -In the postman pass the body variables as 'name', 'age', **'phoneno'(important)**.

4. /api/v1/patients/:id/create_report (Authorization needed)
  -This route is used for creation of the report after the checkup.
  -In the postman pass the body variables as doctors, patients, status, date.
  
5. /api/v1/patients/:id/all_reports (Autorization needed)
  -This route is used for fetching all the reports of patient(from old to new one).

6. /api/v1/reports/:status  (Autorization needed)
  -This route is used for fetching all the reports of patients by status
```


