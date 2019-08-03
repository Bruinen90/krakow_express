console.log('test')

const menuCont = document.querySelector('.nav__menuCont');

const toggleMenu = () => {
    const menuToggler = document.querySelector('.hamburger');
    const cover = document.querySelector('.cover');
    menuCont.classList.toggle('nav__menuCont--active');
    menuToggler.classList.toggle('is-active');
    cover.classList.toggle('cover--hidden');
}