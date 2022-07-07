import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import InputIcon from '@mui/icons-material/Input';
import Typography from '@mui/material/Typography'
import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

const DialogButton= React.memo(props => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
      };
    
      const handleClose = () => {
        
        setOpen(false);

        };

    return(
        <>
            <Button fontColor="white"
            onClick={handleClickOpen('paper')}
            style={{
              color:"white",
              border: '1px solid',borderColor: '#4C497E',borderRadius:"20px",
              
          
          }}
          >+ block</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            fullWidth
            maxWidth="md"
          >

            <DialogContent dividers={scroll === 'paper'} sx={{ backgroundColor: "#222138" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant="h5" color="white" sx={{ mb: 1.5, fontSize: "20px", fontFamily:"sans-serif" }}>
                Block Library
                  </Typography>
                  <Button 
                  onClick={() => scrollTo('#input')}
                    startIcon={<InputIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" , fontFamily:"sans-serif"}}>
                    INPUT
                  </Typography>
                  </Button>
                  <Button
                  onClick={() => scrollTo('#transform')}
                    startIcon={<ConstructionOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontFamily:"sans-serif" }}>
                    TRANSFORM
                  </Typography>
                  </Button>
                  <Button
                  onClick={() => scrollTo('#geodata')}
                    startIcon={<LocationOnOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" , fontFamily:"sans-serif"}}>
                    GEO DATA
                  </Typography>
                  </Button>
                  <Button
                  onClick={() => scrollTo('#vis')}
                    startIcon={<InsertChartOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontFamily:"sans-serif" }}>
                    VISUALIZATION
                  </Typography>
                  </Button>
                  <Button
                  onClick={() => scrollTo('#misc')}
                    startIcon={<MoreHorizOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" }}>
                    MISC
                  </Typography>
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <div id="input" style={{ fontFamily:"sans-serif"}}>
                  <Typography variant="h7" color="white" >
                    INPUT
                  </Typography>
                  <br></br>
                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={(event)=>{props.addINode(); handleClose()} }>
                    <div>
                      <Typography variant="h8" color="white" >
                        File
                      </Typography>

                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Handles csv, json, geojson or topjson files.
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Input: -
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Output: Dataset, Geojson
                      </Typography>
                    </div>


                  </Button>
                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={(event)=>{props.addINode(); handleClose()} }>

                    <div>
                      <Typography variant="h8" color="white" >
                        Paste
                      </Typography>

                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Paste input: string, number, csv, json, geojson or topjson
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Input: -
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Output: Dataset, Object, String, Number, Geojson
                      </Typography>
                    </div>
                  </Button>

                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={(event)=>{props.addINode(); handleClose()}  }>

                    <div>
                      <Typography variant="h8" color="white" >
                        HTTP Request
                      </Typography>

                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                      Loads data via a http request.
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Input: -
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Output: Dataset, Object, Geojson
                      </Typography>
                    </div>
                  </Button>

                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={(event)=>{props.addINode(); handleClose()} }>

                    <div>
                      <Typography variant="h8" color="white" >
                        Sheets
                      </Typography>

                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                      Loads data from google sheets.
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Input: -
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Output: Dataset
                      </Typography>
                    </div>
                  </Button>

                  <Button size="large" style={{ margin: "5px"}} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={(event)=>{props.addINode(); handleClose()} }>

                    <div>
                      <Typography variant="h8" color="white" >
                        Example Data
                      </Typography>

                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                      Some example data for playing around with data blocks.
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Input: -
                      </Typography>
                      <Typography sx={{ mb: 1.5, fontSize: "9px" }} color="gray" gutterBottom>
                        Output: Dataset, Geojson
                      </Typography>
                    </div>
                  </Button>
                  </div>
                  <br></br>
                  <div id="transform" style={{ fontFamily:"sans-serif"}}>
                  <Typography variant="h7" color="white" >
                  TRANSFORM
                  </Typography>
                  </div>
                  
                  <br></br>
                  <div id="geodata" style={{ fontFamily:"sans-serif"}}>
                  <Typography variant="h7" color="white" >
                  GEO DATA
                  </Typography>
                  </div>
                  
                  <br></br>

                  <div id="vis" style={{ fontFamily:"sans-serif"}}>
                  <Typography variant="h7" color="white" >
                  VISUALIZATION
                  </Typography>
                  </div>

                  <br></br>

                  <div id="misc" style={{ fontFamily:"sans-serif"}}>
                  <Typography variant="h7" color="white" >
                  MISC
                  </Typography>
                  </div>
                  
                  <br></br>
                </Grid>

              </Grid>

            </DialogContent>

          </Dialog>
        </>
    );
});

export default DialogButton;