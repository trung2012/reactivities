import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar = () => {
  const { activityStore, userStore } = useContext(RootStoreContext);
  const { openCreateForm } = activityStore;
  const { logout, user } = userStore;

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
        {
          user &&
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My profile' icon='user' />
                <Dropdown.Item text='Logout' icon='power' onClick={logout} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        }
      </Container>
    </Menu>
  )
}

export default NavBar;