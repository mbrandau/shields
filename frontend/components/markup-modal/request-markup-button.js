import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select, { components } from 'react-select'
import { generateMarkup } from '../../lib/generate-image-markup'

const ClickableControl = props => (
  <components.Control
    {...props}
    innerProps={{
      onMouseDown: props.selectProps.onControlMouseDown,
    }}
  />
)

const MarkupFormatSelect = styled(Select)`
  width: 200px;

  margin-left: auto;
  margin-right: auto;

  font-family: 'Lato', sans-serif;
  font-size: 12px;

  .markup-format__control {
    background-image: linear-gradient(-180deg, #00aeff 0%, #0076ff 100%);
    border: 1px solid rgba(238, 239, 241, 0.8);
    border-width: 0;
    box-shadow: unset;
    cursor: copy;
  }

  .markup-format__control--is-disabled {
    background: rgba(0, 118, 255, 0.3);
    cursor: none;
  }

  .markup-format__placeholder {
    color: #eeeff1;
  }

  .markup-format__indicator {
    color: rgba(238, 239, 241, 0.81);
    cursor: pointer;
  }

  .markup-format__indicator:hover {
    color: #eeeff1;
  }

  .markup-format__control--is-focused .markup-format__indicator,
  .markup-format__control--is-focused .markup-format__indicator:hover {
    color: #ffffff;
  }

  .markup-format__option {
    text-align: left;
    cursor: copy;
  }
`

const markupOptions = [
  { value: 'markdown', label: 'Copy Markdown' },
  { value: 'rst', label: 'Copy reStructuredText' },
  { value: 'asciidoc', label: 'Copy AsciiDoc' },
  { value: 'html', label: 'Copy HTML' },
]

class GetMarkupButton extends React.PureComponent {
  selectRef = React.createRef()

  onControlMouseDown = async event => {
    const { selectRef } = this
    const { onMarkupRequested } = this.props

    if (onMarkupRequested) {
      await onMarkupRequested('link')
    }
    selectRef.current.blur()
  }

  onOptionClick = async ({ value: markupFormat }) => {
    const { onMarkupRequested } = this.props
    if (onMarkupRequested) {
      await onMarkupRequested(markupFormat)
    }
  }

  render() {
    const { isDisabled } = this.props

    return (
      <MarkupFormatSelect
        ref={this.selectRef}
        options={markupOptions}
        placeholder="Copy Badge URL"
        value=""
        isDisabled={isDisabled}
        closeMenuOnScroll
        blurInputOnSelect
        menuPlacement="auto"
        isSearchable={false}
        onControlMouseDown={this.onControlMouseDown}
        onChange={this.onOptionClick}
        classNamePrefix="markup-format"
        components={{
          Control: ClickableControl,
        }}
      />
    )
  }
}
GetMarkupButton.propTypes = {
  onMarkupRequested: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
}
export default GetMarkupButton
