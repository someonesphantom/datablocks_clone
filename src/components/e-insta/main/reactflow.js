import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
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
import logo from '../../resources/logo.png'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import useResponse from '../../response/response';
import DialogButton from '../dialog/dialog';
import DisplayResponse from '../../response/displayResponse';
import { UserContext, UserContextProvider } from '../context/usercontext';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import dialogdata from '../../resources/data.json'

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'source',
  //   data: { label: 'File' },
  //   position: { x: 250, y: 25 },
  // },

  // {
  //   id: '2',
  //   // you can also pass a React component as a label
  //   data: { label: <div>Default Node</div> },
  //   position: { x: 100, y: 125 },
  // },
  // {
  //   id: '3',
  //   type: 'output',
  //   data: { label: 'Output Node' },
  //   position: { x: 250, y: 250 },
  // },
];

const SourceNode = ({ data }) => {
  if (data.color === "") {
    data.color = "333154"
  }
  const [value, displayresponse, parsedData, tablerows, Values] = useResponse(null)



  const {tableRows, setTableRows,values, setValues} = useContext(UserContext)
  useEffect(()=>{
    console.log("Table Rows ",tablerows)
    setTableRows(tablerows)
},[tablerows])
useEffect(()=>{
  console.log("values  ",Values)
  setValues(Values)
},[Values])

  return (
    <>
        <UserContextProvider >
      <Box sx={{ border: 2, borderColor: "#" + data.color, borderRadius: 2 }}>
        <Card variant="outlined" sx={{ backgroundColor: "#333154", maxWidth: 1000, minHeight: 300, minWidth: 260 }}>
          <CardHeader style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
          <React.Fragment>
            <CardContent>
            <left>
          <DragIndicatorIcon sx={{ fontSize:"30px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
          <Typography fontSize="15px" position="absolute" left="30px" top="8px" color="white">
            File
          </Typography>

        </left>
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  displayresponse(event);
                  
                  
                  
                  }}
                accept=".csv"
                style={{ display: "block", margin: "10px auto" }}
              />
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
          style={{
            backgroundColor: 'rgb(64, 63, 105)', border: "1px solid #fff",
            borderRadius: "0px 10px 10px 0px",
            height: "100%",
            position: "absolute",
            width: "19px", right: '-20px'
          }}
          isConnectable={true}
        />
      </UserContextProvider>
    </>
  )
}

const nodeTypes = { source: SourceNode };
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [objectEdit, setObjectEdit] = useState({});
  const [colId, setColId] = useState([]);
  const [pos, setPos] = useState({});
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [response] = useResponse(null)

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
  const onDoubleClickOfNode = (node) => {
    { console.log("node", node) }
    setObjectEdit(node)
    { console.log("edges", edges) }
      { console.log("nodes", nodes) }
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
      { console.log("nodes", nodes) }
    }
  }, [edges]);

  const addINode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      //console.log(nodes);


      return [
        ...nodes,
        {
          id,
          type: "source",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

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
          <DialogButton  dialogdata={dialogdata}/>

        </Grid>
        <Grid item xs={12}>
          <ReactFlowProvider>
            <div className="reactflow-wrapper" style={{ width: "100%", height: "70vh", backgroundColor: "#222138" }} ref={reactFlowWrapper}>
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
                <Controls style={{ backgroundColor: "#222138" }} />
                <Background style={{ backgroundColor: "#222138" }} />
                <MiniMap nodeColor="#333154" maskColor="#1A192B" style={{ backgroundColor: "#222138" }} />
              </ReactFlow>
            </div>

          </ReactFlowProvider>
        </Grid>
        <Grid item xs={8} sx={{ backgroundColor: "#1A192B", height: "20vh", border: 0.5, borderColor: "#4C497E" }}>
          <div style={{ margin: "5px", marginTop: "5px", color: 'white', fontSize: "12px" }}>OUTPUT</div>
          <hr style={{ borderColor: "#4C497E" }}></hr>
          <div  style={{ margin: "5px", marginTop: "5px",height:"75%", color: 'white', fontSize: "12px", overflow: "scroll",
 whiteSpace: "nowrap" }}>
            <DisplayResponse />
          </div>

        </Grid>

        <Grid item xs={4} sx={{ backgroundColor: "#1A192B", height: "20vh", border: 0.5, borderColor: "#4C497E" }}>
          <div style={{ margin: "5px", marginTop: "5px", color: 'white', fontSize: "12px" }}>LOGS</div>
          <hr style={{ borderColor: "#4C497E" }}></hr>
          <div style={{ margin: "2px", color: 'white', fontSize: "10px" }}>
            Successfully loaded flow "{name}". Last update: { }
          </div>
          <hr style={{ borderColor: "#4C497E" }}></hr>
        </Grid>
      </Grid>
    </div>
  );
}