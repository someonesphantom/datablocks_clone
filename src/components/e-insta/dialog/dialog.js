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
import ButtonsForDialog from './buttons';
import './dialog.scss'

const DialogButton = React.memo(props => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {

    setOpen(false);

  };

  return (
    <>
      <Button fontColor="white"
        onClick={handleClickOpen('paper')}
        className='forbuttons'
      >+ block</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth
        maxWidth="md"
      >

        <DialogContent dividers={scroll === 'paper'} className='darkcolor'>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="h5" color="white" className='leftbartitle'>
                Block Library
              </Typography>
              <Button
                onClick={() => scrollTo('#input')}
                startIcon={<InputIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" className='leftbar'>
                  INPUT
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#output')}
                startIcon={<InputIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" className='leftbar'>
                  OUTPUT
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#transform')}
                startIcon={<ConstructionOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" className='leftbar'>
                  TRANSFORM
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#geodata')}
                startIcon={<LocationOnOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" className='leftbar'>
                  GEO DATA
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#vis')}
                startIcon={<InsertChartOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" className='leftbar'>
                  VISUALIZATION
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#misc')}
                startIcon={<MoreHorizOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" className='leftbar'>
                  MISC
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={10}>
              <div id="input" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  INPUT
                </Typography>
                <br></br>
                <div>
                  {props.dialogdata.Inputdata.map((input, i) =>
                    <Button size="large" key={i} style={{ margin: "5px" }} className='rightbar' onClick={(event) => { props.addNodes(input.callingnode); handleClose() }}>
                      <ButtonsForDialog
                        name={input.name}
                        desc={input.desc}
                        input={input.input}
                        output={input.output} />
                    </Button>
                  )
                  }
                </div>

              </div>
              <br></br>
              <div id="output" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  OUTPUT
                </Typography>
                <br></br>
                <div>
                  {props.dialogdata.Outputdata.map((input, i) =>

                    <Button size="large" key={i} style={{ margin: "5px" }} className='rightbar' onClick={(event) => { props.addNodes(input.callingnode); handleClose() }}>
                      <ButtonsForDialog
                        name={input.name}
                        desc={input.desc}
                        input={input.input}
                        output={input.output} />
                    </Button>
                  )
                  }
                </div>

              </div>
              <br></br>
              <div id="transform" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  TRANSFORM
                </Typography><br></br>
                <div>
                  {props.dialogdata.Transform.map((input, i) =>
                    <Button size="large" key={i} style={{ margin: "5px" }} className='rightbar' onClick={(event) => { props.addNodes(input.callingnode); handleClose() }}>
                      <ButtonsForDialog
                        name={input.name}
                        desc={input.desc}
                        input={input.input}
                        output={input.output} />
                    </Button>
                  )
                  }
                </div>
              </div>

              <br></br>
              <div id="geodata" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  GEO DATA
                </Typography>
                <br></br>
                <div>
                  {props.dialogdata.GeoData.map((input, i) =>
                    <Button size="large" key={i} style={{ margin: "5px" }} className='rightbar' onClick={(event) => { props.addNodes(input.callingnode); handleClose() }}>
                      <ButtonsForDialog
                        name={input.name}
                        desc={input.desc}
                        input={input.input}
                        output={input.output} />
                    </Button>
                  )
                  }
                </div>

              </div>

              <br></br>

              <div id="vis" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  VISUALIZATION
                </Typography>
                <br></br>
                <div>
                  {props.dialogdata.Vis.map((input, i) =>
                    <Button size="large" key={i} style={{ margin: "5px" }} className='rightbar' onClick={(event) => { props.addNodes(input.callingnode); handleClose() }}>
                      <ButtonsForDialog
                        name={input.name}
                        desc={input.desc}
                        input={input.input}
                        output={input.output} />
                    </Button>
                  )
                  }
                </div>
              </div>

              <br></br>

              <div id="misc" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  MISC
                </Typography>
                <br></br>
                <div>
                  {props.dialogdata.Misc.map((input, i) =>
                    <Button size="large" key={i} style={{ margin: "5px" }} className='rightbar' onClick={(event) => { props.addNodes(input.callingnode); handleClose() }}>
                      <ButtonsForDialog
                        name={input.name}
                        desc={input.desc}
                        input={input.input}
                        output={input.output} />
                    </Button>
                  )
                  }
                </div>
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