docker build -t main-service .
# Create bridge network with local machine
docker network create -d bridge my-bridge-network
# Use 'host.docker.internal' instead of 'localhost' in '.{$NODE_ENV}.env' file
docker run -p 8080:3000 --network="my-bridge-network" -e NODE_ENV=$NODE_ENV -e APP_PORT=3000 main-service