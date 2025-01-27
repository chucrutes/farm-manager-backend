export const stringifier = (message: unknown) => {
    console.log(JSON.stringify(message, null, 2))
}