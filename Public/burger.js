let burger = document.getElementById('burger');
let line = document.getElementsByClassName('line');
let mi = document.getElementById('mitm');
console.log(line[1].style.opacity)
burger.addEventListener('click', () => {

    if (line[1].style.opacity == '' || line[1].style.opacity == '1') {
        line[0].classList.add('l-1')
        line[1].classList.add('l-2')
        line[2].classList.add('l-3')
        burger.classList.add('burger')
        mi.classList.add('open')
        line[1].style.opacity = '0'

    }
    else {
        line[0].classList.remove('l-1')
        line[1].classList.remove('l-2')
        line[2].classList.remove('l-3')
        burger.classList.remove('burger')
        mi.classList.remove('open')
        line[1].style.opacity = '1'
    }
});