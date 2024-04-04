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
                sh 'npm install'
                sh 'npm run buildDO'
            }
        }

        stage('Deploy to Digital Ocean') {
            steps {
                        sshagent(credentials: ['DigitalOceanSSH']) {
                            // Create the /theagenda directory if it doesn't exist
                            sh "ssh -o StrictHostKeyChecking=no rnkhori@159.223.194.235 'mkdir -p /home/rnkhori/theagenda/web'"

                            sh 'scp -r -o StrictHostKeyChecking=no dist rnkhori@159.223.194.235:~/theagenda/web'
                            sh 'scp -r -o StrictHostKeyChecking=no Dockerfile rnkhori@159.223.194.235:~/theagenda/web'
                            sh 'scp -r -o StrictHostKeyChecking=no nginx.conf rnkhori@159.223.194.235:~/theagenda/web'

                            sh "ssh rnkhori@159.223.194.235 'cd ~/theagenda && docker compose up -d --force-recreate --build web'"
                        }
            }
        }
    }


}
