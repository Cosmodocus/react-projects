import { useState } from 'react';
import QRCode from 'react-qr-code';
import './styles.css';

export default function QRCodeGenerator() {
	const [qrCode, setQrCode] = useState('');
	// our state for the qrCode itself
	const [input, setInput] = useState('');
	// our state for the value of the input within the input box

	// we create this function to handle generating a new code after every click of the button
	function handleGenerateQrCode() {
		// our qrCode will be set by the input state variable
		setQrCode(input);
		// we set our input setter function as an empty string because we want the input empty after we submit out input
		setInput('');
	}

	return (
		<div>
			<h1>QR Code Generator </h1>
			<div>
				<input
					// our onchange has an e parameter of our setInput setter function. Our input box will change the value of the input setter function.
					onChange={(e) => setInput(e.target.value)}
					type='text'
					name='qr-code'
					placeholder='Enter your value here'
					// our value will be our input state value
					value={input}
				/>
				<button
					// if our input AND our input with whitespace, trailing, etc is not equal to an empty input, then disabled attribute is false. Otherwise, true. True disables the button.
					disabled={input && input.trim() !== '' ? false : true}
					// onClick to generate the qr code.
					onClick={handleGenerateQrCode}
				>
					Generate
				</button>
			</div>
			<div>
				{/* our actual qrcode that we installed using npm i react-qr-code */}
				<QRCode
					id='qr-code-value'
					// the value is going to take in our qrCode state variable
					value={qrCode}
					size={400}
					bgColor='#fff'
				/>
			</div>
		</div>
	);
}
