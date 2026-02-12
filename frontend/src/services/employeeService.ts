import { apiClient } from './api/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Employee } from '../types/EmployeeData';

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: () => employeeService.getAllEmployees(),
  });
};


export const useEmployee = (id: number) => {
  return useQuery<Employee>({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getEmployeeById(id),
    enabled: id > 0, // Only run query if we have a valid ID
  });
};


export const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    return apiClient<Employee[]>('/employee');
  },

  getEmployeeById: async (id: number): Promise<Employee> => {
    return apiClient<Employee>(`/employee/${id}`);
  },
};

