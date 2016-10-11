// This file exists becase it isn't possible to 
// include CSS along with a devtool monitor.

// Monitor needs to be includable as only JS
let theme = {
    primary: '#539DDB',
    lightPrimary: '#C6E5F3',
    eLightPrimary: '#E0FFFF',
    darkPrimary: '#084A83',
    accent: '#FF4081',
    darkAccent: '#F50057',
    canvas: '#ECEFF1',
    text: '#FFF',
    darkText: '#2287CD'
}

export default {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
        height: '100%',
        color: theme.text
    },
    timeline: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.canvas
    },
    menu: {
        flex: '0 0 18em',
        order: '-1',
        boxShadow: '0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)',
        backgroundColor: theme.lightPrimary
    },
    details: {
        flex: '0 0 18em',
        overflowY: 'scroll',
        backgroundColor: theme.lightPrimary
    },
    title: {
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: theme.text,
        backgroundColor: theme.darkPrimary,
        borderRadius: '2px',
        minHeight: '2em',
        marginBottom: '.2em',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1em',
        padding: '.5em',
        margin: '.1em',
        color: theme.text,
        backgroundColor: theme.primary,
        borderRadius: '2px',
        minHeight: '1.5em',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },
    panelLeft: {
        backgroundColor: theme.eLightPrimary,
        color: theme.darkText,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    panelRight: {
        backgroundColor: theme.eLightPrimary,
        color: theme.darkText,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rangeSlider: {
        height: '10%',
        marginTop: '1em',
        flex: '1',
        justifySelf: 'flex-end'
    },
    input: {
        width: '8em'
    }
};

