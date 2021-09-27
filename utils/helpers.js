module.exports = {
    format_date: date => {
        const postTime = new Date(date);
        let month = postTime.getMonth() + 1;
        let day = postTime.getDate();
        let year = postTime.getFullYear();
        let hour = postTime.getHours();
        let minutes = postTime.getMinutes();
        let amPm = 'AM'

        if(hour >= 13){
            hour -= 12;
            amPm = 'PM'
        }

        const today = new Date();
        if(day == today.getDate() && month == today.getMonth()+1 && year == today.getFullYear()){
            console.log('hello')
            return `Today at ${hour}:${minutes} ${amPm}`;
        }
        else{
            return `${month}/${day}/${year} at ${hour}:${minutes} ${amPm}`;
        }
    },
    format_plural: (word, amount) =>{
        if(amount !== 1){
            return `${word}s`;
        }
        return word
    },
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    }
}