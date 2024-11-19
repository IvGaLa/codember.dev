import fs from 'fs'

export const _readInput = (_fileInput) => {
  const _data = fs.readFileSync(_fileInput, 'utf-8')
  return _data.split('\n').filter(line => line.trim().length > 0).map(line => line.trim())
}