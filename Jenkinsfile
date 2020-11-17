#!groovy
pipeline {

  agent {
    docker {
      image 'node:14.15.1'
      label 'docker'
    }
  }

  stages {

    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Check') {
      steps {
        sh 'yarn run check'
      }
    }

  }

}
