# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 node:16

# Install linux packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    nano \
    tree && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root group and user
RUN groupadd --gid 10001 app && \
    useradd --uid 10001 --gid app --shell /bin/bash --create-home app

# Switch to the user's home directory
WORKDIR /home/app

# Set the $HOME environment variable (to avoid permission issues during "npm install")
ENV HOME /home/app

# Copy the package into the Docker image
COPY package.json package-lock.json ./

# Install the node modules
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the app's port (optional)
EXPOSE 8080

# Switch to the non-root user
USER 10001

CMD ["npm", "run", "start"]
