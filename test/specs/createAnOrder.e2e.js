const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {

    // it ('Test 1 - Should set the address', async () => {
    //     //Step 1 - Setting the address
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    // })

    // it ('Test 2 - Should select the Supportive class', async () => {
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    //     //Calls a function to selecte the supportive class
    //     await page.selectSupportiveClass();

    // })

    // it ('Test 3 - Should fill in the phone number', async () => {
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    //     //Enter phone number in the phone number field
    //     const phoneNumber = await (helper.getPhoneNumber("+1"));
    //     await page.submitPhoneNumber(phoneNumber);

    // })

    // it ('Test 4 - Should add a credit card', async () => {
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    //     //Add a credit card
    //     await page.addPaymentMethodCard();

    //     //check for icon for payment method to be a credit card
    //     const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
    //     await expect(await $(cardPaymentMethodIcon)).toBeExisting();
    // })

    // it ('Test 5 - Write a message to the driver', async () => {
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    //     //Add text to "Message to the driver"
    //     await page.addMessageToDriver();
    //     await browser.pause(5000);
    // })

    // it ('Test 6 - Ordering a Blanket and Handercheifs ', async () => {
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    //     //Select the Supportive class
    //     await page.selectSupportiveClass();

    //     //pause to make sure everything is caught up
    //     await browser.pause(1000);

    //     //Click the Blanket and Hankerchiefs switch
    //     await page.orderBlanketAndHankerchief();

    // })

    // it ('Test 7 - Order 2 Ice creams', async () =>{
    //     await browser.url(`/`)
    //     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    //     //order 2 ice creams
    //     await page.orderIceCream();

    // })

    it ('Test 8 - Car Search Modal Appears', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Select Supportive Class
        await page.selectSupportiveClass();

        //pause needed for system to catch up
        await browser.pause(2000);

        //Add a phone number
        const phoneNumber = await (helper.getPhoneNumber("+1"));
        await page.submitPhoneNumber(phoneNumber);

        //pause needed for system to catch up
        await browser.pause(2000);

        //Add a credit card
        await page.addPaymentMethodCard();

        //pause needed for system to catch up
        await browser.pause(2000);

        //check for icon for payment method to be a credit card
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();

        //pause needed for system to catch up
        await browser.pause(2000);

        //Add a message to the driver
        await page.addMessageToDriver();

        //pause needed for system to catch up
        await browser.pause(2000);

        //Order a Blanket and Hankerchiefs
        await page.orderBlanketAndHankerchief();

        //pause needed for system to catch up
        await browser.pause(2000);

        //Order 2 Ice Creams
        await page.orderIceCream();

        //Click Order button
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        //Test 9 - Wait for the driver info to appear
        await browser.pause(40000);

    })
    
})

