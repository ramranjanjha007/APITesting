import {test,expect} from "@playwright/test";
import { request } from "http";
//create a test suite for the post api

test('Post API', async ({request}) => {
    //storing all json body request to the variable
    const postResponse=  await request.post('/booking', {
          data: {
            
                "firstname": "ram the author",
                "lastname": "aakhri raasta",
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

    await expect(postResponseresult.booking).toHaveProperty( "firstname", "ram the author"); //firstname should be ram the 
    await expect(postResponseresult.booking).toHaveProperty( "lastname", "aakhri raasta");
    await expect(postResponseresult.booking.lastname).toEqual("aakhri raasta"); //validating using toequal method
    //validating nested json respone object:

    await expect(postResponseresult.booking.bookingdates).toHaveProperty("checkin", "2018-01-01"); // !checkin date should be 2018-01-01(nested json data)

})