import { updateDto, UpdateDto } from '@/profile/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useFormProfileAbout = (defaultValues: UpdateDto) => {
	return useForm<UpdateDto>({
		defaultValues,
		resolver: zodResolver(updateDto),
		mode: 'onTouched',
	});
};
