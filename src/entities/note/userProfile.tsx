import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdPeopleAlt } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';


const userFormSyle = 'flex flex-col  gap-[30px]  dark:text-white';
const userFormHeader = 'text-[32px] text-[#1976d3] font-[Roboto, sans-serif] font-medium text-center';
const userFormBody = 'flex flex-col w-full items-center gap-[30px] ';
const userFormInputs = 'flex flex-col gap-[10px]';
const userFormInputItem = 'flex flex-col gap-[5px] w-[400px]';
const userFormInputItemField = 'flex  px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:text-gray-400 focus:placeholder-transparent';
const userFormLabel = 'flex items-center text-[16px] text-[#1976d3] font-[Roboto, sans-serif] font-medium capitalize gap-[8px]';
const btnCreate =
	'flex w-fit uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer dark:hover:bg-[#07151e]';

const UserProfileValid = z.object({
	firstName: z.string()
		.min(3,{message: 'First name must have at least 3 symbols'}),
	lastName: z.string()
		.min(3,{message: 'Last name must have at least 3 symbols'}),
	birthDate: z.iso.date('XXXX-XX-XX'),
	email: z.email('wrong email'),
	phone: z.e164('wrong phone number'),
	password: z.string()
		.min(8, {message: 'must have at least 8 symbols'})
		.regex(/[0-9]/, {message: 'must have at least 1 number'})
		.regex(/[A-Z]/, {message: 'must have at least 1 capital letter'})
		.regex(/[a-z]/, {message: 'must have at least 1 lower letter'})
		.regex(/[@$!%*?&]/, {message: 'must have at least 1 symbol'}),
	confirmPassword: z.string()
		.min(8, {message: 'must have at least 8 symbols'})
		.regex(/[0-9]/, {message: 'must have at least 1 number'})
		.regex(/[A-Z]/, {message: 'must have at least 1 capital letter'})
		.regex(/[a-z]/, {message: 'must have at least 1 lower letter'})
		.regex(/[@$!%*?&]/, {message: 'must have at least 1 symbol'})
})
	.refine((data) => data.password === data.confirmPassword,{message: 'password must be the same as confirm password'});

type UserType = z.infer<typeof UserProfileValid>;

const UserProfileForm = ({onClose}: {onClose: ()=> void}) => {
	const{register, handleSubmit, formState: {errors}} = useForm<UserType>({
		resolver: zodResolver(UserProfileValid)
 	});
	function handleData(data: UserType){
		console.log(data);
		onClose();
	}
	return(
		<div 
		 className={userFormSyle}>
			<h1
			 className={userFormHeader}>
				Create User Profile
			</h1>
			<form 
				className={userFormBody}
				onSubmit={handleSubmit(handleData)}>
				<div 
				 className={userFormInputs}>
					<div
						className={userFormInputItem}>
						<label
						 className={userFormLabel}
				 			htmlFor='firstName'>
							<MdPeopleAlt />
							First name
						</label>
						<input
  							className={userFormInputItemField}
  							placeholder='first name'
							id='firstName'
  							{...register('firstName')} 
						/>
						{errors.firstName	&&	<p className='text-red-400 lowercase italic'>{errors.firstName.message}</p>}
					</div>
					<div
						className={userFormInputItem}>
						<label
							className={userFormLabel}
							htmlFor='lastName'>
							<MdPeopleAlt />
							Last name
						</label>
						<input
							className={userFormInputItemField}
							placeholder='last name'
							id='lastName'
							{...register('lastName')} 
						/>
						{errors.lastName && <p className='text-red-400 lowercase italic'>{errors.lastName.message}</p>}
					</div>
					<div
						className={userFormInputItem}>
						<label
							className={userFormLabel}
							htmlFor='birthDate'>
							<FaBirthdayCake 
								className='w-[12px] mb-[2px]'/>
							Birthday
						</label>
						<input
							className={userFormInputItemField}
							placeholder='xxxx-xx-xx'
							id='birthDate'
							{...register('birthDate')} 
						/>
						{errors.birthDate && <p className='text-red-400 lowercase italic'>{errors.birthDate.message}</p>}
					</div>
					<div
						className={userFormInputItem}>
						<label
							className={userFormLabel}
							htmlFor='email'>
							<MdEmail 
								className=' -mb-[2px]'/>
							Email 
						</label>
						<input
							className={userFormInputItemField}
							placeholder='email'
							id='email'
							{...register('email')} 
						/>
						{errors.email && <p className='text-red-400 lowercase italic'>{errors.email.message}</p>}
					</div>
					<div
						className={userFormInputItem}>
						<label
							className={userFormLabel}
							htmlFor='phone'>
							<FaPhoneFlip 
								className='w-[12px] -mb-[2px]'/>
							Phone 
						</label>
						<input
							className={userFormInputItemField}
							placeholder='+380XXXXXXXXX'
							id='phone'
							{...register('phone')} 
						/>
						{errors.phone && <p className='text-red-400 lowercase italic'>{errors.phone.message}</p>}
					</div>
					<div
						className={userFormInputItem}>
						<label
							className={userFormLabel}
							htmlFor='password'>
							<RiLockPasswordFill />
							Password
						</label>
						<input
							className={userFormInputItemField}
							placeholder='password'
							id='password'
							{...register('password')} 
						/>
						{errors.password && <p className='text-red-400 lowercase italic'>{errors.password.message}</p>}
					</div>
					<div
						className={userFormInputItem}>
						<label
							className={userFormLabel}
							htmlFor='confirmPassword'>
							<RiLockPasswordFill />
							Confirm password
						</label>
						<input
							className={userFormInputItemField}
							placeholder='confirm password'
							id='confirmPassword'
							{...register('confirmPassword')} 
						/>
						{errors.confirmPassword && <p className='text-red-400 lowercase italic'>{errors.confirmPassword.message}</p>}
					</div>
				</div>
				
				<button 
					className={btnCreate}
					type='submit'>
					Send
				</button>
			</form>
		</div>
	);
};

export default UserProfileForm;

