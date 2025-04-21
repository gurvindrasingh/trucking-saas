FROM jenkins/jenkins:lts

USER root

# Install kubectl
RUN curl -LO https://dl.k8s.io/release/v1.24.1/bin/linux/amd64/kubectl \
    && chmod +x kubectl \
    && mv kubectl /usr/local/bin/kubectl

USER jenkins