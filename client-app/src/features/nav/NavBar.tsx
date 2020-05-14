import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import ActivityStore from '../../app/stores/activityStore';

const NavBar = () => {
  const { openCreateForm } = useContext(ActivityStore);

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            onClick={openCreateForm}
            positive content='Create activity'
            as={NavLink}
            to='/createActivity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar;