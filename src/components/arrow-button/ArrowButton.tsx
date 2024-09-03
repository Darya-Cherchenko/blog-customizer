import clsx from 'clsx';

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
interface OnClick {
	onClick?: (state: boolean) => void;
	menuOpen?: boolean;
}

export const ArrowButton = ({ onClick, menuOpen }: OnClick) => {
	const onClickHandler = () => {
		onClick?.(!menuOpen);
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, menuOpen && styles.container_open)}
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				onClickHandler();
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, menuOpen && styles.arrow_open)}
			/>
		</div>
	);
};
