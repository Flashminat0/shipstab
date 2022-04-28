import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {Row, Col, Card, Table} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import * as actionTypes from "../../store/actions";
import Dashboard from "../Dashboard/Dashboard";

class Horizontal extends Component {

    UNSAFE_componentWillMount() {
        const contentWidth = document.getElementById('root').clientWidth;
        if (this.props.layout !== 'vertical' && contentWidth < 992) {
            this.props.onChangeLayout('vertical');
        } else {
            this.props.onChangeLayout('horizontal');
            if (this.props.collapseMenu) {
                this.props.onToggleNavigation();
            }
            if (this.props.navFixedLayout) {
                this.props.onChangeNavFixedLayout();
            }
            if (this.props.headerFixedLayout) {
                this.props.onChangeHeaderFixedLayout();
            }
        }


    }

    render() {
        return (
            <Aux>
                <Dashboard/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout,
        collapseMenu: state.collapseMenu,
        navFixedLayout: state.navFixedLayout,
        headerFixedLayout: state.headerFixedLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onChangeLayout: (layout) => dispatch({type: actionTypes.CHANGE_LAYOUT, layout: layout}),
        onChangeNavFixedLayout: () => dispatch({type: actionTypes.NAV_FIXED_LAYOUT}),
        onChangeHeaderFixedLayout: () => dispatch({type: actionTypes.HEADER_FIXED_LAYOUT})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Horizontal);