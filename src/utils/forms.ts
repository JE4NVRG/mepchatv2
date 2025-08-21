import emailjs from '@emailjs/browser';

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateCompany = (company: string): boolean => {
  return company.trim().length >= 2;
};

// Form data interfaces
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

// Form validation function
export const validateContactForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!validateName(data.name)) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Telefone inválido';
  }

  if (!validateCompany(data.company)) {
    errors.company = 'Nome da empresa deve ter pelo menos 2 caracteres';
  }

  return errors;
};

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// EmailJS send function
export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message || 'Interesse em conhecer o MepChat',
      to_name: 'Equipe MepChat',
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    return false;
  }
};

// Format phone number for display
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};