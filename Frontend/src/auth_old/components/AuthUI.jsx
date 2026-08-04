import { ArrowLeft, Check, Eye, EyeOff, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Brand({ compact = false }) {
  return <div className={`brand ${compact ? 'brand--compact' : ''}`}><span className="brand-globe" aria-hidden="true">G</span><span>Global<span>Pulse</span><small>Understand. Predict. Stay Ahead.</small></span></div>
}

export function AuthStage({ children, modal = false }) {
  return <main className="auth-stage"><div className={`auth-card ${modal ? 'auth-card--modal' : ''}`}>{children}</div></main>
}

export function BackButton({ to = -1 }) {
  const navigate = useNavigate()
  return <button className="back-button" onClick={() => typeof to === 'number' ? navigate(to) : navigate(to)}><ArrowLeft size={20} /> Back</button>
}

export function CloseButton({ onClick }) {
  return <button className="close-button" onClick={onClick} aria-label="Close"><X size={25} /></button>
}

export function Field({ label, error, type = 'text', ...props }) {
  const [visible, setVisible] = useState(false)
  const password = type === 'password'
  const id = props.id || props.name
  return <div className="field-wrap">{label && <label htmlFor={id}>{label}</label>}<div className="field-inner"><input id={id} type={password && visible ? 'text' : type} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{password && <button type="button" className="reveal" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={20} /> : <Eye size={20} />}</button>}</div>{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>
}

export function ProfileMark() { return <div className="profile-mark" aria-hidden="true"><UserRound size={46} fill="currentColor" /></div> }
export function SuccessMark() { return <div className="success-mark" aria-hidden="true"><Check size={86} strokeWidth={3.5} /></div> }

export function SubmitButton({ children, disabled, busy }) {
  return <button className="primary-button" type="submit" disabled={disabled || busy}>{busy ? 'Please wait…' : children}</button>
}
