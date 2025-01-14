import { cn } from '@/lib/utils';
import React from 'react';

interface PageSectionProps {
	className?: string;
	title: string;
	headerRight?: React.ReactNode;
	children?: React.ReactNode;
}

export const PageSection: React.FC<PageSectionProps> = ({
	className,
	title,
	headerRight,
	children,
	...rest
}) => {
	return (
		<div className={cn('flex flex-col border rounded', className)} {...rest}>
			<div className="flex items-center justify-between p-4 border-b">
				<h5>{title}</h5>
				{headerRight}
			</div>
			{children}
		</div>
	);
};
