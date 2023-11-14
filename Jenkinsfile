pipeline {
    agent { label 'node-proj-dockerbuild-registry' }

    environment {
        /* Define the necessary environment variables */
        REGISTRY_URL = '980377181750.dkr.ecr.eu-west-3.amazonaws.com/registry-proj-dockerbuild'
        IMAGE_TAG = "back-${env.BUILD_ID}" /* For a unique tag per image */
        AWS_DEFAULT_REGION = 'eu-west-3'
    }


    stages {

        stage ('ECR connection') {
            steps {
                script {
                    /* Get a token for the ECR authentification */
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REGISTRY_URL"
                }
            }
        }

        stage ('Application download') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'Token', url: 'https://github.com/Jean-Quenault/back-node'
                }
            }
        }
        stage('Image building') {
            steps {
                script {
                    /* Build the Docker image with the tag*/
                    sh "docker build -t $REGISTRY_URL:$IMAGE_TAG ."
                }
            }
        }
        
        stage('Image pushing') {
            steps {
                script {
                    /* Push the image to the ECR */
                    sh "docker push $REGISTRY_URL:$IMAGE_TAG"
                }
            }
        }
    }


    post {
        always {
            script {
                /* Clean if necessary */
                sh "docker image prune -f"
            }
        }
    }
}
