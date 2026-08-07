export const formatErrorMessage = (error, fallbackMessage = 'An unexpected error occurred. Please try again.') => {
  if (!error) return fallbackMessage;
  if (typeof error === 'string' && error.trim()) return error;

  const target = error?.response?.data?.detail || error?.response?.data?.message || error?.detail || error?.message || error;

  if (typeof target === 'string' && target.trim()) return target;
  if (Array.isArray(target) && target.length > 0) {
    const first = target[0];
    if (typeof first === 'string') return first;
    if (first?.msg) return first.msg;
  }
  if (typeof target === 'object' && target !== null) {
    if (target.msg) return target.msg;
    if (target.message) return target.message;
  }

  return fallbackMessage;
};

export default formatErrorMessage;
