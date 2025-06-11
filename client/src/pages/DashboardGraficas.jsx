// DashboardGrafica.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { resumenRapido, resumenFinal, datosGenerales, obtenerIngresosMensuales } from './../api/graficas.js';
import './DashboardGraficas.css';

const DashboardGrafica = () => {
  const [datosIngresos, setDatosIngresos] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      const datos = await obtenerIngresosMensuales();
      setDatosIngresos(datos);
    }
    cargarDatos();
  }, []);

  return (
    <div className="layout-wrapper layout-2">
      <div className="layout-inner">
        <div className="layout-container">
          <div className="layout-content">
            <div className="container-fluid flex-grow-1 container-p-y">

              <div className="row">
                {/* Primera Fila */}
                <div className="col-lg-7">
                  <div className="card mb-4">
                    <div className="card-header with-elements">
                      <h6 className="card-header-title mb-0">Estadísticas de Ingresos Mensuales</h6>
                      <div className="card-header-elements ml-auto">
                        <label className="text m-0">
                          <span className="text-light text-tiny font-weight-semibold align-middle">
                            MOSTRAR ESTADÍSTICAS
                          </span>
                          <span className="switcher switcher-sm d-inline-block align-middle mr-0 ml-2">
                            <input type="checkbox" className="switcher-input" defaultChecked />
                            <span className="switcher-indicator">
                              <span className="switcher-yes"></span>
                              <span className="switcher-no"></span>
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* Gráfica renderizada */}
                      <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                          <LineChart data={datosIngresos}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Line type="monotone" dataKey="ingresos" stroke="#8884d8" activeDot={{ r: 8 }} name="Ingresos ($)" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card mb-4 bg-pattern-2-dark">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="lnr lnr-car display-4 text-primary"></div>
                            <div className="ml-3">
                              <div className="text-muted small">Vehículos registrados</div>
                              <div className="text-large">{datosGenerales.vehiculosRegistrados}</div>
                            </div>
                          </div>
                          <div id="vehicles-chart" className="mt-3 chart-shadow-primary" style={{ height: '40px' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card mb-4 bg-pattern-2 bg-primary text-white">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="lnr lnr-clock display-4"></div>
                            <div className="ml-3">
                              <div className="small">Horas de ocupación</div>
                              <div className="text-large">{datosGenerales.horasOcupacion}</div>
                            </div>
                          </div>
                          <div id="hours-chart" className="mt-3 chart-shadow" style={{ height: '40px' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="card d-flex w-100 mb-4">
                        <div className="row no-gutters row-bordered row-border-light h-100">

                          {/* Metric Cards */}
                          {resumenRapido.map((item, index) => (
                            <div key={index} className="d-flex col-sm-6 col-md-4 col-lg-6 align-items-center">
                              <div className="card-body media align-items-center text-dark">
                                <i className={`${item.icon} display-4 d-block text-primary`}></i>
                                <span className="media-body d-block ml-3">
                                  <span className="text-big mr-1 text-primary">{item.value}</span><br />
                                  <small className="text-muted">{item.label}</small>
                                </span>
                              </div>
                            </div>
                          ))}

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Segunda Fila */}
              <div className="row">
                <div className="col-md-12">
                  <div className="card d-flex w-100 mb-4">
                    <div className="row no-gutters row-bordered row-border-light h-100">

                      {/* Summary Cards */}
                      {resumenFinal.map((item, index) => (
                        <div key={index} className="d-flex col-md-6 col-lg-3 align-items-center">
                          <div className="card-body">
                            <div className="row align-items-center mb-3">
                              <div className="col-auto">
                                <i className={`${item.icon} text-primary display-4`}></i>
                              </div>
                              <div className="col">
                                <h6 className="mb-0 text-muted">{item.title}</h6>
                                <h4 className="mt-3 mb-0">{item.value}<i className={item.iconTrend}></i></h4>
                              </div>
                            </div>
                            <p className="mb-0 text-muted">{item.description}</p>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrafica;
