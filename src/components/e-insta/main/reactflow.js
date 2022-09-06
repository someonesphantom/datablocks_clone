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
import { useNavigate } from 'react-router-dom';
import { FlowContext } from '../context/flowcontext';
import apiMapping from '../../resources/apiMapping.json';
import axios from 'axios';
import './reactflow.scss';
import Csvupload from '../nodes/csvupload';
import Xlsxupload from '../nodes/xlsxupload';
import Xlsxtransform from '../nodes/xlsxtransform';
import Jsontransform from '../nodes/jsontransform';
import Xmltransform from '../nodes/xmltransform';
import Csvtransform from '../nodes/csvtransform';
import Savefile from '../nodes/savefile';
import Xmlupload from '../nodes/xmlupload';
import Jsonupload from '../nodes/jsonupload';
import Histogram from '../nodes/hist';
import Scatter from '../nodes/scatter'
import TimeSeries from '../nodes/time'
import Bar from '../nodes/bar'
import Slice from '../nodes/slice'
import Stats from '../nodes/stats'
import Train_test from '../nodes/train_test'
import Exports from '../nodes/exportscsv';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const nodeTypes = {
  csvinput: Csvupload, xlsxinput: Xlsxupload, xmlinput: Xmlupload, jsoninput: Jsonupload, xlsxtransform: Xlsxtransform, savefile: Savefile, jsontransform: Jsontransform, xmltransform: Xmltransform, csvtransform: Csvtransform, slice: Slice, stats: Stats, train_test: Train_test, bar: Bar, scatter: Scatter
  , hist: Histogram, time: TimeSeries, exports: Exports
};
const edgeTypes = {
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

  useEffect(() => {
    getflowsdb();
  }, [])

  const getflowsdb = () => {
    let payload =
    {
      "email": email
    }
    axios.post(apiMapping.userData.getflows, payload).then(response => {
      let recievedpayload = JSON.parse(response.data[currflow].payload);
      setNodes(recievedpayload.nodes);
      setEdges(recievedpayload.edges);
    })
  }

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [objectEdit, setObjectEdit] = useState({});
  const [pos, setPos] = useState({});
  const [edit, setEdit] = React.useState(false);
  const [flowname, setFlowname] = useState("untitled flow");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [response] = useResponse(null)
  const navigate = useNavigate();
  const {
    token, settoken,
    flowsvalue, setflowsvalue,
    email, setemail,
    fname, setfname,
    lname, setlname,
    currflow, setcurrflow
  } = useContext(FlowContext);

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
  }
  const onPaneClick = () => {
    setObjectEdit({});
  };

  const [columnList, setColumnList] = useState([]);
  const { columns, setColumns, lastrow, setlastrow, name, setName } = useContext(UserContext)

  useEffect(() => {
    console.log('name', name)
  }, [name])
  const fetchColumnList = async () => {
    const response = await fetch('http://127.0.0.1:8000/columns/' + name)
    const columnList = await response.json()
    console.log("here it is", columnList)
    setColumnList(columnList.data)
    setColumns(columnList)
    // console.log("colsfetch",columns)
  }
  const fetchlastrow = async () => {
    const response = await fetch('http://127.0.0.1:8000/lastrow' + '/' + name)
    const columnList = await response.json()
    setColumnList(columnList.data)
    setlastrow(columnList)
    // console.log("colsfetch",firstrow)
  }
  const onConnect = (params) => {
    //func
    fetchlastrow();
    fetchColumnList();
    setEdges((eds) => addEdge({
      ...params
    }, eds))
    console.log('here edges', edges)
  };

  useEffect(() => {
    if (edges.length !== 0) {
      { console.log("edges", edges) }
      { console.log("nodes", nodes) }
    }
  }, [edges]);

  const addNodes = (name) => {
    if (name === "File") {
      addcsvNode()
    }
    if (name === "xlsx") {
      addxlsxNode()
    }
    if (name === "json") {
      addjsonNode()
    }
    if (name === "xml") {
      addxmlNode()
    }
    if (name == 'xlsxtransform') {
      addxlsxtransformNode()
    }
    if (name == 'jsontransform') {
      addjsontransformNode()
    }
    if (name == 'xmltransform') {
      addxmltransformNode()
    }
    if (name == 'csvtransform') {
      addcsvtransformNode()
    }
    if (name == 'savefiles') {
      addfilesaverNode()
    }
    if (name == "slice") {
      addSlice()
    }
    if (name == "clean") {
      addStats()
    }
    if (name == "split") {
      addTraintest()
    }
    if (name == 'hist') {
      addHist()
    }
    if (name == 'bar') {
      addBar()
    }
    if (name == 'scatter') {
      addScatter()
    }
    if (name == 'time') {
      addTime()
    }
    if (name == 'exports') {
      addExports()
    }
  }

  const addcsvNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "csvinput",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addxlsxNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "xlsxinput",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addjsonNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "jsoninput",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addxmlNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "xmlinput",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addxlsxtransformNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "xlsxtransform",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addjsontransformNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "jsontransform",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addxmltransformNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "xmltransform",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addcsvtransformNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "csvtransform",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addfilesaverNode = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "savefile",
          data: { id: `${id}`, label: "File ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const addBar = useCallback(() => {
    reactFlowWrapper.current += 50;
    // generateColor()
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "bar",
          data: { label: "Bar ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addScatter = useCallback(() => {
    reactFlowWrapper.current += 50;
    // generateColor()
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      // console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "scatter",
          data: { label: "Scatterplot ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addHist = useCallback(() => {
    reactFlowWrapper.current += 50;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      // console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "hist",
          data: { label: "Histogram ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addTime = useCallback(() => {
    reactFlowWrapper.current += 50;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      // console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "time",
          data: { label: "Time Series ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addSlice = useCallback(() => {
    reactFlowWrapper.current += 50;
    // generateColor()
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "slice",
          data: { label: "lastrow ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addTraintest = useCallback(() => {
    reactFlowWrapper.current += 50;
    // generateColor()
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "train_test",
          data: { label: "train_test ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addStats = useCallback(() => {
    reactFlowWrapper.current += 50;
    // generateColor()
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      console.log(nodes);
      const id = `${++nodeId}`;
      return [
        ...nodes,
        {
          id,
          type: "stats",
          data: { label: "stats ", value: "" },
          position,
        }
      ];
    });
  }, [setNodes]);

  const addExports = useCallback(() => {
    handleClose()
    reactFlowWrapper.current += 50;
    const id = `${++nodeId}`;
    const position = {
      x: 250,
      y: 10,
    };
    setPos(position)
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: "exports",
          data: { id: `${id}`, label: "exports csv ", value: "", color: "" },
          position,
        }
      ];
    });
    handleClose()
  }, [nodes]);

  const saveflow = () => {
    putflowsdb(0);
  }
  const clearflow = () => {
    putflowsdb(1);
    getflowsdb();
  }

  const setflowname = (newname) => {
    let newArr = [...flowsvalue];
    newArr[currflow].flowname = newname;
    setflowsvalue(newArr);
  }

  const putflowsdb = (status) => {
    let newArr = [...flowsvalue];
    flowsvalue[currflow].updationinfo = getCurrentDate();
    let temppayload;
    if (status == 0) {
      temppayload = {
        "nodes": nodes,
        "edges": edges
      }
    }
    else if (status == 1) {
      temppayload = {
        "nodes": [],
        "edges": []
      }
    }
    let newpayload = JSON.stringify(temppayload);
    let payload =
    {
      "payload": newpayload,
      "updationinfo": getCurrentDate(),
      "flowname": newArr[currflow].flowname
    }
    axios.put(apiMapping.userData.putflows + newArr[currflow]._id, payload).then(response => {
    })
  }

  function getCurrentDate(separator = '/') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} ${hours}${':'}${minutes}`
  }

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
                <MenuItem onClick={(event) => { saveflow(); handleClose(); }}>Save</MenuItem>
                <MenuItem onClick={(event) => { clearflow(); handleClose(); }}>Clear</MenuItem>
                <MenuItem onClick={(event) => { window.location.href = '/'; handleClose(); }}>Logout</MenuItem>
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
                    <TextField id="outlined-basic" size='small' sx={{ input: { color: 'white' }, border: '1px solid white', width: '80%' }} value={flowsvalue[currflow].flowname} variant="outlined"
                      onChange={(e) => { setflowname(e.target.value) }}
                    />
                  </Button>

                  <Button
                    style={{ textTransform: 'none', marginTop: "-1px", borderRadius: 0, marginLeft: "-9px" }}
                    className="btn3"
                    startIcon={<DoneIcon className="doneandediticon" />}
                  />
                </>
              ) :
                (
                  <div style={{ textAlign: "left" }}>
                    {flowsvalue[currflow].flowname}
                  </div>
                )
            }

            <Button
              className="btn3"
              onClick={(e) => {
                setEdit(true)
                e.stopPropagation();
                e.preventDefault();
              }}
              startIcon={<EditOutlinedIcon className="doneandediticon" />}
            />

            <Button
              color="inherit"
              className='backhome'
              onClick={(e) => {
                e.preventDefault();
                navigate('/home');
              }}
            >
              Back To Home
            </Button>

          </Toolbar>
        </Container>
      </AppBar>

      <Grid container spacing={0} >
        <Grid item xs={12}>
          <DialogButton addNodes={addNodes} dialogdata={dialogdata} />
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

        <Grid item xs={8} className='responsegrid'>
          <div className='responsegridtitles'>OUTPUT</div>
          <hr style={{ borderColor: "#4C497E" }}></hr>
          <div className='displayingresponse'>
            <DisplayResponse />
          </div>

        </Grid>

        <Grid item xs={4} className='responsegrid'>
          <div className='responsegridtitles'>LOGS</div>
          <hr style={{ borderColor: "#4C497E" }}></hr>
          <div className='logs'>
            Successfully loaded flow "{flowsvalue[currflow].flowname}". Last update: {flowsvalue[currflow].updationinfo}
          </div>
          <hr style={{ borderColor: "#4C497E" }}></hr>
        </Grid>

      </Grid>
    </div>
  );
}