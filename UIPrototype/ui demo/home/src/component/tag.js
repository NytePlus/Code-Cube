import React from 'react';
import { Chip } from '@mui/material';

const Tag = ({ label/*, index*/ }) => {
    return (
        <Chip
            /*key={index}*/
            label={label}
            variant="outlined"
            size="small"
            style={{
                marginRight: '4px',
                backgroundColor: '#007FFF', // Bright blue color similar to GitHub blue
                color: 'white',
                borderRadius: '16px'  // Rounded corners
            }}
        />
    );
};

export default Tag;
