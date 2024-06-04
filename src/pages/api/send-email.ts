import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { toEmail, subject, content } = req.body;

    const params = {
      Source: 'no-reply@test.email.oceanzou.click',
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: content,
            Charset: 'UTF-8',
          },
        },
      },
    };

    try {
      const data = await ses.sendEmail(params).promise();

      // Send acknowledgment email
      const ackParams = {
        Source: 'no-reply@test.email.oceanzou.click',
        Destination: {
          ToAddresses: [toEmail],
        },
        Message: {
          Subject: {
            Data: `Re: ${subject}`,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: `Hello,

Thank you for your email. We have received your message and will get back to you as soon as possible.

Best regards,
Your Company Name`,
              Charset: 'UTF-8',
            },
            Html: {
              Data: `<p>Hello,</p>
<p>Thank you for your email. We have received your message and will get back to you as soon as possible.</p>
<p>Best regards,<br>Your Company Name</p>`,
              Charset: 'UTF-8',
            },
          },
        },
      };

      await ses.sendEmail(ackParams).promise();

      res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
