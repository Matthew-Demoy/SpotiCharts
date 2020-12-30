export const defaultTaskOptions: Ninja.TaskOptions = {
    ProductInfo : {
        url : 'google.com',
        quantity : 1,
    },
    AccountInfo : {
        username : '',
        password: ''
        
    },
    
    PaymentInfo : {
        number: '',
        CVV : '',
        expiryMonth: '',
        expiryYear: ''
    },
    ShipmentInfo: {
        FirstName: '',
        LastName: '',
        State: '',
        Address: '',
        Address2: '',
        ZipCode: '',
        PhoneNumber: '',
        City: '',
        Country: ''
    }
}