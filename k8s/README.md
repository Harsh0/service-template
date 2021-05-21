# Setup Kubernetes CI/CD

## Install CLI tools

Install kubectl

`brew install kubectl`

Install kubesecrets

`sudo gem install kube_secrets_encode`

If ruby-gems is not installed, install it

`sudo apt-get install rubygems -y`

## Encode secrets

Go to secrets.yaml file and put your environment variables and encoded it using

`kube_secrets --file=secrets.yaml > secrets-base64.yaml`

## Apply Secrets

Run below command to apply secrets to your kubernetes namespace

`kubectl apply -f secrets-base64.yaml`

## Apply deployment

Run below command to apply your deployment

`kubectl apply -f api.yaml`

## Apply ingress

Run below command to apply your ingress

`kubectl apply -f ingress.yaml`
