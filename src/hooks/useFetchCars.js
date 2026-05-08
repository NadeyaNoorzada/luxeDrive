import { useQuery } from '@tanstack/react-query';
import { fetchCars, fetchCarById, searchCars } from '../services/carsApi';

export const useCars = (page = 1, limit = 12) => {
  return useQuery({
    queryKey: ['cars', page],
    queryFn: () => fetchCars({ skip: (page - 1) * limit, limit }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useCarById = (id) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};

export const useSearchCars = (query, page = 1, limit = 12) => {
  return useQuery({
    queryKey: ['searchCars', query, page],
    queryFn: () => searchCars({ query, skip: (page - 1) * limit, limit }),
    staleTime: 5 * 60 * 1000,
    enabled: !!query,
    placeholderData: (prev) => prev,
  });
};
