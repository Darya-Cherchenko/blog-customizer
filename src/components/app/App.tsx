import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</div>
	);
};
