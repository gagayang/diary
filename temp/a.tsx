import React , {Component} from 'react';

class A extends Component {
  state = {
    lang_env: 'en'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios.get('asdfas').then(res => {
      this.setState({
        lang_env: res.lang // 'GB'
      })
    })
  }
  render() {
    return <div>{lang_env ? this.props.children : null}</div>
  }
}

<A><content></content></A>
