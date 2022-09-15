import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./style.css"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';

const steps = ['Tanlang', 'Kartangizni Kiriting', 'Sotib Olindi'];

export const Korzinka = () => {


  let local = useLocation().state

  const [loc, setLoc] = useState(local)

  console.log(loc);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <header >
        <div className="menu">
          <ul>
            <li className='zag'>TBayEAT</li>
          </ul>
          <ul>
            <li className='orta_li'>Home</li>
            <li className='orta_li'>About</li>
            <li className='orta_li'>Menu</li>
            <li className='orta_li'>Contact</li>
          </ul>
          <ul>
            <li>
                <Link to="/" className='Back'>Back</Link>
            </li>
          </ul>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              <div>
                <p className='heder_zag'>Authentic local <br /> food in Tbay</p>
                <p className='lorem-header'>TBayEAT is a courier service in which authentic home cook food is delived to a customer</p>
                <div className='rozim'>
                  <input type="text" className='input_tic' />
                  <button className='Sell'>Sell</button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <img src="cuate.png" alt="" className='rasm_2' />
            </div>
          </div>
        </div>
      </header>

      
      <div className="container">
      <h2 className='m-3'>Product:</h2>
      {
        loc.map((v, i) => {
          return <div className="row card_korzin">
            <div className="col-12">
              <div className="row">
              
                <div className="col-4 d-flex">
                  
                  <img src={v.img} alt="" className='img-fluid rasm_korzin' />
                  <div>
                    <p className='korzina_p'>{v.name}</p>
                    <p className='korzina_p_2'>beef patties, Iceberg lettuce, American , ...</p>
                  </div>
                </div>
                <div className="col-8">
                    <div className='d-flex mt-3'>
                          <p className='korzin_price'> {v.price} Som</p>
                          <p className='korzin_desc'>{v.desc}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        })
      }
      
    <button variant="primary" className=' btn_modal btn btn-success' onClick={handleShow}>
       Sotib Olish
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <p>Salom</p>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  )
}
