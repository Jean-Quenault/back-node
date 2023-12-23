
# Back Node

This project is the back-end for an application that collects and stores user information such as IP address, operating system, and internet browser. It also manages a database containing this information and offers an API to receive user data.

The application will be built, and its Docker image will be sent to an AWS registry to facilitate scalable deployment with an autoscaling group.

## Prerequisites

- Docker
- Jenkins
- Two Amazon Linux AWS EC2 nodes
- An AWS registry (ECR)
- Node.js and Express
- A database

## Installation and Configuration

1. **Clone the repository:**

 - https://github.com/Jean-Quenault/back-node

2. **Database**
 
 - The database can be of any type but must be via AWS RDS.
 - Create a table containing columns id, ip, os, and browser:

 <code>CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(255),
    browser VARCHAR(255),
    os VARCHAR(255)
);</code>

3. **Environment Variable Definition**

 - Create a .env.development or .env.production file as needed
 - Define your variables

4. **Configure Jenkins:**
- Ensure Jenkins is installed and configured on your server.
- Create and configure your node.
- Modify the Jenkinsfile with your AWS registry.
- Use the `Jenkinsfile` provided in the repository to set up your pipeline.
- Launch the pipeline. The web application image is now on the registry.

5. **Deployment with Docker:**
- On your EC2 node, execute the following commands to authenticate with the registry, push the image, build and launch the Docker container:
  ```
  aws ecr get-login-password --region your_region | docker login --username AWS --password-stdin your_aws_id.dkr.ecr.your_region.amazonaws.com
  docker pull your_aws_id.dkr.ecr.your_region.amazonaws.com/ecr_repo_name:tag
  docker run -p local_port:container_port your_aws_id.dkr.ecr.your_region.amazonaws.com/ecr_repo_name:tag
  ```

## Usage

- The back-end API can be accessed via http://[EC2_node_IP_address]:[port].
- Consult the API documentation for more details on the available endpoints.

## Acknowledgements

Thanks to Armen Avdoyan.
