const wsUri = "wss://echo-ws-service.herokuapp.com/";
const inputText = document.querySelector('.input-message')
const btnSend = document.querySelector('.btn-send')
const btnGeo = document.querySelector('.btn-geo')
// const outputUser = document.querySelector('.message-user')
// const outputSrv = document.querySelector('.message-server')

const chat = document.querySelector('.chat')
function writeUserToScreen(message) {
    let p = document.createElement("p");
    p.className = "message message-user";
    p.innerHTML = message;
    chat.appendChild(p);
}

function writeSrvToScreen(message) {
    let p = document.createElement("p");
    p.className = "message message-server";
    p.innerHTML = message;
    chat.appendChild(p);
}

function writeGeoToScreen(message) {
    let a = document.createElement("a");
    a.className = "message message-user geo";
    a.href = message
    a.innerHTML = 'Гео-локация';
    chat.appendChild(a);
}

btnSend.addEventListener('click', () => {
    message = inputText.value
    let socket = new WebSocket(wsUri)
    socket.onopen = function(e) {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        socket.send(message);

        writeUserToScreen(message);
    };

    socket.onmessage = function(event) {
        alert(`[message] Данные получены с сервера:`);
        writeSrvToScreen(event.data)
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
            alert('[close] Соединение прервано');
        }
    };

    socket.onerror = function(error) {
        alert(`[error]`);
    };
});

btnGeo.addEventListener('click', (e) => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            alert(`широта - ${coords.latitude}, долгота - ${coords.longitude}`);
            writeGeoToScreen(`https://www.openstreetmap.org/#map=15/${coords.latitude}/${coords.longitude}`)
        });
    }
})
