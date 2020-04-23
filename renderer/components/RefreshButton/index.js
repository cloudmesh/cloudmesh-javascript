import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'

const RefreshButton = ({
  color = 'primary',
  variant = 'outlined',
  onRefresh = () => {},
  ...props
}) => (
  <Button onClick={onRefresh} color={color} variant={variant} {...props}>
    <RefreshIcon />
  </Button>
)

RefreshButton.propTypes = {
  onRefresh: PropTypes.func,
}

export default RefreshButton
