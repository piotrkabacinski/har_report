var ColorClass;
(function (ColorClass) {
    ColorClass["green"] = "success";
    ColorClass["yellow"] = "redirect";
    ColorClass["red"] = "fail";
})(ColorClass || (ColorClass = {}));
export const getStatusClass = (status) => {
    if (status < 200)
        return "";
    if (status < 300)
        return ColorClass.green;
    if (status < 400)
        return ColorClass.yellow;
    return ColorClass.red;
};
