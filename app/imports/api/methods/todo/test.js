// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth();
// const day = date.getDate();
// const hours = date.getHours();
// const min = date.getMinutes();
// const sec = date.getSeconds();
// const fullTime = `${year}-${month + 1}-${day}T${hours}:${min}:${sec}`;

// console.log(date);
// console.log(fullTime);

const now = new Date();
const date = new Date(now.getTime() + 180 * 60000);

console.log(now < date);
