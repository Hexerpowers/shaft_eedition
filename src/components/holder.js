import React from 'react';
import '../assets/css/styles.css';


class Holder extends React.Component {
    constructor(props) {
        super(props);
        this.onStep1Change = this.onStep1Change.bind(this)
        this.state = {
            holds:[1,0,0,0],
            steps:{
                step0:{},
                step1:{},
                step2:{},
                step3:{}
            }
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onStep0Change() {
        let t_holds=[...this.state.holds]
        t_holds[0]=0;
        t_holds[1]=1;
        let t_steps=this.state.steps;
        t_steps.step0={ready:1};
        this.setState({holds: t_holds, steps:t_steps});
    }

    onStep1Change(sub_state) {
        let t_holds=[...this.state.holds]
        t_holds[1]=0;
        t_holds[2]=1;
        let t_steps=this.state.steps;
        t_steps.step1=sub_state;
        this.setState({holds: t_holds, steps:t_steps});
    }

    onStep2Change(sub_state) {
        let t_holds=[...this.state.holds]
        t_holds[2]=0;
        t_holds[3]=1;
        let t_steps=this.state.steps;
        t_steps.step2=sub_state;
        this.setState({holds: t_holds, steps:t_steps});
    }

    render() {
        return (
            <div className="holder">
                <div className="info-bar flex flex-row">
                    <div className="info-bar-logo">КРУТОЕ ЛОГО</div>
                    <div className="info-bar-state">London is the capital of great britain (на старте рандом цитата, потом - состояние вычисления и ошибки ввода)</div>
                </div>
                <div className="flex">
                    <div className="nav flex-column nav-pills nav-block" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active pseudo-pill" id="v-main-tab" data-toggle="pill" href="#v-tabs-main" role="tab"
                           aria-controls="v-tabs-main" aria-selected="true">Главная</a>
                        <a className="nav-link pseudo-pill" id="v-shceme-tab" data-toggle="pill" href="#v-tabs-scheme" role="tab"
                           aria-controls="v-tabs-scheme" aria-selected="false">Выбор схемы</a>
                        <a className="nav-link pseudo-pill disabled" id="v-moment-tab" data-toggle="pill" href="#v-tabs-moment" role="tab"
                           aria-controls="v-tabs-moment" aria-selected="false">Ввод моментов</a>
                        <a className="nav-link pseudo-pill disabled" id="v-const-tab" data-toggle="pill" href="#v-tabs-const" role="tab"
                           aria-controls="v-tabs-const" aria-selected="false">Ввод констант</a>
                        <a className="nav-link pseudo-pill disabled" id="v-graphs-tab" data-toggle="pill" href="#v-tabs-graphs" role="tab"
                           aria-controls="v-tabs-graphs" aria-selected="false">Эпюры</a>
                        <a className="nav-link pseudo-pill disabled" id="v-report-tab" data-toggle="pill" href="#v-tabs-report" role="tab"
                           aria-controls="v-tabs-report" aria-selected="false">Отчёт</a>
                    </div>
                    <div className="tab-content nav-tabs" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-tabs-main" role="tabpanel"
                             aria-labelledby="v-main-tab">
                            <div className="main-tab">
                                <h1 className="h1-h1">Добро пожаловать в Shaft E-edition</h1>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-scheme" role="tabpanel"
                             aria-labelledby="v-scheme-tab">...2
                        </div>
                        <div className="tab-pane fade" id="v-tabs-moment" role="tabpanel"
                             aria-labelledby="v-moment-tab">...3
                        </div>
                        <div className="tab-pane fade" id="v-tabs-const" role="tabpanel"
                             aria-labelledby="v-const-tab">...4
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
