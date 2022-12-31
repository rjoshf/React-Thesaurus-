import React from 'react';
import Synonym from './Synonym';
import Card from './UI/Card';

import classes from './SynonymList.module.css';

const SynonymList = (props) => {
	return (
		<Card className={classes['synonym-list']} style={props.style}>
			{props.children}
			<ul>{props.synonyms.map((synonym, index) => <Synonym word={synonym} key={index} />)}</ul>
		</Card>
	);
};

export default SynonymList;
