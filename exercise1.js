const btn = document.querySelector('.btn')
const icon1= document.querySelector('.btn-icon-1')
const icon2 = document.querySelector('.btn-icon-2')

icon1.style.display = 'block'

btn.addEventListener('click', (e) => {
    console.log(icon1.style.display)
    if (icon1.style.display === 'block'){
        icon1.style.display = 'none';
        icon2.style.display = 'block'
    } else if (icon1.style.display === 'none') {
        icon1.style.display = 'block';
        icon2.style.display = 'none'
    }
    console.log(icon1.style.display)
})