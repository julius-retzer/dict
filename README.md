This was a homework for the interview proccess for eDocu in Bratislava, Slovakia.


# Translation Service

Translation service is application for handling databases of words and translations in various languages. It supports getting data from remote servers through configurable API or a local storage.

## How to run app locally (instructions specific for Ubuntu)

### Prerequisites

#### Git

Install Git

    apt-get install git

#### Node.js
Install Nodejs and its package managaer

    sudo apt-get update
    sudo apt-get install nodejs
    sudo apt-get install npm

### Installing the app

#### Clone Git repository and change the directory

    git clone https://github.com/wormyy/dict
    cd dict


#### Install app dependencies

    npm install

Due to package name conflict it might be necessary to download this package also

    sudo apt-get install nodejs-legacy

#### Start development server

    npm start

 Now you can access the app at http://localhost:8000/app/

## Running tests

### Unit tests

To run unit tests simply run

    npm test


### End 2 End Testing

First, start development server

    npm start



Update webdriver (this step is needed only for the first time)

    npm run update-webdriver

 Start the Protractor test runner using the e2e configuration:

    npm run protractor

## App configuration

In js/app.js module it is possible configure custom API server address, API endpoints, or local database:

The url of api service used to translate words or path to local mockDB
You can use inculded mockDB with one language by specifiyng '/mockDB'

    dictApp.constant('apiUrl', 'yourCustomApiURL');

Endpoint to get list of languages, eg.:

    dictApp.constant('LanguageEndpoint', '/languages/');

Endpoint to get lists words, eg.:

    dictApp.constant('translateEndpoint', '/translate/');

If mockDB is set to true, suffix .json is appended to requests

    dictApp.constant('mockDB', 'false');
