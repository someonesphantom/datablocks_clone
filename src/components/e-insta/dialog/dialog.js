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
        style={{
          color: "white",
          border: '1px solid', borderColor: '#4C497E', borderRadius: "20px",


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
              <Typography variant="h5" color="white" sx={{ mb: 1.5, fontSize: "20px", fontFamily: "sans-serif", fontWeight: "bold" }}>
                Block Library
              </Typography>
              <Button
                onClick={() => scrollTo('#input')}
                startIcon={<InputIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontFamily: "sans-serif", fontWeight: "bold" }}>
                  INPUT
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#transform')}
                startIcon={<ConstructionOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontFamily: "sans-serif", fontWeight: "bold" }}>
                  TRANSFORM
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#geodata')}
                startIcon={<LocationOnOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontFamily: "sans-serif", fontWeight: "bold" }}>
                  GEO DATA
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#vis')}
                startIcon={<InsertChartOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontFamily: "sans-serif", fontWeight: "bold" }}>
                  VISUALIZATION
                </Typography>
              </Button>
              <Button
                onClick={() => scrollTo('#misc')}
                startIcon={<MoreHorizOutlinedIcon style={{ color: "white", width: "10px", height: "10px", marginBottom: "11px" }} />}
              >
                <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px", fontWeight: "bold" }}>
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
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"File"}
                    desc={"Handles csv, json, geojson or topjson files."}
                    input={"-"}
                    output={"Dataset, Geojson"} />
                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Paste"}
                    desc={"Paste input: string, number, csv, json, geojson or topjson"}
                    input={"-"}
                    output={"Dataset, Object, String, Number, Geojson"} />

                </Button>

                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"HTTP Request"}
                    desc={"Loads data via a http request."}
                    input={"-"}
                    output={"Dataset, Object, Geojson"} />

                </Button>

                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Sheets"}
                    desc={"Loads data from google sheets."}
                    input={"-"}
                    output={"Dataset"} />

                </Button>

                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Example Data"}
                    desc={"Some example data for playing around with data blocks."}
                    input={"-"}
                    output={"Dataset, Geojson"} />

                </Button>
              </div>
              <br></br>
              <div id="transform" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  TRANSFORM
                </Typography><br></br>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Filter"}
                    desc={"Groups a data set based on a given column name."}
                    input={"Dataset"}
                    output={"Dataset"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Merge"}
                    desc={"Merges two data sets based on the given column names."}
                    input={"Dataset, Geojson"}
                    output={"Dataset"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Group"}
                    desc={"Groups a data set based on a given column name."}
                    input={"Dataset, Geojson"}
                    output={"Dataset"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Slice"}
                    desc={"Slices a data set based on indices."}
                    input={"Dataset, Array"}
                    output={"Dataset"} />

                </Button>
              </div>

              <br></br>
              <div id="geodata" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  GEO DATA
                </Typography>
                <br></br>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Bounding Box"}
                    desc={"Calculates the bounding box of a given geojson."}
                    input={"Geojson"}
                    output={"Geojson"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Centroid"}
                    desc={"Calculates the centroid of a given geojson."}
                    input={"Geojson"}
                    output={"Geojson"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Area"}
                    desc={"Calculates the area in square meters of a given geojson."}
                    input={"Geojson"}
                    output={"Number"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Buffer"}
                    desc={"Buffers a geojson."}
                    input={"Geojson"}
                    output={"Geojson"} />

                </Button>

              </div>

              <br></br>

              <div id="vis" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  VISUALIZATION
                </Typography>
                <br></br>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Barchart"}
                    desc={"Displays a bar chart of given x and y column names."}
                    input={"Dataset"}
                    output={"Dataset"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Histogram"}
                    desc={"Displays a histogram of a given column name."}
                    input={"Dataset"}
                    output={"Dataset"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Scatterplot"}
                    desc={"Displays a scatterplot of given x and y column names."}
                    input={"Dataset"}
                    output={"Dataset"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Time Series"}
                    desc={"Displays a timeseries line chart of given x and y column names."}
                    input={"Dataset"}
                    output={"Dataset"} />

                </Button>
              </div>

              <br></br>

              <div id="misc" style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                <Typography variant="h7" color="white" >
                  MISC
                </Typography>
                <br></br>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Stats"}
                    desc={"Gives you min, max, avg, mean and count of a given column name."}
                    input={"Dataset"}
                    output={"-"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Markdown"}
                    desc={"Lets you write some markdown."}
                    input={"-"}
                    output={"-"} />

                </Button>
                <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "150px" }} onClick={(event) => { props.addINode(); handleClose() }}>
                  <ButtonsForDialog
                    name={"Export"}
                    desc={"Lets you export data as csv, json or geojson."}
                    input={"Dataset, Geojson, Topojson, Object"}
                    output={"-"} />

                </Button>

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