//The env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose=require('mongoose');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

//Dev_Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Patients', ()=>{

    //Always generate the token before proceeding further(Generate the token by login into the doctor login).
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2OTFlNTI3MWQ1YjI0NTgyZDEzNjAiLCJ1c2VybmFtZSI6ImRyQmhhdmVzaDEiLCJwYXNzd29yZCI6IjEiLCJuYW1lIjoiYmhhdmVzaCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTE6MjA6MDUuNzU4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTE6MjA6MDUuNzU4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDQ0ODI5LCJleHAiOjE1ODkxNDQ4Mjl9.3gKjZMltFlV5H0tExGIlE17Bx5IZLbAHMCDDnYq6V0s';
    let authBearerToken = 'bearer '+ token;

    /* Test the /POST route for patients registration*/

    describe('POST register patient',()=>{
		let phoneno = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
        it('Register a patient if valid authorization and has phoneno',(done)=>{
            let patient = {
                name:'chintu',
                age:24,
                phoneno:phoneno
            }
            chai.request(app)
                .post('/api/v1/patients/register')
                .set('Authorization', authBearerToken)
                .send(patient)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('patient');
                    res.body.patient.should.have.property('name');
                    res.body.patient.should.have.property('age');
					res.body.patient.should.have.property('phoneno');
					done();
                });
        });
    });


    /* Test the /GET route for patient report creation*/
    describe('/GET create patient report',()=>{
        it('It should create a report',(done)=>{
            let patientId = '5eb6d6686a2911362c59afab';
            let report = {
                status:"Travelled-Quarantine",
                date:"10/05/2020",
            }
            chai.request(app)
                .get(`/api/v1/patients/${patientId}/create_report`)
                .set('Authorization',authBearerToken)
                .send(report)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('report');
                    res.body.report.should.have.property('patient');
                    res.body.report.should.have.property('doctor');
                    res.body.report.should.have.property('status');
                    res.body.report.should.have.property('date');
                    done();
                });
        })
    });


    /** Test for the /GET route for fetching all the reports of a patient */
    describe('/GET all reports of a patient',()=>{
        it('It should fetch all the reports.',(done)=>{
            let patientId = '5eb6acb4d5fd3240f0db065a';
            chai.request(app)
                .get(`/api/v1/patients/${patientId}/all_reports`)
                .set('Authorization',authBearerToken)
                .end((err,res)=>{
                    res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('patientMobile');
					res.body.should.have.property('message');
					res.body.should.have.property('reports');
					res.body.reports.should.be.a('array');
					done();
                })
        });
    });
});


