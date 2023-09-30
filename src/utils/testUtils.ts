export function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(0);
        }, 1000);
    });
}