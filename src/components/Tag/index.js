const Tag = props => {
  const {item, selectTag} = props
  const {displayText, optionId} = item
  const onSelectTag = () => {
    selectTag(optionId)
  }
  return (
    <li className="list-style">
      <button
        type="button"
        className="right-container-button"
        onClick={onSelectTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tag
