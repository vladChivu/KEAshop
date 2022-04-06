<script>
    import { products, cart } from "../store/cart.js";

    const addToCart = (product) => {
        for(let item of $cart) {
            if(item.id === product.id) {
                product.quantity += 1
                $cart = $cart;
                return;
            }
        }
        $cart = [...$cart, product]
    }
</script>

<div class="product-list">
    {#each $products as product}
    <div>
        <div class="image" style="background-image: url({product.image});"></div>
        <h4>{product.name}</h4>
        <p>{product.price}</p>
        <button on:click={() => addToCart(product)}>Add to Cart</button>
    </div> 
    {/each}
</div>

<style>
    .product-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
        
    .image {
        height: 150px;
        width: 150px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>