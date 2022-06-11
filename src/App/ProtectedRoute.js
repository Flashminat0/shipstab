import React from 'react'
import {connect} from 'react-redux';
import {Route, Redirect } from 'react-router-dom'
import {getWithExpiry, removeKey} from '../util/customSessionManager';
import isEmpty from '../util/isEmpty'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = getWithExpiry('authToken');
        const userDetails = getWithExpiry('userDetails');

        var userRole = null;

        if(!isEmpty(userDetails))
            userRole = userDetails.userRole;

        console.log(getWithExpiry('userDetails'));

        let componentToReturn = null;

        if(!isEmpty(isAuthenticated))
        {
            try{
                if(!isEmpty(this.props.roles.find(data => data == userRole)))
                {
                    componentToReturn = <Route
                    key={this.props.index}
                    path={ this.props.path}
                    exact={this.props.exact}
                    name={this.props.name}
                    render={props => (
                        <Component {...props} />
                    )} />;

                    console.log(this.props.roles)
                }
                else{
    
                    if(userRole == "SuperAdmin")
                    {
                        componentToReturn = <Redirect from="/" to={this.props.defaultPath} />
                    }
                    else{
                        componentToReturn = <Redirect from="/" to={this.props.defaultPath} />
                    }
                }
            }
            catch(err){
                componentToReturn = <Route
                key={this.props.index}
                path={ this.props.path}
                exact={this.props.exact}
                name={this.props.name}
                render={props => (
                    <Component {...props} />
                )} />;
            }
            

            
        }
        else
        {
            componentToReturn = <Redirect to={{ pathname: '/auth/signin' }} />;
        }

        return componentToReturn;
       
        // return isAuthenticated ? (
        //     // <Component />
        //     <Route
        //         key={this.props.index}
        //         path={ this.props.path}
        //         exact={this.props.exact}
        //         name={this.props.name}
        //         render={props => (
        //             <Component {...props} />
        //         )} />
            
        // ) : (
        //     <Redirect to={{ pathname: '/auth/login' }} />
        // );
    }
}

const mapStateToProps = state => ({
    defaultPath: state.defaultPath,
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);