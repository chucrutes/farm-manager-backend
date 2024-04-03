export interface IVersionHistory<T> {
  createVersion(entity: T, versionNumber: number): Promise<void>
  getLastVersion(entityId: string): Promise<number | null>
  deleteOldestVersion(entityId: string): Promise<void>
  countVersions(entityId: string): Promise<number>
}
