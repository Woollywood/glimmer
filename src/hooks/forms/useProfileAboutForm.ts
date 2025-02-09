import { updateDto, UpdateDto } from '@/actions/profile/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useProfileAboutForm = (defaultValues: UpdateDto) => {
	return useForm<UpdateDto>({
		defaultValues,
		resolver: zodResolver(updateDto),
		mode: 'onTouched',
	});
};
