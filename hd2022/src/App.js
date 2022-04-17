import './App.css';

function App() {
  // JavaScript goes here 
  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
  function helloW(){
    alert("Hello!");
  }

  return (
    <div className="App">
      <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Please Enter your Vaccine info in the next page</h1>
          <h2>Select the vaccine type in the drop down menu</h2>
          <br></br>
          <Button onClick="helloW()">
          Next
          </Button>
          {/* <a href="#start" class="btn-get-started scrollto">Get Started</a> */}
        </div>
      </section>
      <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Please Enter your Vaccine info in the next page</h1>
          <h2>Select the vaccine type in the drop down menu</h2>
          {/* <a href="#start" class="btn-get-started scrollto">Get Started</a> */}
        </div>
      </section>
    </div>
  );
}

export default App;
