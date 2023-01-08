import React, { useState, useEffect, useCallback } from 'react';
import ThesaurusForm from './ThesaurusForm';
import SynonymList from './SynonymList';
import Card from './UI/Card';
import ErrorModal from './UI/ErrorModal';
import { motion } from 'framer-motion';

import classes from './SynonymFetcher.module.css';

const options = {
	method: 'GET',
	headers: {
		'X-API-Key': '40OtxpIYJV9PuB2zOwXOPA==Fxn4OAE1a2cjOAPS'
	}
};

const SynonymFetcher = () => {
	const [ synonyms, setSynonyms ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ inputWord, setInputWord ] = useState('');
	const [ error, setError ] = useState(null);
	const [ firstInput, setFirstInput ] = useState(true);

	const searchWordHandler = useCallback(
		async (enteredWord) => {
			if (enteredWord === '') {
				setError({
					title: 'Invalid Input',
					message: 'Please enter a word!'
				});
				return;
			}

			if (/^[a-zA-Z]+$/.test(enteredWord) === false) {
				setError({
					title: 'Invalid Input',
					message: 'Please only enter letters in the input!'
				});
				return;
			}

			if (enteredWord.toLowerCase() === inputWord.toLowerCase()) {
				return;
			}

			setError(null);
			setIsLoading(true);
			setInputWord(enteredWord);

			try {
				const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${enteredWord}`, options);
				if (!response.ok) {
					throw new Error('Perhaps the API is down! Please try again later.');
				}
				const data = await response.json();
				const synonymsArray = data.synonyms.map((element) => {
					const capLetter = element.charAt(0).toUpperCase() + element.slice(1);
					return capLetter.replaceAll('_', ' ');
				});

				const loadedSynonyms = [];

				for (let i = 0; i < synonymsArray.length; i++) {
					if (synonymsArray[i].toLowerCase() !== enteredWord.toLowerCase()) {
						loadedSynonyms.push(synonymsArray[i]);
					}
				}

				setSynonyms(loadedSynonyms);
				setIsLoading(false);
			} catch (error) {
				setError({
					title: 'Something went wrong!',
					message: error.message
				});
			}
		},
		[ inputWord ]
	);

	useEffect(
		() => {
			if (firstInput) {
				searchWordHandler('However');
				setFirstInput(false);
			}
		},
		[ searchWordHandler, firstInput ]
	);

	let content;

	if (synonyms.length === 0) {
		content = <Card className={classes.transitionCard}>{`No synonyms were found for "${inputWord}".`}</Card>;
	}

	if (synonyms.length > 0) {
		content = <SynonymList synonyms={synonyms} />;
	}

	if (isLoading) {
		content = <Card className={classes.transitionCard}>Loading...</Card>;
	}

	const errorHandler = () => {
		setError(null);
	};

	return (
		<React.Fragment>
			{error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
			<section>
				<ThesaurusForm onSearchWord={searchWordHandler} />
			</section>
			<motion.section animate={{ y: isLoading ? 20 : 0 }} transition={{ type: 'tween' }}>
				{content}
			</motion.section>
		</React.Fragment>
	);
};

export default SynonymFetcher;
