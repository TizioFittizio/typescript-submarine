export interface IConfigService {
    loadConfig: () => void;
    setConfigVariable: (key: string, value: string) => void;
    getString: (key: string) => string | null;
    getNumber: (key: string) => number | null;
    getBoolean: (key: string) => boolean;
}