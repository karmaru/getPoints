import React from 'react'

const Page2 = ({match}) => {
    return (
        <div style={styles.admin}>
            <h3>you clicked {match.url}</h3>
            Page2
        </div>
    )
}

let styles = {
    admin: {
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column ',
        textDecoration: 'none',
        fontFamily: 'Rockwell'
    }
}

export default Page2