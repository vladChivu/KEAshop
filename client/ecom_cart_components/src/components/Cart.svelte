<script>
    import { cart } from "../store/cart.js";

    const minusItem = (product) => {
        for (let item of $cart) {
            if(item.id === product.id) {
                if(product.quantity > 1) {
                    product.quantity -= 1
                    $cart = $cart
                } else {
                    $cart = $cart.filter((cartItem) => cartItem != product)
                }
                return;
            }
        }
    }

    const plusItem = (product) => {
        for(let item of $cart) {
            if(item.id === product.id) {
                product.quantity += 1
                $cart = $cart;
                return;
            }
        }
    }

    $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
</script>

<div class="cart-list">
    {#each $cart as item}
        {#if item.quantity > 0}
        <div class="cart-item">
            <img width="50" src={item.image} alt={item.name}/>
            <div>{item.quantity}
                <button on:click={() => plusItem(item)}>+</button>
                <button on:click={() => minusItem(item)}>-</button>
            </div>
            <p>{item.price * item.quantity}</p>
        </div>
        {/if}
    {/each}
    <div class="total">
        <h4>Total: {total}</h4>
    </div>
</div>