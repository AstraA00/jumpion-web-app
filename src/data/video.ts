/** Cloud.ru Evolution Object Storage public bucket */
export const VIDEO_BASE = 'https://jumpionapp.s3.cloud.ru'

export function videoUrl(path: string) {
  return `${VIDEO_BASE}/${path.replace(/^\/+/, '')}`
}
