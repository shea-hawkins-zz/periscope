// This file exists becase it isn't possible to 
// include CSS along with a devtool monitor.

// Monitor needs to be includable as only JS
let theme = {
    primary: '#3F51B5',
    lightPrimary: '#C5CAE9',
    darkPrimary: '#303F9F',
    lightAccent: '#FFF'
}

export default {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
        height: '100%',
        color: 'white'
    },
    timeline: {
        flex: '1',
        backgroundColor: theme.lightPrimary
    },
    menu: {
        flex: '0 0 18em',
        order: '-1',
        boxShadow: '0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)',
        backgroundColor: theme.primary
    },
    details: {
        flex: '0 0 18em',
        backgroundColor: theme.primary
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'large',
        color: 'white',
        backgroundColor: theme.darkPrimary,
        borderRadius: '2px',
        minHeight: '2em',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    }
};