import * as React from 'react';

import { cn } from '@/lib/utils';
import moment from 'moment';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { FormControl } from './form';
import { Button, ButtonProps } from './button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './calendar';

interface Props extends Omit<ButtonProps, 'value' | 'onChange'> {
	value: Date;
	onChange: (value: Date) => void;
}

const InputDate = React.forwardRef<HTMLButtonElement, Props>(({ className, value, onChange, ...props }, ref) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant='outline'
						className={cn(
							'w-[240px] pl-3 text-left font-normal',
							!value && 'text-primary-subtle',
							className,
						)}
						{...props}
						ref={ref}>
						{value ? moment(value).format('LL') : <span>Pick a date</span>}
						<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					captionLayout='dropdown'
					selected={value}
					onSelect={onChange}
					disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
					required
				/>
			</PopoverContent>
		</Popover>
	);
});
InputDate.displayName = 'InputDate';

export { InputDate };
