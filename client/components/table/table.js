import React from 'react';

import './table.scss';

class Table extends React.Component {
  render() {
    const { data = [] } = this.props;

    return (
      <div className="table100 ver1 m-b-110">
        <div className="table100-head">
          <table>
            <thead>
              <tr className="row100 head">
                <th className="cell100">
                  Sentence
                </th>
                <th className="cell100 correct">
                  Confidence
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="table100-body js-pscroll">
          <table>
            <tbody>
              {data && data.map(({ text, confidence }, id) => (
                <tr key={id}>
                  <td>{text}</td>
                  <td>
                    {confidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
