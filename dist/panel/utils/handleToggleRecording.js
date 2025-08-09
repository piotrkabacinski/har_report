import { ElementSelector } from "@/consts/ElementSelector";
import { state } from "../consts/state";
import { StatusDotAttribute } from "../consts/StatusDotAttribute";
const toggleRecordingDot = () => {
    const statusDot = document.querySelector(ElementSelector.statusDot);
    if (!statusDot)
        throw `${ElementSelector.statusDot} not found`;
    statusDot.setAttribute(StatusDotAttribute.isRecording, state.isRecording.toString());
};
export const handleToggleRecording = (e) => {
    state.isRecording = !state.isRecording;
    e.target.innerText = state.isRecording ? "Pause" : "Restore";
    toggleRecordingDot();
};
