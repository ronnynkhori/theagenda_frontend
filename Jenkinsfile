pipeline {
    agent any

    tools {
        // Use the Node.js installation defined in Jenkins
        nodejs 'Node'
    }

    environment {
        SSH_KEY = credentials('DigitalOceanSSH') // Replace 'DigitalOceanSSHKey' with your actual SSH key credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your GitHub repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Install npm dependencies and build the Angular project
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Digital Ocean') {
            steps {
                script {
                    // Start the SSH agent and add the private key
                    sshagent(credentials: [SSH_KEY]) {
                        // Copy files to the remote server using SSH
                        sh 'scp -r -o StrictHostKeyChecking=no dist/* root@164.92.135.84:/theagenda'
                        sh 'scp -r -o StrictHostKeyChecking=no Dockerfile root@164.92.135.84:/theagenda'
                        sh 'scp -r -o StrictHostKeyChecking=no nginx.conf root@164.92.135.84:/theagenda'
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend color: 'good', message: "'DEPLOYMENT SUCCESSFUL'"
        }
        failure {
            slackSend color: 'danger', message: "'DEPLOYMENT FAILED'"
        }
    }
}
