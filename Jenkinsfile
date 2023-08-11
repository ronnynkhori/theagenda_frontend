pipeline {
    agent any

    tools {
        nodejs 'Node'
    }

    environment {
        SSH_KEY = credentials('DigitalOceanSSH') // Replace 'DigitalOceanSSHKey' with your actual SSH key credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Digital Ocean') {
            steps {
                        sshagent(credentials: [SSH_KEY]) {
                            // Create the /theagenda directory if it doesn't exist
                            sh 'ssh -o StrictHostKeyChecking=no rnkhori@164.92.135.84 mkdir -p /theagenda'

                            sh 'scp -r -o StrictHostKeyChecking=no dist rnkhori@164.92.135.84:/theagenda'
                            sh 'scp -r -o StrictHostKeyChecking=no Dockerfile rnkhori@164.92.135.84:/theagenda'
                            sh 'scp -r -o StrictHostKeyChecking=no nginx.conf rnkhori@164.92.135.84:/theagenda'
                        }
            }
        }
    }

    post {
        success { slackSend color:'good', message:'DEPLOYMENT SUCCESSFULL' }
        failure { slackSend color:'danger', message:'DEPLOYMENT FAILED' }
    }
}
