import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

interface RegisterAction {
	success: boolean;
	message: string;
	error?: {
		email?: string;
		password?: string;
	};
};

const intitialAction: RegisterAction = {
	success: false,
	message: '',
};


async function handleRegisterAction(prevState: RegisterAction, formData: FormData): Promise<RegisterAction>{
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	await new Promise(resolve => setTimeout(resolve,1500));
	if(password !== null && password.length > 6){
		return {
			success: true,
			message: `User ${email} is registered`,
		};
	}
	if(email !==null && !email.includes('@')){
		return {
			success:false,
			message: 'Error register',
			error:
			{
				email: 'Email is invalid',
			}
		};
	}
	return {
		success: false,
		message: 'Error register',
		error: 
		{
			
			password: 'Password is too short'
		}
	};
};

function HandlePending(){
	const {pending} = useFormStatus();
	return (
		<button 
			className='flex bg-green-700 w-[100px] h-[40px] justify-center items-center text-white uppercase rounded-[5px] hover:bg-green-600 cursor-pointer'
			type="submit" 
			disabled={pending}>
			{pending ? <div className='w-[24px] h-[24px] border-[2px] border-white rounded-[50%] border-y-transparent animate-spin'></div> : <div className='text-white uppercase'>Create</div>}
		</button>
	);
};

function FormActionComponent(){
	const[state, formAction] = useActionState(handleRegisterAction, intitialAction);
	
	return (
		<form 
			className='flex flex-col gap-[10px]'
			action={formAction}>
			{state.message&&(
				<div className={state.success ? 'text-green-500' : 'text-red-500'}>{state.message}</div>
			)}
			<div>
				<label htmlFor="email">Email</label>
				<input 
					className="border-[1px]"
					type="email" 
					name="email" 
					id="email" />
				{state.error?.email &&
				<div className="span text-red-500">{state.error.email}</div>	}
			</div>
			<div>
				<label htmlFor="text">Password</label>
				<input 
					className="border-[1px]"
					type="text" 
					name="password" 
					id="password" />
				{state.error?.password &&
				<div className="span text-red-500">{state.error.password}</div>	}
			</div>
			<HandlePending/>
		</form>
	);
};

export default FormActionComponent;

