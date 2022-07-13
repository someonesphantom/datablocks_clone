import Typography from '@mui/material/Typography'
import {React,memo} from 'react';
const ButtonsForDialog = memo(props => {
    
    return(
        <div  style={{textAlign:"left"}}>
                      <Typography variant="h8" color="white" sx={{fontWeight:"bold"}} >
                        {props.name}
                      </Typography>

                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        {props.desc}
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Input: {props.input}
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Output: {props.output}
                      </Typography>
                    </div>

    );
});

export default ButtonsForDialog