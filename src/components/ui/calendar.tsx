'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import 'react-day-picker/style.css';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, showOutsideDays = true, ...props }: CalendarProps) {
	return <DayPicker className={cn('bg-body-bg p-3', className)} showOutsideDays={showOutsideDays} {...props} />;
}
Calendar.displayName = 'Calendar';

export { Calendar };
