import { faker } from '@faker-js/faker';
import {test, expect, request} from '@playwright/test';
const {Datetime}= require('luxon');

test('postcall with dynmic data', async ({request})=>
{
 const fName = faker.person.firstName();
 const lName = faker.person.lastName();
    const postResponse=  await request.post('/booking', {
        data: {
          
              "firstname": fName,  //this will assignee dynamic value:
              "lastname": lName,    // this will assignee dynamic value to the test
              "totalprice": 1000,
              "depositpaid": true,
              "bookingdates": {
                  "checkin": "2018-01-01",
                  "checkout": "2019-01-01"
              },
              "additionalneeds": "super bowls"
          
        }

  })
   console.log(postResponse);
  const postResponseresult= await postResponse.json();  //parse the json response
  console.log(postResponseresult);  //console json response

  //Validate the status code of the response:
  await expect(postResponse.ok()).toBeTruthy(); // 200 Ok  after ppost api call
  await expect(postResponse.status()).toBe(200); //status code should be 200

  //validating the booking response json body:

  await expect(postResponseresult.booking).toHaveProperty( "firstname", fName); //firstname should be ram the 
  await expect(postResponseresult.booking).toHaveProperty( "lastname", lName);
  //await expect(postResponseresult.booking.lastname).toEqual("aakhri raasta"); //validating using toequal method
  //validating nested json respone object:

  await expect(postResponseresult.booking.bookingdates).toHaveProperty("checkin", "2018-01-01"); // !checkin date should be 2018-01-01(nested json data)

  //now using booking Id will get all the details if all details are correct:
  const myBookingId= postResponseresult.bookingid;
  //validating if able to fetch booking ID
  console.log(myBookingId);
  // * now making a get call and storing in the variable:
  const getApiCall= await request.get(`booking/${myBookingId}`)
  console.log(await getApiCall.json());  //! printing the json response:
  //? now validate the status ode for get call:
  await expect(getApiCall.ok).toBeTruthy();
  await expect.soft(getApiCall.status()).toBe(500);
})
