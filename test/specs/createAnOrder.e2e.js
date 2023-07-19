const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {

    it.skip ('Should set the address', async () => {
        //Step 1 - Setting the address
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        //check value from From field
        const fromField = await $(page.fromField);
        await fromField.getValue();
        await expect(fromField).toHaveValueContaining('East 2nd Street, 601');

        //check value from To field
        const toField = await $(page.toField);
        await toField.getValue();
        await expect(toField).toHaveValueContaining('1300 1st St');
    })

    it.skip ('Should select the Supportive class', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Calls a function to selecte the supportive class
        await page.selectSupportiveClass();
        const supportClass = await $(page.supportCarButton)
        await expect(supportClass).toBeEnabled();
    })

    it.skip ('Should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Enter phone number in the phone number field
        const phoneNumber = await (helper.getPhoneNumber("+1"));
        await page.submitPhoneNumber(phoneNumber);
        const phone = await $(page.phoneNumberField);
        await phone.getValue();
        await expect(phone).toHaveValueContaining(phoneNumber);
    })

    it.skip ('Should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Add a credit card
        await page.addPaymentMethodCard();

        //check for icon for payment method to be a credit card
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();
    })

    it.skip ('Should write a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Add text to "Message to the driver"
        const driverMessageInput = await $(page.driverMessageInput);
        await driverMessageInput.setValue('Get some whiskey');

        //expect
        const message = await driverMessageInput.getValue();
        await expect(message).toBe('Get some whiskey');        
    })

    it ('Should order a Blanket and Handercheifs ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Select the Supportive class
        await page.selectSupportiveClass();

        //pause to make sure everything is caught up
        await browser.pause(1000);

        //Click the Blanket and Hankerchiefs switch
        await page.orderBlanketAndHankerchief();

        //expect check for switch to be enabled
        const blanketSwitch = await $(page.blanketHankerchiefSwitch);
        await expect($(blanketSwitch)).toBeClickable();
    })

    it.skip ('Should order 2 Ice creams', async () =>{
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //select Supportive class
        await page.selectSupportiveClass();

        //order 2 ice creams
        const orderRequirements = await $(page.orderRequirements);
        await orderRequirements.waitForDisplayed();

        //pause is needed for system to catch up
        await browser.pause(1000);
    
        await page.order2IceCream();
        
        //expect check for Ice Cream
        const iceCreamCount = await $(page.counterValue);
        await iceCreamCount.getValue();
        await expect(iceCreamCount).toHaveText('2');
    })

    it.skip ('Should display Car Search Modal', async () => {

        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Select Supportive Class
        await page.selectSupportiveClass();

        //pause needed for system to catch up
        await browser.pause(1000);

        //Add a phone number
        const phoneNumber = await (helper.getPhoneNumber("+1"));
        await page.submitPhoneNumber(phoneNumber);

        //pause needed for system to catch up
        await browser.pause(1000);

        //Add a credit card
        await page.addPaymentMethodCard();

        //pause needed for system to catch up
        await browser.pause(1000);

        //Add a message to the driver
        const driverMessageInput = await $(page.driverMessageInput);
        await driverMessageInput.setValue('Get some whiskey');

        //pause needed for system to catch up
        await browser.pause(1000);

        //Order a Blanket and Hankerchiefs
        await page.orderBlanketAndHankerchief();

        //pause needed for system to catch up
        await browser.pause(1000);

        //Order 2 Ice Creams
        await page.order2IceCream();

        //pause is needed for system to catch up
        await browser.pause(1000);

        //Click Order button
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        //expect check for car search modal
        const carSearch = await $(page.carSearchModal);
        await carSearch.waitForDisplayed();
        await expect(carSearch).toBeExisting();

        //Test 9 - Wait for the driver info to appear
        await browser.pause(40000);
    })    
})

