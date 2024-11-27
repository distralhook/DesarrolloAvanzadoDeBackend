const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");

socket.on("products-list", (data) => {
	const products = data.products ?? [];
	productsList.innerHTML = ""; // Limpia la lista

	products.forEach((product) => {
		const productItem = document.createElement("div");
		productItem.classList.add("card");
		productItem.innerHTML = `
        <p>
    	<u>Titulo:</u> ${product.title}, <u>Descripcion:</u> ${product.description}, 
        <u>Id:</u> ${product.id}, <u>Stock:</u> ${product.stock}, 
        <u>Categoría:</u> ${product.category}, <u>Precio:</u> ${product.price}
        </p><br>
        `;

		productsList.appendChild(productItem);
	});
});

productsForm.onsubmit = async (event) => {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	errorMessage.innerText = "";

	form.reset();

	socket.emit("insert-product", {
		title: formData.get("title"),
		description: formData.get("description"),
		code: formData.get("code"),
		price: formData.get("price"),
		status: formData.get("status") || "off",
		stock: formData.get("stock"),
		category: formData.get("category"),
		thumbnail: formData.get("thumbnail"),
	});
};

btnDeleteProduct.onclick = () => {
	const id = Number(inputProductId.value);
	inputProductId.value = "";
	errorMessage.innerText = "";

	if (id > 0) {
		socket.emit("delete-product", { id });
	}
};

socket.on("error-message", (data) => {
	errorMessage.innerText = data.message;
});