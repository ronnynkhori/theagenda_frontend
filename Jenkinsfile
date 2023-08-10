pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your GitHub repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Install npm dependencies and build the Angular project4
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Digital Ocean') {
            steps {
                // Copy the built files to your Digital Ocean server using SSH
                sshPublisher(
                    continueOnError: false,
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'DigitalOceanSSH', // Name of your SSH configuration in Jenkins
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'dist/**', // Assuming your built files are in the 'dist' folder
                                    removePrefix: 'dist/',
                                    remoteDirectory: '/theagenda' // Change to your Digital Ocean directory
                                )
                            ]
                        )
                    ]
                )
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
