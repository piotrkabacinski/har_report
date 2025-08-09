import mustache from "mustache";
export const createReport = async (entry, template) => {
    const text = await new Promise((resolve) => {
        entry.getContent((body) => {
            resolve(body);
        });
    });
    entry.response.content = {
        ...entry.response.content,
        text,
    };
    return mustache.render(`${template.trim()}`, entry);
};
