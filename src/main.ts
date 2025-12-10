/**
 * Main Application Entry Point
 * 
 * This file bootstraps the NestJS application and configures global settings.
 * It serves as the starting point for the TrendSpotter Labs analytics platform.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Bootstrap function that initializes and starts the NestJS application
 * 
 * Functionality:
 * - Creates a NestJS application instance
 * - Configures CORS to allow cross-origin requests from any origin
 * - Sets up global validation pipes for automatic DTO validation
 * - Starts the HTTP server on the specified port
 */
async function bootstrap() {
  // Create the NestJS application instance with AppModule as the root module
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS (Cross-Origin Resource Sharing) for frontend requests
  // This allows the frontend served from any domain to communicate with the API
  app.enableCors({
    origin: '*', // Allow requests from any origin (consider restricting in production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  });
  
  // Enable global validation pipes for automatic request validation
  // This validates all incoming requests against DTOs using class-validator decorators
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that don't have decorators
    forbidNonWhitelisted: false, // Don't throw error for extra properties
    transform: true, // Automatically transform payloads to DTO instances
  }));

  // Get port from environment variable or use default 3000
  const port = process.env.PORT || 3000;
  
  // Start the HTTP server and listen for incoming requests
  await app.listen(port);
  console.log(`🚀 TrendSpotter Labs application is running on: http://localhost:${port}`);
}

// Start the application
bootstrap();
