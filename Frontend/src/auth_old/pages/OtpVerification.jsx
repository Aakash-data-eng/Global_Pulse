import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlow } from '../../App'
import { AuthStage, BackButton, SubmitButton } from '../components/AuthUI'

export default function OtpVerification() {
  const navigate = useNavigate()
  const { flow } = useFlow()
  const [digits, setDigits] = useState(Array(6).fill(''))
  const inputs = useRef([])
  const complete = digits.every((d) => d !== '')

  const setAt = (index, value) => {
    const clean = value.replace(/\D/g, '')
    setDigits((prev) => {
      const next = [...prev]
      next[index] = clean.slice(-1)
      return next
    })
    if (clean && index < 5) inputs.current[index + 1]?.focus()
  }

  const onKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus()
  }

  const onPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('')
    if (!pasted.length) return
    const next = Array(6).fill('')
    pasted.forEach((d, i) => { next[i] = d })
    setDigits(next)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const submit = (e) => {
    e.preventDefault()
    if (!complete) return
    // TODO(backend): verify the entered OTP against the server, handle expiry and lockouts.
    navigate('/complete-profile')
  }

  return (
    <AuthStage>
      <BackButton to="/verify-phone" />
      <h1>Enter OTP</h1>
      <p className="auth-subtitle">Enter the 6-digit verification code sent to {flow.country} {flow.phone || '1234567890'}</p>
      <form onSubmit={submit} noValidate>
        <div className="otp-row" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input key={i} ref={(el) => (inputs.current[i] = el)} className="otp-box" inputMode="numeric"
              maxLength={1} value={d} aria-label={`Digit ${i + 1}`}
              onChange={(e) => setAt(i, e.target.value)} onKeyDown={(e) => onKeyDown(i, e)} />
          ))}
        </div>
        <SubmitButton disabled={!complete}>Verify</SubmitButton>
      </form>
      {/* TODO(backend): resend should trigger a new server-generated OTP. */}
      <p className="auth-footer">Didn&apos;t receive the code? <button className="link-button" type="button" onClick={() => setDigits(Array(6).fill(''))}>Resend OTP</button></p>
    </AuthStage>
  )
}
