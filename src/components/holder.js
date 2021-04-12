import logo from '../assets/img/logo.svg';
import '../assets/css/styles.css';

function Holder() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Очень странная страница но почему-то работает...
        </p>
      </header>
    </div>
  );
}

export default Holder;
