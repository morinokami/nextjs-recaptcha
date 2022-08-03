import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify'

const schema = z.object({
  token: z.string(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = schema.parse(req.body)
    const result = await fetch(RECAPTCHA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${SECRET_KEY}&response=${data.token}`,
    })
    return res.status(200).json(await result.json())
  } catch (e) {
    return res.status(400).json({ message: 'token required' })
  }
}

export default handler
