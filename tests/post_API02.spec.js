import { expect, test } from "@playwright/test";
const apiResponseBody = require('../Test_data/post_request.json');

test('Post API', async ({request}) => {
    //storing all json body request to the variable
    const postResponse=  await request.post('/booking', {
          data: apiResponseBody  // passing all json body here as file

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