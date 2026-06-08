function FormActionComponent(){
	function handleAction(formData: FormData){
		const email = formData.get('email');
		const password = formData.get('password');
		console.log(email, password);
	}
	return (
		<form action={handleAction}>
			<div>
				<label htmlFor="email">Email</label>
				<input 
					className="border-[1px]"
					type="email" 
					name="email" 
					id="email" />
			</div>
			<div>
				<label htmlFor="text">Password</label>
				<input 
					className="border-[1px]"
					type="text" 
					name="password" 
					id="password" />
			</div>
			<button type="submit">Send</button>
		</form>
	);
};

export default FormActionComponent;

