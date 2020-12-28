import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Grid,
    Link,
    List,
    ListItem,
    Tooltip,
    ListItemIcon,
    ListItemText,
    InputBase,
    Select,
    InputLabel,
    FormControl
} from '@material-ui/core';
import {
    AccountCircle,
    Dashboard,
    Notifications,
    Home,
    DynamicFeed,
    People,
    Search,
    Brightness5
} from '@material-ui/icons';
import Chart from './../Chart'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        display: 'flex',
        justifyContent: 'space-between'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    logo: {
        display: 'flex',
        paddingLeft: '25px',
        paddingRight: '25px',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: '20px'
    },
    input: {
        color: '#3f51b5'
    }
}));

const drawerMenu = () => {
    return [
        { name: 'Dashboard', Icon: Dashboard, url: '' },
        { name: 'Backlog Remover', Icon: DynamicFeed, url: `` },
        { name: 'Rank up', Icon: People, url: `` },
        { name: 'Speed up', Icon: Home, url: '' },
        { name: 'Accuracy up', Icon: DynamicFeed, url: `` },
        { name: 'Revision', Icon: People, url: `` },
        { name: 'Test Creator', Icon: DynamicFeed, url: `` },
        { name: 'Assignment Creator', Icon: People, url: `` },
        { name: 'Study Material', Icon: DynamicFeed, url: `` },
        { name: 'Formula Sheet', Icon: People, url: `` },
    ]
}

export default function Layout() {
    const classes = useStyles();
    const [text, setText] = useState('')
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <div> <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-native-simple">Activity</InputLabel>
                        <Select
                            native
                            // value={state.age}
                            // onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'filled-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl><FormControl variant="filled" style={{ width: '150px' }}>
                            <InputLabel htmlFor="filled-age-native-simple">Tool Guide</InputLabel>
                            <Select
                                native
                                // value={state.age}
                                // onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'filled-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </Select>
                        </FormControl></div>
                    <div style={{ display: 'flex' }}><div style={{ backgroundColor: '#F6F7F8', borderRadius: '5px' }}><IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <Search style={{ color: '#3f51b5' }} />
                    </IconButton>
                        <InputBase
                            autoFocus
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className={classes.input}
                            placeholder={"Search..."}
                        /></div>
                        <IconButton color="inherit">
                            <Notifications style={{ color: '#3f51b5' }} />
                        </IconButton>
                        <IconButton>
                            <AccountCircle />
                        </IconButton></div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper),
                }}
                open={true}
            >
                <div className={classes.logo}><Brightness5 /> <span style={{ fontWeight: 'bolder', fontSize: '25px' }}> ACADZA</span></div>
                <List>
                    {drawerMenu().map(({ name, Icon, url }, index) => (
                      <React.Fragment key={index} >
                            <Link to={url}>
                                <Tooltip title={name}>
                                    {name === "Accuracy up" ? <ListItem button divider={true} style={{ backgroundColor: '#3f51b5' }}>
                                        <ListItemIcon>
                                            <Icon style={{ color: '#fff' }}/>
                                        </ListItemIcon>
                                        <ListItemText primary={name} style={{ color: '#fff' }}/>
                                    </ListItem> :
                                        <ListItem button divider={true}>
                                            <ListItemIcon>
                                                <Icon style={{ color: '#3f51b5' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={name} />
                                        </ListItem>}
                                </Tooltip>
                            </Link>
                        </React.Fragment>
                                
                    ))}
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Chart />
                    </Grid>
                </Container>
            </main>
        </div>
    );
}