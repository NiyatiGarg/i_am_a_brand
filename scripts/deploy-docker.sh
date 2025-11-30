#!/bin/bash

# Docker deployment script

set -e

echo "🐳 Building and deploying with Docker..."

# Build images
echo "Building backend image..."
docker build -f Dockerfile.backend -t personal-brand-backend .

echo "Building frontend image..."
docker build -f Dockerfile.frontend -t personal-brand-frontend .

# Stop existing containers
docker-compose down

# Start containers
docker-compose up -d

echo "✅ Deployment complete!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"

