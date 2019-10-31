import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './heat-map-data.tsv';

const dayDictionary = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun'
};

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

  generateFillColor() {
    return d3
      .scaleSequential()
      .domain([70, 0])
      .interpolator(d3.interpolateSpectral);
  }

  render() {
    const hours = Array.from(Array(24).keys());
    const hoursHeader = hours.map((hour, i) => (
      <text textAnchor="middle" transform={`translate(${i * 38 + 58}, 15)`}>
        {hour}
      </text>
    ));

    const rows = this.state.dataGroupedByDay.map((row, i) => {
      const cells = row.map((hour, j) => {
        const fillColor = this.generateFillColor()(hour.value);
        return (
          <g transform="translate(38)">
            <rect
              height="38"
              width="38"
              transform={`translate(${j * 38})`}
              fill={fillColor}
              stroke="gray"
              strokeWidth="2"
              rx="4"
              ry="4"
            />
            <title>{hour.value}</title>
          </g>
        );
      });
      return (
        <g transform={`translate(0, ${i * 38 + 20})`}>
          <text transform="translate(0, 25)">{dayDictionary[i + 1]}</text>
          {cells}
        </g>
      );
    });

    return (
      <svg width="100%" height="1000">
        {hoursHeader}
        {rows}
      </svg>
    );
  }
}

export default HeatMap;
