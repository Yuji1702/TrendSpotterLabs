/**
 * Root Application Module
 * 
 * This is the root module of the NestJS application that orchestrates
 * all feature modules and configurations.
 * 
 * Functionality:
 * - Serves static files (HTML, CSS, JS) from the public directory
 * - Registers the ContactModule for handling contact form submissions
 * - Configures the application's dependency injection container
 */

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContactModule } from './contact/contact.module';

/**
 * AppModule is the root module that ties together all feature modules
 * and global configurations for the TrendSpotter Labs application
 */
@Module({
  imports: [
    // ServeStaticModule serves static files (HTML, CSS, JS) from the public directory
    // This allows the frontend to be served alongside the API
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to static files
      serveRoot: '/', // URL path where static files are served
    }),
    
    // ContactModule provides API endpoints for contact form submissions
    ContactModule,
  ],
})
export class AppModule {}
