import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
// eslint-disable-next-line
    return (
      // eslint-disable-next-line
      <React.Fragment>
        <span><a href="https://www.linkedin.com/in/mohamed-raed-safsaf-107558131/">The Witchers</a> &copy; 2020 Witchers.</span>
        <span className="ml-auto">Powered by <a href="https://www.linkedin.com/in/mohamed-raed-safsaf-107558131/">The Witchers </a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
