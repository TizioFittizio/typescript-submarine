export interface IConfigService {
    loadConfiguration(): void;
    getString(configKey: string): string | null;
    getNumber(configKey: string): number | null;
    getBoolean(configKey: string): boolean | null;
}