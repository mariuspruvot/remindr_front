/**
 * React Query hooks for Reminder operations
 * Provides automatic caching, refetching, and mutation handling
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { showToast } from "../utils/toast";
import type { Reminder, ReminderCreateRequest } from "../types/reminder.types";

// Fetch all reminders (paginated)
export const useReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      // Backend returns paginated response
      const { data } = await api.get<{ reminders: Reminder[]; total: number }>(
        "/reminders/"
      );
      return data.reminders; // Return just the array
    },
  });
};

// Fetch single reminder by id
export const useReminder = (id: string) => {
  return useQuery({
    queryKey: ["reminders", id],
    queryFn: async () => {
      const { data } = await api.get<Reminder>(`/reminders/${id}/`);
      return data;
    },
    enabled: !!id, // Only fetch if id exists
  });
};

// Create new reminder
export const useCreateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reminder: ReminderCreateRequest) => {
      const { data } = await api.post<Reminder>("/reminders/", reminder);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch reminders list
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      showToast("Reminder created successfully!", "success");
    },
    onError: (error: any) => {
      // Don't show toast here - let the form handle error display
      // The form will show the error in the UI
      console.error("Failed to create reminder:", error);
    },
  });
};

// Update reminder
export const useUpdateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ReminderCreateRequest>;
    }) => {
      // Backend uses PUT not PATCH
      const response = await api.put<Reminder>(`/reminders/${id}/`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate both list and single reminder
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      queryClient.invalidateQueries({
        queryKey: ["reminders", variables.id],
      });
      showToast("Reminder updated successfully!", "success");
    },
    onError: (error: any) => {
      // Don't show toast here - let the form handle error display
      console.error("Failed to update reminder:", error);
    },
  });
};

// Delete reminder
export const useDeleteReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/reminders/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      showToast("Reminder deleted", "success");
    },
    onError: (error: any) => {
      showToast(
        error.response?.data?.message || "Failed to delete reminder",
        "error"
      );
    },
  });
};
