import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import './Table.css';

function Tables({ userInfo }) {

    const formatDate = (date) => {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const format = mo + ' ' + da + ' ' + ye + ' ' + time;
        return format;
    }
    const [selectedEndDate, setSelectedEndDate] = useState(formatDate(new Date()));
    const [selectedStartDate, setSelectedStartDate] = useState(formatDate(new Date()));
    const [show, setShow] = useState(false);


    const dateSplit = (date) => {
        const t = date.split(' ');
        t[1] = t[1].length === 1 ? '0' + t[1] : t[1];
        t.pop();
        return t.join(' ');
    }
    const handleStartDateChange = (startDate) => {
        const formattedDate = formatDate(startDate);
        setSelectedStartDate(formattedDate);
        setShow(true);
    };

    const handleEndDateChange = (EndDate) => {
        const formattedDate = formatDate(EndDate);
        setSelectedEndDate(formattedDate);
        setShow(true);
    };
    let showFilteredData = userInfo.activity_periods.filter((time) => {
        const t = dateSplit(time.start_time);
        const st = selectedStartDate.split(' ').slice(0, 3).join(' ');
        const et = selectedEndDate.split(' ').slice(0, 3).join(' ');
        console.log(t + " " + st + " " + et);
        return moment(t).isSame(st) || moment(t).isBetween(st, et);
    });
    return (
        <div>
            <div className="modal__fade">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            format='MMM dd yyyy'
                            id="startDate-picker-dialog"
                            label="Select Start Date"
                            value={selectedStartDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            format='MMM dd yyyy'
                            id="endDate-picker-dialog"
                            label="Select End Date"
                            value={selectedEndDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" fontWeight="bold">Start Time</TableCell>
                                    <TableCell align="left" fontWeight="bold">End Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    show ?
                                        showFilteredData.map((time, i) => (
                                            <TableRow key={time.start_time + i}>
                                                <TableCell component="th" scope="row">
                                                    {time.start_time}
                                                </TableCell>
                                                <TableCell align="left">{time.end_time}</TableCell>
                                            </TableRow>
                                        )) : userInfo.activity_periods.map((time, i) => (
                                            <TableRow key={time.start_time + i}>
                                                <TableCell component="th" scope="row">
                                                    {time.start_time}
                                                </TableCell>
                                                <TableCell align="left">{time.end_time}</TableCell>
                                            </TableRow>
                                        ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div >

    )
}

export default Tables;
