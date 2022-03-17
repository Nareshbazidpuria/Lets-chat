const socket = io();
let name;
let itcDiv;
let jAudio;
let rAudio;
let time;
let timess;
setInterval(() => {
    time = new Date();
    timess = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}, 1000);

let textarea = document.querySelector('#msginp');
let btn = document.querySelector('#btn');
let messageArea = document.querySelector('.container');
let darkMode = false;

let lgnbtn = document.getElementById('lgnbtn');
let usernameeeee = document.getElementById('usernameeeee');
let usernameeePass = document.getElementById('usernameeePass');
let usernameeePassVal = usernameeePass.value;
lgnbtn.addEventListener('click', () => {
    name = usernameeeee.value.trim();
    if (name === '') {
        usernameeeee.value = '';
        usernameeePass.value = '';
        console.log('fi if')
    }
    else {
        if (usernameeePass.value == 'nkchat') {
            //  starting of the app ////////////////////////////

            usernamed.style.display = 'none';
            forblock.style.display = 'none';

            darkModee.addEventListener('click', ()=>{
                if(!darkMode){
                    let head = document.getElementsByTagName('head')
                    let linkCSS = document.createElement('link')
                    linkCSS.setAttribute('rel', 'stylesheet')
                    linkCSS.setAttribute('id', 'drkModeCss')
                    linkCSS.setAttribute('href', '/darkmode.css')
                    document.head.appendChild(linkCSS)
                    darkModeebtn.classList.remove('fa-moon-o')
                    darkModeebtn.classList.add('fa-sun-o')
                    darkMode = true;
                }
                else{
                    drkModeCss.remove();
                    darkModeebtn.classList.add('fa-moon-o')
                    darkModeebtn.classList.remove('fa-sun-o')
                    darkMode = false;
                }
            })

            newUserJoined(name)
            function newUserJoined(name) {
                socket.emit('new-user-joined', name)
            }
            printUsersObject()
            function printUsersObject(name) {
                socket.emit('puo')
            }
            // Showing to us
            socket.on('itc', (users) => {
                itcDiv = document.createElement('div');
                itcDiv.setAttribute('id', 'inThisChat');
                let mkkk = ``;
                for (var key in users) {
                    if (users.hasOwnProperty(key)) {
                        mkkk = mkkk + `<li>${users[key]}</li>`
                    }
                }
                let markup = `
                            <h3 class="hitc">In This Chat <i class='fa fa-users'></i></h3>
                            <ul id="llll" class="ulitc">
                                ${mkkk}
                            </ul>
                            `;
                itcDiv.innerHTML = markup;
                mitm.appendChild(itcDiv)
                divStyling()
            })
            // Broadcasting
            socket.on('itcb', (users) => {
                let marBrod = ``;
                for (var key in users) {
                    if (users.hasOwnProperty(key)) {
                        marBrod = marBrod + `<li>${users[key]}</li>`
                    }
                }
                let markup = `
                            <h3 class="hitc">In This Chat <i class='fa fa-users'></i></h3>
                            <ul id="llll" class="ulitc">
                                ${marBrod}
                            </ul>
                            `;
                itcDiv.innerHTML = markup;
                mitm
                .appendChild(itcDiv)
                divStyling()
            })

            socket.on('new-user-joined', (name) => {
                let jDiv = document.createElement('div')
                jDiv.classList.add('user-info', 'user-joined')
                jDiv.innerHTML = `<strong>${name}</strong> joined the chat`
                messageArea.appendChild(jDiv)
                playJoined()
                scrollToBottom()
            })

            textarea.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' && e.target.value != '') {
                    sendMessage(e.target.value)
                }
            })

            btn.addEventListener('click', () => {
                let msgtyped = textarea.value;
                if (msgtyped != '') {
                    sendMessage(msgtyped)
                }
            })

            function sendMessage(message) {
                let msg = {
                    user: name,
                    message: message
                }
                appendMessage(msg, 'right')
                socket.emit('message', msg)
                textarea.value = ''
            }

            function appendMessage(msg, type) {
                let mainDiv = document.createElement('div')
                className = type
                mainDiv.classList.add(className, 'msgg')
                if (type == 'right') {
                    var markup = `<strong class="nr">You</strong><p>${msg.message}</p><p class="time">${timess}</p>`
                }
                else {
                    var markup = `<strong class="nr">${msg.user}</strong><p>${msg.message}</p><p class="time">${timess}</p>`
                }
                mainDiv.innerHTML = markup
                messageArea.appendChild(mainDiv)
                scrollToBottom()
            }
            // Receive
            socket.on('message', (msg) => {
                appendMessage(msg, 'left')
                playReceived()
                scrollToBottom()
            })

            socket.on('left', (namee) => {
                let jDiv = document.createElement('div')
                jDiv.classList.add('user-info', 'user-left')
                jDiv.innerHTML = `<strong>${namee}</strong> has left the chat`
                messageArea.appendChild(jDiv)
                playJoined()
                scrollToBottom()
            })

            socket.on('leftprint', (users) => {
                let marBrod = ``;
                for (var key in users) {
                    if (users.hasOwnProperty(key)) {
                        marBrod = marBrod + `<li>${users[key]}</li>`
                    }
                }
                let markup = `
                            <h3 class="hitc">In This Chat <i class='fa fa-users'></i></h3>
                            <ul id="llll" class="ulitc">
                                ${marBrod}
                            </ul>
                            `;
                itcDiv.innerHTML = markup;
                mitm.appendChild(itcDiv)
                divStyling()
            });
        }
        else {
            usernameeeee.value = '';
            usernameeePass.value = '';
        }
    }
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

function divStyling() {
    let ithis = document.querySelector('.hitc')
    let ul = document.getElementById('llll')
    ul.style.display = 'flex'
    ul.style.cursor = 'default'
}

function playJoined() {
    jAudio = new Audio('joined.mp3');
    jAudio.play()
}
function playReceived() {
    rAudio = new Audio('received.mp3');
    rAudio.play();
}
