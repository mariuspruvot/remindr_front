/**
 * React Query hooks for Output/Channel operations
 *
 * Provides automatic caching, refetching, and mutation handling
 * for all output channel-related API operations.
 *
 * @module useOutputs
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { showToast } from "../utils/toast";
import type { Output, OutputCreateRequest } from "../types/reminder.types";

/**
 * Fetches all output channels with automatic caching
 * @returns Query result with outputs array
 */
export const useOutputs = () => {
  return useQuery({
    queryKey: ["outputs"],
    queryFn: async () => {
      const { data } = await api.get<{ outputs: Output[]; total: number }>(
        "/outputs/"
      );
      return data.outputs; // Extract the outputs array from the response
    },
  });
};

/**
 * Creates a new output channel
 * Automatically invalidates outputs cache on success
 * @returns Mutation function for creating output channels
 */
export const useCreateOutput = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (output: OutputCreateRequest) => {
      const { data } = await api.post<Output>("/outputs/", output);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["outputs"] });
      showToast("Verification code sent!", "success");
      return data; // Return for the modal to use
    },
    onError: (error: any) => {
      showToast(
        error.response?.data?.message || "Failed to create channel",
        "error"
      );
    },
  });
};

/**
 * Validates an output channel (e.g., verify code for email)
 * Automatically invalidates outputs cache on success
 * @returns Mutation function for validating output channels
 */
export const useValidateOutput = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, code }: { id: string; code: string }) => {
      const { data } = await api.post(`/outputs/${id}/validate`, { code });
      return data;
    },
    onSuccess: async (data) => {
      // Only show success toast if validation actually succeeded
      if (data.success && data.confirmed) {
        showToast("Channel verified successfully!", "success");
        // Force immediate refetch
        await queryClient.refetchQueries({ queryKey: ["outputs"] });
      }
      // If not successful, let the form handle the error message
    },
    onError: (error: any) => {
      showToast(
        error.response?.data?.message || "Invalid verification code",
        "error"
      );
    },
  });
};

/**
 * Resends verification email for an output channel
 * @returns Mutation function for resending verification
 */
export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      // Backend endpoint is /resend-code not /resend
      const { data } = await api.post(`/outputs/${id}/resend-code`);
      return data;
    },
    onSuccess: () => {
      showToast("Verification code resent!", "info");
    },
    onError: (error: any) => {
      showToast(
        error.response?.data?.message || "Failed to resend code",
        "error"
      );
    },
  });
};

/**
 * Deletes an output channel
 * Automatically invalidates outputs cache on success
 * @returns Mutation function for deleting output channels
 */
export const useDeleteOutput = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/outputs/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outputs"] });
      showToast("Channel deleted", "success");
    },
    onError: (error: any) => {
      showToast(
        error.response?.data?.message || "Failed to delete channel",
        "error"
      );
    },
  });
};
