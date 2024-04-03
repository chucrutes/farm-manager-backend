import { supabase } from '@/infra/services/supabase.client'
import { IFilesManagerService } from '../../models/IFilesManagerService'

const BUCKET_NAME = 'weekly-report'

export class SupabaseService implements IFilesManagerService {
  async removeImages(folderPath: string): Promise<void> {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath, { limit: 100 })

    if (error) {
      throw new Error(`Error listing files: ${error.message}`)
    }

    const deletePromises = data.map(async (file) => {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([`${folderPath}/${file.name}`])

      if (deleteError) {
        throw new Error(`Error deleting file: ${deleteError.message}`)
      }
    })

    await Promise.all(deletePromises)
  }
}
