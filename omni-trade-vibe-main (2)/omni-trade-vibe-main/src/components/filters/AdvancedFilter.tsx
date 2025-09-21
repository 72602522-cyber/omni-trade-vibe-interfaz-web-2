import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  X, 
  Search, 
  Calendar,
  Building2,
  TrendingUp,
  ChevronDown
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'range';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface AdvancedFilterProps {
  filters: FilterOption[];
  values: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  className?: string;
}

export function AdvancedFilter({
  filters,
  values,
  onFilterChange,
  onClearFilters,
  className = ""
}: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeFiltersCount = Object.values(values).filter(value => 
    value !== '' && value !== null && value !== undefined && 
    (!Array.isArray(value) || value.length > 0)
  ).length;

  const renderFilterInput = (filter: FilterOption) => {
    const value = values[filter.key] || '';

    switch (filter.type) {
      case 'text':
        return (
          <Input
            placeholder={filter.placeholder || `Buscar ${filter.label.toLowerCase()}...`}
            value={value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="h-8"
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => onFilterChange(filter.key, val)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder={`Seleccionar ${filter.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="h-8"
          />
        );

      case 'range':
        return (
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={value?.min || ''}
              onChange={(e) => onFilterChange(filter.key, { ...value, min: e.target.value })}
              className="h-8"
            />
            <Input
              placeholder="Max"
              type="number"
              value={value?.max || ''}
              onChange={(e) => onFilterChange(filter.key, { ...value, max: e.target.value })}
              className="h-8"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filtros Avanzados</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>

          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearFilters}
                className="h-7 text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Limpiar
              </Button>
            )}
          </div>
        </div>

        <CollapsibleContent className="space-y-4">
          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-1">
                <Label className="text-xs font-medium text-muted-foreground">
                  {filter.label}
                </Label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="pt-2 border-t">
              <div className="flex flex-wrap gap-2">
                {Object.entries(values).map(([key, value]) => {
                  if (!value || value === '' || (Array.isArray(value) && value.length === 0)) return null;
                  
                  const filter = filters.find(f => f.key === key);
                  if (!filter) return null;

                  let displayValue = value;
                  if (filter.type === 'select' && filter.options) {
                    const option = filter.options.find(opt => opt.value === value);
                    displayValue = option?.label || value;
                  }

                  return (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      <span className="text-xs">
                        {filter.label}: {displayValue}
                      </span>
                      <button
                        onClick={() => onFilterChange(key, '')}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}