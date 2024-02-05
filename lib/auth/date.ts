function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        hour12: true,
    };

    const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}


export function getCurDate(): string {

    const currentDate: Date = new Date();
    const formattedDate: string = formatDate(currentDate);
    return formattedDate
}

