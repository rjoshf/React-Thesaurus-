import React, { useRef } from 'react';

import Card from './UI/Card';
import Button from './UI/Button';

import classes from './ThesaurusForm.module.css';

const ThesaurusForm = (props) => {
	const wordInputRef = useRef();

	const wordSearchHandler = (event) => {
		event.preventDefault();

		const enteredWord = wordInputRef.current.value.replace(/\s+/g, '');

		console.log(enteredWord);

		props.onSearchWord(enteredWord);
	};

	return (
		<Card className={classes.input}>
			<form onSubmit={wordSearchHandler}>
				<label htmlFor="enteredWord">Lookup synonyms for the word...</label>
				<input
					id="enteredWord"
					type="text"
					placeholder="Enter a word..."
					ref={wordInputRef}
					defaultValue="However"
				/>
				<Button type="submit" className={classes['submit-button']}>
					Search
				</Button>
			</form>
		</Card>
	);
};

export default ThesaurusForm;
