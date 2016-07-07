import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';

const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomStr = (stringLength, characters) => {
  return Array.apply(null, new Array(stringLength)).map(function () {
      return characters[Math.floor(Math.random() * characters.length)];
  }).join('');
};

const generateData = (count, characters) => {
  const arr = Array(count).fill(1);
  return arr.map((item, idx) => {
    return {
      id: idx,
      text: randomStr(5, characters)
    }
  })
};

const filterWithStartsWith = (list, startsWith) => {
  return list.filter(item => item.text.startsWith(startsWith));
};

class Typeahead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: props.list
    };
  }

  onChange(evt, filteredList) {
    this.setState({
      filteredList: filterWithStartsWith(filteredList, evt.target.value)
    });
  }

  render() {
    const filteredList = this.state.filteredList;
    return (
      <div>
        <input type="text" onKeyUp={evt => this.onChange(evt, this.props.list)} />
        <ul>
          {filteredList.map(item => <li key={item.id}>{item.text}</li>)}
        </ul>
      </div>
    );
  }
}

const listElementCount = 2000;
const data = generateData(listElementCount, possibleCharacters);

InfernoDOM.render(<Typeahead list={data} />, document.body);