pipeline{
    agent any
    
    
    stages{
        stage("Pulling Repo"){
            steps{
                git url:"https://github.com/Vijay-KV09/testing",
                branch: "main"
            }
        }
        stage("Building Job"){
            steps{
                bat "docker-compose build"
            }   
        }
        stage("Running Job"){
            steps{
                bat "docker-compose up -d"
            }
        }
        stage("Verification"){
            steps{
                echo "App Deployed"
            }
        }
    }
}