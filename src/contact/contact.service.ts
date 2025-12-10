import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { GOOGLE_SHEETS_CONFIG } from '../config/google-sheets.config';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly sheets;
  private readonly auth;

  constructor() {
    // Initialize Google Sheets API with hardcoded credentials
    this.auth = new google.auth.GoogleAuth({
      credentials: GOOGLE_SHEETS_CONFIG.credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async submitContact(createContactDto: CreateContactDto) {
    try {
      const { name, email, message, phone, company } = createContactDto;

      // Get the last serial number
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: 'A:A',
      });

      const rows = response.data.values || [];
      const serialNumber = rows.length;

      // Prepare the data to append
      const values = [[
        serialNumber,
        name,
        email,
        phone || '',
        company || '',
        message,
      ]];

      // Append the data to the sheet
      const result = await this.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: GOOGLE_SHEETS_CONFIG.range,
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      });

      return {
        success: true,
        message: 'Data saved successfully.',
        updatedRange: result.data.updates?.updatedRange,
      };
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      throw new InternalServerErrorException({
        success: false,
        error: error.message || 'Failed to save data',
      });
    }
  }
}
