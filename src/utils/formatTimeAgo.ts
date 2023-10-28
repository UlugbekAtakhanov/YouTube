const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
});

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export function formatTimeAgoIntl(date: Date) {
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
    }
}

export const formatTimeAgo = (time: Date) => {
    const years = Math.floor((new Date().getTime() - new Date(time).getTime()) / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(((new Date().getTime() - new Date(time).getTime()) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(((new Date().getTime() - new Date(time).getTime()) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));

    return years === 1
        ? `${years} year ago`
        : years > 0
        ? `${years} years ago`
        : months === 1
        ? `${months} month ago`
        : months > 0
        ? `${months} months ago`
        : days === 1
        ? `${days} day ago`
        : days > 0
        ? `${days} days ago`
        : JSON.stringify(time);
};
