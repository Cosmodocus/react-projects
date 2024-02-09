import { useEffect, useState } from 'react';
import './styles.css';

export default function LoadMoreData() {
	// our loading state for when the items load in
	const [loading, setLoading] = useState(false);
	// our array that will be filled with each product item
	const [products, setProducts] = useState([]);
	// our count state to keep track of what number of products rendered we are at
	const [count, setCount] = useState(0);
	// our disableBtn to manage the button disabling at max limit
	const [disableBtn, setDisableBtn] = useState(false);
	// our errorMsg state for error handling
	const [errorMsg, setErrorMsg] = useState(null);

	// an async function for fetching and showing our data of items.
	async function fetchProducts() {
		// try/catch for best practice error handling
		try {
			// before anything has loaded, setLoading will be true
			setLoading(true);
			// our fetch url has the original link with a template literal for the count state for the skip prop. Our condition renders so that if we are loading the page the first time, we won't need to skip the first 20. Every load after that, we will multiply count by 20 to skip the items that have already been loaded.
			const response = await fetch(
				`https://dummyjson.com/products?limit=20&skip=${
					count === 0 ? 0 : count * 20
				}`
			);
			const result = await response.json();

			// if our array of results, our result products, and our result products length are all true, then we will have our products array be set with an updater function with the previous data, and the result products. And we use spread operators to make them non mutable.

			// this will allow our array of products to update with each new items while maintaining the old items.
			if (result && result.products && result.products.length) {
				setProducts((prevData) => [...prevData, ...result.products]);
				// we won't be loading if everything is true, we already have everything.
				setLoading(false);
			}
			console.log(result);
		} catch (e) {
			console.log(e);
			setLoading(false);
			// if error, then there's nothing to load
			setErrorMsg(e.message);
			// if error, display the error.
		}
	}

	// our use effect will run the fetchProducts function with a dependency of our count. Everytime our count is mounted, the async fetchproducts function will fetch and display the data
	useEffect(() => {
		fetchProducts();
	}, [count]);

	// our useeffect here is for limiting our load more button at 100 with our products array as our dependency. Everytime our products array is mounted, we will check if products and products.length is equal to 100. If true, we will set our setDisableBtn to true.
	useEffect(() => {
		if (products && products.length === 100) {
			setDisableBtn(true);
		}
	}, [products]);

	// Straight forward, if loading is true, display this message for users
	if (loading) {
		return <div>Loading - Please Wait !</div>;
	}

	// If our error message is not null, then an error has occured, and we will alert the user with the message.
	if (errorMsg !== null) {
		return <div>Uh Oh! An Error Has Occured ! {errorMsg}</div>;
	}

	return (
		// this div is for the entire container, both the product-container within, and the button-container.
		<div className='load-more-container'>
			{/* this div is specifically for the product container  */}
			<div className='product-container'>
				{/* our condition is as follows. If products and products.legnth is true, then map out our products array. For each item in products, we will create a div of every individual product with their own key prop id. Within the div we will have an img tag with our item prop of the title and thumbnail, as well the a p tag to display the item image name. */}
				{products && products.length
					? products.map((item) => (
							<div
								className='product'
								key={item.id}
							>
								<img
									src={item.thumbnail}
									alt={item.title}
								/>
								<p>{item.title}</p>
							</div>
						))
					: null}
			</div>
			{/* our button container */}
			<div className='button-container'>
				<button
					// we have our disabled attribute set to our disableBtn state to identify whether the conditions have been met or not. If true, the button will be disabled.
					disabled={disableBtn}
					// we add one to our count everytime the button is clicked. This will allow every item to load appropriately with our orginal condition in the fetch url multiplying by 20.
					// ex. 0 * 20 = 0, 1 * 20  = 20, 2 * 20 = 40, 3 * 20 = 60, 4 * 20 = 80, 5 * 20 = 100
					onClick={() => setCount(count + 1)}
				>
					Load More Products
				</button>
				{/* if disableBtn state is true, then we have reached max products, and must display to the user as such. */}
				{disableBtn ? <p>You have reached 100 products</p> : null}
			</div>
		</div>
	);
}
