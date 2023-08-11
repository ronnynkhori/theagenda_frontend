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
        always {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                script {
                    slackSend color: currentBuild.result == 'FAILURE' ? 'danger' : 'good',
                              message: currentBuild.result == 'FAILURE' ? "'DEPLOYMENT FAILED'" : "'DEPLOYMENT SUCCESSFUL'"
                }
            }
        }
    }
}
