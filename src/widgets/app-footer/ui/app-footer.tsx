import styles from './app-footer.module.scss';
import news from '../../../../assets/news.png';

import { memo } from 'react';

export const AppFooter = memo(function Footer() {
	return (
		<footer className={styles.footer}>
			<nav className={styles.footerNav}>
				<ul className={styles.footerList}>
					<li>Log In</li>
					<li>About Us</li>
					<li>Publishers</li>
					<li>Sitemap</li>
				</ul>
			</nav>
			<div className={styles.footerPowered}>
				<p>Powered by</p>
				<img className={styles.footerImg} src={news} alt="Логотип" />
			</div>

			<p>© 2023 Besider. Inspired by Insider</p>
		</footer>
	);
});
