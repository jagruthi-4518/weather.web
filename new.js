const btn = document.getElementById("btn");
const input = document.getElementById("city");
const ham = document.getElementById("ham");
const nav = document.getElementById("nav");
const climate = document.getElementById("climate");
const mob = document.getElementById("mob");
const msg = document.getElementById("msg");
const panel = document.getElementById("panel");
const loc1 = document.getElementById("loc");
const time1 = document.getElementById("time");
const type1 = document.getElementById("type");
const icon1 = document.getElementById("icon") || document.getElementById("icons");
const mloc = document.getElementById("mloc");
const mtime = document.getElementById("mtime");
const mtype = document.getElementById("mtype");
const micon = document.getElementById("micon");
const info = document.getElementById("info");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels");
const hum = document.getElementById("hum");
const wind = document.getElementById("wind");
const dew = document.getElementById("dew");

if (btn) btn.addEventListener("click", getWeather);
if (input) {
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") getWeather();
    });
}

if (ham) {
    ham.addEventListener("click", () => {
        let current = window.getComputedStyle(nav).display;
        nav.style.display = current === "none" ? "flex" : "none";
        nav.style.flexDirection = "column";
    });
}

function getWeather() {
    let city = input.value.trim();

    if (city === "") {
        showError();
        return;
    }

    localStorage.setItem("city", city);

    let API_KEY = "d1af6cb339934007bc852303252511";
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`;

    fetch(url)
        .then(res => res.json())
        .then(data => loadData(data))
        .catch(() => showError());
}


function loadData(data) {
    let cityName = data.location.name;
    let country = data.location.country;
    let localTime = data.location.localtime;
    let timeOnly = localTime.split(" ")[1];
    let hour = parseInt(timeOnly.split(":")[0]);

    let bg;
    if (hour >= 6 && hour < 10) bg = "radial-gradient(circle, #FFF7B0, #FFE680,#FFA500)";
    else if (hour >= 10 && hour < 15) bg = "radial-gradient(white, #3ab9f9ff,#0587faff)";
    else if (hour >= 15 && hour < 18) bg = "radial-gradient(circle, #FFD65C, #f9c508ff, #E53935)";
    else bg = "radial-gradient(circle, #0A1A2F, #0B2344, #000000)";
    document.body.style.background = bg;

    if (msg) msg.style.display = "none";

    if (loc1) loc1.innerText = "📍" + cityName + "," + country;
    if (time1) time1.innerText = timeOnly;
    if (type1) type1.innerText = data.current.condition.text;
    if (icon1) icon1.src = data.current.condition.icon;

    if (climate && mob) {
        climate.style.opacity = "1";
        mob.style.opacity = "1";

        if (mloc) mloc.innerText = "📍" + cityName + "," + country;
        if (mtime) mtime.innerText = timeOnly;
        if (mtype) mtype.innerText = data.current.condition.text;
        if (micon) micon.src = data.current.condition.icon;

        if (info) {
            info.innerText =
                "Temp: " + data.current.temp_c + "C / " + data.current.temp_f + "F" +
                "\nFeels like: " + data.current.feelslike_c + "C / " + data.current.feelslike_f + "F" +
                "\nHumidity: " + data.current.humidity +
                "\nWindSpeed: " + data.current.wind_kph + "kph" +
                "\nDewpoint: " + data.current.dewpoint_c + "C / " + data.current.dewpoint_f + "F";
        }

        if (temp) temp.innerText = data.current.temp_c + "C / " + data.current.temp_f + "F";
        if (feels) feels.innerText = data.current.feelslike_c + "C / " + data.current.feelslike_f + "F";
        if (hum) hum.innerText = data.current.humidity;
        if (wind) wind.innerText = data.current.wind_kph + "kph";
        if (dew) dew.innerText = data.current.dewpoint_c + "C / " + data.current.dewpoint_f + "F";
    }

    if (panel) {
        panel.innerHTML = "";
        panel.style.opacity = "1";

        data.forecast.forecastday[0].hour.forEach(h => {
            let div = document.createElement("div");
            div.className = "hour";

            div.innerHTML = `
                <img src="${h.condition.icon}">
                <p>${h.time.split(" ")[1]}</p>
                <p>${h.condition.text}</p>
                <p>${h.temp_c}°C</p>
            `;

            panel.appendChild(div);
        });
    }
}



function showError() {
    if (msg) {
        msg.style.display = "block";
        msg.innerHTML = "<h1>PLEASE ENTER VALID CITY NAME!!</h1>";
    }

    if (climate) climate.style.opacity = "0";
    if (mob) mob.style.opacity = "0";
    if (panel) panel.style.opacity = "0";

    document.body.style.backgroundColor = "whitesmoke";
}

window.addEventListener("load", () => {
    const saved = localStorage.getItem("city");
    if (saved && input && !input.value) {
        input.value = saved;
         setTimeout(() => {
            getWeather();
        }, 400);
    }
});
