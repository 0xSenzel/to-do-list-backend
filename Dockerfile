FROM node:20.13.1-alpine

# Create a directory for the app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Add a non-root user and group
RUN addgroup -S appuser && adduser -S -G appuser appuser

# Change ownership of the application directory
RUN chown -R appuser:appuser /usr/src/app

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 3333

CMD ["npm", "run", "start:prod"]