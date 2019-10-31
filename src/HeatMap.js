import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './heat-map-data.tsv';

class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataGroupedByDay: []
    };
  }

  componentDidMount() {
    d3.tsv(data).then(data => {
      const dataGroupedByDay = [];

      data.forEach(datum => {
        const numericalDatum = {
          day: +datum.day,
          hour: +datum.hour,
          value: +datum.value
        };

        if (dataGroupedByDay[numericalDatum.day - 1]) {
          dataGroupedByDay[numericalDatum.day - 1].push(numericalDatum);
        } else {
          dataGroupedByDay[numericalDatum.day - 1] = [numericalDatum];
        }
      });

      this.setState({ dataGroupedByDay });
    });
  }

  render() {
    return null;
  }
}

export default HeatMap;
