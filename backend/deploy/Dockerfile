# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if they exist)
COPY server/package*.json ./

# Install dependencies
RUN npm install

COPY server server


# Copy the rest of your app's source code into the container


# Expose the port your Express server is running on (default is 3000)
EXPOSE 1213

# Start your Express app
CMD ["npm", "run", "start"]
