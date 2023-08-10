pipeline {
    agent any

    tools {
        // Use the Node.js installation defined in Jenkins
        nodejs "Node"
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
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Digital Ocean') {
            steps {
                script {
                    // Copy the built files to your Digital Ocean server using SSH
                    sshagent(credentials: ['DigitalOceanSSH']) {
                        sh 'scp -r dist/* root@164.92.135.84:/theagenda'
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
