import { useForm, useFieldArray } from 'react-hook-form';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// type SocialType = {
// 	nickname: {
// 		brand: 'Instagram' | 'Facebook' | 'Twitter' | null;
// 		value:string}[];
// };

const socialNetworks = z.object({
	nickname: z.array(
		z.object({
			brand: z.enum(['Instagram', 'Facebook', 'Twitter']).nullable(),
			value: z.string().includes('@',{message:'Need to use "@" at start'})
		}))
});

type SocialType = z.infer<typeof socialNetworks>;



const SocialInputs = () => {
	const{register, control, handleSubmit, formState: {errors}} = useForm<SocialType>({
		resolver: zodResolver(socialNetworks)
	}
	);

	function dataSubmit(data: SocialType){
		for(const value of data.nickname){
			if(value.value === '')break;
			console.log( 'brand:',value.brand, 'nickname:', value.value);
		}
		
	};	

	const{append, remove, fields} = useFieldArray({
		control,
		name: 'nickname'
	});

	const hasInstagram = fields.some(item => item.brand === 'Instagram');
	const hasFacebook = fields.some(item => item.brand === 'Facebook');
	const hasTwitter = fields.some(item => item.brand === 'Twitter');

	return (
		<>
			<form 
				onSubmit={handleSubmit(dataSubmit)}
				className='flex flex-col  px-[20px] py-[10px] justify-start'
			>
				<h1
				 className='text-[24px] uppercase'>Registration</h1>
				<div
				 className='flex flex-col gap-[10px] pt-[20px]'>
					{fields.map((field, index) => (
						<div
						 className='flex gap-[2px] text-center items-center  '>
							<div
								className='flex w-[30px] h-[30px] rounded-full bg-white relative cursor-pointer '
								onClick={() =>remove(index)}>
								<div className='flex w-[5px] h-[20px] bg-red-500 absolute rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
								<div className='flex w-[5px] h-[20px] bg-red-500 absolute rotate-135 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
							</div>
							<input 
								className='border-[1px] w-[300px] px-[5px] py-[2px]'
								key={field.id}
								{...register(`nickname.${index}.value`)}
								placeholder={field.brand ? field.brand : 'Type here...'}/>
							{errors.nickname?.[index]?.value?.message && <p className='italic text-red-300 pl-[10px] '>{errors.nickname?.[index]?.value?.message}</p>}
						</div>
						
					))}
					<div
					 className='flex gap-[20px]'>
						<button 
							type='button' 
							onClick={() =>append({brand:'Instagram', value: ''})}
							disabled={hasInstagram}
							className={hasInstagram ? 'opacity-25' : ''}
						>
							<FaInstagram
								className='w-[30px] h-[30px] cursor-pointer hover:opacity-75'/>
						</button>
						<button 
							type='button' 
							onClick={() =>append({brand:'Facebook', value: ''})}
							disabled={hasFacebook}
							className={hasFacebook ? 'opacity-25' : ''}
						>
							<FaFacebook
								className='w-[30px] h-[30px] cursor-pointer hover:opacity-75'/></button>
						<button 
							type='button' 
							onClick={() =>append({brand:'Twitter', value: ''})}
							disabled={hasTwitter}
							className={hasTwitter ? 'opacity-25' : ''}
						>
							<FaTwitter
								className='w-[30px] h-[30px] cursor-pointer hover:opacity-75'/>
						</button>
					</div>
					
				</div>
				
				<button 
					type='submit'
					className='flex bg-green-700 w-fit px-[40px] py-[10px] cursor-pointer rounded-[15px] text-white uppercase mt-[40px]'>
						Send
				</button>
			</form>
		</>
	);
};

export default SocialInputs;

