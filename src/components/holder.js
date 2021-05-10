import React from 'react';
import '../assets/css/styles.css';
import Chart from 'chart.js/auto';


class Holder extends React.Component {
    constructor(props) {
        super(props);
        this.scheme_select_change = this.scheme_select_change.bind(this)
        this.params_shaft_change = this.params_shaft_change.bind(this)
        this.moments_yz_change = this.moments_yz_change.bind(this)
        this.moment_x_change = this.moment_x_change.bind(this)
        this.allowed_change = this.allowed_change.bind(this)
        this.resilience_change = this.resilience_change.bind(this)
        this.calculate = this.calculate.bind(this)
        this.state = {
            scheme_img: "1.png",
            scheme:1,
            slices:[2,7,4,9],
            shaft_params:[[],[]],
            moment_x:0,
            moments_yz:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
            allowed_values:[],
            resilience_modulus:[],
            calculated:"disabled"
        };
        let plot_Mx;
        let plot_My;
        let plot_Mz;
    }

    componentDidMount() {
        let ctx_x = document.getElementById('plot_Mx').getContext('2d');
        let ctx_y = document.getElementById('plot_My').getContext('2d');
        let ctx_z = document.getElementById('plot_Mz').getContext('2d');
        this.plot_Mx = new Chart(ctx_x, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: "Момент Mx",
                    data: [
                        {
                            x: 1,
                            y: 0
                        }, {
                            x: 1,
                            y: 0
                        }, {
                            x: 2,
                            y: 0
                        }, {
                            x: 2,
                            y: 0
                        }, {
                            x: 3,
                            y: 0
                        }, {
                            x: 3,
                            y: 0
                        }, {
                            x: 4,
                            y: 0
                        }, {
                            x: 4,
                            y: 0
                        }, {
                            x: 5,
                            y: 0
                        }, {
                            x: 5,
                            y: 0
                        }, {
                            x: 6,
                            y: 0
                        }, {
                            x: 6,
                            y: 0
                        }, {
                            x: 7,
                            y: 0
                        }, {
                            x: 7,
                            y: 0
                        }, {
                            x: 8,
                            y: 0
                        }, {
                            x: 8,
                            y: 0
                        }, {
                            x: 9,
                            y: 0
                        }, {
                            x: 9,
                            y: 0
                        }, {
                            x: 10,
                            y: 0
                        }, {
                            x: 10,
                            y: 0
                        }
                    ],
                    fill: true,
                    borderColor: 'rgb(47,255,75)',
                    borderWidth: 2,
                    tension:0
                }]
            },
            options: {
                borderJoinStyle:'round',
                borderCapStyle:'round',
                pointRadius: 0,
                responsive: true,
                showLine:true,
                scales: {
                    y: {
                        //min: 0,
                        suggestedMax: 200
                    },
                    x:{
                        min: 1,
                        ticks: {
                            beginAtZero: true,
                            min: 1,
                            stepSize: 1
                        },
                        suggestedMax: 10
                    }
                }
            }
        });
        this.plot_My = new Chart(ctx_y, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: "Момент My",
                    data: [
                        {
                            x: 1,
                            y: 0
                        }, {
                            x: 1,
                            y: 0
                        }, {
                            x: 2,
                            y: 0
                        }, {
                            x: 2,
                            y: 0
                        }, {
                            x: 3,
                            y: 0
                        }, {
                            x: 3,
                            y: 0
                        }, {
                            x: 4,
                            y: 0
                        }, {
                            x: 4,
                            y: 0
                        }, {
                            x: 5,
                            y: 0
                        }, {
                            x: 5,
                            y: 0
                        }, {
                            x: 6,
                            y: 0
                        }, {
                            x: 6,
                            y: 0
                        }, {
                            x: 7,
                            y: 0
                        }, {
                            x: 7,
                            y: 0
                        }, {
                            x: 8,
                            y: 0
                        }, {
                            x: 8,
                            y: 0
                        }, {
                            x: 9,
                            y: 0
                        }, {
                            x: 9,
                            y: 0
                        }, {
                            x: 10,
                            y: 0
                        }, {
                            x: 10,
                            y: 0
                        }
                    ],
                    fill: true,
                    borderColor: 'rgb(255,30,64)',
                    borderWidth: 2,
                    tension:0.1
                }]
            },
            options: {
                borderJoinStyle:'round',
                borderCapStyle:'round',
                pointRadius: 0,
                responsive: true,
                showLine:true,
                scales: {
                    x:{
                        min: 1,
                        ticks: {
                            beginAtZero: true,
                            min: 1,
                            stepSize: 1
                        },
                        suggestedMax: 10
                    }
                }
            }
        });
        this.plot_Mz = new Chart(ctx_z, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: "Момент Mz",
                    data: [
                        {
                            x: 1,
                            y: 0
                        }, {
                            x: 1,
                            y: 0
                        }, {
                            x: 2,
                            y: 0
                        }, {
                            x: 2,
                            y: 0
                        }, {
                            x: 3,
                            y: 0
                        }, {
                            x: 3,
                            y: 0
                        }, {
                            x: 4,
                            y: 0
                        }, {
                            x: 4,
                            y: 0
                        }, {
                            x: 5,
                            y: 0
                        }, {
                            x: 5,
                            y: 0
                        }, {
                            x: 6,
                            y: 0
                        }, {
                            x: 6,
                            y: 0
                        }, {
                            x: 7,
                            y: 0
                        }, {
                            x: 7,
                            y: 0
                        }, {
                            x: 8,
                            y: 0
                        }, {
                            x: 8,
                            y: 0
                        }, {
                            x: 9,
                            y: 0
                        }, {
                            x: 9,
                            y: 0
                        }, {
                            x: 10,
                            y: 0
                        }, {
                            x: 10,
                            y: 0
                        }
                    ],
                    fill: true,
                    borderColor: 'rgb(64,30,255)',
                    borderWidth: 2,
                    tension:0.1
                }]
            },
            options: {
                borderJoinStyle:'round',
                borderCapStyle:'round',
                pointRadius: 0,
                responsive: true,
                showLine:true,
                scales: {
                    x:{
                        min: 1,
                        ticks: {
                            beginAtZero: true,
                            min: 1,
                            stepSize: 1
                        },
                        suggestedMax: 10
                    }
                }
            }
        });


    }

    componentWillUnmount() {

    }

    calculate(event){

    }

    params_shaft_change(event,x,y){
        let t_sp=this.state.shaft_params
        t_sp[x][y]=event.target.value
        console.log(t_sp)
        this.setState({shaft_params: t_sp});
    }

    moments_yz_change(event,y,x){
        let t_m_yz=this.state.moments_yz
        t_m_yz[x][y]=event.target.value
        let x_1;
        if(x>1){
            if(x===2){
                x_1=0
            }else{
                x_1=1;
            }
            //Момент Mz
            this.plot_Mz.data.datasets[0].data[y*2+x_1+1].y=Number(event.target.value);
            this.plot_Mz.update();
        }else{
            if(x===0){
                x_1=0
            }else{
                x_1=1;
            }
            //Момент My
            this.plot_My.data.datasets[0].data[y*2+x_1+1].y=Number(event.target.value);
            this.plot_My.update();
        }
        console.log(t_m_yz)
        this.setState({moments_yz: t_m_yz});
    }

    moment_x_change(event){
        this.setState({moment_x: event.target.value});
        for (let i = this.state.slices[2]*2-1; i < this.state.slices[3]*2-1; i++) {
            this.plot_Mx.data.datasets[0].data[i].y=Number(event.target.value);
        }
        this.plot_Mx.update();
    }

    allowed_change(event,x){
        let t_al=this.state.allowed_values
        t_al[x]=event.target.value
        this.setState({allowed_values: event.target.value});
    }

    resilience_change(event, x){
        let t_re=this.state.resilience_modulus
        t_re[x]=event.target.value
        this.setState({resilience_modulus: event.target.value});
    }

    scheme_select_change(event) {
        this.setState({scheme_img: event.target.value});
        let type=Number(event.target.value.replace('.png',''))
        this.setState({scheme: type});
        if (type===1){
            this.setState({slices: [2,7,4,9]});
        }
        if (type===2){
            this.setState({slices: [2,9,4,7]});
        }
        if (type===3){
            this.setState({slices: [4,7,2,9]});
        }
        if (type===4){
            this.setState({slices: [4,9,2,7]});
        }
    }

    render() {
        return (
            <div className="holder">
                <div className="info-bar flex flex-row">
                    <div className="info-bar-logo">КРУТОЕ ЛОГО</div>
                    <div className="info-bar-state">London is the capital of great britain (на старте рандом цитата,
                        потом - состояние вычисления и ошибки ввода)
                    </div>
                </div>
                <div className="d-flex">
                    <div className="nav flex-column nav-pills nav-block" id="v-pills-tab" role="tablist"
                         aria-orientation="vertical">
                        <a className="nav-link active pseudo-pill" id="v-main-tab" data-toggle="pill"
                           href="#v-tabs-main"
                           role="tab" aria-controls="v-tabs-main" aria-selected="true">Главная</a>
                        <a className="nav-link pseudo-pill" id="v-scheme-tab" data-toggle="pill" href="#v-tabs-scheme"
                           role="tab" aria-controls="v-tabs-scheme" aria-selected="false">Выбор схемы</a>
                        <a className="nav-link pseudo-pill" id="v-moment-tab" data-toggle="pill" href="#v-tabs-moment"
                           role="tab" aria-controls="v-tabs-moment" aria-selected="false">Ввод моментов</a>
                        <a className="nav-link pseudo-pill" id="v-const-tab" data-toggle="pill" href="#v-tabs-const"
                           role="tab" aria-controls="v-tabs-const" aria-selected="false">Ввод констант</a>
                        <a className={"nav-link pseudo-pill "+this.state.calculated} id="v-graphs-tab" data-toggle="pill"
                           href="#v-tabs-graphs"
                           role="tab" aria-controls="v-tabs-graphs" aria-selected="false">Эпюры</a>
                        <a className={"nav-link pseudo-pill "+this.state.calculated} id="v-report-tab" data-toggle="pill"
                           href="#v-tabs-report"
                           role="tab" aria-controls="v-tabs-report" aria-selected="false">Отчёт</a>
                    </div>
                    <div className="tab-content nav-tabs" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-tabs-main" role="tabpanel"
                             aria-labelledby="v-main-tab">
                            <div className="main-tab"><h1 className="h1-h1">Добро пожаловать в Shaft E-edition</h1>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-scheme" role="tabpanel"
                             aria-labelledby="v-scheme-tab">
                            <div className="scheme-tab">
                                <div className="d-flex flex-column">
                                    <div className="flex flex-row sys-block-1">
                                        <div className="flex flex-column">
                                            <h2 className="h2-h2 mt-2">
                                                1. Выберите схему вала
                                            </h2>
                                            <select defaultValue={'1.png'} className="custom-select"
                                                    onChange={this.scheme_select_change}>
                                                <option value="1.png"> П-К-П-К</option>
                                                <option value="2.png"> П-К-К-П</option>
                                                <option value="3.png"> К-П-П-К</option>
                                                <option value="4.png"> К-П-К-П</option>
                                            </select>
                                            <div className="input-1">
                                                <label className="mt-2" htmlFor="basic-url">Номера сечений, N:</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                <span className="input-group-text igt-sch-1"
                                                      id="basic-addon3">левого подшипника</span>
                                                    </div>
                                                    <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="basic-addon2">{this.state.slices[0]}</span>
                                                    </div>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                <span className="input-group-text igt-sch-1"
                                                      id="basic-addon3">правого подшипника</span>
                                                    </div>
                                                    <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="basic-addon2">{this.state.slices[1]}</span>
                                                    </div>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                <span className="input-group-text igt-sch-1"
                                                      id="basic-addon3">левого колеса</span>
                                                    </div>
                                                    <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="basic-addon2">{this.state.slices[2]}</span>
                                                    </div>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                <span className="input-group-text igt-sch-1"
                                                      id="basic-addon3">правого колеса</span>
                                                    </div>
                                                    <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="basic-addon2">{this.state.slices[3]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scheme-img">
                                            <img className="scheme-img-self"
                                                 src={"./resources/img/scheme_select/" + this.state.scheme_img}/>
                                        </div>
                                    </div>
                                    <h2 className="h2-h2 mt-0">
                                        2. Введите параметры схемы ступенчатого вала
                                    </h2>
                                    <div className="d-flex flex-row">
                                        <table className="table table-striped table-bordered table-moments">
                                            <thead>
                                            <tr>
                                                <th className="col-sm-12 col-md-2 col-hd-wd-2">Номер ступени</th>
                                                <th className="col-sm-12 col-md-2 col-hd-wd-3">1</th>
                                                <th className="col-sm-12 col-md-2 col-hd-wd-3">2</th>
                                                <th className="col-sm-12 col-md-2 col-hd-wd-3">3</th>
                                                <th className="col-sm-12 col-md-2 col-hd-wd-3">4</th>
                                                <th className="col-sm-12 col-md-2 col-hd-wd-3">5</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><span className="col-dm-2">Длина ступени, мм</span></td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,0,0)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,0,1)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,0,2)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,0,3)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,0,4)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="col-dm-2">Диаметр ступени, мм</span></td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,1,0)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,1,1)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,1,2)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,1,3)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event,1,4)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-moment" role="tabpanel"
                             aria-labelledby="v-moment-tab">
                            <div className="moments-tab">
                                <div className="sys-block-3 d-flex flex-column">
                                    <div className="flex flex-row moment-ctr">
                                        <div className="flex flex-column">
                                            <h2 className="h2-h2">
                                                3. Введите моменты My и Mz
                                            </h2>
                                            <div className="d-flex">
                                                <table className="table table-striped table-bordered table-moments">
                                                    <thead>
                                                    <tr>
                                                        <th className="col-sm-12 col-md-2 col-hd-wd-0">N</th>
                                                        <th className="col-sm-12 col-md-2 col-hd-wd-1">My левый</th>
                                                        <th className="col-sm-12 col-md-2 col-hd-wd-1">My правый</th>
                                                        <th className="col-sm-12 col-md-2 col-hd-wd-1">Mz левый</th>
                                                        <th className="col-sm-12 col-md-2 col-hd-wd-1">Mz правый</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td><span className="col-dm-1">#1</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,0,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,0,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,0,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,0,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#2</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,1,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,1,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,1,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,1,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#3</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,2,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,2,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,2,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,2,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#4</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,3,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,3,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,3,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,3,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#5</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,4,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,4,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,4,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,4,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#6</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,5,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,5,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,5,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,5,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#7</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,6,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,6,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,6,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,6,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#8</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,7,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,7,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,7,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,7,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#9</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,8,0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,8,1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,8,2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event,8,3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="moment-img">
                                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                                <img className="moments-img-self"
                                                     src={"./resources/img/moments_select/" + this.state.scheme_img}
                                                     alt="image"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row mt-0">
                                        <div className="d-flex flex-column sys-block-3">
                                            <h2 className="h2-h2 mt-2">
                                                4. Введите момент Mx
                                            </h2>
                                            <label className="mt-1" htmlFor="basic-url">Момент</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"
                                                          id="basic-addon3">Mx=</span>
                                                </div>
                                                <input
                                                    onChange={(event) => this.moment_x_change(event)}
                                                    type="text" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="plot_Mx sys-block-2">
                                            <canvas id="plot_Mx" width="300" height="160"> </canvas>
                                        </div>
                                        <div className="plot_My sys-block-2">
                                            <canvas id="plot_My" width="300" height="160"> </canvas>
                                        </div>
                                        <div className="plot_Mz sys-block-2">
                                            <canvas id="plot_Mz" width="300" height="160"> </canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-const" role="tabpanel"
                             aria-labelledby="v-const-tab">
                            <div className="const-tab">
                                <div className="d-flex flex-column">
                                    <h2 className="h2-h2 mt-0 mb-3">
                                        5. Введите допускаемые величины
                                    </h2>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Относительный угол закручивания вала между зубчатыми колёсами
                                                </span>
                                        </div>
                                        <input type="text"
                                               onChange={(event) => this.const_allowed_change(event,0)}
                                               className="form-control" placeholder="град/мм"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Угол наклона зубчатого колеса из своей плоскости
                                                </span>
                                        </div>
                                        <input type="text"
                                               onChange={(event) => this.const_allowed_change(event,1)}
                                        className="form-control" placeholder="град"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Взаимный угол наклона внутреннего и внешнего колец подшипника
                                                </span>
                                        </div>
                                        <input type="text"
                                               onChange={(event) => this.const_allowed_change(event,2)}
                                               className="form-control" placeholder="град"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Относительный максимальный прогиб вала между опорами
                                                </span>
                                        </div>

                                        <input type="text"
                                               onChange={(event) => this.const_allowed_change(event,3)}
                                               className="form-control" placeholder="мм"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Относительный максимальный прогиб консольных частей вала
                                                </span>
                                        </div>
                                        <input type="text"
                                               onChange={(event) => this.const_allowed_change(event,4)}
                                               className="form-control" placeholder="мм"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>

                                    <h2 className="h2-h2 mt-4 mb-3">
                                        6. Введите модули упругости
                                    </h2>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Модуль Юнга
                                                </span>
                                        </div>

                                        <input type="text"
                                               onChange={(event) => this.const_resilience_change(event,0)}
                                               className="form-control" placeholder="ГПа"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                <span className="input-group-text sys-block-4"
                                                      id="basic-addon3">
                                                    Модуль сдвига
                                                </span>
                                        </div>

                                        <input type="text"
                                               onChange={(event) => this.const_resilience_change(event,1)}
                                               className="form-control" placeholder="ГПа"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <h2 className="h2-h2 mt-4 mt-4">
                                        7. Нажмите кнопушку
                                    </h2>
                                    <button type="button" onClick={this.calculate} className="btn btn-primary mt-1 btn-lg calc-btn">Расчитать
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-graphs" role="tabpanel"
                             aria-labelledby="v-graphs-tab">...4
                        </div>
                        <div className="tab-pane fade" id="v-tabs-report" role="tabpanel"
                             aria-labelledby="v-report-tab">...4
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Holder;
