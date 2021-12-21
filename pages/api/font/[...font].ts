import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const { font } = req.query;
  const fontPath = typeof font === 'string' ? [font] : font;

  const url = path.join(process.cwd(), 'fonts', ...fontPath);

  const content = await fs.readFile(url);
  res.status(200).send(content);
}
