module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    driverMessageInput: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    closePaymentMethodModalButton: '.payment-picker .close-button',
    supportCarButton: 'div=Supportive',
    nextPhoneNumberButton: 'button=button full',
    orderRequirements: 'div=Order requirements',
    iceCreamBucket: 'div=Ice cream bucket',
    plusButton: '.r-counter .counter .counter-plus',
    counterValue: 'div=counter-value',
    blanketHankerchiefSwitch: '.r-sw',
    orderButton: '.smart-button',
    // Modals
    phoneNumberModal: '.modal',
    //Misc
    cardSignatureStrip: '.plc',
    cardPaymentMethodIcon: 'img[alt="card"]',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addPaymentMethodCard: async function(){
        //Click on the payment method button
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();

        //Click on the Add Card button
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        //Enter the credit card number
        const cardNumber = await $(this.cardNumber);
        await cardNumber.waitForDisplayed();
        await cardNumber.setValue(1234567812345678);

        //pause is needed to allow the test to find the cardCode field
        await browser.pause(2000);

        //enter the card code
        const cardCode = await $(this.cardCode);
        await cardCode.waitForDisplayed();
        await cardCode.setValue(55);

        //Click the signature strip to trigger Link button availability
        const cardSignatureStrip = await $(this.cardSignatureStrip);
        await cardSignatureStrip.waitForDisplayed();
        await cardSignatureStrip.click();

        //pause is needed to allow time for the steps to be completed
        await browser.pause(4000);

        //Click the link button
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();

        //pause is needed to allow time for the steps to be completed
        await browser.pause(1000);

        //close the payment method modal
        const closePaymentMethodModalButton = await $(this.closePaymentMethodModalButton);
        await closePaymentMethodModalButton.waitForDisplayed();
        await closePaymentMethodModalButton.click();
    },
    selectSupportiveClass: async function() {
        const supportCarButton = await $(this.supportCarButton);
        await supportCarButton.waitForDisplayed();
        await supportCarButton.click();
    },
    addMessageToDriver: async function() {
        const driverMessageInput = await $(this.driverMessageInput);
        await driverMessageInput.setValue('Get some whiskey');
        const message = await driverMessageInput.getValue();
        await expect(message).toBe('Get some whiskey');
    },
    orderBlanketAndHankerchief: async function() {
        const blanketHankerchiefSwitch = await ($(this.blanketHankerchiefSwitch));
        await blanketHankerchiefSwitch.waitForDisplayed();
        await blanketHankerchiefSwitch.click();
        await expect(blanketHankerchiefSwitch).toBeEnabled();
    },
    orderIceCream: async function() {
        
        //pause is needed for system to catch up
        await browser.pause(1000);

        const iceCreamBucket = await $(this.iceCreamBucket);
        await iceCreamBucket.waitForDisplayed();
        await iceCreamBucket.click();

        //pause is needed for system to catch up
        await browser.pause(1000);

        const addIceCream = await $(this.plusButton);
        await addIceCream.waitForDisplayed()
        await addIceCream.doubleClick();
    }
};