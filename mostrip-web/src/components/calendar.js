import React from 'react';
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function calendar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <Calendar
        localizer={localizer}
        events={[{ title: '안녕', allDay: false, start: new Date(2019, 10, 1, 10, 0), end: new Date(2019, 10, 13, 10, 30) }, { title: '안녕 못한다.', allDay: false, start: new Date(2019, 10, 1, 10, 0), end: new Date(2019, 10, 13, 10, 30) }]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}
