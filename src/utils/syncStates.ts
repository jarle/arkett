export enum SYNC_STATE {
    NOT_SYNCED ="Content has not been saved to the cloud",
    SYNCHRONIZING = "Content is being saved to the cloud",
    SYNCHRONIZED = "Content has been saved to the cloud",
    STALE = "Content has been changed somewhere else and will be overwritten on next refresh"
}