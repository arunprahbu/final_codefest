# PrepWebex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## APP
### LOGIN PAGE
	Login Page is designed to authenticate the respective user therby restricting their access to webpages
    Clicking on "Authenticate" button in https://arunprahbu333.web.app/ will initiate the Cisco SSO login page
    After the successfull completion of Authentication, the user will be allowed to login to access webpages and features
        of Webex
    If the Authentication of user is not acheived, the user will not be allowed to naviagte to other webpages rather will 
        be redirected to login page itself, which is acheived using AuthGaurd Service

### AFTER LOGIN
    After successfull login, the user is redirected to https://arunprahbu333.web.app/logged where the user has been 
        with list of features with designed images
    Upon clicking of repective images, the user will be redirected to the respective features.
    User also has an option of using the buttons in the top right corner to navigate to different feature.
    User has been allowed to use the logout option which signs off from the Webex.
    Features are
        1. ROOM
        2. WEBEX CALL
        3. TEAMS

## ROOM
    When the user is in the Room, they have the privelage to use the following webex services
        1. Create a webex room
        2. List webex Rooms of upto 30 max limit
        3. Remove a specific Room based on the name
    Create a webex room
        1. Enter the room name and click on create room button to create room
        2. After creating a room, the success message will be displayed and automatically hides
        Send Messages
            1. Users are allowed to send a message a particular Room.
            2. Enter the username, Messages in respective fields and click send messages button.
            3. Message will be successfully sent.
        Receive Messages
            1. Inorder to Receive the webex message, click on the Receive Message button which triggers the
                incoming message and alert will be shown as "listening to incoming events"
            2. After that the incoming messages are alerted to the user and displayed in console as well
    List Room
        1. Clicking on list room tab and List Rooms button displays a maximum of 30 rooms related to the users account.
        2. Clicking on clear list button clear the lsited rooms on the webpage.
     
    Remove Room
        1. Upon clicking on Remove Room tab, enter the exect room name to be removed and clicking on remove room button
            removes the respective room for the user

## WEBEX CALL
    This feature allows the user to make and recive call after authenticating with webex token.
    Feature oage includes
        1. Get token? helps the user to naviagte to the "https://developer.webex.com/docs/api/getting-started#accounts-and-authentication"
            page and get the user token.
        2. User has to enter the token in token field and click on connect to get connected to make/receive call
        3. Upon registering, now user can enter the callee whom to be called
        4. The Incoming and outgoing Video are shown at the end of the web page
        5. User can use "constraints: option to enable/disable audio/video.
        6. Hangup button is used to disconnect call either incoming or outgoing
        7. When the user is in regiseterd state, when incoming call event is found, the user will be notifed with 
            incoming call alert where call can either be accepted or cancelled.

## TEAM
    Create a webex team
        1. Enter the team name and click on create team button to create team
        2. After creating a team, the success message will be displayed and automatically hides
    List Room
        1. Clicking on list team tab and List Teamss button displays list of teams related to the users account.
        2. Clicking on clear list button clear the lsited teams on the webpage.
    Update Team
        1. User has to enter the team and to be added user's mail id  to update the team with the respective member.

### Navigate options
    Each of the web pages has the option to navigate to other rooms and has option for the user to Logout.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
