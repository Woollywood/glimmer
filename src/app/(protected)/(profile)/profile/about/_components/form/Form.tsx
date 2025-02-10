'use client';

import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { isEqual } from 'lodash-es';
import { Field } from './Field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { UpdateDto } from '@/profile/dto';
import { update } from '@/profile/actions';
import { Input } from '@/components/ui/input';
import { Profile, Status } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputDate } from '@/components/ui/inputDate';
import { useFormProfileAbout } from '@/hooks/forms/profile/useFormProfileAbout';
import { store } from './store';
import { useTransition } from 'react';
import { getProfile } from '@/profile/data';

interface Props extends Omit<Profile, 'userId'> {
	id: string;
}

const statuses: Status[] = ['SINGLE', 'MARRIED'];

export const PageForm: React.FC<Props> = observer(({ id, ...defaultValues }) => {
	const form = useFormProfileAbout(defaultValues);
	const { watch, setValue, getValues } = form;
	const { born, education, livesIn, overview, rank, status, workplace } = getValues();
	watch(Object.keys(defaultValues) as unknown as keyof UpdateDto);
	const hasChanges = !isEqual(defaultValues, getValues());

	const [isPending, startTransition] = useTransition();
	const onSubmit = async (values: UpdateDto) => {
		startTransition(async () => {
			await update(id, values);
			await getProfile();
			store.resetFields();
		});
	};

	const handleDelete = (field: keyof UpdateDto) => {
		setValue(field, null);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<Field
					control={form.control}
					name='overview'
					field={overview}
					title='Overview'
					fallback={<p>Add overview</p>}
					renderDisplay={<p>{overview}</p>}
					renderEdit={(formField, onEndEditing) => (
						<Textarea
							{...formField}
							value={formField.value || ''}
							onKeyDown={(e) => e.code === 'Enter' && onEndEditing()}
						/>
					)}
					onDelete={handleDelete}
				/>
				<div className='grid grid-cols-2 gap-4'>
					<Field
						control={form.control}
						name='born'
						field={born}
						fallback={<p>Add born</p>}
						renderDisplay={<p>Born: {moment(born).format('LL')}</p>}
						renderEdit={(formField) => (
							<InputDate className='w-full' {...formField} value={formField.value || new Date()} />
						)}
						onDelete={handleDelete}
					/>
					<Field
						control={form.control}
						name='status'
						field={status}
						fallback={<p>Add Status</p>}
						renderDisplay={<p>Status: {status}</p>}
						renderEdit={(formField) => (
							<Select onValueChange={formField.onChange} value={formField.value || undefined}>
								<SelectTrigger>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									{statuses.map((item) => (
										<SelectItem key={item} value={item}>
											{item}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						onDelete={handleDelete}
					/>
					<Field
						control={form.control}
						name='rank'
						field={rank}
						fallback={<p>Add rank</p>}
						renderDisplay={<p>{rank}</p>}
						renderEdit={(formField, onEndEditing) => (
							<Input
								{...formField}
								value={formField.value || ''}
								onKeyDown={(e) => e.code === 'Enter' && onEndEditing()}
							/>
						)}
						onDelete={handleDelete}
					/>
					<Field
						control={form.control}
						name='livesIn'
						field={livesIn}
						fallback={<p>Add lives in</p>}
						renderDisplay={<p>Lives in: {livesIn}</p>}
						renderEdit={(formField, onEndEditing) => (
							<Input
								{...formField}
								value={formField.value || ''}
								onKeyDown={(e) => e.code === 'Enter' && onEndEditing()}
							/>
						)}
						onDelete={handleDelete}
					/>
					<Field
						control={form.control}
						name='workplace'
						field={workplace}
						fallback={<p>Add workplace</p>}
						renderDisplay={<p>Workplace: {workplace}</p>}
						renderEdit={(formField, onEndEditing) => (
							<Input
								{...formField}
								value={formField.value || ''}
								onKeyDown={(e) => e.code === 'Enter' && onEndEditing()}
							/>
						)}
						onDelete={handleDelete}
					/>
					<Field
						control={form.control}
						name='education'
						field={education}
						fallback={<p>Add education</p>}
						renderDisplay={<p>Education: {education}</p>}
						renderEdit={(formField, onEndEditing) => (
							<Input
								{...formField}
								value={formField.value || ''}
								onKeyDown={(e) => e.code === 'Enter' && onEndEditing()}
							/>
						)}
						onDelete={handleDelete}
					/>
				</div>
				{hasChanges && (
					<div className='flex justify-end pt-8'>
						<Button disabled={isPending}>Save</Button>
					</div>
				)}
			</form>
		</Form>
	);
});
