import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthStage, BackButton, Brand, Field, SubmitButton } from '../components/AuthUI'
import { validateIdentity } from '../utils/validation'

export default function Login() {
 const navigate=useNavigate(); const [data,setData]=useState({identity:'',password:''}); const [errors,setErrors]=useState({}); const [busy,setBusy]=useState(false)
 const submit=(e)=>{e.preventDefault(); const next={identity:validateIdentity(data.identity),password:data.password?'':'Enter your password.'}; setErrors(next); if(next.identity||next.password)return; setBusy(true); setTimeout(()=>navigate('/welcome'),500)}
 return <AuthStage><BackButton to="/"/><Brand/><h1>Welcome Back</h1><p className="auth-subtitle">Log in to continue tracking global markets.</p><form onSubmit={submit} noValidate><Field name="identity" placeholder="Username or Email" autoComplete="username" value={data.identity} onChange={e=>setData({...data,identity:e.target.value})} error={errors.identity}/><Field name="password" type="password" placeholder="Password" autoComplete="current-password" value={data.password} onChange={e=>setData({...data,password:e.target.value})} error={errors.password}/><div className="form-link"><Link to="/forgot-password">Forgot password?</Link></div><SubmitButton busy={busy}>Log in</SubmitButton></form><p className="auth-footer">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p></AuthStage>
}
