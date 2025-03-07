import styles from './app-header.module.scss';
import burgerIcon from '../../../../assets/burgerIcon.svg';
import closeIcon from '../../../../assets/closeIcon.svg';
import { memo, useState } from 'react';

export const AppHeader = memo(function Header() {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>BESIDER</h1>
			<button className={styles.button} onClick={toggleMenu}>
				<img className={styles.buttonIcon} src={burgerIcon} alt="menu" />
			</button>
			<Menu isOpen={isMenuOpen} onClose={toggleMenu} />
		</header>
	);
});

const Menu = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	return (
		<div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
			<button className={styles.closeButton} onClick={onClose}>
				<img className={styles.buttonIcon} src={closeIcon} alt="closeButton" />
			</button>
			<ul>
				<li>SCIENCE</li>
				<li>GENERAL</li>
				<li>ENTERTAINMENT</li>
				<li>TECHNOLOGY</li>
				<li>BUSINESS</li>
				<li>HEALTH</li>
				<li>SPORTS</li>
			</ul>
		</div>
	);
};
