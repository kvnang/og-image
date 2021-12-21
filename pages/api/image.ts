import type { NextApiRequest, NextApiResponse } from 'next';
import { buildCanvas } from '../../lib/canvas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | string>
) {
  const config = req.query;
  const canvas = await buildCanvas(config);

  if (!canvas) {
    res.status(500).send('Canvas not found');
    return;
  }

  const image = canvas.toBuffer('image/jpeg', { quality: 0.75 });

  res.setHeader('Content-Type', 'image/jpeg');
  res.status(200).send(image);
}
