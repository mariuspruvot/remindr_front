/**
 * React Query hooks for Output/Channel operations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { showToast } from "../utils/toast";
import type { Output, OutputCreateRequest } from "../types/reminder.types";

// Fetch all outputs/channels
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

// Create new output
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

// Validate output with code
export const useValidateOutput = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, code }: { uuid: string; code: string }) => {
      const { data } = await api.post(`/outputs/${uuid}/validate`, { code });
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

// Resend verification code
export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (uuid: string) => {
      // Backend endpoint is /resend-code not /resend
      const { data } = await api.post(`/outputs/${uuid}/resend-code`);
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

// Delete output
export const useDeleteOutput = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`/outputs/${uuid}`);
      return uuid;
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
