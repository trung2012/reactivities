import React, { useState, useEffect, Fragment } from 'react';
import { Header, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data.map(activity => {
        return { ...activity, date: activity.date.split('.')[0] }
      }));
    });
  }, [])

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Header as='h2'>
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity!}
          selectActivity={handleSelectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
