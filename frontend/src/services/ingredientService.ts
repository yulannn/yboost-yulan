import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Ingredient } from '../types/Ingredient';
import { CreateIngredient } from '../types/CreateIngredientData';
import { apiClient } from './api/apiClient';

export const IngredientService = {
  getAllIngredients: async (): Promise<Ingredient[]> => {
    return apiClient<Ingredient[]>('/ingredient');
  },

  getIngredientById: async (id: number): Promise<Ingredient> => {
    return apiClient<Ingredient>(`/ingredient/${id}`);
  },

  createIngredient: async (ingredient: CreateIngredient): Promise<Ingredient> => {
    return apiClient<Ingredient>('/ingredient', { 
      method: 'POST', 
      body: ingredient
    });
  },

  updateIngredient: async (id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> => {
    return apiClient<Ingredient>(`/ingredient/${id}`, { 
      method: 'PATCH', 
      body: ingredient
    });
  }
};

export const fetchAllIngredients = () => {
  return useQuery({
    queryKey: ['ingredient'],
    queryFn: IngredientService.getAllIngredients,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ingredient }: { id: number, ingredient: Partial<Ingredient> }) => 
      IngredientService.updateIngredient(id, ingredient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredient'] });
    },
  });
};

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Ingredient, Error, CreateIngredient>({
    mutationFn: (ingredient: CreateIngredient) => 
      IngredientService.createIngredient(ingredient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredient'] });
    },
  });
};
