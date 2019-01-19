export const getRandomPort = () => {
    // tslint:disable-next-line:radix
    return Math.round(Math.random() * 10000) + 6000;
};