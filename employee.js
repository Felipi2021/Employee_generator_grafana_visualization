function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 function generateRandomSurname(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
 }
 var nameList = [
    'Ewa','Bartek','Jagoda','Maciek',
    'Wojtek','Oliwier','Ala','Magda','Michał','Paulina',
    'Filip','Krystian','Marzanna','Edyta','Daniel','Krzysztof','Jakub',
    'Oskar','Jan','Judyta','Malwina',
 ];
 var finalName = "";
 function generateName() {
    var finalName = nameList[Math.floor(Math.random() * nameList.length)];
    return finalName;
 }
let stage = getRandomInt(1, 3);
let level_R = "";
switch (stage) {
    case 1:
        level_R = "junior";
        break;
    case 2:
        level_R = "regular";
        break;
    case 3:
        level_R = "senior";
        break;
}
 name_R = generateName();
 surname_R = generateRandomSurname(getRandomInt(5, 12));
 const axios = require('axios');
 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
 async function pushMetrics(employee) {
    const pushgatewayUrl = `http://localhost:9091/metrics/job/employees`;
    const metrics = `
    # TYPE employee_info counter
    employee{name="${employee.name}", day="${employee.day}", level="${employee.level}", surname="${employee.surname}", nationality="${employee.nationality}"} ${getRandomInt(4, 12)}
    `;
    try {
        const response = await axios.post(pushgatewayUrl, metrics, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        console.log('pushed to Server, code:', response.status);
    }
    catch (e) {
        console.error('error:', e.message);
    }
 }
 (async function sendEmployees() {
    for (let i = 1; i < 6; i++) {
        let day_R = "";
        switch (i) {
            case 1:
                day_R = "monday";
                break;
            case 2:
                day_R = "tuesday";
                break;
            case 3:
                day_R = "wednesday";
                break;
            case 4:
                day_R = "thursday";
                break;
            case 5:
                day_R = "friday";
                break;
        }
        var employee = {
            name: name_R,
            surname: surname_R,
            day: day_R,
            nationality: "polish",
            level: level_R,
            age: 25,
        };
        await pushMetrics(employee);
        await delay(2000);
    }
 })();

 //plik, który tworzy losowe osoby i wprowadza je do pushgateway(localhost:9091), trzeba wpisać node employee.js w command prompcie node'owskim, wyświetla te wszystkie dane w dashboardzie grafany
 //plik json z importem grafany potrzebuje tych poprawek, bo się nie zaimportowały: 

// plik json jest w folderze a zmainy w query to:
//
//  rozkład tygodniowy: avg_over_time(employee{name="$employee"}[$__interval])
//  
//  wykres tygodniowy: last_over_time(employee{name="$employee"}[$__interval])
//  
//  procenty: ((last_over_time(employee{day="$day", name="$employee"}[$__interval]))/8)*100
//  
//  czy wyorbił 8h: last_over_time(employee{day="$day",name="$employee"}[$__interval])
//  
//  dla wykresu tygodniowego i czy ma 8h daneg dnia data transform: limit 1