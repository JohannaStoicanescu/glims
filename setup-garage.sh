#!/bin/sh

CONTAINER_NAME="garage"
REQUIRED_MEMORY="1G"

if [ "$1" != "" ]; then
    REQUIRED_MEMORY="$1"
fi

echo "Setting up Garage with a size of $REQUIRED_MEMORY"

# Get node ID
NODE_ID=$(docker compose exec garage /garage node id -q | cut -d@ -f1)

# Configure layout
echo "Configuring layout..."
docker compose exec $CONTAINER_NAME /garage layout assign $NODE_ID -z dc1 -c $REQUIRED_MEMORY
docker compose exec $CONTAINER_NAME /garage layout apply --version 1

# Create key
echo "Creating access key..."
docker compose exec $CONTAINER_NAME /garage key create app_key

echo "Creating bucket..."
docker compose exec $CONTAINER_NAME /garage bucket create glims-bucket
docker compose exec $CONTAINER_NAME /garage bucket allow glims-bucket --read --write --key app_key"

echo "Garage setup complete."
echo "Node ID: $NODE_ID \($REQUIRED_MEMORY\)"
echo "Bucket: glims-bucket"
echo "Access Key: app_key "
