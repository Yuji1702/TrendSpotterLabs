/**
 * Create Contact DTO (Data Transfer Object)
 * 
 * This DTO defines the structure and validation rules for contact form submissions.
 * It uses class-validator decorators to ensure data integrity.
 * 
 * Validation Rules:
 * - name: Required, must be a string
 * - email: Required, must be a valid email address
 * - message: Required, must be a string
 * - phone: Optional, must be a string if provided
 * - company: Optional, must be a string if provided
 * 
 * All validation is performed automatically by NestJS ValidationPipe
 * before the data reaches the controller.
 */

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * CreateContactDto defines the expected structure for contact form data
 * and provides automatic validation
 */
export class CreateContactDto {
  /**
   * Contact's name (required)
   * Must be a non-empty string
   */
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  /**
   * Contact's email address (required)
   * Must be a valid email format
   */
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  /**
   * Contact's message (required)
   * Must be a non-empty string
   */
  @IsNotEmpty({ message: 'Message is required' })
  @IsString()
  message: string;

  /**
   * Contact's phone number (optional)
   * If provided, must be a string
   */
  @IsOptional()
  @IsString()
  phone?: string;

  /**
   * Contact's company name (optional)
   * If provided, must be a string
   */
  @IsOptional()
  @IsString()
  company?: string;
}
