export const isTestEnvironment = () => {
    return process.env.NODE_ENV === 'test';
};