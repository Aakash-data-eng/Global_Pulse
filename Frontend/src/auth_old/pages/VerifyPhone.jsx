import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlow } from '../../App'
import { AuthStage, BackButton, SubmitButton } from '../components/AuthUI'

const codes = ['+91', '+62', '+1', '+44', '+61', '+65']

export default function VerifyPhone() {
  const navigate = useNavigate()
  const { flow, updateFlow } = useFlow()
  const [phone, setPhone] = useState(flow.phone)
  const [country, setCountry] = useState(flow.country)
  const valid = phone.replace(/\D/g, '').length >= 7

  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    // TODO(backend): send a real OTP to this number and enforce rate limits / expiry.
    updateFlow({ phone, country })
    navigate('/otp')
  }

  return (
    <AuthStage>
      <BackButton to="/signup" />
      <h1 className="stack-title">Verify your<br />Mobile Number</h1>
      <p className="auth-subtitle">We&apos;ll send you a verification code to confirm your number.</p>
      <form onSubmit={submit} noValidate>
        <label className="phone-label" htmlFor="phone">Phone number</label>
        <div className="phone-row">
          <select aria-label="Country code" value={country} onChange={(e) => setCountry(e.target.value)}>
            {codes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input id="phone" inputMode="numeric" placeholder="81313782626" value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))} />
        </div>
        <SubmitButton disabled={!valid}>Continue</SubmitButton>
      </form>
    </AuthStage>
  )
}
