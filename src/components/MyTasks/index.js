import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Tag from '../Tag/index'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

export default class MyTasks extends Component {
  state = {
    taskText: '',
    tagText: tagsList[0].optionId,
    tasksList: [],
    selectedTag: '',
  }

  onChangeTask = event => {
    this.setState({taskText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({tagText: event.target.value})
  }

  onClickSubmit = () => {
    const {taskText, tagText} = this.state
    const taskData = {taskText, tag: tagText, id: uuidv4()}
    console.log(taskData)
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, taskData],
      taskText: '',
      tagText: tagsList[0].optionId,
    }))
  }

  onSelectedTag = id => {
    const {selectedTag} = this.state
    if (selectedTag === id) {
      this.setState({selectedTag: ''})
    } else {
      this.setState({selectedTag: id})
    }
  }

  render() {
    const {taskText, tagText, selectedTag, tasksList} = this.state
    const filteredList = tasksList.filter(item =>
      item.tag.includes(selectedTag),
    )
    return (
      <div className="bg-container">
        <form className="form-container">
          <h1 className="form-title">Create a task!</h1>
          <label className="form-label" htmlFor="task">
            Task
          </label>
          <input
            id="task"
            className="form-input"
            type="text"
            placeholder="Enter the task here"
            onChange={this.onChangeTask}
            value={taskText}
          />
          <label className="form-label" htmlFor="select">
            Tags
          </label>
          <select
            id="select"
            className="form-input"
            onChange={this.onChangeTag}
            value={tagText}
          >
            {tagsList.map(item => (
              <option key={item.optionId} value={item.optionId}>
                {item.displayText}
              </option>
            ))}
          </select>
          <button
            className="form-button"
            type="button"
            onClick={this.onClickSubmit}
          >
            Add Task
          </button>
        </form>
        <div className="right-container">
          <h1 className="right-container-tag">Tags</h1>
          <ul className="right-tag-container">
            {tagsList.map(item => (
              <Tag
                item={item}
                selectTag={this.onSelectedTag}
                key={item.optionId}
              />
            ))}
          </ul>
          <h2 className="right-head">Tasks</h2>
          {filteredList.length === 0 ? (
            <p className="para">No Tasks Added Yet</p>
          ) : (
            <ul>
              {filteredList.map(item => (
                <li className="list">
                  <p>{item.taskText}</p>
                  <p className="tag">{item.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
