import { test, expect} from '@playwright/test';

test(' date picker', async ({ page })=>

{

    await page.goto('https://testautomationpractice.blogspot.com/');
     await page.locator('#start-date').click();
    // my name is lakhan
    // my name is sajan
     await page.waitForTimeout(4000)
})