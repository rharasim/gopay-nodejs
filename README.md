GoPay node.js
=========

WARNING: There is a lot of work to do. Almost no error handeling. Use at your own risk.

Basic functions for GoPay REST API 

## Installation

  `npm install gopay-nodejs`

## Usage

    var gopay = require('gopay-nodejs');

    gopay.init({
	    clientID: 'XXXXXXXXXX',
	    clientSecret: 'XXXXXXXXX',
      sandbox: true
    }
 
