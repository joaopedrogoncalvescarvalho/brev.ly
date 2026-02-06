import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { linkService } from "../services/api";
import { CreateLinkRequest } from "../types/link";

export const useLinks = () => {
  return useQuery({
    queryKey: ["links"],
    queryFn: linkService.getLinks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLinkRequest) => linkService.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => linkService.deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useExportCSV = () => {
  return useMutation({
    mutationFn: linkService.exportCSV,
  });
};

export const useLinkByShortUrl = (shortUrl: string) => {
  return useQuery({
    queryKey: ["link", shortUrl],
    queryFn: () => linkService.getLinkByShortUrl(shortUrl),
    enabled: !!shortUrl,
    retry: false,
  });
};
