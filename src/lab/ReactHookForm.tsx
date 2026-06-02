import { useForm, useFieldArray } from 'react-hook-form';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

type SocialType = {
	nickname: {
		brand: 'instagram' | 'facebook' | 'twitter' | null;
		value:string}[];
}

const SocialInputs = () => {
	const{register, control, handleSubmit} = useForm<SocialType>({
		defaultValues: {
			nickname: []}
	}
	);

	function dataSubmit(data: SocialType){
		
		for(const value of data.nickname){
			console.log( 'brand:',value.brand, 'nickname:', value.value);
		}
		
	};	

	

	const{append, remove, fields} = useFieldArray({
		control,
		name: 'nickname'
	});

	const hasInstagram = fields.some(item => item.brand === 'instagram');

	return (
		<>
			<form 
				onSubmit={handleSubmit(dataSubmit)}
				className='flex flex-col'
			>
				<h1>Registration</h1>
				<div>
					{fields.map((field, index) => (
						<input 
							className='border-[1px]'
							// placeholder='Type here...'
							key={field.id}
							{...register(`nickname.${index}.value`)}
							placeholder={field.brand ? field.brand : 'Type here...'}/>
					))}
					<div>
						<button 
							type='button' 
							onClick={() =>append({brand:'instagram', value: ''})}
							disabled={hasInstagram}
							
							className={hasInstagram ? 'opacity-25' : ''}
						>
							<FaInstagram
								className='w-[30px] h-[30px] cursor-pointer'/>
						</button>
						<button type='button' onClick={() =>append({brand:'facebook', value: ''})}><FaFacebook/></button>
						<button type='button' onClick={() =>append({brand:'twitter', value: ''})}><FaTwitter/></button>
					</div>
					
				</div>
				
				<button type='submit'>Send</button>
			</form>
		</>
	);
};

export default SocialInputs;

