export const validateIdentity = (value) => {
  const clean = value.trim()
  if (!clean) return 'Enter your username or email.'
  if (clean.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'Enter a valid email address.'
  return ''
}

export const validateUsername = (value) => {
  const clean = value.trim()
  if (!clean) return 'Choose a username.'
  if (clean.length < 3 || clean.length > 24) return 'Use 3–24 characters.'
  if (!/^[a-zA-Z0-9_]+$/.test(clean)) return 'Use letters, numbers, or underscores only.'
  return ''
}

export const validatePassword = (value) => {
  if (!value) return 'Create a password.'
  if (value.length < 8) return 'Use at least 8 characters.'
  if (value.length > 64) return 'Password must be 64 characters or fewer.'
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Include uppercase, lowercase, and a number.'
  return ''
}
