// This file exists becase it isn't possible to 
// include CSS along with a devtool monitor.

// Monitor needs to be includable as only JS
let theme = {
    primary: '#539DDB',
    lightPrimary: '#C6E5F3',
    eLightPrimary: '#ECEFF1',
    darkPrimary: '#084A83',
    accent: '#FF4081',
    darkAccent: '#F50057',
    text: '#FFF'
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
        backgroundColor: theme.eLightPrimary
    },
    menu: {
        flex: '0 0 18em',
        order: '-1',
        boxShadow: '0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)',
        backgroundColor: theme.lightPrimary
    },
    details: {
        flex: '0 0 18em',
        backgroundColor: theme.lightPrimary
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: theme.darkPrimary,
        borderRadius: '2px',
        minHeight: '2em',
        marginBottom: '.2em',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1em',
        padding: '.5em',
        margin: '.1em',
        color: 'white',
        backgroundColor: theme.primary,
        borderRadius: '2px',
        minHeight: '1.5em',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    }
};