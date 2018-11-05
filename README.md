GoPay node.js SDK for payments REST API
=========

Please visit https://doc.gopay.com/en/ for more informations.

## Installation

You can install via npm

  `npm install gopay-nodejs`

## Basic usage

    const gopay = require('gopay-nodejs');
    
    const gp = new gopay.GoPay("ClientID", "ClientSecret", true);
    const data = {
      "target": {
                "type":"ACCOUNT",
                "goid":"8123456789"
              },
      "amount":"10000",
      "currency":"CZK",
      "order_number":"001",
      "items": [{
                "type":"ITEM", 
                "name":"obuv",
                "product_url":"https://www.eshop.cz/boty/lodicky", 
                "ean":1234567890123,
                "amount":10000,
                "count":1,
                "vat_rate":21
                }],
      "callback":{
                "return_url":"http://www.eshop.cz/return",
                "notification_url":"http://www.eshop.cz/notify"
              },
    }
    
    gp.createPayment(data).then(payment => {
      console.log(payment)
    })
    
    
## Get token

    gp.getToken().then(token => {
      console.log(token)
    }

## Create payment

    gp.createPayment(JSON_DATA).then(payment => {
      console.log(payment)
    }
    
## Payment status

    gp.getStatus(PAYMENT_ID).then(status => {
      console.log(status)
    }

## Void authorization

    gp.voidAuthorization(PAYMENT_ID).then(info => {
      console.log(info)
    }
    
## Capture authorization

    gp.captureAuthorization(PAYMENT_ID).then(info => {
      console.log(info)
    }
    
## Partial authorization

    gp.captureAuthorization(PAYMENT_ID, JSON_DATA).then(info => {
      console.log(info)
    }
    
## Create recurrence

    gp.createRecurrence(PAYMENT_ID, JSON_DATA).then(info => {
      console.log(info)
    }
    
## Void recurrence

    gp.voidRecurrence(PAYMENT_ID).then(info => {
      console.log(info)
    }
    
## Refund payment
  
    gp.refundPayment(PAYMENT_ID, AMOUNT).then(info => {
      console.log(info)
    }
