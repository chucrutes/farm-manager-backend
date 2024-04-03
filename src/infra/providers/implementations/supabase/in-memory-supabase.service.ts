import { IFilesManagerService } from '../../models/IFilesManagerService'

export class InMemorySupabaseService implements IFilesManagerService {
  async removeImages(folderPath: string): Promise<void> {
    return
  }
}
