import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return <time dateTime={dateString}>{format(date, 'yyyy-mm-dd')}</time>;
};

export default DateFormatter;
