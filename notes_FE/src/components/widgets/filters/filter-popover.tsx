'use client'

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterPopoverProps {
    filters: Record<string, boolean>
    onFilterChange: (filters: Record<string, boolean>) => void
    children: React.ReactNode
    filterValues: Record<string, any>
    onFilterValueChange: (key: string, value: any) => void;
    titles?: string[]
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
    filters,
    onFilterChange,
    children,
    onFilterValueChange,
    filterValues,
    titles
}) => {
    const handleChange = (key: string, checked: boolean) => {
        // Reset filter value if unchecked
        if (!checked) {
            onFilterValueChange(key, '') // Reset the value when unchecked
        }

        onFilterChange({
            ...filters,
            [key]: checked,
        })
    }

    return (
        <div className="space-y-4">
            {Object.entries(filters).map(([key, value],index) => (
                <div key={key} className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={(checked) => handleChange(key, checked as boolean)}
                        />
                        <Label htmlFor={key}>{titles[index]}</Label>
                    </div>
                    {value && (
                        <div className="mt-2">
                            {React.Children.map(children, (child) => {
                                if (React.isValidElement(child)) {
                                    const fieldName = child.props.name
                                    if (fieldName === key) {
                                        return React.cloneElement(child as React.ReactElement<any>, {
                                            value: filterValues[fieldName] || '',
                                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                                                const newValue =
                                                    e.target.type === 'number'
                                                        ? parseFloat(e.target.value)
                                                        : e.target.value
                                                onFilterValueChange(fieldName, newValue)
                                            },
                                        })
                                    }
                                }
                                return null
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default FilterPopover
