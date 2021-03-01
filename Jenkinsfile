def COLOR_MAP = ["SUCCESS": "good", "FAILURE": "danger", "UNSTABLE": "danger", "ABORTED": "danger"]
def DEPLOY_STATUS = ["SUCCESS": "SUCESSO", "FAILURE": "FALHA", "UNSTABLE": "INSTÁVEL", "ABORTED": "CANCELADO"]
def DEV_FRONTEND_HOST = ""
def DEV_BACKEND_HOST = ""
def PROD_FRONTEND_HOST = ""
def PROD_BACKEND_HOST = ""
def CONTAINER_REGISTRY = ""
def CONTAINER_NAME = ""
def WEBSERVER_DIR = ""
def DOCKER_DIR = ""
def BUILD_DIR = ""
def STACK_NAME = ""
def PROJECT = ""

pipeline {
  agent any
  stages {
    stage("Application deploy") {
      when { branch "homologacao" }
      steps {
        script {
          sh "docker build --tag=${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao ."
          sh "docker push ${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao"
          sh "docker rmi ${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao"
          sh "scp -oStrictHostKeyChecking=no -r ./config/docker/docker-compose.${PROJECT}.yml xlab@${DEV_BACKEND_HOST}:${DOCKER_DIR}"
          sh "ssh -oStrictHostKeyChecking=no xlab@${DEV_BACKEND_HOST} 'docker pull ${CONTAINER_REGISTRY}${CONTAINER_NAME}:homologacao && docker stack deploy -c /projetos/docker/docker-compose.${PROJECT}.yml ${STACK_NAME} && docker service update --force ${STACK_NAME}_${PROJECT} && docker system prune -f'"
        }
      }
    }
    stage("Release deploy") {
      when { branch "release" }
      steps {
        script {
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
