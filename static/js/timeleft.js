const timedisplay = document.querySelectorAll(".entry__time-left");
const dates = document.querySelectorAll(".entry__exDate--big");

const getTimeDifference = function(dt){
    const date = new Date(dt + " 23:59:59");
    // We get today's datetime
    let today = new Date();
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const todayTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    today = new Date(todayDate +' '+ todayTime);
    // We calculate the difference in milliseconds
    let diffInMilliSeconds = Math.abs(date - today) / 1000;
    // Calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    // Calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // Calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    let differenceDays = "";
    let differenceHs = "";
    let differenceMins = "";
    let timeSpan = []
    if (days > 0) {
        differenceDays = (days === 1) ? `${days} day` : `${days} days`;
        timeSpan.push(differenceDays);
    };
    if (hours > 0) {
        differenceHs = (hours === 0 || hours === 1) ? `${hours} hour ` : `${hours} hours`;
        timeSpan.push(differenceHs);
    };
    if (minutes > 0) {
        differenceMins = (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
        timeSpan.push(differenceMins);
    };
    if(timeSpan.length > 1) {
        difference = timeSpan.join(", ")
        const lastIndex = difference.lastIndexOf(",");
        const and = " and"
        difference = (difference.substring(0, lastIndex) + and + difference.substring(lastIndex + 1)).trim("and ");
    } else {
        difference = timeSpan.join();
    }
    if(((date - today) / 1000) < 0) return difference + " ago";
    else return difference + " left";
};

async function updateTimeDifferences() {
    for(let date of dates) {
        const diff = getTimeDifference(date.innerText);
        timedisplay[Array.prototype.indexOf.call(dates, date)].innerText = diff;
    };
};

const interval = 500;
setInterval(() => {
    updateTimeDifferences();
}, interval);