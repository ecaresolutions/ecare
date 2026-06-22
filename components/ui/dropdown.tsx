"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options?: Option[];
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export const Dropdown = ({
  label,
  value,
  onChange,
  options: customOptions,
  children,
  className,
  wrapperClassName,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getOptionsFromChildren = (): Option[] => {
    if (customOptions) return customOptions;
    const parsedOptions: Option[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === "option") {
        const optionChild = child as React.ReactElement<any>;
        parsedOptions.push({
          value: String(optionChild.props.value),
          label: String(optionChild.props.children || optionChild.props.value),
        });
      }
    });
    return parsedOptions;
  };

  const options = getOptionsFromChildren();
  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("space-y-1.5 relative w-full", wrapperClassName)} ref={containerRef}>
      {label && (
        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-all focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 cursor-pointer shadow-xs text-left",
            isOpen && "border-red-500 ring-2 ring-red-500/20",
            className
          )}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : "Select option..."}</span>
          <ChevronDown className={cn("w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-250 ease-out", isOpen && "transform rotate-180 text-red-500")} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-1 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_16px_-6px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] border-t-0 animate-in fade-in slide-in-from-top-2 duration-200 origin-top">
            {options.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer text-left",
                    isSelected && "bg-red-50/70 text-red-600 font-bold dark:bg-red-950/30 dark:text-red-500"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0 text-red-600 dark:text-red-500" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
