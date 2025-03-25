# UTDRS Frontend

Frontend for the Unified Threat Detection and Response System (UTDRS)

## Overview

This is the frontend application for the UTDRS platform, providing a user interface for security monitoring, alert management, and threat simulation.

## Features

- Security dashboard with overview of alerts and system status
- Alert management and investigation
- Security event monitoring
- Threat simulation controls
- User authentication
- Responsive design

## Backend Integration

This frontend integrates with the following backend services:

- API Gateway: https://utdrs-api-gateway.onrender.com
- Core Engine: https://utdrs-core-engine.onrender.com
- Response Service: https://response-service.onrender.com
- Data Simulator: https://utdrs-data-simulator.onrender.com

## Getting Started

### Prerequisites

- Node.js 16+ or Docker

### Running Locally

#### Using Node.js

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Using Docker

1. Build and run with Docker Compose:
   ```
   docker-compose up
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Render

1. Push the code to a Git repository
2. Create a new Web Service on Render
3. Select "Deploy from a Git repository"
4. Choose Docker as the environment
5. Configure environment variables if needed

Alternatively, you can use the included `render.yaml` file for Blueprint deployment.

## Development

### Project Structure

- `src/components` - React components
- `src/pages` - Page components
- `src/context` - React context providers
- `src/services` - API service functions
- `src/hooks` - Custom React hooks
- `src/utils` - Utility functions

### Technologies

- React 18
- TypeScript
- React Router
- React Query
- Axios
- TailwindCSS
- Docker

## License

[MIT License](LICENSE)
