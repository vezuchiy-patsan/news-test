import { memo } from 'react';

import styles from './home.module.scss';
import { NewsList } from '@/widgets/news-list';

function MainSearchPage() {
	return (
		<div className={styles.pageWrapper}>
			<NewsList />
		</div>
	);
}

export default memo(MainSearchPage);
