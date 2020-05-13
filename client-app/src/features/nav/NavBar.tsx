import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';

const NavBar = () => {
  const { openCreateForm } = useContext(ActivityStore);

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button onClick={openCreateForm} positive content='Create activity' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar;