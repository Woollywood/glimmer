'use client';

import React from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Delete, Edit, Ellipsis } from 'lucide-react';
import { isNil } from 'lodash-es';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { observer } from 'mobx-react-lite';
import { store } from './store';

export interface Props<F extends FieldValues, N extends Path<F>> {
	control: Control<F>;
	name: N;
	field: F[N];
	title?: string;
	fallback: React.ReactNode;
	renderDisplay: React.ReactNode;
	renderEdit: (formField: ControllerRenderProps<F, N>, onEndEditing: () => void) => React.ReactNode;
	onDelete: (field: N) => void;
}

export const Field = observer(
	<F extends FieldValues, N extends Path<F>>({
		control,
		name,
		field,
		title,
		fallback,
		renderDisplay: display,
		renderEdit: edit,
		onDelete,
	}: Props<F, N>) => {
		const isAdding = store._addingFields.find((f) => f === name);
		const isEditing = store._editingFields.find((f) => f === name);

		if (isNil(field) && !isAdding) {
			return (
				<Button
					className='h-full w-full cursor-pointer'
					type='button'
					variant='outline'
					onClick={() => store._addingFields.push(name)}>
					{fallback}
				</Button>
			);
		}

		const onEndEditing = () => store.resetFields();
		const handleDelete = (name: N) => {
			store.resetField(name);
			onDelete(name);
		};

		const hasTitle = !!title;
		return (
			<Card className={cn({ 'relative pr-16': !hasTitle })}>
				{hasTitle ? (
					<CardHeader className='relative space-y-0 pr-16'>
						<CardTitle>{title}</CardTitle>
						<DropdownMenu>
							<DropdownMenuTrigger className='absolute right-4 top-4'>
								<Ellipsis />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => store.addAddingField(name)}>
									<Edit />
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleDelete(name)}>
									<Delete />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardHeader>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger className='absolute right-4 top-4'>
							<Ellipsis />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => store.addAddingField(name)}>
								<Edit />
								<span>Edit</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleDelete(name)}>
								<Delete />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				<CardContent>
					{isEditing || isAdding ? (
						<FormField
							control={control}
							name={name}
							render={({ field }) => (
								<FormItem>
									<FormControl>{edit(field, onEndEditing)}</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						display
					)}
				</CardContent>
			</Card>
		);
	},
);
