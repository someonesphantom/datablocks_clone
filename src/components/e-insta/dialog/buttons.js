import Typography from '@mui/material/Typography'
import { React, memo } from 'react';
import './dialog.scss'
const ButtonsForDialog = memo(props => {

  return (
    <div className='boxLeft'>
      <Typography variant="h8" color="white" className='fontBold' >
        {props.name}
      </Typography>

      <Typography className='typographystyles' color="gray" gutterBottom>
        {props.desc}
      </Typography>
      <Typography className='typographystyles' color="gray" gutterBottom>
        Input: {props.input}
      </Typography>
      <Typography className='typographystyles' color="gray" gutterBottom>
        Output: {props.output}
      </Typography>
    </div>

  );
});

export default ButtonsForDialog