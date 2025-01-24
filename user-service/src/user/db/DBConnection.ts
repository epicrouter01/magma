export interface DBConnection {
    init(): Promise<void>;
    
}