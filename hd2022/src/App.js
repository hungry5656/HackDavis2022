import './App.css';
import styled from 'styled-components'; 
import { Dropdown } from 'react-bootstrap'; 
import { useState } from 'react'; 

function App() {
  // JavaScript goes here 
  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;`;
  
  return (
    <div className="App">
      <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Please Enter your Vaccine info in the next page</h1>
          <h2>Select the vaccine type in the drop down menu</h2>
          <br></br>
          <Button onClick={() => document.getElementById("animalChoice").scrollIntoView()}> Get Started </Button>
        </div>
      </section>

      <section id="animalChoice" class="d-flex flex-column justify-content-center align-items-center">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Please enter your information below.</h1>
          <Dropdown>
            <Dropdown.Toggle>Animal</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => document.getElementById("dogSection").scrollIntoView()}> Dawg </Dropdown.Item>
              <Dropdown.Item onClick={() => document.getElementById("catSection").scrollIntoView()}> Cate </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </section>

      <section id="dogSection" class="d-flex flex-column justify-content-center align-items-center">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Please enter your information below.</h1>
          
        </div>
      </section>

      <section id="catSection" class="d-flex flex-column justify-content-center align-items-center">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Please enter your information below.</h1>
          
        </div>
      </section>
    </div>
  );
}

export default App;
