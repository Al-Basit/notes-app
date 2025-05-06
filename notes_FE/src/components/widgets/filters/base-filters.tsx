'use client'

import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FilterIcon } from 'lucide-react'
import FilterPopover from './filter-popover'
interface FilterComponentProps {
    filters: Record<string, boolean>
    filterValues: Record<string, any>
    onFilterChange: (filters: Record<string, boolean>) => void
    onFilterValueChange: (key: string, value: any) => void
    children: ReactNode
    className?: string;
    titles?:string[]
}

const BaseFilters: React.FC<FilterComponentProps> = ({
    filters,
    filterValues,
    onFilterChange,
    onFilterValueChange,
    children,
    className,
    titles
}) => {
    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <h4 className='font-semibold text-center mb-4'>Filters</h4>
                    <FilterPopover
                    titles={titles}
                        filters={filters}
                        onFilterChange={onFilterChange}
                        filterValues={filterValues}
                        onFilterValueChange={onFilterValueChange}
                    >
                        {children}
                    </FilterPopover>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default BaseFilters

