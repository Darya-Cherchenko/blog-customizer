import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

interface IArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: IArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});
	const menuRef = useRef<HTMLFormElement | null>(null);

	function toggleOpenForm(bool?: boolean): void {
		if (bool !== undefined) setIsMenuOpen(bool);
		else setIsMenuOpen(!isMenuOpen);
	}

	function reloadState() {
		setFormState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		setArticleState(defaultArticleState);
	}

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setArticleState({
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});

		setIsMenuOpen(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const element = event.target as HTMLElement;
			if (menuRef.current && !menuRef.current.contains(element)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<>
			<ArrowButton onClick={() => toggleOpenForm()} menuOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={menuRef}>
				<form
					className={styles.form}
					ref={menuRef}
					onSubmit={formSubmitHandler}
					onReset={reloadState}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectOption) => {
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectOption,
							}));
						}}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						selected={formState.fontSize}
						options={fontSizeOptions}
						onChange={(selectOption) => {
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectOption,
							}));
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selectOption) => {
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectOption,
							}));
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selectOption) => {
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectOption,
							}));
						}}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selectOption) => {
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectOption,
							}));
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
