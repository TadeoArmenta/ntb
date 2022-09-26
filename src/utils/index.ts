/**
 * Helper function to determine if an object is empty
 * @param obj {Record<string,unknown> | null | undefined} target object to check
 * @return {boolean} if object is empty
 * */
 export const isEmptyObject = (obj?:Record<string, unknown>):boolean =>!!obj && Object.keys(obj).length === 0 && obj.constructor === Object

/**
 * Memory optimized function for loop in parallel
 * @typedef T - Target Type
 * @param array {Array<T>} - Typed array to loop through
 * @param {Function (T, number)} callback - Callback for each iteration.
 * */
export async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => Promise<void>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}
/**
 * Helper function to debounce execution of requests
 * @param fn {T} function to debounce
 * @param delay {number} milliseconds to wait between calls
 *  */
export const debounce = function<T extends (...args: unknown[]) => ReturnType<T> | PromiseLike<ReturnType<T>>> (fn: T, delay: number) {
let timeout: ReturnType<typeof setTimeout> | undefined;

let promise: Promise<ReturnType<T>> | undefined;
let res: ((value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void) | undefined;

return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const scheduleResolution = (resolve: (value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void) => {
        if (timeout) {clearTimeout(timeout)}

        timeout = setTimeout(() => {
            timeout = undefined;
            promise = undefined;
            res = undefined;

            resolve(fn.apply(this, args));
        }, delay);
    };

    if (res) {
        scheduleResolution(res);
    } else {
        promise = new Promise<ReturnType<T>>((resolve) => {
            res = resolve;
            scheduleResolution(res);
        });
    }
    return promise as Promise<ReturnType<T>>;
};
}
/**
 * Generator function util to return chunks from an array
 * @param {any[]} target target array
 * @param {number} size chunk's size
 * */
export const arrayToChunks = function*<T> (target: T[], size:number) {
    for (let i = 0; i < target.length; i += size) {
        yield target.slice(i, i + size);
    }
}
/**
 * Array to groups
 * @param {any[]} a Target Array
 * @param {number} n Number of groups
 * @returns {any[][]} Array of arrays, of target array elements
 *  */
export const arrayToGroups = <T>(a: T[], n: number): T[][] => {
    const b = Math.ceil(a.length / n);
    return [...Array(n)].map((_, i) => a.slice(i * b, (i + 1) * b));
};