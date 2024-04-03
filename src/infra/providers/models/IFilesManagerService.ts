type SupabaseProps = {
  path: string
  file?: File
  from?: string
  upsert?: boolean
}
export type RemoveImageProps = Omit<SupabaseProps, 'path'> & { path: string[] }

export interface IFilesManagerService {
  removeImages(folderPath: string): Promise<void>
}
