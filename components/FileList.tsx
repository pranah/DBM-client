import { Grid, IconButton } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

import DeleteIcon from '@mui/icons-material/Delete';

export const FileList = ({ fileName, onDeleteClick }) => {
    return (
        <>
            <Grid container justifyContent='space-between`' alignItems="center">
                <Grid item>
                    <p>{fileName}</p>
                </Grid>
                {/* <Grid item>
                    <IconButton onClick={onDeleteClick} component="span">
                        <DeleteIcon />
                    </IconButton>
                </Grid> */}
            </Grid>
        </>
    )
}

FileList.defaultProps = {
    fileName: '',
    onDeleteClick: () => null
}

FileList.propTypes = {
    fileName: PropTypes.string,
    onDeleteClick: PropTypes.func,

}
