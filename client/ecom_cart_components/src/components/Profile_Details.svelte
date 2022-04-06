<script>
    import { cart, profile_details } from "../store/cart.js";

    const checkOut = () => {
        alert(JSON.stringify($cart))
        alert(JSON.stringify($profile_details))
    }
</script>

<div class="shipping-address">
	<div>
		<p>Name</p>
		<input bind:value={$profile_details.name} />

		<p>Email</p>
		<input bind:value={$profile_details.email} />

		<p>Phone</p>
		<input bind:value={$profile_details.phone} />

		<p>profile_details</p>
		<textarea bind:value={$profile_details.street} cols="24" rows="6"></textarea>

		<p>City</p>
		<input bind:value={$profile_details.city} />

		<p>State</p>
		<input bind:value={$profile_details.state} />

		<p>PIN</p>
		<input bind:value={$profile_details.pin} />
		
		<div>
			<button on:click={checkOut}>Checkout</button>
		</div>

        <div class="current-address">
            <p>{$profile_details.name}</p>
            <p>{$profile_details.email}</p>
            <p>{$profile_details.phone}</p>
            <p>{$profile_details.street}</p>
            <p>{$profile_details.city}</p>
            <p>{$profile_details.state}</p>
            <p>{$profile_details.pin}</p>
        </div>
	</div>
</div>

<style>
	.shipping-address {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1em;
	}
	.current-address {
		padding: 2em;
		border: 2px dashed green;
	}
</style>