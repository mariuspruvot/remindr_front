/**
 * API service layer following Dependency Inversion Principle
 * Abstracts API calls from components
 */

import type {
  CreateReminderResponse,
  Reminder,
  ShortURL,
} from '@/lib/types';
import type { ReminderFormData } from '@/lib/types/reminder';
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

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001',
  ) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get authenticated headers for API requests
   */
  private async getAuthHeaders(token?: string): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Create a new reminder
   */
  async createReminder(data: ReminderFormData, token?: string): Promise<CreateReminderResponse> {
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
        headers: await this.getAuthHeaders(token),
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
  async getReminder(id: string, token?: string): Promise<Reminder> {
    try {
      const response = await fetch(`${this.baseUrl}/api/reminders/${id}`, {
        headers: await this.getAuthHeaders(token),
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
    generate: boolean = false,
    token?: string
  ): Promise<ShortURL | null> {
    try {
      const url = new URL(`${this.baseUrl}/api/reminders/${reminderId}/short-url`);
      if (generate) {
        url.searchParams.set('generate', 'true');
      }

      const response = await fetch(url.toString(), {
        headers: await this.getAuthHeaders(token),
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
