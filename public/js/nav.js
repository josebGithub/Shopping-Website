const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class="nav">
            <img src="images/logo.png" class="brand-logo" alt="">
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product">
                    <button class="search-btn">search</button>
                </div>
                <a href="#"><img src="images/user.png" alt="user profile image"></a>
                <a href="shoppingcart.html"><img src="images/cart.png" alt="shopping cart image"></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="index.html" class="link">home</a></li>
            <li class="link-item"><a href="pastries.html" class="link">pastries</a></li>
            <li class="link-item"><a href="#" class="link">cakes</a></li>
            <li class="link-item"><a href="#" class="link">pies</a></li>
            <li class="link-item"><a href="#" class="link">cookies</a></li>
        </ul>
    `;
}

createNav();
