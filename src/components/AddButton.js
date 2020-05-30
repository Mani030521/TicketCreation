import React, { Fragment } from 'react';

const AddButton = ({ onSubmit }) => {
	return (
		<Fragment>
			<button onClick={onSubmit} className='AddButton'>Add +</button>
		</Fragment>
	);
};

export default AddButton;
