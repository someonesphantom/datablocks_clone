import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap, MarkerType,
} from 'react-flow-renderer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import logo from './resources/logo.png'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InputIcon from '@mui/icons-material/Input';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const sourceNode = ({ data }) => {
  console.log(data)
  if (data.color === "") {
    data.color = "333154"
  }

  return (
    <>

      <Box sx={{ border: 2, borderColor: "#" + data.color, borderRadius: 2 }}>
        <Card variant="outlined" sx={{ backgroundColor: "#333154", maxWidth: 500, minHeight: 300, minWidth: 260 }}>
          <CardHeader style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
          <React.Fragment>
            <CardContent>
              <Typography variant="h5" component="div" color="white">
                {data.label}
              </Typography>
              <Typography sx={{ fontSize: 10 }} color="white" gutterBottom>
                {data.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">

              </Typography>

            </CardContent>

          </React.Fragment>
        </Card>
      </Box>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ backgroundColor: 'warning.main' }}
        isConnectable={true}
      />
    </>
  )
}

const nodeTypes = { source: sourceNode };
const edgeTypes = {
  // custom: CustomEdge,
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
let nodeId = 0;
let tableId = 0;

export default function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [objectEdit, setObjectEdit] = useState({});
  const [colId, setColId] = useState([]);
  const [pos, setPos] = useState({});
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = useState(null);

  const onDoubleClickOfNode = (node) => {
    { console.log("node", node) }
    setObjectEdit(node)

  }

  const onPaneClick = () => {
    setObjectEdit({});
  };

  const onConnect = (params) => setEdges((eds) => addEdge({
    ...params
  }, eds));
  useEffect(() => {
    if (edges.length !== 0) {
      { console.log("edges", edges) }

    }
  }, [edges]);

  const addINode = useCallback(() => {
    reactFlowWrapper.current += 50;
    const tid = `${++tableId}`;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      console.log(nodes);


      return [
        ...nodes,
        {
          id,
          type: "source",
          data: { id: `${id}`, label: "Table " + `${tid}`, value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };



  return (
    <div style={{ backgroundColor: "#222138", height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: "#1A192B" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="My logo" width="40" height="50" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '10vw', hright: '10vh' }} />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit"
              aria-controls={open1 ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? 'true' : undefined}
              onClick={handleClick}      
              >FILE</Button>
              <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
              <Button color="inherit"
              >VIEW</Button>
              <Button color="inherit"
              >HELP</Button>
            </Typography>
            {
              edit == true ? (
                <>
                  <Button
                    disableRipple
                    sx={{ width: '10%' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <TextField id="outlined-basic" size='small' sx={{ input: { color: 'white' }, border: '1px solid white', width: '80%' }} value={name} variant="outlined"
                      onChange={(e) => { setName(e.target.value) }}
                    />
                  </Button>

                  <Button
                    style={{ textTransform: 'none', marginTop: "-1px", borderRadius: 0, marginLeft: "-9px" }}
                    sx={{
                      mt: 0, mb: 0, background: '#434161', ':hover': {
                        bgcolor: '#4c497e',
                        color: 'white',
                      },
                      fontFamily: 'monospace',
                      minWidth: "40px",
                      minHeight: "42px",
                      border: 1,
                      borderColor: "white"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      setEdit(false);
                    }}
                    startIcon={<DoneIcon style={{ color: "white", marginRight: "-13px" }} />}
                  />
                </>
              ) :
                (
                  <div style={{ textAlign: "left" }}>
                    {name}
                  </div>
                )
            }

            <Button
              style={{ textTransform: 'none' }}
              sx={{
                mt: 0, mb: 0, background: '#434161', ':hover': {
                  bgcolor: '#4c497e',
                  color: 'white',
                },
                fontFamily: 'monospace',
                minWidth: "40px",
                minHeight: "30px",
                marginLeft: "10px",
                marginRight: "45vw",
              }}
              onClick={(e) => {
                setEdit(true)
                e.stopPropagation();
                e.preventDefault();

              }}
              startIcon={<EditOutlinedIcon style={{ color: "white", marginRight: "-13px" }} />}
            />
          </Toolbar>
        </Container>
      </AppBar>

      <Grid container spacing={0} >
        <Grid item xs={12}>
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

          >
            <DialogTitle id="scroll-dialog-title" sx={{ backgroundColor: "#222138", color: "white" }}>Block Library</DialogTitle>

            <DialogContent dividers={scroll === 'paper'} sx={{ backgroundColor: "#222138" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Button
                    startIcon={<InputIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" }}>
                    INPUT
                  </Typography>
                  </Button>
                  <Button
                    startIcon={<ConstructionOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" }}>
                    TRANSFORM
                  </Typography>
                  </Button>
                  <Button
                    startIcon={<LocationOnOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" }}>
                    GEO DATA
                  </Typography>
                  </Button>
                  <Button
                    startIcon={<InsertChartOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" }}>
                    VISUALIZATION
                  </Typography>
                  </Button>
                  <Button
                    startIcon={<MoreHorizOutlinedIcon style={{ color: "white", width:"10px",height:"10px",marginBottom:"11px" }}/>}
                  >
                  <Typography variant="h9" color="white" sx={{ mb: 1.5, fontSize: "9px" }}>
                    MISC
                  </Typography>
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <div id="input">
                  <Typography variant="h7" color="white" >
                    INPUT
                  </Typography>
                  <br></br>
                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={addINode}>
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
                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={addINode}>

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

                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={addINode}>

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

                  <Button size="large" style={{ margin: "5px" }} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={addINode}>

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

                  <Button size="large" style={{ margin: "5px"}} sx={{ backgroundColor: "#333154", width: "200px", height: "200px" }} onClick={addINode}>

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
                  <div id="transform">
                  <Typography variant="h7" color="white" >
                  TRANSFORM
                  </Typography>
                  </div>
                  
                  <br></br>
                  <div id="geodata">
                  <Typography variant="h7" color="white" >
                  GEO DATA
                  </Typography>
                  </div>
                  
                  <br></br>

                  <div id="vis">
                  <Typography variant="h7" color="white" >
                  VISUALIZATION
                  </Typography>
                  </div>

                  <br></br>

                  <div id="misc">
                  <Typography variant="h7" color="white" >
                  MISC
                  </Typography>
                  </div>
                  
                  <br></br>
                </Grid>

              </Grid>

            </DialogContent>

          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <ReactFlowProvider>
            <div className="reactflow-wrapper" style={{ width: "100%", height: "70vh",backgroundColor: "#222138" }} ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}

                onNodeDoubleClick={(event, node) => onDoubleClickOfNode(node)}

                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
              >
                <Controls style={{backgroundColor: "#222138"}}/>
                <Background style={{backgroundColor: "#222138"}}/>
                <MiniMap nodeColor="#333154" maskColor="#1A192B" style={{backgroundColor: "#222138"}}/>
              </ReactFlow>
            </div>

          </ReactFlowProvider>
        </Grid>
        <Grid item xs={8} sx={{ backgroundColor: "#1A192B", height: "20vh",border:0.5 ,borderColor:"#4C497E"}}>
          <div style={{ margin:"5px",marginTop:"5px", color: 'white',fontSize:"12px"}}>OUTPUT</div>
          <hr style={{borderColor:"#4C497E"}}></hr>
        </Grid>

        <Grid item xs={4} sx={{ backgroundColor: "#1A192B" , height: "20vh",border:0.5 ,borderColor:"#4C497E"}}>
          <div style={{ margin:"5px",marginTop:"5px", color: 'white',fontSize:"12px" }}>LOGS</div>
          <hr style={{borderColor:"#4C497E"}}></hr>
          <div style={{ margin:"2px", color: 'white',fontSize:"10px" }}>
          Successfully loaded flow "{name}". Last update: { }
          </div>
          <hr style={{borderColor:"#4C497E"}}></hr>
        </Grid>
      </Grid>
    </div>
  );
}