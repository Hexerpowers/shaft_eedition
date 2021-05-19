import React from 'react';
import '../assets/css/styles.css';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2'


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
            scheme: 1,
            slices: [2, 7, 4, 9],
            shaft_params: [
                [
                    150,
                    200,
                    350,
                    150,
                    100
                ],
                [
                    56,
                    60,
                    67,
                    56,
                    53
                ]
            ],
            moment_x: 110,
            moments_yz: [
                [
                    0,
                    0,
                    -100,
                    -300,
                    -250,
                    -200,
                    -150,
                    -100,
                    0,
                    0
                ],
                [
                    0,
                    -100,
                    -300,
                    -200,
                    -200,
                    -200,
                    -100,
                    -10,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    -50,
                    -100,
                    -100,
                    -200,
                    -250,
                    -100,
                    0,
                    0
                ],
                [
                    0,
                    -50,
                    -100,
                    -115,
                    -200,
                    -225,
                    -100,
                    30,
                    0,
                    0
                ]
            ],
            allowed_values: [
                0.5157,
                0.0573,
                0.2865,
                0.0005,
                0.0010,
                1,
                1,
                1
            ],
            resilience_modulus: [200, 80],
            calculated: "disabled",
            real_values: [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            check_pass: [
                'Не нарушено',
                'Не нарушено',
                'Не нарушено',
                'Не нарушено',
                'Не нарушено',
                'Не нарушено',
                'Не нарушено',
                'Не нарушено',
            ],
            try_n:0
        };
        let plot_Mx;
        let plot_My;
        let plot_Mz;

        let plot_Oy;
        let plot_Oz;
        let plot_W;
        let plot_V;
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
                    tension: 0
                }]
            },
            options: {
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                pointRadius: 0,
                responsive: true,
                showLine: true,
                scales: {
                    y: {
                        //min: 0,
                        suggestedMax: 1
                    },
                    x: {
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
                    tension: 0.1
                }]
            },
            options: {
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                pointRadius: 0,
                responsive: true,
                showLine: true,
                scales: {
                    x: {
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
                    tension: 0.1
                }]
            },
            options: {
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                pointRadius: 0,
                responsive: true,
                showLine: true,
                scales: {
                    x: {
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

    calculate() {
        Swal.fire({
            title: '...Вычисляем...',
            html: 'Вы можете свернуть окно',
            timer: 900,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                setTimeout(() => {
                    if(this.state.try_n>0){
                        this.plot_Oy.destroy()
                        this.plot_Oz.destroy()
                        this.plot_W.destroy()
                        this.plot_V.destroy()
                    }
                    this.setState({try_n: 10});
                    let pi = 3.141592
                    let l = this.state.shaft_params[0]
                    let d = this.state.shaft_params[1]
                    let Mx = this.state.moment_x
                    let M = this.state.moments_yz
                    const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));
                    M = transpose(M)
                    let E = this.state.resilience_modulus[0]
                    let G = this.state.resilience_modulus[1]
                    let scheme = this.state.scheme
                    let I = []
                    let Ip = []
                    let Kl
                    let Kr
                    let Lzub
                    let Opor
                    let Zl
                    let L
                    let Zr

                    let Zakr = this.state.allowed_values[0]
                    let Nakl = this.state.allowed_values[1]
                    let NaklPod = this.state.allowed_values[2]
                    let MaxOporProg = this.state.allowed_values[3]
                    let MaxKonsProg = this.state.allowed_values[4]

                    for (let i = 0; i < 5; i++) {
                        I[i] = pi * Math.pow(d[i], 4) / 64
                        Ip[i] = pi * Math.pow(d[i], 4) / 32
                    }

                    function inp(x) {
                        if (x >= 0 && x <= l[0]) return I[0]
                        if (x > l[0] && x <= l[0] + l[1]) return I[1]
                        if (x > l[0] + l[1] && x <= l[0] + l[1] + l[2]) return I[2]
                        if (x > l[0] + l[1] + l[2] && x <= l[0] + l[1] + l[2] + l[3]) return I[3]
                        if (x > l[0] + l[1] + l[2] + l[3] && x <= l[0] + l[1] + l[2] + l[3] + l[4]) return I[4]
                    }

                    L = l[0] + l[1] + l[2] + l[3] + l[4]

                    if (scheme === 1) {
                        Kl = l[0] / 2
                        Kr = l[3] / 2 + l[4]
                        Zl = l[0] + l[1] / 2
                        Zr=l[4]/2
                        Lzub =L-Zl-Zr
                        //l[1] / 2 + l[2] + l[3] + l[4] / 2
                    }
                    if (scheme === 2) {
                        Kl = l[0] / 2
                        Kr = l[4] / 2
                        Zl = l[0] + l[1] / 2
                        Zr=l[4]+l[3]/2
                        Lzub =L-Zl-Zr
                    }
                    if (scheme === 4) {
                        Kl = l[0] + l[1] / 2
                        Kr = l[4] / 2
                        Zl = l[0]/2
                        Zr=l[4]+l[3]/2
                        Lzub =L-Zl-Zr
                    }
                    if (scheme === 3) {
                        Kl = l[0] + l[1] / 2
                        Kr = l[4] + l[3] / 2
                        Zl = l[0]/2
                        Zr=l[4]/2
                        Lzub =L-Zl-Zr
                    }

                    Opor = L - Kr - Kl

                    function MyE(x) {
                        if ((x >= 0) && (x <= l[0] / 2)) {
                            return 2 * x * (M[0][1] - M[0][0]) / l[0] + M[0][0]
                        } else if (x <= l[0]) {
                            return 2 * x * (M[1][1] - M[1][0]) / l[0] + M[1][0] + (M[1][0] - M[1][1])
                        } else if (x <= l[0] + l[1] / 2) {
                            return 2 * x * (M[2][1] - M[2][0]) / l[1] + M[2][0] + 2 * (M[2][0] - M[2][1]) / l[1] * l[0]
                        } else if (x <= l[0] + l[1]) {
                            return 2 * x * (M[3][1] - M[3][0]) / l[1] + M[3][0] + 2 * (M[3][0] - M[3][1]) / l[1] * (l[0] + l[1] / 2)
                        } else if (x <= l[0] + l[1] + l[2]) {
                            return x * (M[4][1] - M[4][0]) / l[2] + M[4][0] + (M[4][0] - M[4][1]) / l[2] * (l[0] + l[1])
                        } else if (x <= l[0] + l[1] + l[2] + l[3] / 2) {
                            return 2 * x * (M[5][1] - M[5][0]) / l[3] + M[5][0] + 2 * (M[5][0] - M[5][1]) / l[3] * (l[0] + l[1] + l[2])
                        } else if (x <= l[0] + l[1] + l[2] + l[3]) {
                            return 2 * x * (M[6][1] - M[6][0]) / l[3] + M[6][0] + 2 * (M[6][0] - M[6][1]) / l[3] * (l[0] + l[1] + l[2] + l[3] / 2)
                        } else if (x <= l[0] + l[1] + l[2] + l[3] + l[4] / 2) {
                            return 2 * x * (M[7][1] - M[7][0]) / l[4] + M[7][0] + 2 * (M[7][0] - M[7][1]) / l[4] * (l[0] + l[1] + l[2] + l[3])
                        } else if (x <= l[0] + l[1] + l[2] + l[3] + l[4]) {
                            return 2 * x * (M[8][1] - M[8][0]) / l[4] + M[8][0] + 2 * (M[8][0] - M[8][1]) / l[4] * (l[0] + l[1] + l[2] + l[3] + l[4] / 2)
                        }
                    }

                    function MzE(x) {
                        if ((x >= 0) && (x <= l[0] / 2)) {
                            return 2 * x * (M[0][3] - M[0][2]) / l[0] + M[0][2]
                        } else if (x <= l[0]) {
                            return 2 * x * (M[1][3] - M[1][2]) / l[0] + M[1][2] + (M[1][2] - M[1][3])
                        } else if (x <= l[0] + l[1] / 2) {
                            return 2 * x * (M[2][3] - M[2][2]) / l[1] + M[2][2] + 2 * (M[2][2] - M[2][3]) / l[1] * l[0]
                        } else if (x <= l[0] + l[1]) {
                            return 2 * x * (M[3][3] - M[3][2]) / l[1] + M[3][2] + 2 * (M[3][2] - M[3][3]) / l[1] * (l[0] + l[1] / 2)
                        } else if (x <= l[0] + l[1] + l[2]) {
                            return x * (M[4][3] - M[4][2]) / l[2] + M[4][2] + (M[4][2] - M[4][3]) / l[2] * (l[0] + l[1])
                        } else if (x <= l[0] + l[1] + l[2] + l[3] / 2) {
                            return 2 * x * (M[5][3] - M[5][2]) / l[3] + M[5][2] + 2 * (M[5][2] - M[5][3]) / l[3] * (l[0] + l[1] + l[2])
                        } else if (x <= l[0] + l[1] + l[2] + l[3]) {
                            return 2 * x * (M[6][3] - M[6][2]) / l[3] + M[6][2] + 2 * (M[6][2] - M[6][3]) / l[3] * (l[0] + l[1] + l[2] + l[3] / 2)
                        } else if (x <= l[0] + l[1] + l[2] + l[3] + l[4] / 2) {
                            return 2 * x * (M[7][3] - M[7][2]) / l[4] + M[7][2] + 2 * (M[7][2] - M[7][3]) / l[4] * (l[0] + l[1] + l[2] + l[3])
                        } else if (x <= l[0] + l[1] + l[2] + l[3] + l[4]) {
                            return 2 * x * (M[8][3] - M[8][2]) / l[4] + M[8][2] + 2 * (M[8][2] - M[8][3]) / l[4] * (l[0] + l[1] + l[2] + l[3] + l[4] / 2)
                        }
                    }

                    function Ra(x) {
                        if (x >= 0 && x < Kl) {
                            return 1 + (Kl - x) / Opor
                        } else if (x === Kl) {
                            return 1
                        } else if (x === (Kl + Opor))
                            return 0
                        else if (x <= L)
                            return 1 - (x - Kl) / Opor
                    }

                    function Rb(x) {
                        return 1 - Ra(x)
                    }


                    function Mom(x, q) {
                        if ((q >= 0) && (q <= Kl)) {
                            if (x >= q && x <= Kl) {
                                return (x - q)
                            } else if (x > Kl && x <= Kl + Opor) {
                                return (x - q) - Ra(q) * (x - Kl)
                            } else {
                                return 0
                            }
                        }
                        if ((q > Kl) && (q <= Kl + Opor)) {
                            if (x >= Kl && x <= q) {
                                return -Ra(q) * (x - Kl)
                            } else if (x > q && x <= Kl + Opor) {
                                return -Ra(q) * (x - Kl) + (x - q)
                            } else {
                                return 0
                            }
                        }
                        if ((q > Kl + Opor) && (q <= L)) {
                            if (x >= Kl && x <= Kl + Opor) {
                                return -Ra(q) * (x - Kl)
                            } else if (x > Kl + Opor && x <= q) {
                                return -Ra(q) * (x - Kl) - Rb(q) * (x - Opor - Kl)
                            } else {
                                return 0
                            }
                        }
                    }

                    function Mmm(x, q) {
                        if ((q >= 0) && (q <= Kl)) {
                            if (x >= q && x <= Kl) {
                                return -1
                            } else if (x > Kl && x <= Kl + Opor) {
                                return -1 + (x - Kl) / Opor
                            } else {
                                return 0
                            }
                        }
                        if ((q > Kl) && (q <= Kl + Opor)) {
                            if (x >= Kl && x <= q) {
                                return ((q - Kl) / Opor) * (x - Kl) / (q - Kl)
                            } else if (x > q && x <= Kl + Opor) {
                                return ((q - Kl) / Opor - 1) + ((q - Kl) / Opor - 1) * (q - x) / (Opor - q + Kl)
                            } else {
                                return 0
                            }
                        }
                        if ((q > Kl + Opor) && (q <= L)) {
                            if (x >= Kl && x <= Kl + Opor) {
                                return (x - Kl) / Opor
                            } else if (x > Kl + Opor && x <= q) {
                                return 1
                            } else {
                                return 0
                            }
                        }
                    }

                    let Oy = []
                    let Oz = []
                    let W = []
                    let V = []

                    function Oy_fx(x, z) {
                        return (Mmm(x, z) * MyE(x)) / inp(x)
                    }

                    function Oz_fx(x, z) {
                        return (Mmm(x, z) * MzE(x)) / inp(x)
                    }

                    function W_fx(x, z) {
                        return (Mom(x, z) * MyE(x)) / inp(x)
                    }

                    function V_fx(x, z) {
                        return (Mom(x, z) * MzE(x)) / inp(x)
                    }

                    function gen_L() {
                        let gen = []
                        gen.push(0)
                        let ds
                        ds = l[0] / 4
                        gen.push(ds, ds * 2, ds * 3, l[0])

                        ds = l[1] / 4
                        gen.push(ds + l[0], ds * 2 + l[0], ds * 3 + l[0], l[1] + l[0])

                        ds = l[2] / 4
                        gen.push(ds + l[0] + l[1], ds * 2 + l[0] + l[1], ds * 3 + l[0] + l[1], l[2] + l[0] + l[1])

                        ds = l[3] / 4
                        gen.push(ds + l[0] + l[1] + l[2], ds * 2 + l[0] + l[1] + l[2], ds * 3 + l[0] + l[1] + l[2], l[3] + l[0] + l[1] + l[2])

                        ds = l[4] / 4
                        gen.push(ds + l[0] + l[1] + l[2] + l[3], ds * 2 + l[0] + l[1] + l[2] + l[3], ds * 3 + l[0] + l[1] + l[2] + l[3], l[4] + l[0] + l[1] + l[2] + l[3])

                        return gen
                    }

                    let n = 10000;
                    let h = L / n
                    let Is_oy = 0
                    let Is_oz = 0
                    let Is_w = 0
                    let Is_v = 0
                    let steps = gen_L()

                    for (let z = 0; z < steps.length; z++) {
                        Is_oy = 0
                        Is_oz = 0
                        Is_w = 0
                        Is_v = 0
                        for (let i = 0; i < n; i++) {
                            Is_oy = Is_oy + h * Oy_fx(i * h, steps[z])
                            Is_oz = Is_oz + h * Oz_fx(i * h, steps[z])
                            Is_w = Is_w + h * W_fx(i * h, steps[z])
                            Is_v = Is_v + h * V_fx(i * h, steps[z])
                        }
                        Oy[z] = (-180 / pi) * Is_oy / -E
                        Oz[z] = (-180 / pi) * Is_oz / -E
                        W[z] = Is_w / -E
                        V[z] = Is_v / E
                    }


                    console.log(steps)
                    console.log(Oy)
                    console.log(Oz)
                    console.log(W)
                    console.log(V)

                    let ctx_oy = document.getElementById('plot_Oy').getContext('2d');
                    let ctx_oz = document.getElementById('plot_Oz').getContext('2d');
                    let ctx_w = document.getElementById('plot_W').getContext('2d');
                    let ctx_v = document.getElementById('plot_V').getContext('2d');

                    let Oy_1 = [steps, Oy]
                    Oy_1 = transpose(Oy_1)
                    let Oz_1 = [steps, Oz]
                    Oz_1 = transpose(Oz_1)
                    let W_1 = [steps, W]
                    W_1 = transpose(W_1)
                    let V_1 = [steps, V]
                    V_1 = transpose(V_1)

                    this.plot_Oy = new Chart(ctx_oy, {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                label: "Изгибный поворот Oy",
                                data: Oy_1,
                                fill: false,
                                borderColor: 'rgb(30,120,255)',
                                borderWidth: 4,
                                tension: 0.2
                            }]
                        },
                        options: {
                            borderJoinStyle: 'round',
                            borderCapStyle: 'round',
                            pointRadius: 0,
                            responsive: true,
                            maintainAspectRatio: true,
                            animations: false,
                            transitions: {
                                active: {
                                    animation: {
                                        duration: 0
                                    }
                                }
                            },
                            showLine: true,
                            scales: {
                                x: {
                                    min: 1,
                                    ticks: {
                                        min: 1,
                                        max: L,
                                        stepSize: 50
                                    },
                                    suggestedMax: 2
                                },
                                y: {
                                    min: -0.13,
                                    max: 0.13
                                }
                            }
                        }
                    });
                    this.plot_Oz = new Chart(ctx_oz, {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                label: "Изгибный поворот Oz",
                                data: Oz_1,
                                fill: false,
                                borderColor: 'rgb(255,30,64)',
                                borderWidth: 4,
                                tension: 0.2
                            }]
                        },
                        options: {
                            borderJoinStyle: 'round',
                            borderCapStyle: 'round',
                            pointRadius: 0,
                            responsive: false,
                            maintainAspectRatio: true,
                            animations: false,
                            transitions: {
                                active: {
                                    animation: {
                                        duration: 0
                                    }
                                }
                            },
                            showLine: true,
                            scales: {
                                x: {
                                    min: 1,
                                    ticks: {
                                        min: 1,
                                        max: L,
                                        stepSize: 50
                                    },
                                    suggestedMax: 2
                                },
                                y: {
                                    min: -0.10,
                                    max: 0.10
                                }
                            }
                        }
                    });
                    this.plot_W = new Chart(ctx_w, {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                label: "Линейное перемещение сечений W",
                                data: W_1,
                                fill: false,
                                borderColor: 'rgb(129,18,238)',
                                borderWidth: 4,
                                tension: 0.2
                            }]
                        },
                        options: {
                            borderJoinStyle: 'round',
                            borderCapStyle: 'round',
                            pointRadius: 0,
                            responsive: false,
                            maintainAspectRatio: true,
                            animations: false,
                            transitions: {
                                active: {
                                    animation: {
                                        duration: 0
                                    }
                                }
                            },
                            showLine: true,
                            scales: {
                                x: {
                                    min: 1,
                                    ticks: {
                                        min: 1,
                                        max: L,
                                        stepSize: 50
                                    },
                                    suggestedMax: 2
                                },
                                y: {
                                    min: -0.2,
                                    max: 0.2
                                }
                            }
                        }
                    });
                    this.plot_V = new Chart(ctx_v, {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                label: "Линейное перемещение сечений V",
                                data: V_1,
                                fill: false,
                                borderColor: 'rgb(25,224,52)',
                                borderWidth: 4,
                                tension: 0.2
                            }]
                        },
                        options: {
                            borderJoinStyle: 'round',
                            borderCapStyle: 'round',
                            pointRadius: 0,
                            responsive: false,
                            maintainAspectRatio: true,
                            animations: false,
                            transitions: {
                                active: {
                                    animation: {
                                        duration: 0
                                    }
                                }
                            },
                            showLine: true,
                            scales: {
                                x: {
                                    min: 1,
                                    ticks: {
                                        min: 1,
                                        max: L,
                                        stepSize: 50
                                    },
                                    suggestedMax: 2
                                },
                                y: {
                                    min: -0.2,
                                    max: 0.2
                                }
                            }
                        }
                    });

                    let real_val = []
                    let check_val = []
                    let all_val = []
                    all_val = this.state.allowed_values


                    n = 10000;
                    h = L / n

                    Is_oy = 0
                    Is_oz = 0
                    Is_w = 0
                    Is_v = 0
                    let Oy_sec
                    let Oz_sec
                    let W_sec
                    let V_sec
                    for (let i = 0; i < n; i++) {
                        Is_oy = Is_oy + h * Oy_fx(i * h, Zl)
                        Is_oz = Is_oz + h * Oz_fx(i * h, Zl)
                    }
                    Oy_sec = (-180 / pi) * Is_oy / -E
                    Oz_sec = (-180 / pi) * Is_oz / -E


                    if (Math.sqrt( Oz_sec* Oz_sec + Oy_sec * Oy_sec) < Nakl) {
                        real_val[0] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                        check_val[0] = "Не нарушено"
                    } else {
                        real_val[0] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                        check_val[0] = "Нарушено"
                    }

                    Is_oy = 0
                    Is_oz = 0
                    Is_w = 0
                    Is_v = 0
                    for (let i = 0; i < n; i++) {
                        Is_oy = Is_oy + h * Oy_fx(i * h, Zl + Lzub)
                        Is_oz = Is_oz + h * Oz_fx(i * h, Zl + Lzub)
                    }
                    Oy_sec = (-180 / pi) * Is_oy / -E
                    Oz_sec = (-180 / pi) * Is_oz / -E

                    if (Math.sqrt(Oz_sec * Oz_sec +  Oy_sec * Oy_sec) < Nakl) {
                        real_val[1] = Math.sqrt(Oz_sec * Oz_sec +  Oy_sec * Oy_sec).toFixed(5)
                        check_val[1] = "Не нарушено"
                    } else {
                        real_val[1] = Math.sqrt(Oz_sec * Oz_sec +  Oy_sec * Oy_sec).toFixed(5)
                        check_val[1] = "Нарушено"
                    }

                    Is_oy = 0
                    Is_oz = 0
                    Is_w = 0
                    Is_v = 0
                    for (let i = 0; i < n; i++) {
                        Is_oy = Is_oy + h * Oy_fx(i * h, Kl)
                        Is_oz = Is_oz + h * Oz_fx(i * h, Kl)
                    }
                    Oy_sec = (-180 / pi) * Is_oy / -E
                    Oz_sec = (-180 / pi) * Is_oz / -E

                    if (Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec) < NaklPod) {
                        real_val[2] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                        check_val[2] = "Не нарушено"
                    } else {
                        real_val[2] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                        check_val[2] = "Нарушено"
                    }

                    Is_oy = 0
                    Is_oz = 0
                    Is_w = 0
                    Is_v = 0
                    for (let i = 0; i < n; i++) {
                        Is_oy = Is_oy + h * Oy_fx(i * h, Kl + Opor)
                        Is_oz = Is_oz + h * Oz_fx(i * h, Kl + Opor)
                    }
                    Oy_sec = (-180 / pi) * Is_oy / -E
                    Oz_sec = (-180 / pi) * Is_oz / -E

                    if (Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec) < NaklPod) {
                        real_val[3] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                        check_val[3] = "Не нарушено"
                    } else {
                        real_val[3] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                        check_val[3] = "Нарушено"
                    }


                    let ResZakr

                    if (this.state.scheme === 1) {
                        console.log('КПКП')
                        ResZakr = (Mx*((l[1]/(4*I[1]))+(l[2]/(2*I[2]))+(l[3]/(2*I[3]))+(l[4]/(4*I[4]))))/(G*(l[1]/2+l[2]+l[3]+l[4]/2))*(180/pi)*1000
                    } else if (this.state.scheme === 2) {
                        console.log('КППК')
                        ResZakr = (Mx*((l[1]/(4*I[1]))+(l[2]/(2*I[2]))+(l[3]/(4*I[3]))))/(G*(l[1]/2+l[2]+l[3]/2))*(180/pi)*1000
                    }
                    if (this.state.scheme === 3) {
                        console.log('ПККП')
                        ResZakr = (Mx*((l[0]/(4*I[0]))+(l[1]/(2*I[1]))+(l[2]/(2*I[2]))+(l[3]/(2*I[3]))+(l[4]/(4*I[4]))))/(G*(l[0]/2+l[1]+l[2]+l[3]+l[4]/2))*(180/pi)*1000
                    } else if (this.state.scheme === 4) {
                        console.log('ПКПК')
                        ResZakr = (Mx*((l[0]/(4*I[0]))+(l[1]/(2*I[1]))+(l[2]/(2*I[2]))+(l[3]/(4*I[3])))/(G*(l[0]/2+l[1]+l[2]+l[3]/2)))*(180/pi)*1000
                    }

                    if (ResZakr < Zakr) {
                        real_val[4] = ResZakr.toFixed(5)
                        check_val[4] = "Не нарушено"
                    } else {
                        real_val[4] = ResZakr
                        check_val[4] = "Нарушено"
                    }

                    Is_oy = 0
                    Is_oz = 0
                    Is_w = 0
                    Is_v = 0
                    for (let i = 0; i < n; i++) {
                        Is_w = Is_w + h * W_fx(i * h, Kl + Opor / 2)
                        Is_v = Is_v + h * V_fx(i * h, Kl + Opor / 2)
                    }
                    W_sec = Is_w / -E
                    V_sec = Is_v / E

                    console.log(Kl)

                    if (Math.sqrt(W_sec * W_sec + V_sec * V_sec) < Opor * MaxOporProg) {
                        real_val[5] = Math.sqrt(W_sec * W_sec + V_sec * V_sec).toFixed(5)
                        all_val[5] = (Opor * MaxOporProg).toFixed(5)
                        check_val[5] = "Не нарушено"
                    } else {
                        real_val[5] = Math.sqrt(W_sec * W_sec + V_sec * V_sec).toFixed(5)
                        all_val[5] = (Opor * MaxOporProg).toFixed(5)
                        check_val[5] = "Нарушено"
                    }

                    if (Math.sqrt(W[0] * W[0] + V[0] * V[0]) < Kl * MaxKonsProg) {
                        real_val[6] = Math.sqrt(W[0] * W[0] + V[0] * V[0]).toFixed(5)
                        all_val[6] = (Kl * MaxKonsProg).toFixed(5)
                        check_val[6] = "Не нарушено"
                    } else {
                        real_val[6] = Math.sqrt(W[0] * W[0] + V[0] * V[0]).toFixed(5)
                        all_val[6] = (Kl * MaxKonsProg).toFixed(5)
                        check_val[6] = "Нарушено"
                    }

                    Is_oy = 0
                    Is_oz = 0
                    Is_w = 0
                    Is_v = 0
                    for (let i = 0; i < n; i++) {
                        Is_w = Is_w + h * W_fx(i * h, L)
                        Is_v = Is_v + h * V_fx(i * h, L)
                    }
                    W_sec = Is_w / -E
                    V_sec = Is_v / E

                    if (Math.sqrt(W_sec * W_sec + V_sec * V_sec) < Kr * MaxKonsProg) {
                        real_val[7] = Math.sqrt(W_sec * W_sec + V_sec * V_sec).toFixed(5)
                        all_val[7] = (Kr * MaxKonsProg).toFixed(5)
                        check_val[7] = "Не нарушено"
                    } else {
                        real_val[7] = Math.sqrt(W_sec * W_sec + V_sec * V_sec).toFixed(5)
                        all_val[7] = (Kr * MaxKonsProg).toFixed(5)
                        check_val[7] = "Нарушено"
                    }

                    this.setState({allowed_values: all_val});
                    this.setState({real_values: real_val});
                    this.setState({check_pass: check_val});
                    console.log(this.state.allowed_values)
                    console.log(this.state.real_values)
                    console.log(this.state.check_pass)

                }, 0);
            },
            willClose: () => {

            }
        }).then((result) => {
            this.setState({calculated: ''});
            Swal.fire(
                'Готово!',
                'Результаты доступны во вкладках <b>Эпюры</b>, <b>Проверки</b> и <b>Отчёт</b>',
                'success'
            )
        })
    }

    params_shaft_change(event, x, y) {
        let t_sp = this.state.shaft_params
        t_sp[x][y] = Number(event.target.value)
        console.log(t_sp)
        this.setState({shaft_params: t_sp});
    }

    moments_yz_change(event, y, x) {
        let t_m_yz = this.state.moments_yz
        t_m_yz[x][y] = Number(event.target.value)
        let x_1;
        if (x > 1) {
            if (x === 2) {
                x_1 = 0
            } else {
                x_1 = 1;
            }

            //Момент Mz
            this.plot_Mz.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(event.target.value);
            this.plot_Mz.update();
        } else {
            if (x === 0) {
                x_1 = 0
            } else {
                x_1 = 1;
            }
            //Момент My
            this.plot_My.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(event.target.value);
            this.plot_My.update();
        }
        this.setState({moments_yz: t_m_yz});
    }

    moment_x_change(event) {
        this.setState({moment_x: Number(event.target.value)});
        for (let i = this.state.slices[2] * 2 - 1; i < this.state.slices[3] * 2 - 1; i++) {
            this.plot_Mx.data.datasets[0].data[i].y = Number(event.target.value);
        }
        this.plot_Mx.update();
    }

    allowed_change(event, x) {
        let t_re = this.state.allowed_values
        console.log(t_re)
        t_re[x] = Number(event.target.value)
        this.setState({allowed_values: t_re});
    }

    resilience_change(event, x) {
        let t_re = this.state.resilience_modulus
        t_re[x] = Number(event.target.value)
        this.setState({resilience_modulus: t_re});
    }

    scheme_select_change(event) {
        this.setState({scheme_img: event.target.value});
        let type = Number(event.target.value.replace('.png', ''))
        this.setState({scheme: type});
        if (type === 1) {
            this.setState({slices: [2, 7, 4, 9]});
        }
        if (type === 2) {
            this.setState({slices: [2, 9, 4, 7]});
        }
        if (type === 3) {
            this.setState({slices: [4, 7, 2, 9]});
        }
        if (type === 4) {
            this.setState({slices: [4, 9, 2, 7]});
        }
    }

    render() {
        return (
            <div className="holder">
                <div className="info-bar flex flex-row">
                    <div className="info-bar-logo">КРУТОЕ ЛОГО</div>
                    <div className="info-bar-state">Что делает чукча первым делом, когда приходит домой?
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
                        <a className={"nav-link pseudo-pill " + this.state.calculated} id="v-graphs-tab"
                           data-toggle="pill"
                           href="#v-tabs-graphs"
                           role="tab" aria-controls="v-tabs-graphs" aria-selected="false">Эпюры</a>
                        <a className={"nav-link pseudo-pill "} id="v-check-tab"
                           data-toggle="pill"
                           href="#v-tabs-check"
                           role="tab" aria-controls="v-tabs-check" aria-selected="false">Проверки</a>
                        <a className={"nav-link pseudo-pill " + this.state.calculated} id="v-report-tab"
                           data-toggle="pill"
                           href="#v-tabs-report"
                           role="tab" aria-controls="v-tabs-report" aria-selected="false">Отчёт</a>
                    </div>
                    <div className="tab-content nav-tabs" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-tabs-main" role="tabpanel"
                             aria-labelledby="v-main-tab">
                            <div className="main-tab">
                                <h1 className="h1-h1 mt-4">
                                    Добро пожаловать в Shaft E-edition</h1>
                                <img className="logo_v2" src="./resources/img/service/logo_v2.png"/>
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
                                                        onChange={(event) => this.params_shaft_change(event, 0, 0)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 0, 1)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 0, 2)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 0, 3)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 0, 4)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="col-dm-2">Диаметр ступени, мм</span></td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 1, 0)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 1, 1)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 1, 2)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 1, 3)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        onChange={(event) => this.params_shaft_change(event, 1, 4)}
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
                                                                onChange={(event) => this.moments_yz_change(event, 0, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 0, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 0, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 0, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#2</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 1, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 1, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 1, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 1, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#3</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 2, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 2, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 2, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 2, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#4</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 3, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 3, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 3, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 3, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#5</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 4, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 4, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 4, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 4, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#6</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 5, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 5, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 5, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 5, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#7</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 6, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 6, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 6, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 6, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#8</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 7, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 7, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 7, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 7, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#9</span></td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 8, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 8, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 8, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                onChange={(event) => this.moments_yz_change(event, 8, 3)}
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
                                            <canvas className="mini_plot" id="plot_Mx" width="300"
                                                    height="160"></canvas>
                                        </div>
                                        <div className="plot_My sys-block-2">
                                            <canvas className="mini_plot" id="plot_My" width="300"
                                                    height="160"></canvas>
                                        </div>
                                        <div className="plot_Mz sys-block-2">
                                            <canvas className="mini_plot" id="plot_Mz" width="300"
                                                    height="160"></canvas>
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
                                               onChange={(event) => this.allowed_change(event, 0)}
                                               className="form-control" placeholder="град/мм"
                                               value={this.state.allowed_values[0]}
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
                                               onChange={(event) => this.allowed_change(event, 1)}
                                               className="form-control" placeholder="град"
                                               value={this.state.allowed_values[1]}
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
                                               onChange={(event) => this.allowed_change(event, 2)}
                                               className="form-control" placeholder="град"
                                               value={this.state.allowed_values[2]}
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
                                               onChange={(event) => this.allowed_change(event, 3)}
                                               className="form-control" placeholder="мм"
                                               value={this.state.allowed_values[3]}
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
                                               onChange={(event) => this.allowed_change(event, 4)}
                                               className="form-control" placeholder="мм"
                                               value={this.state.allowed_values[4]}
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
                                               onChange={(event) => this.resilience_change(event, 0)}
                                               className="form-control" placeholder="ГПа"
                                               value={this.state.resilience_modulus[0]}
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
                                               onChange={(event) => this.resilience_change(event, 1)}
                                               className="form-control" placeholder="ГПа"
                                               value={this.state.resilience_modulus[1]}
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <h2 className="h2-h2 mt-4 mt-4">
                                        7. Нажмите кнопушку
                                    </h2>
                                    <button type="button" onClick={this.calculate}
                                            className="btn btn-primary mt-1 btn-lg calc-btn">Расчитать
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-graphs" role="tabpanel"
                             aria-labelledby="v-graphs-tab">
                            <h2 className="h2-h2 mt-4">
                                8. Графики прогибов и углов поворота сечений
                            </h2>
                            <div className="plot_Mx mt-4  sys-block-5">
                                <div>
                                    <canvas className="full_plot" id="plot_Oy" width="900px"></canvas>
                                </div>
                                <canvas className="full_plot" id="plot_Oz" width="900px"></canvas>
                                <canvas className="full_plot" id="plot_W" width="900px"></canvas>
                                <canvas className="full_plot" id="plot_V" width="900px"></canvas>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-check" role="tabpanel"
                             aria-labelledby="v-check-tab">
                            <div className="mt-4">
                                <div className="d-flex flex-column">
                                    <h2 className="h2-h2 mt-0 mb-4">
                                        9. Расчёт жёсткости ступенчатого вала
                                    </h2>
                                    <table className="table table-striped table-bordered table-check">
                                        <thead>
                                        <tr>
                                            <th className="col-sm-12 col-md-2 col-hd-wd-4">#</th>
                                            <th className="col-sm-12 col-md-2 col-hd-wd-2">Условие жёсткости</th>
                                            <th className="col-sm-12 col-md-2 col-hd-wd-1">Расчётное</th>
                                            <th className="col-sm-12 col-md-2 col-hd-wd-1">Допускное</th>
                                            <th className="col-sm-12 col-md-2 col-hd-wd-1">Результат</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><span className="col-dm-2">#1</span></td>
                                            <td>
                                                <span className="col-dm-2">Поворот левого зубчатого колеса,</span>
                                                <span style={{marginLeft: 165 + 'px'}} className="col-dm-2">град</span>
                                            </td>
                                            <td>{this.state.real_values[0]}</td>
                                            <td>{this.state.allowed_values[1]}</td>
                                            <td>{this.state.check_pass[0]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#2</span></td>
                                            <td>
                                                <span className="col-dm-2">Поворот правого зубчатого колеса,</span>
                                                <span style={{marginLeft: 153 + 'px'}} className="col-dm-2">град</span>
                                            </td>
                                            <td>{this.state.real_values[1]}</td>
                                            <td>{this.state.allowed_values[1]}</td>
                                            <td>{this.state.check_pass[1]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#3</span></td>
                                            <td>
                                                <span
                                                    className="col-dm-2">Поворот внутреннего кольца левого подшипника,</span>
                                                <span style={{marginLeft: 22 + 'px'}} className="col-dm-2">град</span>
                                            </td>
                                            <td>{this.state.real_values[2]}</td>
                                            <td>{this.state.allowed_values[2]}</td>
                                            <td>{this.state.check_pass[2]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#4</span></td>
                                            <td><span className="col-dm-2">Поворот внутреннего кольца правого подшипника,</span>
                                                <span style={{marginLeft: 10 + 'px'}} className="col-dm-2">град</span>
                                            </td>
                                            <td>{this.state.real_values[3]}</td>
                                            <td>{this.state.allowed_values[2]}</td>
                                            <td>{this.state.check_pass[3]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#5</span></td>
                                            <td>
                                                <span className="col-dm-2">Относительный угол закручивания вала,</span>
                                                <span style={{marginLeft: 89 + 'px'}} className="col-dm-2">град/м</span>
                                            </td>
                                            <td>{this.state.real_values[4]}</td>
                                            <td>{this.state.allowed_values[0]}</td>
                                            <td>{this.state.check_pass[4]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#6</span></td>
                                            <td><span className="col-dm-2">Наибольший прогиб между подшипниками,</span>
                                                <span style={{marginLeft: 88 + 'px'}} className="col-dm-2">мм</span>
                                            </td>
                                            <td>{this.state.real_values[5]}</td>
                                            <td>{this.state.allowed_values[5]}</td>
                                            <td>{this.state.check_pass[5]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#7</span></td>
                                            <td><span className="col-dm-2">Наибольший прогиб левой консольной части вала,</span>
                                                <span style={{marginLeft: 26 + 'px'}} className="col-dm-2">мм</span>
                                            </td>
                                            <td>{this.state.real_values[6]}</td>
                                            <td>{this.state.allowed_values[6]}</td>
                                            <td>{this.state.check_pass[6]}</td>
                                        </tr>
                                        <tr>
                                            <td><span className="col-dm-2">#8</span></td>
                                            <td><span className="col-dm-2">Наибольший прогиб правой консольной части вала,</span>
                                                <span style={{marginLeft: 14 + 'px'}} className="col-dm-2">мм</span>
                                            </td>
                                            <td>{this.state.real_values[7]}</td>
                                            <td>{this.state.allowed_values[7]}</td>
                                            <td>{this.state.check_pass[7]}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <h2 className="h2-h2 mt-3">
                                        Вывод: Вал с заданными сечениями соответствует условиям жёсткости.
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-report" role="tabpanel"
                             aria-labelledby="v-report-tab">
                            <div className="mt-4">
                                СКОРО БУДЕТ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Holder;
