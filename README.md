# Ledger Management

This application manages ledger system

## How to

### Prerequisites

node version >= v12.14.0

### Installation

-   Use the node package manager [npm](https://www.npmjs.com/) to run the application.

    ```bash
    npm install

    npm run start
    ```

### Test

-   Use the node package manager [npm](https://www.npmjs.com/) to run the unit tests.

    ```bash

    npm run test
    ```

### Usage

#### Please note

-   Ledger api /v1/ledger required authorization header which includes a bearer token
-   The bearer token can be generated from the /v1/user/login endpoint.
-   Use system define user to generate a bearer token. System define user is mentioned in the swagger docs as the example value.

API documentation can be found from [/api-docs](http://localhost:3000/api-docs) endpoint
