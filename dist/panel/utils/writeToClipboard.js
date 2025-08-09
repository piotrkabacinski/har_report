export const writeToClipboard = (text) => new Promise((resolve, reject) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.append(el);
    el.select();
    const success = document.execCommand("copy");
    el.remove();
    if (!success)
        reject(new Error("Unable to write to clipboard"));
    resolve();
});
