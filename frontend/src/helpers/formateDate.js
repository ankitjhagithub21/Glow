import { formatDistanceToNow } from 'date-fns';
const formateDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export default formateDate