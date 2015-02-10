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






 #End 2 End Testing (Protractor)
 To run the end-2-end tests against the application you use [Protractor](https://github.com/angular/protractor).

 ## Starting the Web Server
 In either case you will need the application to be running via the web-server.
 From the root folder of the repository run:

 ```
 npm start
 ```

 The application should now be available at `http://localhost:8000/app/index.html`

 ## Testing with Protractor

 As a one-time setup, download webdriver.
 ```
 npm run update-webdriver
 ```

 Start the Protractor test runner using the e2e configuration:

 ```
 npm run protractor
 ```





[How to install git]: http://git-scm.com/book/en/v2/Getting-Started-Installing-Git
