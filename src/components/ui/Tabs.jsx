import { forwardRef, createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

const Tabs = forwardRef(function Tabs({ children, defaultValue, value, onValueChange, className = '', ...props }, ref) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeValue = value ?? internalValue;

    const handleValueChange = (newValue) => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange }}>
            <div ref={ref} className={className} {...props}>{children}</div>
        </TabsContext.Provider>
    );
});

const TabsList = forwardRef(function TabsList({ children, className = '', ...props }, ref) {
    return (
        <div
            ref={ref}
            role="tablist"
            className={`flex items-center gap-1 p-1.5 bg-[#90353D]/10 rounded-xl ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

const TabsTrigger = forwardRef(function TabsTrigger({ children, value, disabled = false, className = '', ...props }, ref) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const isActive = context.activeValue === value;

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => !disabled && context.onValueChange(value)}
            className={`
        flex-1 px-5 py-2.5 text-sm font-medium rounded-lg
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive
                    ? 'bg-[#FAF6F0] text-[#3E2723] shadow-md'
                    : 'text-[#4A3C35] hover:text-[#3E2723] hover:bg-[#FAF6F0]/50'
                }
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
});

const TabsContent = forwardRef(function TabsContent({ children, value, className = '', ...props }, ref) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    const isActive = context.activeValue === value;
    if (!isActive) return null;

    return (
        <div
            ref={ref}
            role="tabpanel"
            tabIndex={0}
            className={`mt-6 focus:outline-none animate-fade-in-up ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
