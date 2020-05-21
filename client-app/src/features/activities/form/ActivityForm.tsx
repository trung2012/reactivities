import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';

import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/form/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/form/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time'),
})

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const { activityStore } = useContext(RootStoreContext);

    const {
        createActivity,
        editActivity,
        submitting,
        loadActivity } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [loadActivity, match.params.id])

    // const handleSubmit = () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         };

    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     } else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    placeholder='Title'
                                    value={activity.title}
                                    name='title'
                                    component={TextInput}
                                />
                                <Field
                                    rows={3}
                                    placeholder='Description'
                                    value={activity.description}
                                    name='description'
                                    component={TextAreaInput}
                                />
                                <Field
                                    placeholder='Category'
                                    value={activity.category}
                                    name='category'
                                    component={SelectInput}
                                    options={category}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        placeholder='Date'
                                        value={activity.date}
                                        name='date'
                                        component={DateInput}
                                        date={true}
                                    />
                                    <Field
                                        placeholder='Time'
                                        value={activity.date}
                                        name='time'
                                        component={DateInput}
                                        time={true}
                                    />
                                </Form.Group>
                                <Field
                                    placeholder='City'
                                    value={activity.city}
                                    name='city'
                                    component={TextInput}
                                />
                                <Field
                                    placeholder='Venue'
                                    value={activity.venue}
                                    name='venue'
                                    component={TextInput}
                                />
                                <Button
                                    loading={submitting}
                                    floated='right'
                                    positive type='submit'
                                    content='Submit'
                                    disabled={loading || invalid || pristine}
                                />
                                <Button
                                    onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities/')}
                                    floated='right'
                                    type='cancel'
                                    content='Cancel'
                                    disabled={loading}
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);