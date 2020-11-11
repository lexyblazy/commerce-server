export const plain = {
  // no need to encrypt database details for local development environment
  POSTGRES_HOST: "localhost",
  POSTGRES_PORT: 5432,
  POSTGRES_USER: "commerce_admin",
  POSTGRES_PASSWORD: "lol",
  POSTGRES_DATABASE: "commerce",
  ADMIN_EMAIL: "lexyblazy@gmail.com",
  INTERNAL_LOGS_EMAIL: "logs@commercify.com",
  SUPPORT_EMAIL: "support@commercify.com",
  WELCOME_EMAIL: "hello@commercify.com",
  SERVER_URL: "localhost:5000",
};

export const encrypted = {
  SENDGRID_API_KEY:
    "AQICAHijOfWUWEhNcDrzwuTIeZRSwG4UQEMer44rG9Gqc6eXnAEYM9qxKfA2drgB6W+BL1mXAAAApzCBpAYJKoZIhvcNAQcGoIGWMIGTAgEAMIGNBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDC84QfesjWpCeekhCQIBEIBg5aCIrhC1JG1NVmaIDQ7bgpp4hnEQvTT5M8iP7s7EKc5Rup/RNcIEuJLZnl73zIHcUWb7Xdp1BEwIbpska+yNzS1yeb//fFM80ra+/TzozpQM0GToYgWhaJdA7vU3KzQt",
};
