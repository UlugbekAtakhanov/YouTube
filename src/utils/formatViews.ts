const VIEW_FORMATTER = new Intl.NumberFormat(undefined, { notation: "compact" });

export const formatViews = (views: number) => {
    return VIEW_FORMATTER.format(views);
};
