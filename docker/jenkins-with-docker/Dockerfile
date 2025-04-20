# Start from the official Jenkins LTS image
FROM jenkins/jenkins:lts

# Install Docker and other dependencies
USER root
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Add the Jenkins user to the docker group to allow Jenkins to use Docker
RUN usermod -aG docker jenkins

# Switch back to Jenkins user
USER jenkins

# Expose Jenkins port
EXPOSE 8080

# Set up entrypoint
ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/jenkins.sh"]
