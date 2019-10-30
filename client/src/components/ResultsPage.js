import React, { Component } from "react";
import axios from "axios";
import { Card, CardText, Row, Col } from "reactstrap";
export default class Results extends Component {
  state = {
    items: []
  };
  componentDidMount = () => {
    // We get all of the data based on the search the user did

    const query = this.props.match.params.query;
    axios.get(`/details/${query}`).then(response => {
      this.setState({
        items: response.data
      });
    });
  };
  render() {
    const names = this.state.items.map(elem => {
      return (
        <Col sm="6">
          <Card body>
            <h2>{elem.name}</h2>
            <h3>Properties</h3>
            <CardText>
              {/* If the object doesn´t have properties we will show a message if not we show the details */}
              {elem.properties ? (
                <Card body>
                  <Row>
                    <Col>
                      {Object.keys(elem.properties).map(el => {
                        return (
                          <li
                            style={{
                              listStyleType: "none",
                              textAlign: "center"
                            }}
                          >
                            {el}:
                          </li>
                        );
                      })}
                    </Col>
                    <Col>
                      {Object.values(elem.properties).map(el => {
                        return (
                          <li
                            style={{
                              listStyleType: "none",
                              textAlign: "center"
                            }}
                          >
                            {el.toString()}
                          </li>
                        );
                      })}
                    </Col>
                  </Row>
                </Card>
              ) : (
                "This object doesn´t have any properties"
              )}
            </CardText>
          </Card>
        </Col>
      );
    });

    return (
      <div>
        <Row>{names}</Row>
      </div>
    );
  }
}
