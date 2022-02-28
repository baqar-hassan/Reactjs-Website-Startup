import React from 'react';
import PropTypes from "prop-types";

class Placeholders extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.show &&
                    <>
                        {[...Array(this.props.repeat ? this.props.repeat : 0).keys()].map(item => (
                            <div className="w-auto p-0" key={item}>
                                {this.props.children}
                            </div>
                        ))}
                    </>
                }
            </>
        );
    }
}

Placeholders.propTypes = {
    repeat: PropTypes.number,
    show: PropTypes.bool
};

Placeholders.defaultProps = {
    repeat: 1,
    show: true
};

export default Placeholders;