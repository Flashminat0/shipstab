import React from 'react';
import Aux from "../../../../../../hoc/_Aux";
import NavCollapse from './../NavCollapse';
import NavItem from './../NavItem';

import {getWithExpiry, removeKey} from '../../../../../../util/customSessionManager';
import isEmpty from '../../../../../../util/isEmpty';

const navGroup = (props) => {

    const userDetails = getWithExpiry('userDetails');

    var userRole = null;

    if(!isEmpty(userDetails))
        userRole = userDetails.userRole;

    let navItems = '';
    if (props.group.children) {
        const groups = props.group.children;
        navItems = Object.keys(groups).map(item => {
            item = groups[item];

            try {
                if(isEmpty((item.roles).find(data => data == userRole))){
                    return false;
                }
            } catch (error) {
                
            }

            switch (item.type) {
                case 'collapse':
                    return <NavCollapse key={item.id} collapse={item} type="main" />;
                case 'item':
                    return <NavItem layout={props.layout} key={item.id} item={item} />;
                default:
                    return false;
            }
        });
    }

    var showGroupTitle = false;

    try {
        if(!isEmpty((props.group.roles).find(data => data == userRole))){
            showGroupTitle = true;
        }
    } catch (error) {
        showGroupTitle = true;
    }

    return (
        <Aux>
            {showGroupTitle == true && <li key={props.group.id} className="nav-item pcoded-menu-caption"><label>{props.group.title}</label></li>}
            {navItems}
        </Aux>
    );
};

export default navGroup;