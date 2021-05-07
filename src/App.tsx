import { useRef } from "react";
import { Scrollspy } from './Scrollspy'

const SIZE = 5;

function App() {
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <div className="App">
      <div>
        <Scrollspy sectionRefs={sectionRefs}>
          {() => (
            <div>
              <ul
                data-cy="nav-wrapper"
                style={{
                  listStyle: 'none',
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  padding: '1rem',
                }}>
                {new Array(SIZE).fill(0).map((_, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} data-cy={`nav-item`}>
                      section-{i}
                    </a>
                  </li>
                ))}
              </ul>
              <div data-cy="section-wrapper">
                {new Array(SIZE).fill(0).map((_, i) => (
                  <div
                    id={`section-${i}`}
                    data-cy={`section-item`}
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '500px',
                      backgroundColor: `#${i}${i}${i}`,
                      color: '#fff',
                      fontSize: '2rem',
                    }}>
                    {i}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Scrollspy>
      </div>
    </div>
  );
}

export default App;