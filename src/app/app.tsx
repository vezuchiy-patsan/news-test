import '@/app/styles/index.scss';
import '@/index.css';

import { Suspense } from 'react';
import cn from 'classnames';

import { AppRouter } from '@/app/providers/router';
import { AppErrorBoundary } from '@/widgets/app-error-boundary';
import { AppHeader } from '@/widgets/app-header';
import { AppFooter } from '@/widgets/app-footer';

export function App() {
	return (
		<div className={cn('app')}>
			<Suspense fallback="">
				<AppErrorBoundary>
					<AppHeader />

					<AppRouter />

					<AppFooter />
				</AppErrorBoundary>
			</Suspense>
		</div>
	);
}
