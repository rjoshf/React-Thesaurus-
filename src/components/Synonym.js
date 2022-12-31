import React from 'react';

import classes from './Synonym.module.css';

const Synonym = (props) => {
	return (
		<li className={classes.synonym}>
			<h2>{props.word}</h2>
		</li>
	);
};

export default Synonym;
