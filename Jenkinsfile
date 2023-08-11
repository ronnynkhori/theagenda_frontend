pipeline {
    agent any

    tools {
        nodejs 'Node'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Digital Ocean') {
            steps {
                script {
                    try {
                        sshagent(credentials: ['DigitalOceanSSH']) {
                            // Create the /theagenda directory if it doesn't exist
                            sh 'ssh -o StrictHostKeyChecking=no root@164.92.135.84 mkdir -p /theagenda'

                            sh 'scp -r -o StrictHostKeyChecking=no dist root@164.92.135.84:/theagenda'
                            sh 'scp -r -o StrictHostKeyChecking=no Dockerfile root@164.92.135.84:/theagenda'
                            sh 'scp -r -o StrictHostKeyChecking=no nginx.conf root@164.92.135.84:/theagenda'
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Deployment to Digital Ocean failed: ${e.message}")
                    }
                }
            }
        }
    }

    post {
        success { slackSend color:'good', message:'DEPLOYMENT SUCCESSFULL' }
        failure { slackSend color:'danger', message:'DEPLOYMENT FAILED' }
    }
}
