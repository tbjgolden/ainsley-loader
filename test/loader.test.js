/**
 * @jest-environment node
 */
import compiler from './compiler.js';
import fs from 'fs'
import path from 'path'

test('Imports ainsley and outputs JavaScript', async () => {
  await compiler();
  const generated = fs.readFileSync(path.join(__dirname, 'output', 'after.js'), 'utf8');
  expect(generated.includes('console.log("Hello world!")')).toBe(true);
  expect(generated.includes('*{all:unset}')).toBe(true);
  expect(generated.includes('*{all:unset}')).toBe(true);
  expect(generated.includes('dt--fixed')).toBe(true);
  expect(generated.includes('webpack')).toBe(false);
  expect(generated.length).toBeGreaterThan(12000);
  expect(generated.length).toBeLessThan(24000);
});
