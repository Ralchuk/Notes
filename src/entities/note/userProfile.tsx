import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Message, Password } from '@mui/icons-material';

//  - first name (min 3 char)
//  - last name (min 3 char)
//  - birth date (valid date)
//  - email (valid email)
//  - phone (valid phone number)
//  - password (min 8 char, min 1 number, min 1 capital letter, min 1 lower letter, min 1 symbol)
//  - confirm password (must be equal to password)

const UserProfileValid = z.object({
	firstName: z.string()
		.min(3,{message: 'First name must have at least 3 symbols'}),
	lastName: z.string()
		.min(3,{message: 'Last name must have at least 3 symbols'}),
	birthDate: z.object({
		day: z.string()
			.min(1,{message: 'select day'}),
		month: z.enum(['jenuary', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']),
		year: z.string()
			.length(4,{message: 'secelt year'})
	}),
	email: z.email('wrong email'),
	phone: z.e164(),
	password: z.string()
		.min(8, {message: 'must have at least 8 symbols'})
		.regex(/[0-9]/, {message: 'must have at least 1 number'})
		.regex(/[A-Z]/, {message: 'must have at least 1 capital letter'})
		.regex(/[a-z]/, {message: 'must have at least 1 lower letter'})
		.regex(/[@$!%*?&]/, {message: 'must have at least 1 symbol'})
});

const UserProfileForm = () => {

};
