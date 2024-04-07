# Quotze - A Daily Quotation Application

Quotze is a daily quotation application designed to deliver inspirational quotes to users. It features secure authentication and authorization using **Auth0**, social media logins for streamlined user onboarding, and a robust system for daily quote delivery through SendGrid. The intuitive dashboard empowers users to manage their subscription preferences effortlessly.

The project uses API-Ninjas's Quotes API to generate the quote of the day. For more information, refer the following.

[API Ninjas Quotes API](https://api-ninjas.com/api/quotes)

## Features

-   **Secure Authentication and Authorization**: Implemented using Auth0, providing a secure login process and ensuring user data privacy.

-   **Social Media Logins**: Integrated social media logins to enhance user onboarding and increase user registrations.

-   **Daily Quote Delivery**: Utilizes SendGrid for delivering daily inspirational quotes to users' inboxes, with precise scheduling using cron jobs.

-   **Feature-rich Dashboard**: Users can manage their subscription preferences and settings through an intuitive and feature-rich dashboard.

## Deployed App Link

[Quotze - A Daily Quotation Application](https://quotze.onrender.com)

## Installation

To run the project locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/mohit1301/Quotze.git
    ```

2.  Install dependencies:

    ```bash
    cd Quotze
    npm install
    ```

3.  Create a .env file in the root directory and add the following environment variables:

    ```bash
    AUTH0_CLIENT_ID=<your_auth0_client_id>
    AUTH0_DOMAIN=<your_auth0_domain>
    AUTH0_CLIENT_SECRET=<your_auth0_client_secret>
    PORT=<desired_port_number>
    SESSION_SECRET=<your_session_secret>
    BASE_URL=<base_url_of_the_app>
    SENDGRID_API_KEY=<your_sendgrid_api_key>
    AUTH0_API_TOKEN=<your_auth0_api_token>
    QUOTES_API_KEY=<your_quotes_api_key>
    QUOTES_URL=<your_quotes_url>
    ```

4.  Start the server:

    ```bash
    npm start
    ```

5.  For development with automatic server restart, you can use:

    ```bash
    npm run devStart
    ```
