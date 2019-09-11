import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateUser, logout } from './../../ducks/reducer'

class Nav extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    // componentDidMount() {
    //     axios.get('/api/auth/me')
    //         .then(res => {
    //             this.props.updateUser(res.data)
    //         })
    // }

    logout() {
        axios.get('/api/auth/logout')
            .then(res => this.props.logout())
    }
    
    render() {
        if (this.props.location.pathname !== '/'){
            return (
                <div>
                <div className='Nav'>
                    {/* <div className='nav_profile_pic'style={{ backgroundImage: `url('${this.props.profilePic}')`}}></div> */}
                    <p>{this.props.username}</p>
                </div>
                <div className='nav_links'>
                    <Link to='/dashboard'><button>Home</button></Link>
                    <Link to='/new'><button>New Post</button></Link>
                    <Link to='/'><button onClick={this.logout}>Logout</button></Link>
                </div>
                </div>
            )
        } else {
            return null
        }
        
    }
}
function mapStateToProps(state) {
    return state
}
export default withRouter(connect(mapStateToProps, { updateUser, logout})(Nav))
