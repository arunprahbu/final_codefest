# PrepWebex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

##Configuration
1. Create a new integration app here: https://developer.webex.com/my-apps/new/integration.
2. Make sure you enter your redirect URI `http://localhost:4200/logged` as per the routing configured in this repository.
3. Select all the scopes that starts with `meeting:*` and `spark:all`
4. Once your integration app is created, get all the details ClientId, SecretId, Redirect URIs and enter it in both `environments/environment.ts` and `environments/environment.prod.ts`
5. Run `npm install` to install all the required dependencies.
6. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## APP
1. http://localhost:4200/ opens the login page where the User has to authenticate themselves with CEC credentials.
2. After successfull login, the user is being redirected to http://localhost:4200/logged page.
3. The http://localhost:4200/logged page has the options to navigate to different Webex Features as follows
    1. To create and List Rooms
    2. To make Single Party call after being registered with access token
    3. Receive call from a another user
4. Enable AuthGuard to restrict manual access to different components it the user is not Authorized
5. Used Angular Momemtum UI in different pages Accordingly.

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
