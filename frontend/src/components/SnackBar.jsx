//importo de librerias externas
import React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import '../style/style.css'
import {useDispatch, useSelector} from 'react-redux'
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar() {
    const [state] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal} = state;


    const dispatch = useDispatch()
    const snack = useSelector(store => store.userReducer.snackbar)
    // console.log(snack)

    const handleClose = () => {
        dispatch({
            type: 'message',
            payload: {view: false, message: '', success: false}
        })
    }

    const messagge = (
        <Box>
            {(typeof snack.message) === "string" ?
            (<p>{snack.message}</p>) :
            <div>{snack.message.map((message,index) =><p key={index}>{message.message}</p>)}</div>
            }
        </Box>
    )

    return (
        <>
        {(snack.success) ?
            <Stack spacing={2} sx={{ width: '100%'}}>
                <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snack.view}
                autoHideDuration={4000}
                onClose={handleClose}
                message={
                    <Alert onClick={handleClose} severity="success" sx={{ width: '100%' }}>
                        {messagge}
                    </Alert>
                }
                />
            </Stack>
            :
            <Stack spacing={2} sx={{ width: '100%'}}>
                <Snackbar
                sx={{}}
                anchorOrigin={{ vertical, horizontal }}
                open={snack.view}
                autoHideDuration={4000}
                onClose={handleClose}
                message={
                    <Alert onClick={handleClose} severity="warning" sx={{ width: '100%' }}>
                        {messagge}
                    </Alert>
                }
                />
            </Stack>
        }
        </>
    )
}

export default SnackBar