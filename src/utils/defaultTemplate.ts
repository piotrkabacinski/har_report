export const defaultTemplate = `{{request.method}} {{response.status}} {{request.url}}

Payload:

{{request.postData.text}}

Response:

{{response.content.text}}`;