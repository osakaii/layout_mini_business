export const toggleMobNavbar = () => {
    const btnsBurger = document.querySelectorAll('.hamburger');
    const mobNavbar = document.querySelector('.header__mob-nav');

    const btnActiveClass = 'burger-active';
    const navActiveClass = 'header__mob-nav--active';

    Array.from(btnsBurger).forEach(btn => {
        btn.addEventListener('click', () => {
            if(!btnsBurger[0].classList.contains(btnActiveClass)){
                btnsBurger[0].classList.add(btnActiveClass);
                btnsBurger[1].classList.add(btnActiveClass);
                mobNavbar.classList.add(navActiveClass);
                document.body.style.overflow = 'hidden';
            }
            else{
                btnsBurger[0].classList.remove(btnActiveClass);
                btnsBurger[1].classList.remove(btnActiveClass);
                mobNavbar.classList.remove(navActiveClass);
                document.body.style.overflow = '';
            }
        })
    })
}