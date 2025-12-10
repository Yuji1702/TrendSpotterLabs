/**
 * Contact Controller
 * 
 * This controller handles HTTP requests related to contact form submissions.
 * It defines the API endpoints and delegates business logic to ContactService.
 * 
 * Endpoints:
 * - POST /api/contact/submit - Submit a new contact form
 * 
 * Functionality:
 * - Receives contact form data from the frontend
 * - Validates the data using DTOs
 * - Delegates processing to the ContactService
 * - Returns the response to the client
 */

import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

/**
 * ContactController handles all contact-related HTTP endpoints
 * Base route: /api/contact
 */
@Controller('api/contact')
export class ContactController {
  /**
   * Constructor injects the ContactService for handling business logic
   * @param contactService - Service that handles contact form processing
   */
  constructor(private readonly contactService: ContactService) {}

  /**
   * POST /api/contact/submit
   * 
   * Handles contact form submission from the frontend.
   * The request body is automatically validated against CreateContactDto.
   * 
   * @param createContactDto - Validated contact form data
   * @returns Promise with success status and updated range information
   */
  @Post('submit')
  async submit(@Body() createContactDto: CreateContactDto) {
    return this.contactService.submitContact(createContactDto);
  }
}
