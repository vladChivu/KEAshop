import { readable, writable } from "svelte/store"

export const products = readable([
    {id: 1, name: "Apple", image: "https://www.applesfromny.com/wp-content/uploads/2020/05/Jonagold_NYAS-Apples2.png", price: 10, quantity: 1},
	{id: 2, name: "Orange", image: "https://5.imimg.com/data5/VN/YP/MY-33296037/orange-600x600-500x500.jpg", price: 11, quantity: 1},
	{id: 3, name: "Grapes", image: "https://www.aicr.org/wp-content/uploads/2020/01/shutterstock_533487490-640x462.jpg", price: 12, quantity: 1},
])

export const cart = writable([])
export const profile_details = writable({
    name: "",
	email: "",
	phone: "",
    street: "",
	city: "",
	state: "",
	pin: "",
})