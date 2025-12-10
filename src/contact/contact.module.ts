/**
 * Contact Module
 * 
 * This module encapsulates all contact form functionality including
 * API endpoints, business logic, and data validation.
 * 
 * Functionality:
 * - Registers ContactController for handling HTTP requests
 * - Registers ContactService for business logic and Google Sheets integration
 * - Provides dependency injection for contact-related features
 */

import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

/**
 * ContactModule is a feature module that handles contact form submissions
 * and integrates with Google Sheets for data storage
 */
@Module({
  controllers: [ContactController], // HTTP request handlers
  providers: [ContactService], // Business logic providers
})
export class ContactModule {}
