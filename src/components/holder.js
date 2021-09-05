import React from 'react';
import '../assets/css/styles.css';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2'
import $ from 'jquery'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



const ipcRenderer = window.require('electron').ipcRenderer;
let success = 0
let plot_Mx
let plot_My
let plot_Mz


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
        this.save_state = this.save_state.bind(this)
        this.load_state = this.load_state.bind(this)
        this.export_report = this.export_report.bind(this)
        this.export_change = this.export_change.bind(this)
        this.state = {
            phrases: [
                'Что делает чукча первым делом, когда приходит домой?',
                'Пиу!',
                'Доброе утро, коллеги!',
                'Я вас запомнил, вы попали!',
                '...возможно при выполнении определенного ряда условий...',
                'Хотели ли бы вы жить в мире, состоящем из пружин и взрывов?',
                'Не вмешивайтесь в жизни голодных трещин',
                'Главные орудия труда инженера - это ножницы и клей',
                'Мы должны с вами расстаться друзьями',
                'Пешим по танковому',
                'Сосиски - это настоящий сосуд высокого давления',
                'В человеке все должно быть прекрасно',
                'Концы в вводу, или как говорили в девяностые - положить кабанчика на рельс',
                'Господа... Назревает научный спор',
                'Вот.'
            ],
            scheme_img: "1.png",
            scheme: 1,
            slices: [2, 7, 4, 9],
            shaft_params: [
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            ],
            moment_x: 0,
            moments_yz: [
                [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            ],
            test_moments_yz: [
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
            calc_state:0,
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
            try_n: 0,
            loading: 0,
            current_phrase:'',
            export_parts:[
                0,
                0,
                0,
                0,
            ]
        };

    }

    componentDidMount() {
        let ctx_x = document.getElementById('plot_Mx').getContext('2d');
        let ctx_y = document.getElementById('plot_My').getContext('2d');
        let ctx_z = document.getElementById('plot_Mz').getContext('2d');
        plot_Mx = new Chart(ctx_x, {
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
        plot_My = new Chart(ctx_y, {
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
        plot_Mz = new Chart(ctx_z, {
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
        let x
        let y
        let x_1
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                x = j
                y = i
                if (x > 1) {
                    if (x === 2) {
                        x_1 = 0
                    } else {
                        x_1 = 1;
                    }

                    //Момент Mz
                    plot_Mz.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(this.state.moments_yz[j][i]);
                    plot_Mz.update();
                } else {
                    if (x === 0) {
                        x_1 = 0
                    } else {
                        x_1 = 1;
                    }
                    //Момент My
                    plot_My.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(this.state.moments_yz[j][i]);
                    plot_My.update();
                }
            }

        }
        for (let i = this.state.slices[2] * 2 - 1; i < this.state.slices[3] * 2 - 1; i++) {
            plot_Mx.data.datasets[0].data[i].y = Number(this.state.moment_x);
        }
        plot_Mx.update();
        plot_My.update();
        plot_Mz.update();
        ipcRenderer.on('save-project', () => {
            //console.log('[client]: Saving state')
            let reply = this.save_state()
            ipcRenderer.send('save-recv', reply)
        })
        ipcRenderer.on('save-reply', (event, arg) => {
            if (arg == 'saved') {
                Swal.fire(
                    'Готово!',
                    'Файл сохранён в папке запуска программы.',
                    'success'
                )
            } else {
                Swal.fire(
                    'Ошибка!',
                    'Какая - не знаю.',
                    'error'
                )
            }
        })
        ipcRenderer.on('load_project', (event, message) => {
            if (typeof (message) === 'undefined') {
                Swal.fire(
                    'Ошибка!',
                    'Какая - не знаю.',
                    'error'
                )
                return
            }
            this.load_state(message)
        })
        for (let i = 0; i < 5; i++) {
            $('#al-in-'+i).val(this.state.allowed_values[i])
        }
        this.setState({current_phrase: this.state.phrases[Math.floor(Math.random( ) * (14+1))]});
    }

    componentWillUnmount() {

    }

    save_state() {
        return (JSON.stringify(this.state))
    }

    load_state(mes) {
        let n_state = JSON.parse(mes)
        this.setState(n_state)
        this.setState({try_n: 0});
        let x
        let y
        let x_1
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                x = j
                y = i
                if (x > 1) {
                    if (x === 2) {
                        x_1 = 0
                    } else {
                        x_1 = 1;
                    }

                    //Момент Mz
                    plot_Mz.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(this.state.moments_yz[j][i]);
                    plot_Mz.update();
                } else {
                    if (x === 0) {
                        x_1 = 0
                    } else {
                        x_1 = 1;
                    }
                    //Момент My
                    plot_My.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(this.state.moments_yz[j][i]);
                    plot_My.update();
                }
            }

        }
        for (let i = this.state.slices[2] * 2 - 1; i < this.state.slices[3] * 2 - 1; i++) {
            plot_Mx.data.datasets[0].data[i].y = Number(this.state.moment_x);
        }
        plot_Mx.update();
        plot_My.update();
        plot_Mz.update();

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                if(this.state.moments_yz[j][i]!==0) {
                    $('#mm-in-' + j + '_' + i).val(this.state.moments_yz[j][i])
                }
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                $('#sh-in-'+i+'_'+j).val(this.state.shaft_params[i][j])
            }
        }

        for (let i = 0; i < 5; i++) {
            $('#al-in-'+i).val(this.state.allowed_values[i])
        }

        for (let i = 0; i < 2; i++) {
            $('#re-in-'+i).val(this.state.resilience_modulus[i])
        }

        $('#mx-in').val(this.state.moment_x)

        if(this.state.calc_state===1) {
            this.calculate()
        }

    }

    export_report() {
        Swal.fire({
            title: '...Создаём...',
            html: 'Вы можете свернуть окно',
            timer: 6000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                try {
                    setTimeout(() => {
        let copyblock_1=document.getElementById('v-tabs-scheme').cloneNode(true)
        copyblock_1.id='copyblock_1'
        copyblock_1.firstChild.firstChild.firstChild.firstChild.childNodes[1].style.background='none'
        copyblock_1.classList.add("show", "active");
        document.body.appendChild(copyblock_1)
        html2canvas(document.getElementById('copyblock_1')).then(function(canvas) {
            document.getElementById('copyblock-holder').appendChild(canvas);
        });

        let copyblock_2=document.getElementById('v-tabs-moment').cloneNode(true)
        copyblock_2.id='copyblock_2'
        copyblock_2.classList.add("show", "active");
        document.body.appendChild(copyblock_2)
        html2canvas(document.getElementById('copyblock_2')).then(function(canvas) {
            document.getElementById('copyblock-holder').appendChild(canvas);
        });

        let copyblock_3=document.getElementById('v-tabs-const').cloneNode(true)
        copyblock_3.id='copyblock_3'
        copyblock_3.style.width='700px'
        copyblock_3.classList.add("show", "active");
        document.body.appendChild(copyblock_3)
        html2canvas(document.getElementById('copyblock_3')).then(function(canvas) {
            document.getElementById('copyblock-holder').appendChild(canvas);
        });

        let copyblock_4=document.getElementById('v-tabs-check').cloneNode(true)
        copyblock_4.id='copyblock_4'
        copyblock_4.style.width='1000px'
        copyblock_4.classList.add("show", "active");
        document.body.appendChild(copyblock_4)
        html2canvas(document.getElementById('copyblock_4')).then(function(canvas) {
            document.getElementById('copyblock-holder').appendChild(canvas);
        });

        setTimeout(()=>{
            let url1 = document.getElementById('copyblock-holder').childNodes[2].toDataURL("image/jpeg")
            let url2 = document.getElementById('copyblock-holder').childNodes[3].toDataURL("image/jpeg")
            let url3 = document.getElementById('copyblock-holder').childNodes[0].toDataURL("image/jpeg")
            let url4 = document.getElementById('copyblock-holder').childNodes[1].toDataURL("image/jpeg")

            let url5 = document.getElementById('plot_Mx').toDataURL("image/png",1)
            let url6 = document.getElementById('plot_My').toDataURL("image/png",1)
            let url7 = document.getElementById('plot_Mz').toDataURL("image/png",1)

            let url8 = document.getElementById('plot_Oy').toDataURL("image/png",1)
            let url9 = document.getElementById('plot_Oz').toDataURL("image/png",1)
            let url10 = document.getElementById('plot_W').toDataURL("image/png",1)
            let url11 = document.getElementById('plot_V').toDataURL("image/png",1)
            let docInfo = {
                info: {
                    title: 'Отчёт о работе программы NiceRod (v1.2.2)',
                    author: 'Artyom',
                    subject: 'Report',
                    keywords: 'no'
                },
                pageSize: 'A4',
                pageOrientation: 'portrait',
                pageMargins: [50, 50, 30, 60],
                content: [
                    {
                        text:'Расчёт вала на прочность и жёсткость',
                        alignment:'center',
                        fontSize:20,
                    },
                    {
                        text:'Параметры ступенчатого вала',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,30,0,10]
                    },
                    {
                        image: url1,
                        width: 600,
                    },
                    {
                        text:'Изгибающие моменты и продольный момент',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url2,
                        width: 600,
                    },
                    {
                        text:'Введённые константы',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url3,
                        width: 400,
                        alignment:'center',
                    },
                    {
                        text:'Результаты проверки вала',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url4,
                        width: 500,
                        alignment:'center',
                    },
                    {
                        text:'Эпюра момента Mx',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,120,0,10]
                    },
                    {
                        image: url5,
                        width: 350,
                        alignment:'center',
                    },
                    {
                        text:'Эпюра момента My',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url6,
                        width: 350,
                        alignment:'center',
                    },
                    {
                        text:'Эпюра момента Mz',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url7,
                        width: 350,
                        alignment:'center',
                    },

                    {
                        text:'Изгибный поворот Oy',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,50,0,10]
                    },
                    {
                        image: url8,
                        width: 500,
                        alignment:'center',
                    },
                    {
                        text:'Изгибный поворот Oz',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url9,
                        width: 500,
                        alignment:'center',
                    },
                    {
                        text:'Линейное перемещение сечений W',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,140,0,10]
                    },
                    {
                        image: url10,
                        width: 500,
                        alignment:'center',
                    },
                    {
                        text:'Линейное перемещение сечений V',
                        alignment:'center',
                        fontSize:15,
                        margin:[0,20,0,10]
                    },
                    {
                        image: url11,
                        width: 500,
                        alignment:'center',
                    },

                ],
            }
            pdfMake.createPdf(docInfo).download('report.pdf');
        },1000)

                    }, 2000);
                } catch (e) {
                    //console.log(e)
                }
            },
            willClose: () => {

            }
        }).then((result) => {
            Swal.fire(
                'Готово!',
                'Результаты доступны в том файле, куда вы сохранили отчёт',
                'success'
            )
        })

    }

    calculate() {
        Swal.fire({
            title: '...Вычисляем...',
            html: 'Вы можете свернуть окно',
            timer: 900,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                try {
                    setTimeout(() => {
                        success = 0
                        this.setState({calc_state: 0});
                        let pi = 3.141592
                        let l = this.state.shaft_params[0]
                        let d = this.state.shaft_params[1]
                        let Mx = this.state.moment_x
                        let M = this.state.moments_yz
                        for (let i = 0; i < 4; i++) {
                            for (let j = 2; j < 8; j++) {
                                if (Math.abs(M[i][j]) < 2) {
                                    Swal.fire(
                                        'Не всё так гладко...',
                                        'Ошибка во вводе изгибающих моментов',
                                        'question'
                                    )
                                    return
                                }
                            }
                        }
                        for (let i = 0; i < 2; i++) {
                            for (let j = 0; j < 5; j++) {
                                if(this.state.shaft_params[i][j]<10){
                                    Swal.fire(
                                        'Не всё так гладко...',
                                        'Ошибка во вводе параметров вала',
                                        'question'
                                    )
                                    return
                                }
                            }
                        }
                        if(Math.abs(Mx)<1){
                            Swal.fire(
                                'Не всё так гладко...',
                                'Ошибка во вводе закручивающего момента',
                                'question'
                            )
                            return
                        }
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

                        if (this.state.try_n > 0) {
                            this.plot_Oy.destroy()
                            this.plot_Oz.destroy()
                            this.plot_W.destroy()
                            this.plot_V.destroy()
                        }
                        this.setState({try_n: 10});

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
                            Zr = l[4] / 2
                            Lzub = L - Zl - Zr
                            //l[1] / 2 + l[2] + l[3] + l[4] / 2
                        }
                        if (scheme === 2) {
                            Kl = l[0] / 2
                            Kr = l[4] / 2
                            Zl = l[0] + l[1] / 2
                            Zr = l[4] + l[3] / 2
                            Lzub = L - Zl - Zr
                        }
                        if (scheme === 4) {
                            Kl = l[0] + l[1] / 2
                            Kr = l[4] / 2
                            Zl = l[0] / 2
                            Zr = l[4] + l[3] / 2
                            Lzub = L - Zl - Zr
                        }
                        if (scheme === 3) {
                            Kl = l[0] + l[1] / 2
                            Kr = l[4] + l[3] / 2
                            Zl = l[0] / 2
                            Zr = l[4] / 2
                            Lzub = L - Zl - Zr
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


                        let Oy_max = Math.max(...Oy).toFixed(2)
                        let Oy_min = Math.min(...Oy).toFixed(2)
                        let Oz_max = Math.max(...Oz).toFixed(2)
                        let Oz_min = Math.min(...Oz).toFixed(2)
                        let W_max = Math.max(...W).toFixed(2)
                        let W_min = Math.min(...W).toFixed(2)
                        let V_max = Math.max(...V).toFixed(2)
                        let V_min = Math.min(...V).toFixed(2)


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
                                        min: 0,
                                        ticks: {
                                            stepSize: 50
                                        }
                                    },
                                    y: {
                                        min: Oy_min * 1.3,
                                        max: Oy_max * 1.3
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
                                        min: 0,
                                        ticks: {
                                            stepSize: 50
                                        }
                                    },
                                    y: {
                                        min: Oz_min * 1.3,
                                        max: Oz_max * 1.3
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
                                        min: 0,
                                        max: L,
                                        ticks: {
                                            stepSize: 100
                                        },
                                    },
                                    y: {
                                        min: W_min * 1.3,
                                        max: W_max * 1.3
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
                                        min: 0,
                                        max: L,
                                        ticks: {
                                            stepSize: 100
                                        },
                                    },
                                    y: {
                                        min: V_min * 1.3,
                                        max: V_max * 1.3
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


                        if (Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec) < Nakl) {
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

                        if (Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec) < Nakl) {
                            real_val[1] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
                            check_val[1] = "Не нарушено"
                        } else {
                            real_val[1] = Math.sqrt(Oz_sec * Oz_sec + Oy_sec * Oy_sec).toFixed(5)
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
                            ResZakr = (Mx * ((l[1] / (4 * I[1])) + (l[2] / (2 * I[2])) + (l[3] / (2 * I[3])) + (l[4] / (4 * I[4])))) / (G * (l[1] / 2 + l[2] + l[3] + l[4] / 2)) * (180 / pi) * 1000
                        } else if (this.state.scheme === 2) {
                            ResZakr = (Mx * ((l[1] / (4 * I[1])) + (l[2] / (2 * I[2])) + (l[3] / (4 * I[3])))) / (G * (l[1] / 2 + l[2] + l[3] / 2)) * (180 / pi) * 1000
                        }
                        if (this.state.scheme === 3) {
                            ResZakr = (Mx * ((l[0] / (4 * I[0])) + (l[1] / (2 * I[1])) + (l[2] / (2 * I[2])) + (l[3] / (2 * I[3])) + (l[4] / (4 * I[4])))) / (G * (l[0] / 2 + l[1] + l[2] + l[3] + l[4] / 2)) * (180 / pi) * 1000
                        } else if (this.state.scheme === 4) {
                            ResZakr = (Mx * ((l[0] / (4 * I[0])) + (l[1] / (2 * I[1])) + (l[2] / (2 * I[2])) + (l[3] / (4 * I[3]))) / (G * (l[0] / 2 + l[1] + l[2] + l[3] / 2))) * (180 / pi) * 1000
                        }

                        if (ResZakr < Zakr) {
                            real_val[4] = ResZakr.toFixed(5)
                            check_val[4] = "Не нарушено"
                        } else {
                            real_val[4] = ResZakr.toFixed(5)
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
                        success = 1
                        this.setState({calc_state: 1});

                    }, 0);
                } catch (e) {
                    //console.log(e)
                }
            },
            willClose: () => {

            }
        }).then((result) => {
            if (success === 1) {
                this.setState({calculated: ''});
                Swal.fire(
                    'Готово!',
                    'Результаты доступны во вкладках <b>Эпюры</b>, <b>Проверки</b> и <b>Отчёт</b>',
                    'success'
                )
            } else {
                this.setState({calculated: ' disabled'});
                Swal.fire(
                    'Ошибка',
                    'Во время вычисления произошла ошибка. проверьте правильность введённых данных...',
                    'error'
                )
            }

        })
    }

    params_shaft_change(event, x, y) {
        let t_sp = this.state.shaft_params
        t_sp[x][y] = Number(event.target.value)
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
            plot_Mz.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(event.target.value);
            plot_Mz.update();
        } else {
            if (x === 0) {
                x_1 = 0
            } else {
                x_1 = 1;
            }
            plot_My.data.datasets[0].data[y * 2 + x_1 + 1].y = Number(event.target.value);
            plot_My.update();
        }
        this.setState({moments_yz: t_m_yz});
    }

    moment_x_change(event) {
        this.setState({moment_x: Number(event.target.value)});
        for (let i = this.state.slices[2] * 2 - 1; i < this.state.slices[3] * 2 - 1; i++) {
            plot_Mx.data.datasets[0].data[i].y = Number(event.target.value);
        }
        plot_Mx.update();
    }

    allowed_change(event, x) {
        let t_re = this.state.allowed_values
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

    export_change(event,x){
        let t_ex = this.state.export_parts
        if(t_ex[x]===0){
            t_ex[x] = 1
        }else{
            t_ex[x] = 0
        }
        this.setState({export_parts: t_ex});
    }

    render() {
        return (
            <div className="holder">
                <div className="info-bar flex flex-row">
                    <div className="info-bar-logo">By ROB-O Team</div>
                    <div className="info-bar-state">{this.state.current_phrase}
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
                        <a className={"nav-link pseudo-pill " + this.state.calculated} id="v-check-tab"
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
                                    Добро пожаловать в NiceRod (Shaft V2.0)!</h1>
                                <img className="logo_v2" src="./resources/img/service/logo_v4.png"/>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-scheme" role="tabpanel"
                             aria-labelledby="v-scheme-tab">
                            <div id="scheme-tab" className="scheme-tab">
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
                                            <img className="scheme-img-self" id="test-id-1"
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
                                                        id="sh-in-0_0"
                                                        onChange={(event) => this.params_shaft_change(event, 0, 0)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-0_1"
                                                        onChange={(event) => this.params_shaft_change(event, 0, 1)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-0_2"
                                                        onChange={(event) => this.params_shaft_change(event, 0, 2)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-0_3"
                                                        onChange={(event) => this.params_shaft_change(event, 0, 3)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-0_4"
                                                        onChange={(event) => this.params_shaft_change(event, 0, 4)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="col-dm-2">Диаметр ступени, мм</span></td>
                                                <td>
                                                    <input
                                                        id="sh-in-1_0"
                                                        onChange={(event) => this.params_shaft_change(event, 1, 0)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-1_1"
                                                        onChange={(event) => this.params_shaft_change(event, 1, 1)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-1_2"
                                                        onChange={(event) => this.params_shaft_change(event, 1, 2)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-1_3"
                                                        onChange={(event) => this.params_shaft_change(event, 1, 3)}
                                                        type="text" className="form-control col-wd-1"/>
                                                </td>
                                                <td>
                                                    <input
                                                        id="sh-in-1_4"
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
                                                                id="mm-in-0_0"
                                                                onChange={(event) => this.moments_yz_change(event, 0, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_0"
                                                                onChange={(event) => this.moments_yz_change(event, 0, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_0"
                                                                onChange={(event) => this.moments_yz_change(event, 0, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_0"
                                                                onChange={(event) => this.moments_yz_change(event, 0, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#2</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_1"
                                                                onChange={(event) => this.moments_yz_change(event, 1, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_1"
                                                                onChange={(event) => this.moments_yz_change(event, 1, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_1"
                                                                onChange={(event) => this.moments_yz_change(event, 1, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_1"
                                                                onChange={(event) => this.moments_yz_change(event, 1, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#3</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_2"
                                                                onChange={(event) => this.moments_yz_change(event, 2, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_2"
                                                                onChange={(event) => this.moments_yz_change(event, 2, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_2"
                                                                onChange={(event) => this.moments_yz_change(event, 2, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_2"
                                                                onChange={(event) => this.moments_yz_change(event, 2, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#4</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_3"
                                                                onChange={(event) => this.moments_yz_change(event, 3, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_3"
                                                                onChange={(event) => this.moments_yz_change(event, 3, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_3"
                                                                onChange={(event) => this.moments_yz_change(event, 3, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_3"
                                                                onChange={(event) => this.moments_yz_change(event, 3, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#5</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_4"
                                                                onChange={(event) => this.moments_yz_change(event, 4, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_4"
                                                                onChange={(event) => this.moments_yz_change(event, 4, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_4"
                                                                onChange={(event) => this.moments_yz_change(event, 4, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_4"
                                                                onChange={(event) => this.moments_yz_change(event, 4, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#6</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_5"
                                                                onChange={(event) => this.moments_yz_change(event, 5, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_5"
                                                                onChange={(event) => this.moments_yz_change(event, 5, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_5"
                                                                onChange={(event) => this.moments_yz_change(event, 5, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_5"
                                                                onChange={(event) => this.moments_yz_change(event, 5, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#7</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_6"
                                                                onChange={(event) => this.moments_yz_change(event, 6, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_6"
                                                                onChange={(event) => this.moments_yz_change(event, 6, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_6"
                                                                onChange={(event) => this.moments_yz_change(event, 6, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_6"
                                                                onChange={(event) => this.moments_yz_change(event, 6, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#8</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_7"
                                                                onChange={(event) => this.moments_yz_change(event, 7, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_7"
                                                                onChange={(event) => this.moments_yz_change(event, 7, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_7"
                                                                onChange={(event) => this.moments_yz_change(event, 7, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_7"
                                                                onChange={(event) => this.moments_yz_change(event, 7, 3)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="col-dm-1">#9</span></td>
                                                        <td>
                                                            <input
                                                                id="mm-in-0_8"
                                                                onChange={(event) => this.moments_yz_change(event, 8, 0)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-1_8"
                                                                onChange={(event) => this.moments_yz_change(event, 8, 1)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-2_8"
                                                                onChange={(event) => this.moments_yz_change(event, 8, 2)}
                                                                type="text" className="form-control col-wd-1"/>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id="mm-in-3_8"
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
                                                    id="mx-in"
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
                                               id="al-in-0"
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
                                               id="al-in-1"
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
                                               id="al-in-2"
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
                                               id="al-in-3"
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
                                               id="al-in-4"
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
                                               id="re-in-0"
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
                                               id="re-in-1"
                                               aria-label="Имя пользователя" aria-describedby="basic-addon1"/>
                                    </div>
                                    <h2 className="h2-h2 mt-4 mt-4">
                                        7. Нажмите кнопку...
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
                            <div className="plot_Mx mt-2  sys-block-5">
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
                                    <table id="stiff-rep" className="table table-striped table-bordered table-check">
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
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-tabs-report" role="tabpanel"
                             aria-labelledby="v-report-tab">
                            <div className="mt-4">
                                <h2 className="h2-h2 mt-0 mb-2">
                                    10. Экспорт отчёта
                                </h2>
                                <div className="report-parts" style={{display:'none'}}>
                                    <div className="form-check">
                                        <input onChange={(event) => this.export_change(event, 0)}
                                               type="checkbox" className="form-check-input" id="entries"/>
                                            <label className="form-check-label" htmlFor="entries">Вводные данные</label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={(event) => this.export_change(event, 1)}
                                               type="checkbox" className="form-check-input" id="consts"/>
                                        <label className="form-check-label" htmlFor="consts">Константы</label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={(event) => this.export_change(event, 2)}
                                               type="checkbox" className="form-check-input" id="plots"/>
                                        <label className="form-check-label" htmlFor="plots">Эпюры</label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={(event) => this.export_change(event, 3)}
                                               type="checkbox" className="form-check-input" id="checks"/>
                                        <label className="form-check-label" htmlFor="checks">Расчёт жёсткости</label>
                                    </div>
                                </div>

                                <button type="button" onClick={this.export_report}
                                        className="btn btn-primary mt-1 btn-lg calc-btn">Создать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Holder;
