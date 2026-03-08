#!/bin/bash

# Garage Setup Script
# This script sets up a Garage storage instance with layout, bucket, and access keys.
# It outputs all the environment variables needed for your .env file.
#
# Usage:
#   ./setup-garage.sh [memory] [key_name] [bucket_name]
#
# Examples:
#   ./setup-garage.sh                    # Uses defaults: 1G, app_key, glims-bucket
#   ./setup-garage.sh 2G                 # Sets memory to 2G
#   ./setup-garage.sh 1G my_key my_bucket # Custom key and bucket names
#
# Requirements:
#   - Docker Compose must be running
#   - Garage container must be started: docker compose up -d garage

set -e  # Exit on error

CONTAINER_NAME="garage"
REQUIRED_MEMORY="${1:-1G}"
KEY_NAME="${2:-app_key}"
BUCKET_NAME="${3:-glims-bucket}"

echo "🚀 Setting up Garage..."
echo "   Memory: $REQUIRED_MEMORY"
echo "   Key name: $KEY_NAME"
echo "   Bucket name: $BUCKET_NAME"
echo ""

# Check if garage container is running
if ! docker compose ps garage | grep -q "Up"; then
    echo "❌ Error: Garage container is not running. Please start it with 'docker compose up -d garage'"
    exit 1
fi

# Wait for garage to be ready
echo "⏳ Waiting for Garage to be ready..."
sleep 2

# Get node ID
echo "📋 Getting node ID..."
NODE_ID=$(docker compose exec -T $CONTAINER_NAME /garage node id -q 2>/dev/null | cut -d@ -f1)

if [ -z "$NODE_ID" ]; then
    echo "❌ Error: Failed to get node ID. Is Garage running?"
    exit 1
fi

echo "   Node ID: $NODE_ID"
echo ""

# Configure layout
echo "🔧 Configuring layout..."
if ! docker compose exec -T $CONTAINER_NAME /garage layout assign "$NODE_ID" -z dc1 -c "$REQUIRED_MEMORY" 2>/dev/null; then
    echo "⚠️  Warning: Layout assignment may have failed or already exists. Continuing..."
fi

if ! docker compose exec -T $CONTAINER_NAME /garage layout apply --version 1 2>/dev/null; then
    echo "⚠️  Warning: Layout apply may have failed or already applied. Continuing..."
fi
echo "   ✓ Layout configured"
echo ""

# Create or get access key
echo "🔑 Setting up access key..."
KEY_INFO=$(docker compose exec -T $CONTAINER_NAME /garage key info "$KEY_NAME" 2>/dev/null || true)

if [ -z "$KEY_INFO" ]; then
    echo "   Creating new access key: $KEY_NAME"
    KEY_OUTPUT=$(docker compose exec -T $CONTAINER_NAME /garage key create "$KEY_NAME" 2>/dev/null)
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to create access key"
        exit 1
    fi
    KEY_INFO=$(docker compose exec -T $CONTAINER_NAME /garage key info "$KEY_NAME" 2>/dev/null)
else
    echo "   Access key already exists: $KEY_NAME"
fi

# Extract access key ID and secret key from KEY_INFO
# Garage key info output format is typically:
# name: <key_name>
# access_key_id: <id>
# secret_access_key: <secret>
# or sometimes with different spacing/formatting

# Try to extract access_key_id (typically 20+ uppercase alphanumeric characters)
ACCESS_KEY_ID=$(echo "$KEY_INFO" | grep -i "access_key_id" | sed -E 's/.*access_key_id[:\s]+([A-Z0-9]+).*/\1/i' | head -1 | tr -d '[:space:]')

# Try alternative format (with spaces or colons)
if [ -z "$ACCESS_KEY_ID" ]; then
    ACCESS_KEY_ID=$(echo "$KEY_INFO" | grep -iE "access.*key.*id" | sed -E 's/.*[Aa]ccess[_\s]*[Kk]ey[_\s]*[Ii]d[:\s]+([A-Z0-9]{20,}).*/\1/' | head -1 | tr -d '[:space:]')
fi

# Extract secret_access_key (typically 40+ base64 characters)
SECRET_ACCESS_KEY=$(echo "$KEY_INFO" | grep -i "secret_access_key" | sed -E 's/.*secret_access_key[:\s]+([A-Za-z0-9+/=]{40,}).*/\1/i' | head -1 | tr -d '[:space:]')

# Try alternative format for secret
if [ -z "$SECRET_ACCESS_KEY" ]; then
    SECRET_ACCESS_KEY=$(echo "$KEY_INFO" | grep -iE "secret.*access.*key" | sed -E 's/.*[Ss]ecret[_\s]*[Aa]ccess[_\s]*[Kk]ey[:\s]+([A-Za-z0-9+/=]{40,}).*/\1/' | head -1 | tr -d '[:space:]')
fi

# If key was just created, try to extract from creation output
if [ -z "$ACCESS_KEY_ID" ] || [ -z "$SECRET_ACCESS_KEY" ]; then
    if [ -n "$KEY_OUTPUT" ]; then
        # Look for patterns in the creation output
        ACCESS_KEY_ID=$(echo "$KEY_OUTPUT" | grep -oE '[A-Z0-9]{20,}' | head -1)
        SECRET_ACCESS_KEY=$(echo "$KEY_OUTPUT" | grep -oE '[A-Za-z0-9+/=]{40,}' | head -1)
    fi
fi

if [ -z "$ACCESS_KEY_ID" ] || [ -z "$SECRET_ACCESS_KEY" ]; then
    echo "❌ Error: Failed to extract access key information"
    echo ""
    echo "Key info output was:"
    echo "----------------------------------------"
    echo "$KEY_INFO"
    echo "----------------------------------------"
    echo ""
    echo "Please manually run: docker compose exec garage /garage key info $KEY_NAME"
    echo "Then extract the access_key_id and secret_access_key values."
    exit 1
fi

echo "   ✓ Access key ready"
echo ""

# Create bucket
echo "🪣 Creating bucket..."
if docker compose exec -T $CONTAINER_NAME /garage bucket info "$BUCKET_NAME" >/dev/null 2>&1; then
    echo "   Bucket already exists: $BUCKET_NAME"
else
    if ! docker compose exec -T $CONTAINER_NAME /garage bucket create "$BUCKET_NAME" 2>/dev/null; then
        echo "❌ Error: Failed to create bucket"
        exit 1
    fi
    echo "   ✓ Bucket created: $BUCKET_NAME"
fi
echo ""

# Set bucket permissions
echo "🔐 Setting bucket permissions..."
if ! docker compose exec -T $CONTAINER_NAME /garage bucket allow "$BUCKET_NAME" --read --write --key "$KEY_NAME" 2>/dev/null; then
    echo "⚠️  Warning: Failed to set bucket permissions (may already be set)"
else
    echo "   ✓ Permissions configured"
fi
echo ""

# Output environment variables
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Garage setup complete!"
echo ""
echo "📝 Add these environment variables to your .env file:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "GARAGE_ENDPOINT=http://localhost:3900"
echo "GARAGE_ACCESS_KEY=$ACCESS_KEY_ID"
echo "GARAGE_SECRET_KEY=$SECRET_ACCESS_KEY"
echo "GARAGE_BUCKET_NAME=$BUCKET_NAME"
echo "GARAGE_REGION=garage"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Summary:"
echo "   Node ID: $NODE_ID"
echo "   Bucket: $BUCKET_NAME"
echo "   Access Key Name: $KEY_NAME"
echo "   Access Key ID: $ACCESS_KEY_ID"
echo ""
