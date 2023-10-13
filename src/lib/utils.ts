import { twMerge } from 'tailwind-merge'

export function cn(...params: Parameters<typeof twMerge>) {
  return twMerge(params)
}
