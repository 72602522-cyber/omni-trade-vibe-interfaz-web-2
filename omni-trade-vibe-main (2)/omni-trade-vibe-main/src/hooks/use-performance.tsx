import { useCallback, useMemo, useState } from "react";

// Hook para optimización de performance con memoización y lazy loading
export function usePerformance() {
  const [isLoading, setIsLoading] = useState(false);

  // Debounce para búsquedas y filtros
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Paginación optimizada
  const usePagination = (data: any[], itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedData = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return data.slice(startIndex, startIndex + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return {
      paginatedData,
      currentPage,
      setCurrentPage,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  };

  // Filtros avanzados optimizados
  const useAdvancedFilter = (data: any[], initialFilters: any = {}) => {
    const [filters, setFilters] = useState(initialFilters);

    const filteredData = useMemo(() => {
      return data.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value || value === '') return true;
          
          if (typeof value === 'string') {
            return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
          }
          
          if (Array.isArray(value)) {
            return value.length === 0 || value.includes(item[key]);
          }
          
          return item[key] === value;
        });
      });
    }, [data, filters]);

    const updateFilter = useCallback((key: string, value: any) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const clearFilters = useCallback(() => {
      setFilters(initialFilters);
    }, [initialFilters]);

    return {
      filteredData,
      filters,
      updateFilter,
      clearFilters,
      setFilters,
    };
  };

  return {
    isLoading,
    setIsLoading,
    debounce,
    usePagination,
    useAdvancedFilter,
  };
}