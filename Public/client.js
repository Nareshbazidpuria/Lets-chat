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
    }
    else {
        if (usernameeePass.value == 'nkchat' || usernameeePass.value == 'Nkchat') {
            //  starting of the app ////////////////////////////

            usernamed.style.display = 'none';
            forblock.style.display = 'none';

            darkModee.addEventListener('click', () => {
                if (!darkMode) {
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
                else {
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
                        mkkk = mkkk + `<li>${users[key]}</li>`;
                    }
                }
                mkkk = mkkk + `<li id="leaveChattt"><strong>Leave Chat</strong></li>`;
                let markup = `
                            <h3 class="hitc">In This Chat <i class='fa fa-users'></i></h3>
                            <ul id="llll" class="ulitc">
                                ${mkkk}
                            </ul>
                            `;
                itcDiv.innerHTML = markup;
                mitm.appendChild(itcDiv);
                divStyling();
                leaveChattt.addEventListener('click', ()=>{
                    location.reload();
                });
            });

            // Broadcasting
            socket.on('itcb', (users) => {
                let marBrod = ``;
                for (var key in users) {
                    if (users.hasOwnProperty(key)) {
                        marBrod = marBrod + `<li>${users[key]}</li>`;
                    }
                }
                marBrod = marBrod + `<li id="leaveChattt"><strong>Leave Chat</strong></li>`;
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
                leaveChattt.addEventListener('click', ()=>{
                    location.reload();
                });
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

            // Leave Chat 
            socket.on('left', (namee) => {
                let jDiv = document.createElement('div')
                jDiv.classList.add('user-info', 'user-left')
                if (namee !== null) {
                    jDiv.innerHTML = `<strong>${namee}</strong> has left the chat`
                    messageArea.appendChild(jDiv)
                    playJoined()
                    scrollToBottom()
                }

            })

            socket.on('leftprint', (users) => {
                let marBrod = ``;
                for (var key in users) {
                    if (users.hasOwnProperty(key)) {
                        marBrod = marBrod + `<li>${users[key]}</li>`
                    }
                }
                marBrod = marBrod + `<li id="leaveChattt"><strong>Leave Chat</strong></li>`;
                let markup = `
                            <h3 class="hitc">In This Chat <i class='fa fa-users'></i></h3>
                            <ul id="llll" class="ulitc">
                                ${marBrod}
                            </ul>
                            `;
                itcDiv.innerHTML = markup;
                mitm.appendChild(itcDiv)
                divStyling()
                leaveChattt.addEventListener('click', ()=>{
                    location.reload();
                });
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
function onloadf() {
    prelaoder = document.querySelector('.preloader');
    prelaoder.style.display = 'none'
}

function sendImage(e) {
    var file = e.files[0];


    var reader = new FileReader();

    reader.addEventListener('load', () => {
        sendImagePreview.style.display = 'flex';

        if (file.size > 700000) {
            sendImagePreview.innerHTML = `<h3>You Selected a Bigger Image</h3>
            <h3>Please Select Another One</h3>
            <div id="btnsForImageSend"><button id="cnclImageSend" class="btn cnclSendBtn">Cancel</button></div>`;

            var imageToBeSend = `<img id="previewingImage" class="previewingImage" onclick="zoomTheImagee(this)" src="${reader.result}" alt="">`;
            cnclImageSend.addEventListener('click', () => {
                sendImagePreview.style.display = 'none';
            });
        }

        else {
            sendImagePreview.innerHTML = `<img id="previewingImage" src="${reader.result}" alt="">
            <div id="btnsForImageSend"><button id="cnclImageSend" class="btn cnclSendBtn">Cancel</button><button id="sndImageSend" class="btn cnclSendBtn">Send</button></div>`;

            var imageToBeSend = `<img id="previewingImage" class="previewingImage" onclick="zoomTheImagee(this)" src="${reader.result}" alt="">`;
            cnclImageSend.addEventListener('click', () => {
                sendImagePreview.style.display = 'none';
            });
            sndImageSend.addEventListener('click', () => {
                sendImagePreview.style.display = 'none';
    
                let msg = {
                    user: name,
                    message: imageToBeSend
                }
                socket.emit('message', msg)
    
                let mainDiv = document.createElement('div');
                className = 'right';
                mainDiv.classList.add(className, 'msgg');
                var markup = `<strong class="nr">You</strong><p>${msg.message}</p><p class="time">${timess}</p>`;
                mainDiv.innerHTML = markup;
                messageArea.appendChild(mainDiv);
                scrollToBottom();
            });
        }

    }, false);

    if (file) {
        reader.readAsDataURL(file);
        // console.log('size', file.size)
        // file.size = 800000;
    }
}
function zoomTheImagee(photo) {
    let photoSRC = photo.src;
    largeImage.style.display = 'flex';
    largeImage.innerHTML = `
        <img id="previewingImage" class="largeImage" src="${photoSRC}" alt="">
        <div id="crossLargeImage"><i class="fa fa-close"></i></div>
        `;
    let crossLargeImage = document.getElementById('crossLargeImage');
    crossLargeImage.addEventListener('click', () => {
        largeImage.style.display = 'none';
    });
}