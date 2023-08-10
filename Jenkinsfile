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
                // Install npm dependencies and build the Angular project4
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            script {
                // Publish files over SSH using the configured SSH server
                sshPublisher(
                    continueOnError: false,
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'DigitalOceanSSH', // Name of your SSH configuration in Jenkins
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'dist/**', // Assuming your built files are in the 'dist' folder
                                    removePrefix: 'dist/', // Remove this prefix from source path
                                    remoteDirectory: '/theagenda' // Remote directory on the Digital Ocean server
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
