/**
 * API service layer following Dependency Inversion Principle
 * Abstracts API calls from components
 */

import type {
  CreateReminderRequest,
  CreateReminderResponse,
  Reminder,
  ShortURL,
  ApiError,
} from '@/lib/types';
import { convertLocalToUTC } from '@/lib/utils/date';

class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ReminderApiService {
  private readonly baseUrl: string;
  private readonly apiToken: string;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001',
    apiToken: string = process.env.NEXT_PUBLIC_API_TOKEN || 'toto'
  ) {
    this.baseUrl = baseUrl;
    this.apiToken = apiToken;
  }

  /**
   * Get authenticated headers for API requests
   */
  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    };
  }

  /**
   * Create a new reminder
   */
  async createReminder(data: CreateReminderRequest): Promise<CreateReminderResponse> {
    try {
      // Transform frontend data to API format
      console.log(`API base URL: ${this.baseUrl}`);
      const apiData = {
        reminder_text: data.message,
        target_url: data.link || undefined,
        contact: data.contact,
        scheduled_at: convertLocalToUTC(data.datetime),
      };

      const response = await fetch(`${this.baseUrl}/api/reminders/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Failed to create reminder',
          errorData.code,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred while creating reminder');
    }
  }

  /**
   * Get reminder by ID
   */
  async getReminder(id: string): Promise<Reminder> {
    try {
      const response = await fetch(`${this.baseUrl}/api/reminders/${id}`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Failed to fetch reminder',
          errorData.code,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred while fetching reminder');
    }
  }

  /**
   * Get short URL for a reminder
   */
  async getShortUrl(
    reminderId: string,
    generate: boolean = false
  ): Promise<ShortURL | null> {
    try {
      const url = new URL(`${this.baseUrl}/api/reminders/${reminderId}/short-url`);
      if (generate) {
        url.searchParams.set('generate', 'true');
      }

      const response = await fetch(url.toString(), {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Failed to fetch short URL',
          errorData.code,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred while fetching short URL');
    }
  }
}

// Export singleton instance
export const reminderApiService = new ReminderApiService();
export { ApiError };
