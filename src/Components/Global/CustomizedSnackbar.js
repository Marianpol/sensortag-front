import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const CustomizedSnackbar = ({
    snackbarState: {
        isOpen,
        text,
        type,
    },
        handleSnackbarClose
    }) => {
        console.log(isOpen, text, type)

    return (
        <Snackbar
            open={isOpen}
            onClose={handleSnackbarClose}
            autoHideDuration={5000}
            anchorOrigin={{
                vertical:'bottom',
                horizontal:'center'
                }}
            >
            <Alert 
                severity={type}
                elevation={6}
                variant='filled'
            >
                {text}
            </Alert>
        </Snackbar>
    )
}

export default CustomizedSnackbar;