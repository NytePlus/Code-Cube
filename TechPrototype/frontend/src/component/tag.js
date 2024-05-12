import React from 'react';
import {Chip, Input} from '@mui/material';

const Tag = ({ label/*, index*/}) => {
    return (
        <Chip
            /*key={index}*/
            label={label}
            // variant="outlined"
            size="small"
            style={{
                marginRight: '4px',
                backgroundColor: '#bbdefb', // Bright blue color similar to GitHub blue
                color: "#2196f3",
                fontSize: 15,
                // borderRadius: '16px',  // Rounded corners
                border: 0
            }}
        />
    );
};

export default Tag;
