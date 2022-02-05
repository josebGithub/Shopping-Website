const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class="nav">
            <img src="img/logo.png" class="brand-logo" alt="">
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product">
                    <button class="search-btn">search</button>
                </div>
                <a href="#"><img src="img/user.png" alt=""></a>
                <a href="#"><img src="img/cart.png" alt=""></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="#home" class="link">home</a></li>
            <li class="link-item"><a href="pastries.html" class="link">pastries</a></li>
            <li class="link-item"><a href="#" class="link">cakes</a></li>
            <li class="link-item"><a href="#" class="link">pies</a></li>
            <li class="link-item"><a href="#" class="link">cookies</a></li>
        </ul>
    `;
}

createNav();
