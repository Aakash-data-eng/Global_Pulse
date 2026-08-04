import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlow } from '../../App'
import { AuthStage, BackButton, Field, ProfileMark, SubmitButton } from '../components/AuthUI'
import { validatePassword, validateUsername } from '../utils/validation'

export default function CompleteProfile({ google = false }) {
 const navigate=useNavigate(); const {flow,updateFlow}=useFlow(); const [username,setUsername]=useState(''); const [password,setPassword]=useState(''); const [errors,setErrors]=useState({})
 const submit=(e)=>{e.preventDefault();const next={username:validateUsername(username),password:validatePassword(password)};setErrors(next);if(next.username||next.password)return;/* TODO(backend): check duplicates, hash password, create account and session server-side. */updateFlow({username});navigate('/welcome')}
 return <AuthStage><BackButton to={google?'/signup':'/otp'}/><ProfileMark/><h1>{google?'Complete Your Account':'Complete Your Profile'}</h1><p className="auth-subtitle">{google?'Almost there! Just a few more details to finish setting up.':'Set up your account details to get started.'}</p><form onSubmit={submit} noValidate>{google&&<div className="provider-field"><span>{flow.email}</span><b>google</b></div>}<Field name="username" placeholder="User Name" autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} error={errors.username}/><Field name="password" type="password" placeholder="Password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} error={errors.password}/><SubmitButton>Create Account</SubmitButton></form></AuthStage>
}
