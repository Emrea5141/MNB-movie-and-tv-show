function myFunction() {
    const star = document.createElement('span');
    const cont = document.querySelector('div');
    var value = Math.random() * 5;

    star.style.width = value + 'px';
    star.style.height = value + 'px';

    star.style.top = Math.random() * innerHeight + 'px';
    star.style.left = Math.random() * innerWidth + 'px';

    cont.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 5000);
}
setInterval(myFunction, 50);