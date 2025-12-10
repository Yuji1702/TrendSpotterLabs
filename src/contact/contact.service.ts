/**
 * Contact Service
 * 
 * This service handles the business logic for contact form submissions.
 * It integrates with Google Sheets API to store form data.
 * 
 * Functionality:
 * - Initializes Google Sheets API client with hardcoded credentials
 * - Processes contact form submissions
 * - Generates serial numbers for each submission
 * - Appends form data to Google Sheets
 * - Handles errors and provides meaningful error messages
 */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { GOOGLE_SHEETS_CONFIG } from '../config/google-sheets.config';
import { CreateContactDto } from './dto/create-contact.dto';

/**
 * ContactService provides business logic for contact form processing
 * and Google Sheets integration
 */
@Injectable()
export class ContactService {
  private readonly sheets;
  private readonly auth;

  /**
   * Constructor initializes the Google Sheets API client
   * Credentials are loaded from hardcoded configuration
   */
  constructor() {
    // Initialize Google Sheets API authentication with service account credentials
    this.auth = new google.auth.GoogleAuth({
      credentials: GOOGLE_SHEETS_CONFIG.credentials, // Service account credentials
      scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Required permission scope
    });

    // Create Google Sheets API client instance
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  /**
   * Processes a contact form submission and saves it to Google Sheets
   * 
   * Process:
   * 1. Extract form data from DTO
   * 2. Get current row count to generate serial number
   * 3. Prepare data row with serial number and form fields
   * 4. Append data to the configured Google Sheet
   * 5. Return success response with updated range
   * 
   * @param createContactDto - Validated contact form data
   * @returns Promise with success status and sheet update information
   * @throws InternalServerErrorException if Google Sheets API call fails
   */
  async submitContact(createContactDto: CreateContactDto) {
    try {
      // Extract form fields from the DTO
      const { name, email, message, phone, company } = createContactDto;

      // Get the current number of rows to calculate the next serial number
      // This queries column A to count existing entries
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: 'A:A', // Query only column A for efficiency
      });

      const rows = response.data.values || [];
      const serialNumber = rows.length; // Serial number is the count of existing rows

      // Prepare the data row to append to the sheet
      // Format: [Serial Number, Name, Email, Phone, Company, Message]
      const values = [[
        serialNumber,
        name,
        email,
        phone || '', // Use empty string if phone is not provided
        company || '', // Use empty string if company is not provided
        message,
      ]];

      // Append the data to the Google Sheet
      const result = await this.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: GOOGLE_SHEETS_CONFIG.range, // Target sheet and range (e.g., LiveDB!A:F)
        valueInputOption: 'RAW', // Insert values as-is without interpretation
        requestBody: {
          values, // The data to append
        },
      });

      // Return success response with the updated range information
      return {
        success: true,
        message: 'Data saved successfully.',
        updatedRange: result.data.updates?.updatedRange,
      };
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error saving to Google Sheets:', error);
      
      // Throw a standardized HTTP exception with error details
      throw new InternalServerErrorException({
        success: false,
        error: error.message || 'Failed to save data',
      });
    }
  }
}
