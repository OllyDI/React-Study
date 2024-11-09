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


function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"/></p>
      </form>
    </article>
  )
}


function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title, body);
      }}>
        {/* onChange: 값을 입력할 때마다 이벤트 발생 -> html은 커서가 벗어나야 이벤트 발생 */}
        <p><input type="text" name="title" placeholder="title" value={title} onChange={(e) => {
          setTitle(e.target.value);
        }}/></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={(e) => {
          setBody(e.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"/></p>
      </form>
    </article>
  )
}


function App() {
  var [mode, setMode] = useState('WELCOME');
  var [id, setId] = useState(null);
  var [nextId, setNextId] = useState(4);
  var [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'},
  ]);
  let content = null;
  let contextControl = null;

  if (mode == 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } 
  else if (mode == 'READ') {
    let title, body = null;

    topics.map((data, index) => {
      if (data.id == id) {
        title = data.title;
        body = data.body;
      }
    })
    content = <Article title={title} body={body}></Article>
    contextControl = <><
        li><a href={"/update/" + id} onClick={(e) => {
        e.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={(e) => {
        const newTopics = [];
        topics.map((data, index) => {
          if (data.id !== id) {
            newTopics.push(data);
          }
        })
        setTopics(newTopics);
        setMode('WELCOME');
      }}/></li>
    </>
  } 
  else if (mode == 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopics = [...topics];
      const newTopic = {id: nextId, title: title, body: body};

      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setMode('READ');
      setNextId(nextId + 1);
    }}></Create>
  } 
  else if (mode == 'UPDATE') {
    let title, body = null;

    topics.map((data, index) => {
      if (data.id == id) {
        title = data.title;
        body = data.body;
      }
    })

    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics];
      const updatedTopic = {id: id, title: title, body: body};
      console.log(id);
      topics.map((data, index) => {
        console.log(index);
        if (data.id == id) {
          newTopics[index] = updatedTopic;
        }
      })
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={(e) => {
          e.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;