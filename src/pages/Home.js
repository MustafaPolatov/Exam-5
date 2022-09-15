import React, { useEffect, useState } from 'react'
import "./style.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Home = () => {
  const [data, setData] = useState(
    {
      burger: [],
      coming: [],
      iceCream: [],
      pizza: []
    }
  )
  const [card, setCard] = useState([])
  const axios = require('axios').default;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("https://myjson.dit.upm.es/api/bins/6qau")
      .then((v) => {
        console.log(v.data);
        setData(v.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  function Korzina(v) {
    let a = [...card]
    a.push(v)
    setCard(a)
  }

  let navigate = useNavigate()

  function GotoPage() {
    navigate(
      "/korzinka",
      {
        state: card
      }
    )
  }

  function Like(i) {

  }

  console.log(card);
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
              <Button variant="primary" onClick={handleShow}>
                Launch
              </Button>

              <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Korzina</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {
                    card.map((v, i) => {
                      return <div>
                        <div className="card mb-2">
                          <img src={v.img} alt="" />
                          <div className="korzina_card">
                            <p>{v.name}</p>
                            <p>{v.price}</p>
                          </div>
                        </div>
                      </div>
                    })
                  }
                  <button onClick={() => GotoPage()} className="btn btn-success mt-2"> Go to Korzina Page</button>
                </Offcanvas.Body>
              </Offcanvas>
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
      <section>
        <div className="container">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Three" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="row">
                {
                  (data.burger.length > 0)
                    ? (
                      data.burger.map((v, i) => {
                        return <div className="col-4 p-3">
                          <div className="box">
                            <img src={v.img} alt="" className='img-fluid rasm_4' />
                            <div className="chet">
                              <h4 className='name-v'>{v.name}</h4>
                              <p className='price_v'>Som {v.price}</p>
                            </div>
                            <div className="d-flex">
                              <button className='button_otvor' onClick={() => Korzina(v)} >Korzinkaga qoshish</button>
                            </div>


                          </div>
                        </div>


                      })
                    )
                    : (<h1>Yoqol</h1>)
                }
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="row">
                {
                  (data.coming.length > 0)
                    ? (
                      data.coming.map((v, i) => {
                        return <div className="col-4 p-3">
                          <div className="box">
                            <img src={v.img} alt="" className='img-fluid rasm_4' />
                            <div className="chet">
                              <h4 className='name-v'>{v.name}</h4>
                              <p className='price_v'>Som {v.price}</p>
                            </div>
                            <button className='button_otvor' onClick={() => Korzina(v)} >Korzinkaga qoshish</button>
                          </div>
                        </div>


                      })
                    )
                    : (<h1>Yoqol</h1>)
                }
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="row">
                {
                  (data.iceCream.length > 0)
                    ? (
                      data.iceCream.map((v, i) => {
                        return <div className="col-4 p-3">
                          <div className="box">
                            <img src={v.img} alt="" className='img-fluid rasm_4' />
                            <div className="chet">
                              <h4 className='name-v'>{v.name}</h4>
                              <p className='price_v'>Som {v.price}</p>
                            </div>
                            <button className='button_otvor' onClick={() => Korzina(v)} >Korzinkaga qoshish</button>
                          </div>
                        </div>


                      })
                    )
                    : (<h1>Yoqol</h1>)
                }
              </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <div className="row">
                {
                  (data.pizza.length > 0)
                    ? (
                      data.pizza.map((v, i) => {
                        return <div className="col-4 p-3">
                          <div className="box">
                            <img src={v.img} alt="" className='img-fluid rasm_4' />
                            <div className="chet">
                              <h4 className='name-v'>{v.name}</h4>
                              <p className='price_v'>Som {v.price}</p>
                            </div>
                            <button className='button_otvor' onClick={() => Korzina(v)} >Korzinkaga qoshish</button>
                          </div>
                        </div>


                      })
                    )
                    : (<h1>Yoqol</h1>)
                }
              </div>
            </TabPanel>
          </Box>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-6 mt-4">
              <div>
                <p className='foot_p_1'>
                  Do you have a question
                  or want to become a seller?
                </p>
                <p>
                  Fill this form and our manager will contact you next 48 hours.
                </p>
                <div className="d-flex mb-2">
                  <input type="text" className='me-1 foot_input' placeholder='Your Name' />
                  <input type="text" className='foot_input' placeholder="Your Email" />
                </div>
                <textarea name="" id="" cols="48" rows="5" placeholder='Your message'></textarea>
              </div>
            </div>
            <div className="col-6">
              <img src="dostavka.png" alt="" />
            </div>
          </div>
        </div>
        <div className="pas-menu">
          <div className="menu-2">
            <ul>
              <li className='fs-3'>TBayEAT</li>
            </ul>
            <ul>
              <li className='ms-2 '>Home</li>
              <li className='ms-2 '>About</li>
              <li className='ms-2 '>Contact</li>
              <li className='ms-2 '>Login</li>
            </ul>
            <ul>
              <li>
                <img src="instagram.png" alt="" className='insta' />
              </li>
              <li>
                <img src="Facebook.png" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
