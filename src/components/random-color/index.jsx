import { useEffect, useState } from 'react';

export default function RandomColor() {
	// We need two state variables. One to check the type of color, whether it is hex or rgb. Our default with be hex
	// The second state will be to store the current color. Our default will be the hexadecimal number for black.
	const [typeOfColor, setTypeOfColor] = useState('hex');
	const [color, setColor] = useState('#000000');

	function randomColorUtility(length) {
		// This function will give us the random colour
		return Math.floor(Math.random() * length);
		// we want to round the number that we randomize times the length parameter. It will only return 6 digits, because we establish that the loop will stop when i=6.
	}

	function handleCreateRandomHexColor() {
		// to create our hex color, we must use the logic of a # followed by 6 digits.

		// we create a hex varaible with an array that consists of every unit within a hexadecimal number(0-9 and A-F)
		const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
		// a variable for the hastag. We will add the 6 digit units with this varaible
		let hexColor = '#';

		// We say i<6 because there will only be 6. We don't want more.
		for (let i = 0; i < 6; i++) {
			hexColor += hex[randomColorUtility(hex.length)];
			// our # that indicates it's a hexadecimal, += our hex array with the function of randomizing our units that has a property of our hex array length.
		}

		// set our color data storage with the current hexColor
		setColor(hexColor);
	}

	function handleCreateRandomRgbColor() {
		// define each rgb, and multiply the random number by 256 because that's the max each rgb unit goes to. So for each rgb unit, we will get a random number from 0-256.
		const r = randomColorUtility(256);
		const g = randomColorUtility(256);
		const b = randomColorUtility(256);

		// using template literals, we pass into our setColor function the rgb values of r, g, and b.
		setColor(`rgb(${r},${g},${b})`);
	}

	// When we switch between the rgb button and hex button without generating a random colour, the text changes, but not the value. So we create this useEffect hook to handle this. Our depedency is the typeOfColor, so whenever it gets mounted between rgb or hex, our if/else condition will run. A side effect of our typeOfColor state mounting on or off.
	useEffect(() => {
		if (typeOfColor === 'rgb') {
			// if the typeOfColor selected is rgb, run the handleCreateRandomRgbColor function. Else, run the hex function.
			handleCreateRandomRgbColor();
		} else {
			handleCreateRandomHexColor();
		}
	}, [typeOfColor]);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				background: color,
				// within the style attribute, we clarify that our background will be the color that we have stored.
			}}
		>
			{/* we set both our hex and rgb buttons within the set function of their respective values. */}
			<button onClick={() => setTypeOfColor('hex')}>Create HEX Color</button>
			<button onClick={() => setTypeOfColor('rgb')}>Create RGB Color</button>
			<button
				onClick={
					// if typeofcolor value is hex, run the hex handle function, otherwise it must be rgb, so run the handle rgb color
					typeOfColor === 'hex'
						? handleCreateRandomHexColor
						: handleCreateRandomRgbColor
				}
			>
				Generate Random Color
			</button>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					fontSize: '60px',
					marginTop: '50px',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				{/* here we display the current type of color(hex/rgb) as well as the color value units(hexadecimal or rgb values) */}
				<h3>
					{/* render a condition based on the button selected */}
					{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}
				</h3>
				<h1>{color}</h1>
			</div>
		</div>
	);
}
