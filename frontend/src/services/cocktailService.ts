import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { CocktailFetchData } from '../types/CocktailFetchData';
import { apiClient } from './api/apiClient';

export const CocktailFetchDataService = {
  getAllCocktail: async (): Promise<CocktailFetchData[]> => {
    return apiClient<CocktailFetchData[]>('/cocktail');
  },

  getCocktailById: async (id: number): Promise<CocktailFetchData> => {
    return apiClient<CocktailFetchData>(`/cocktail/${id}`);
  },

  deleteCocktail: async (id: number): Promise<CocktailFetchData> => {
    return apiClient<CocktailFetchData>(`/cocktail/${id}`, { method: 'DELETE' });
  },

  updateCocktail: async (id: number, cocktail: Omit<CocktailFetchData, 'cocktail_id'>): Promise<CocktailFetchData> => {
    return apiClient<CocktailFetchData>(`/cocktail/${id}`, { 
      method: 'PATCH', 
      body: cocktail 
    });
  },

  createCocktail: async (cocktail: Omit<CocktailFetchData, 'cocktail_id'>): Promise<CocktailFetchData> => {
    return apiClient<CocktailFetchData>('/cocktail', { 
      method: 'POST', 
      body: cocktail 
    });
  },
};

export const fetchAllCocktails = () => {

  return useQuery<CocktailFetchData[]>({
    queryKey: ['cocktails'],
    queryFn: CocktailFetchDataService.getAllCocktail,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const fetchCocktailById = (id: number) => {
  return useQuery<CocktailFetchData>({
    queryKey: ['cocktails', id],
    queryFn: () => CocktailFetchDataService.getCocktailById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteCocktail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => CocktailFetchDataService.deleteCocktail(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocktails'] });
    },
  });
};

export const useCreateCocktail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (cocktail: Omit<CocktailFetchData, 'cocktail_id'>) => 
      CocktailFetchDataService.createCocktail(cocktail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocktails'] });
    },
  });
};

export const useUpdateCocktail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, cocktail }: { id: number, cocktail: Omit<CocktailFetchData, 'cocktail_id'> }) => 
      CocktailFetchDataService.updateCocktail(id, cocktail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cocktails'] });
    },
  });
};

