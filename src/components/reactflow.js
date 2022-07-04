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

const sourceNode = ({ data }) => {
  console.log(data)
  if (data.color === "") {
    data.color = "333154"
  }

  return (
    <>

      <Box sx={{ border: 2, borderColor: "#" + data.color, borderRadius: 2 }}>
        <Card variant="outlined" sx={{ backgroundColor:"#333154" , maxWidth: 500, minHeight: 300, minWidth: 260 }}>
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

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div style={{ backgroundColor: "#222138", height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: "#1A192B" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="My logo" width="40" height="50" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '10vw', hright: '10vh' }} />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit"
              >FILE</Button>
              <Button color="inherit"
              >VIEW</Button>
              <Button color="inherit"
              >HELP</Button>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid container spacing={0} >
        <Grid item xs={12}>
          <Button fontColor="white"
            onClick={handleClickOpen('paper')}
          >+ block</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}

          >
            <DialogTitle id="scroll-dialog-title" sx={{ backgroundColor: "#222138", color: "white" }}>Block Library</DialogTitle>

            <DialogContent dividers={scroll === 'paper'} sx={{ backgroundColor: "#222138" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={8}>
                  <Button size="large" style={{ margin: "30px" }} sx={{ backgroundColor: "#333154" }} onClick={addINode}>
                    <Card variant="outlined" sx={{ backgroundColor: "#333154" }}>
                      {
                        <CardContent>
                          <Typography variant="h5" color="white" >
                            File
                          </Typography>

                          <Typography sx={{ mb: 1.5 }} color="gray" gutterBottom>
                            Handles csv, json, geojson or topjson files.
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="gray" gutterBottom>
                            Input: -
                            Output: Dataset, Geojson
                          </Typography>
                        </CardContent>

                      }
                    </Card>

                  </Button>
                  <Button size="large" style={{ margin: "30px" }} sx={{ backgroundColor: "#333154" }} onClick={addINode}>
                    <Card variant="outlined" sx={{ backgroundColor: "#333154" }}>
                      {
                        <CardContent>
                          <Typography variant="h5" color="white" >
                            File
                          </Typography>

                          <Typography sx={{ mb: 1.5 }} color="gray" gutterBottom>
                            Handles csv, json, geojson or topjson files.
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="gray" gutterBottom>
                            Input: -
                            Output: Dataset, Geojson
                          </Typography>
                        </CardContent>

                      }
                    </Card>

                  </Button>
                </Grid>

              </Grid>

            </DialogContent>

          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <ReactFlowProvider>
            <div className="reactflow-wrapper" style={{ width: "100%", height: "80vh" }} ref={reactFlowWrapper}>
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
                <Controls />
                <Background />
                <MiniMap />
              </ReactFlow>
            </div>

          </ReactFlowProvider>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: "#1A192B" ,height:"100vh"}}>
          <div style={{ color: 'white' }}>OUTPUT</div>
        </Grid>
        
        <Grid item xs={6} sx={{ backgroundColor: "#1A192B" }}>
          <div style={{ color: 'white' }}>LOGS</div>
        </Grid>
      </Grid>
    </div>
  );
}