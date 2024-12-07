import { useState } from 'react';
import { Button, Input, Text } from '@/components/atoms';
import { FormProps } from './Form.types';
import './Form.css';

export const Form = ({ 
  fields, 
  onSubmit, 
  submitText,
  loading = false,
  error = null,
  className = ''
}: FormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${className}`}>
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name]}
          onChange={(e) => handleChange(field.name, e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          fullWidth
        />
      ))}

      {error && (
        <Text variant="body-small" className="form-error">
          {error}
        </Text>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={loading}
      >
        {submitText}
      </Button>
    </form>
  );
}; 