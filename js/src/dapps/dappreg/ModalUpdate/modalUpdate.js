// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component, PropTypes } from 'react';

import Button from '../Button';
import Modal from '../Modal';

import styles from '../Modal/modal.css';

export default class ModalUpdate extends Component {
  static propTypes = {
    dappId: PropTypes.string.isRequired,
    updates: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  };

  render () {
    return (
      <Modal
        buttons={ this.renderButtons() }
        header='Confirm Application Update'
      >
        { this.renderConfirm() }
      </Modal>
    );
  }

  renderButtons () {
    return [
      <Button
        key='cancel'
        label='No, Cancel'
        onClick={ this.handleClose }
      />,
      <Button
        key='delete'
        label='Yes, Update'
        warning
        onClick={ this.handleConfirm }
      />
    ];
  }

  renderConfirm () {
    const { dappId } = this.props;

    return (
      <div>
        <div className={ styles.section }>
          You are about to update the application details in the registry,
          the details of these updates are given below. Please note that each
          update will generate a seperate transaction.
        </div>
        <div className={ styles.section }>
          <div className={ styles.heading }>
            Application identifier
          </div>
          <div>
            { dappId }
          </div>
        </div>
        { this.renderChanges() }
      </div>
    );
  }

  renderChanges () {
    const { updates } = this.props;

    return Object.keys(updates)
      .map((type) => {
        return (
          <div
            className={ styles.section }
            key={ `${type}Update` }
          >
            <div className={ styles.heading }>
              Updates to { type }
            </div>
            <div>
              <div>{ updates[type] || '(removed)' }</div>
            </div>
          </div>
        );
      });
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleConfirm = () => {
    this.props.onConfirm();
  }
}
