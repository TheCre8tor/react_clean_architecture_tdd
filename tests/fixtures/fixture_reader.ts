import fs from 'fs';

export function fixture(filename: string): string {
  const result = fs.readFileSync(`${__dirname}/${filename}`, 'utf-8');

  return JSON.parse(result);
}
