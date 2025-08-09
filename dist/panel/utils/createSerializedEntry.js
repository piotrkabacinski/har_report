import { state } from "../consts/state";
import { createReport } from "./createReport";
import { getReportTemplate } from "../../utils/getReportTemplate";
import { getAreAllMIMEtypesRendered } from "./getAreAllMIMEtypesRendered";
export const createSerializedEntry = async (request) => {
    const { status } = request.response;
    const { method, url } = request.request;
    const template = await getReportTemplate();
    const isMimeTypeSupported = (await getAreAllMIMEtypesRendered()) ||
        state.allowedResponseMimeTypesRegExps.find((regExp) => regExp.test(request.response.content.mimeType)) !== undefined;
    const report = isMimeTypeSupported
        ? await createReport(request, template)
        : `<span style="opacity:0.5">HAR Report: Unsupported response content MIME type: "${request.response.content.mimeType}"</span>`;
    return {
        id: crypto.randomUUID().split("-").join(""),
        dateTime: request.startedDateTime,
        status,
        method,
        url,
        report,
    };
};
