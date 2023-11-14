# Step 1 : Image base
FROM node:lts

# Step 2 : Work directory
WORKDIR /usr/src/app

# Step 3 : copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Installing dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6 : port expose
EXPOSE 4000

# Step 7: Command to start the application
CMD ["node", "app.js"]
