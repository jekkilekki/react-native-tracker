import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import { recieveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { white } from '../utils/colors'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import { AppLoading } from 'expo'

class History extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    fetchCalendarResults() 
      .then((entries) => dispatch(recieveEntries(entries)))
      .then(({ entries }) => {
        if ( ! entries[timeToString()] ) {
          dispatch( addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }

  renderItem = ({ today, ...metrics }, formattedDate, key ) => (
    <View>
      {today
        ? <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableNativeFeedback onPress={() => console.log('Pressed!')}>
            <View>
              <MetricCard metrics={metrics} date={formattedDate} />
            </View>
          </TouchableNativeFeedback>
      }
    </View>
  )

  renderEmptyDate = (formattedDate) => (
    <View style={styles.item}>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDataText}>
        You didn't log any data on this day.
      </Text>
    </View>
  )

  render() {
    const { entries } = this.props
    const { render } = this.state

    if ( ready === false ) {
      return <AppLoading />
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  }
})

function mapStateToProps(entries) {
  return {
    entries
  }
}

export default connect(mapStateToProps)(History)