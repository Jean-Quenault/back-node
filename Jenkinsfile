pipeline {
    agent { label 'node-proj-dockerbuild-registry' }

    environment {
        /* Define necessary environment variables */
        REGISTRY_URL = '980377181750.dkr.ecr.eu-west-3.amazonaws.com/back'
        IMAGE_TAG = "${env.BUILD_ID}" /* For a single tag per build */
        AWS_DEFAULT_REGION = 'eu-west-3'
        REACT_APP_API_URL = "backend.jeanops.net"
    }


    stages {

        stage ('ECR connection') {
            steps {
                script {
                    /* Authentication token for the ECR register */
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REGISTRY_URL"
                }
            }
        }

        stage ('Git clone') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'Token', url: 'https://github.com/Jean-Quenault/back-node'
                }
            }
        }
        stage('Image building') {
            steps {
                script {
                    /* Image building */
                    sh "echo 'REACT_APP_SERVER_URL=${REACT_APP_API_URL}' > .env.production"
                    sh "docker build -t $REGISTRY_URL:$IMAGE_TAG ."
                }
            }
        }
        
        stage('Image pushing') {
            steps {
                script {
                    /* Push image to the registry ECR */
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

