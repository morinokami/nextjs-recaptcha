import type { NextPage } from 'next'
import { useState } from 'react'
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3'

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
const VERIFY_ENDPOINT = '/api/verify'

const ReCaptcha: React.FC = () => {
  const [result, setResult] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleReCaptchaVerify = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha('VERIFY')
    const res = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    setResult(JSON.stringify(await res.json(), null, 2))
  }

  return (
    <>
      <h1>Next.js x reCAPTCHA</h1>
      <button onClick={handleReCaptchaVerify}>Verify</button>
      <pre>Result: {result}</pre>
    </>
  )
}

const App: NextPage = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
      <ReCaptcha />
    </GoogleReCaptchaProvider>
  )
}

export default App
