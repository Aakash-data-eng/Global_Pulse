import { useNavigate } from 'react-router-dom'
import { useFlow } from '../../App'
import { AuthStage, SuccessMark } from '../components/AuthUI'

export default function Welcome(){const navigate=useNavigate();const{flow}=useFlow();return <AuthStage><SuccessMark/><h1>Welcome aboard, {flow.username || 'john'}!</h1><p className="auth-subtitle">Your account has been created successfully.</p><button className="primary-button success-button" onClick={()=>navigate('/dashboard')}>Go to Dashboard</button></AuthStage>}

export function Dashboard(){return <main className="dashboard"><div><span>GlobalPulse</span><h1>Your dashboard is ready.</h1><p>This is the integration handoff for Mission Dashboard One.</p><a href="/">Return home</a></div></main>}
