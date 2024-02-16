const tabs = document.querySelectorAll('button.tab_btn');
const allContent = document.querySelectorAll('.category-tab');
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        tab.classList.add('active');

        allContent.forEach(content => {
            content.classList.remove('active');
        });
        allContent[index]?.classList.add('active');

        const category = tab.innerText;

        getapi(api_url, category);
    });
});

const api_url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

async function getapi(url, category) {
    const response = await fetch(url);
    const data = await response.json();
    show(data, category);
}

function show(data, category) {
    let categoryTab = '';

    // Filter the categories based on the selected tab
    const selectedCategory = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
    
    if (selectedCategory) {
        for (const product of selectedCategory.category_products) {
            const discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
            categoryTab += `
                <div class="item-container">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="item-detail">
                        <h4 class="item-name">${product.title} &nbsp; &#183; &nbsp;<span class="item-vendor">${product.vendor}</span> </h4>
                        <p class="item-price">Rs. ${product.price}&nbsp; <span class="compare-price"> ${product.compare_at_price}&nbsp;  </span><span class="offer-price"> &nbsp; ${discountPercentage}%Off</span></p>
                        <button class="cart-btn">Add to Cart</button>
                    </div>
                </div>
            `;
            
        }
        const categoryTabElement = document.querySelector('.tab');
            categoryTabElement.innerHTML = categoryTab;
    } else {
        categoryTab = "<p>No products found for this category.</p>";
    }
   
}
