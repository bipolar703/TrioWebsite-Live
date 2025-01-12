# Trio Website

This is the private repository for the Trio website.

## Deployment on Plesk

This project is a standard web application built with Vite. To deploy it on a Plesk hosting environment, follow these steps:

1. **Clone the repository:** Clone this repository to the desired location on your Plesk server.
2. **Set the document root:** In your Plesk panel, configure the document root for your domain to point to the `dist` directory within the cloned repository. This ensures that the webserver serves the built files.
3. **Install dependencies:** Navigate to the repository directory on your server and run `npm install` to install the project dependencies.
4. **Build the project:** Run `npm run build` to generate the production-ready build in the `dist` directory.
