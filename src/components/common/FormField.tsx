/**
 * Reusable form field components
 * Provides consistent form styling and behavior
 */

import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-base-content/60">{hint}</p>}
      {error && (
        <div className="flex items-center gap-2 text-error text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function TextInput({ icon, className = "", ...props }: TextInputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
          {icon}
        </div>
      )}
      <input
        className={`input input-bordered w-full ${
          icon ? "pl-10" : ""
        } ${className}`}
        {...props}
      />
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean;
  maxLength?: number;
}

export function TextArea({
  showCount,
  maxLength,
  value,
  className = "",
  ...props
}: TextAreaProps) {
  const count = typeof value === "string" ? value.length : 0;

  return (
    <div>
      <textarea
        className={`textarea textarea-bordered w-full resize-none ${className}`}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      {showCount && maxLength && (
        <p className="text-xs text-base-content/60 mt-1 text-right">
          {count}/{maxLength}
        </p>
      )}
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select className={`select select-bordered w-full ${className}`} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
