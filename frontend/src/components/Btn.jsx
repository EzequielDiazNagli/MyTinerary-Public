import React from "react"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Btn () {
    return (
        <div>
            <Button variant="contained" startIcon={<ArrowBackIcon />} className="btn-backToCities">
                Back to Cities
            </Button>
        </div>
    )
}

export default Btn