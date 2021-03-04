def COLOR_MAP = ["SUCCESS": "good", "FAILURE": "danger", "UNSTABLE": "danger", "ABORTED": "danger"]
def DEPLOY_STATUS = ["SUCCESS": "SUCESSO", "FAILURE": "FALHA", "UNSTABLE": "INSTÁVEL", "ABORTED": "CANCELADO"]
def DEV_FRONTEND_HOST = ""
def DEV_BACKEND_HOST = "api.partners.xlab.work"
def PROD_FRONTEND_HOST = ""
def PROD_BACKEND_HOST = "api.partners.code7.com"
def CONTAINER_REGISTRY = "us.gcr.io/flexcontact/"
def CONTAINER_NAME = "code7-partners-api"
def WEBSERVER_DIR = ""
def DOCKER_DIR = "/projetos/docker/"
def BUILD_DIR = ""
def STACK_NAME = "docker"
def PROJECT = "code7-partners-api"

pipeline {
  agent any
  stages {
    stage("Homologation Deploy") {
      when { branch "homologacao" }
      steps {
        script {
          sh "npm install"
          sh "npm run build"
          sh "docker build --tag=${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao ."
          sh "docker push ${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao"
          sh "docker rmi ${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao"
          sh "scp -oStrictHostKeyChecking=no -r ./config/docker/docker-compose.${PROJECT}.yml xlab@${DEV_BACKEND_HOST}:${DOCKER_DIR}"
          sh "ssh -oStrictHostKeyChecking=no xlab@${DEV_BACKEND_HOST} 'docker pull ${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao && docker stack deploy -c /projetos/docker/docker-compose.${PROJECT}.yml ${STACK_NAME} && docker service update --force ${STACK_NAME}_${PROJECT} && docker system prune -f'"
        }
      }
    }
    stage("Release Deploy") {
      when { branch "release" }
      steps {
        script {
          sh "npm install"
          sh "npm run build"
          sh "docker build --tag=${CONTAINER_REGISTRY}${CONTAINER_NAME}:release ."
          sh "docker push ${CONTAINER_REGISTRY}${CONTAINER_NAME}:release"
          sh "docker rmi ${CONTAINER_REGISTRY}${CONTAINER_NAME}:release"
          sh "scp -oStrictHostKeyChecking=no -r ./config/docker/docker-compose.${PROJECT}.yml xlab@${PROD_BACKEND_HOST}:${DOCKER_DIR}"
          sh "ssh -oStrictHostKeyChecking=no xlab@${PROD_BACKEND_HOST} 'docker pull ${CONTAINER_REGISTRY}${CONTAINER_NAME}:release && docker stack deploy -c /projetos/docker/docker-compose.${PROJECT}.yml ${STACK_NAME} && docker service update --force ${STACK_NAME}_${PROJECT} && docker system prune -f'"
        }
      }
    }
  }
  post {
    always {
      echo "${DEPLOY_STATUS[currentBuild.currentResult]}"
      deleteDir()
    }
  }
}
