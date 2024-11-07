import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}


function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  );
}


function Nav(props) {
  const lis = [];

  props.topics.map((data, index) => (
    lis.push(
    <li key={data.id}>
      <a id={data.id} href={'/read/' + data.id} onClick={(e) => {
        e.preventDefault();
        props.onChangeMode(data.id);
      }}>{data.title}</a>
    </li>
    )))

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}


function App() {
  var [mode, setMode] = useState('WELCOME');
  var [id, setId] = useState(null);
  const TOPICS = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ];
  let content = null;

  if (mode == 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode == 'READ') {
    let title, body = null;

    // TOPICS.map((data, index) => {
    //   if (data.id == id) {
    //     title = data.title;
    //     body = data.body;
    //   }
    // })

    title = TOPICS[id - 1].title;
    body = TOPICS[id - 1].body;

    content = <Article title={title} body={body}></Article>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={TOPICS} onChangeMode={(id) => {
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
