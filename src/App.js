import logo from './logo.svg';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1><a href="/">{props.title}</a></h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];

  props.topics.map((data, index) => (
    lis.push(
    <li key={data.id}>
      <a href={'/read/' + data.id}>{data.title}</a>
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

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  const TOPICS = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ];
  return (
    <div>
      <Header title="REACT"></Header>
      <Nav topics={TOPICS}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
