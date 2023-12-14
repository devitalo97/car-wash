export function validateFileType(file: File) {
  return ['image/png', 'image/jpeg'].includes(file.type)
}