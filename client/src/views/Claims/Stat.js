import React, { Component, Fragment } from "react";
import Axios from "axios";
import LoopCircleLoading from "react-loadingg/lib/LoopCircleLoading";
import { Row, Col, Card, CardBody, CardHeader, Input } from "reactstrap";
import { Line, Doughnut } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import Widget02 from "../Widgets/Widget02";
import randomColor from 'randomcolor';
import CountUp from "react-countup";

const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const line = (data) => {
  const color = colors(1)[0];
  return {
    labels: castData(data).labels,
    datasets: [
      {
        label: 'Claims Solved',
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: castData(data).data,
      },
    ],
  }
}

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

const castData = data => {
  const l = [];
  const d = [];
  if (data)
    data.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(entry => {
      l.push(new Date(entry.date).toDateString());
      d.push(entry.claims);
    });
  return { labels: l, data: d }
}

const cardChartData1 = (brand, data) => {
  return {
    labels: castData(data).labels,
    datasets: [
      {
        label: 'Claims ',
        backgroundColor: brand,
        borderColor: 'rgba(255,255,255,.55)',
        data: castData(data).data,
      },
    ],
  };
}

const cardChartOpts1 = data => {
  return {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },

        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, castData(data).data) - 5,
            max: Math.max.apply(Math, castData(data).data) + 5,
          },
        }],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  }
}
const colors = n => {
  const c = [];
  for (let i = 0; i < n; i++) {
    c.push(randomColor());
  };
  return c;
}
const doughnut1 = data => {
  const l = [];
  const d = [];
  const c = colors(data.length);

  if (data) {
    data.forEach(entry => {
      l.push(entry.admin.Firstname + ' ' + entry.admin.Lastname);
      d.push(entry.claims);
    });
  };

  return {
    labels: l,
    datasets: [
      {
        data: d,
        backgroundColor: c,
        hoverBackgroundColor: c,
      }],
  };
}


class Stat extends Component {

  constructor(props) {
    super(props);
    Axios.get("/claims/admin/stat").then(stat => {
      this.setState({
        stats: stat.data,
        loading: false,
      });
    });
    this.state = {
      stats: null,
      loading: true,
      lineId: 0
    }
  }

  days = number => {
    if (number >= 24) {
      const d = parseInt(number / 24);
      const h = number % 24;
      let ch = "(" + d.toString() + "d ";
      if (h > 0) ch += h.toString() + "h";
      ch += ")";
      return ch;
    }
    return "";
  }

  adminChanged = e => {
    this.setState({ lineId: e.target.value });
  }

  render() {
    console.log(this.state.stats);
    return <Fragment>
      {
        this.state.loading ? <LoopCircleLoading /> : <Fragment>
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-info">
                <CardBody className="pb-0">
                  <div className="text-value">{this.state.stats.total}</div>
                  <div>Total</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData1(brandInfo, this.state.stats.claimsPerDate)} options={cardChartOpts1(this.state.stats.claimsPerDate)} height={70} />
                </div>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-success">
                <CardBody className="pb-0">
                  <div className="text-value">{this.state.stats.solved}</div>
                  <div>Solved</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData1(brandSuccess, this.state.stats.solvedPerDate)} options={cardChartOpts1((this.state.stats.solvedPerDate))} height={70} />
                </div>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-warning">
                <CardBody className="pb-0">
                  <div className="text-value">{this.state.stats.inProgress}</div>
                  <div>In progress</div>
                </CardBody>
                <div className="chart-wrapper" style={{ height: '70px' }}>
                  <Line data={cardChartData1(brandWarning, this.state.stats.InProgressPerDate)} options={cardChartOpts1((this.state.stats.InProgressPerDate))} height={70} />
                </div>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-danger">
                <CardBody className="pb-0">
                  <div className="text-value">{this.state.stats.block}</div>
                  <div>Blocked</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData1(brandDanger, this.state.stats.removedPerDate)} options={cardChartOpts1(this.state.stats.removedPerDate)} height={70} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={this.state.stats.avgSolved.toString() + 'h ' + this.days(this.state.stats.avgSolved)} mainText="Average Solved" icon="fa fa-location-arrow" color="info" variant="1" />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={this.state.stats.maxInProgress.toString() + 'h ' + this.days(this.state.stats.maxInProgress)} mainText="Older claim in progress" icon="fa fa-exclamation-triangle" color="danger" variant="1" />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={this.state.stats.avgSolvedPerDate.toString()} mainText="average solved per day" icon="fa fa-location-arrow" color="warning" variant="1" />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={this.state.stats.maxSolvedPerDate.toString()} mainText="max solved per day" icon="fa fa-dashboard" color="success" variant="1" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Claims solved per admin
              </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Doughnut height={100} data={doughnut1(this.state.stats.solvedPerAdmin)} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
                          <CountUp end={this.state.stats.solvedPerAdmin[this.state.lineId].claims} duration={1} /> (<CountUp end={Math.round(this.state.stats.solvedPerAdmin[this.state.lineId].percentage)} duration={1} />%)
                          </div>
                        <div>
                          Total claims solved
                          </div>
                      </div>
                    </Col>
                    <Col>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
                          <CountUp end={this.state.stats.solvedPerAdmin[this.state.lineId].avgSolvedPerDate} duration={1} />
                        </div>
                        <div>
                          Average claims solved per day
                          </div>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Input value={this.state.lineId} onChange={this.adminChanged.bind(this)} type="select" name="select" id="select">
                          {
                            this.state.stats.solvedPerAdmin.map((entry, index) => {
                              return <option key={index} value={index}>{entry.admin.Firstname + " " + entry.admin.Lastname}</option>
                            })
                          }
                        </Input>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row >
            <Col>
              <Card>
                <CardHeader>
                  Claims solved per day
              <div className="card-header-actions">

                  </div>
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line height={80} data={line(this.state.stats.solvedPerAdmin[this.state.lineId].claimsPerDate)} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fragment>
      }
    </Fragment>
  }
}

export default Stat;