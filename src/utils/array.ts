/*
 * Array shuffling courtesy of
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
export const shuffle = <T = any>(arr: T[]): T[] => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
