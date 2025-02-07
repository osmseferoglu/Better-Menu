import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: '*', // You can specify the allowed origins here
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function middleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Continue to the next middleware or route handler
  next();
}