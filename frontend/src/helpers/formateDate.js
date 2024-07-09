import { formatDistanceToNow } from 'date-fns';
const formateDate = (date) => {
    let result =  formatDistanceToNow(new Date(date), { addSuffix: true });
    if(result.includes('about')){
       result =  result.slice(5)
       
    }
    return result;
}

export default formateDate