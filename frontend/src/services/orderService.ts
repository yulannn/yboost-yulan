import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderFetchData } from '../types/OrderFetchData';
import { apiClient } from './api/apiClient';

export const OrderFetchDataService = {
  getAllOrders: async (): Promise<OrderFetchData[]> => {
    return apiClient<OrderFetchData[]>('/order');
  },
};

export const fetchAllOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: OrderFetchDataService.getAllOrders,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const OrderFetchDataByIdService = {
  getOrderById: async (orderId: number): Promise<OrderFetchData> => {
    return apiClient<OrderFetchData>(`/order/${orderId}`);
  },
};

export const fetchOrderById = (orderId: number) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => OrderFetchDataByIdService.getOrderById(orderId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const createOrderService = {
  createOrder: async (table: number, cocktails: any[], state: string): Promise<any> => {
    console.log('table:', table, 'cocktails:', cocktails);
    return apiClient<any>('/order', {
      method: 'POST',
      body: { nb_table: table, orderCocktails: cocktails, state: state },
    });
  },
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: ({ table, cocktails, state }: { table: number; cocktails: any[]; state: string }) =>
      createOrderService.createOrder(table, cocktails, state),
  });
};

export const deleteOrderService = {
  deleteOrder: async (orderId: number): Promise<any> => {
    return apiClient<any>(`/order/${orderId}`, {
      method: 'DELETE',
    });
  },
};

export const useDeleteOrder = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteOrderService.deleteOrder(orderId),
    onSuccess: () => {
      console.log('Commande supprimée !');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Erreur:', error);
    },
  });
};

export const updateOrderService = {
  updateOrder: async (orderId: number, state: string): Promise<any> => {
    console.log('Service de mise à jour:', { orderId, state });
    return apiClient<any>(`/order/${orderId}`, {
      method: 'PATCH',
      body: { state },
    });
  },
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, state }: { orderId: number; state: string }) =>
      updateOrderService.updateOrder(orderId, state),
    onSuccess: () => {
      console.log('Commande mise à jour avec succès !');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour:', error);
    },
  });
};

export const updateOrderEmployeeService = {
  updateOrderEmployee: async (orderId: number, employeeId: number): Promise<any> => {
    console.log("service", orderId, employeeId)
    return apiClient<any>(`/order/${orderId}`, {
      method: "PATCH",
      body: {
        employee_id: employeeId,
        state: 'completed'
      }
    });
  }
};

export const useUpdateOrderEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, employeeId }: { orderId: number; employeeId: number }) =>
      updateOrderEmployeeService.updateOrderEmployee(orderId, employeeId),
    onSuccess: () => {
      console.log("Commande mise à jour !");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Erreur:", error);
    }
  });
};
