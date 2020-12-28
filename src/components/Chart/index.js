/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import api from "../../api/api";
import { clientDateTime } from '../../@utils/currentDate&Time';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {
    AttachMoney
} from '@material-ui/icons';
import {  
    Typography,
    Select,
    InputLabel,
    FormControl
} from '@material-ui/core';

ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

const chartConfigs = {
    type: 'realtimestackedarea',
    renderAt: 'container',
    width: '80%',
    height: '400',
    dataFormat: 'json',
};

let chartRef = FusionCharts("chartobject-1")

export default function Chart() {
    const [dataSource, setDataSource] = useState({
        "chart": {
            "showShadow": 1,
            "lineThickness": '15px',
            "lineColor": "#43A3F4",
            "numDivLines": '10',
            "divLineColor": "#00A3F4",
            "numVDivLines": '10',
            "vDivLineAlpha": 40,
            "vDivLineDashed": 1,
            // "caption": "Bitcoin",
            "subCaption": "",
            "xAxisName": "Local Time",
            "yAxisName": "ETH & LTC",
            "numberPrefix": "$",
            "refreshinterval": "2",
            "slantLabels": "1",
            "yAxisMaxValue": '1500',
            "yAxisMinValue": '0',
            "numdisplaysets": "12",
            "labeldisplay": "rotate",
            "showValues": "0",
            "showRealTimeValue": "0",
            "theme": "fusion",
            "paletteColors": "#8C88CF,#D8779D",
        },
        "categories": [{
            "category": [{
                "label": clientDateTime().toString()
            }]
        }],
        "dataset": [{
            "seriesName": "ETH",
            "data": [{
                "value": "0"
            }]
        },
        {
            "seriesName": "LTC",
            "data": [{
                "value": "0"
            }]
        }
        ]
    })

    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        const clock = setInterval(() => {
            startUpdatingData()
        }, 1000)
        return () => clearInterval(clock)
    }, [dataSource])



    const fetchData = () => {
        api().get('/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=LTC,ETH', {
            mode: 'cors'
        })
            .then((response) => {
                let MyDataSource = dataSource;
                MyDataSource.dataset[0]['data'][0].value = response.data[0].price;
                MyDataSource.dataset[1]['data'][0].value = response.data[1].price;
                setDataSource(MyDataSource)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }


    const getChartRef = (chart) => {
        chartRef = chart;
    }


    const startUpdatingData = () => {
        api().get('/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=LTC,ETH')
            .then(response => {
                let x_axis = clientDateTime();
                let y_axis = response.data[0].price + "|" + response.data[1].price;
                chartRef.feedData("&label=" + x_axis + "&value=" + y_axis);
            }).catch((error) => {
                console.log('error', error)
            })
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between',width:'100%' }}>
                <div><AttachMoney /><span style={{ fontWeight: 'bolder', fontSize: '25px', color: '#3f51b5' }}>Real-time bitcoin graph</span></div>
                <div><FormControl variant="filled" style={{ width: '150px', marginRight: '20px', backgroundColor: "#8C88CF" }} className="c1">
                    <InputLabel htmlFor="filled-age-native-simple">Commodity 1</InputLabel>
                    <Select
                        native
                        // value={state.age}
                        // onChange={handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'filled-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={10}>Option1</option>
                        <option value={20}>Option2</option>
                        <option value={30}>Option3</option>
                    </Select>
                </FormControl><FormControl variant="filled" style={{ width: '150px', backgroundColor:'#D8779D' }} className="c2">
                        <InputLabel htmlFor="filled-age-native-simple">Commodity 2</InputLabel>
                        <Select
                            native
                            // value={state.age}
                            // onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'filled-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Option1</option>
                            <option value={20}>Option2</option>
                            <option value={30}>Option3</option>
                        </Select>
                    </FormControl></div>
            </div>
            <ReactFC
                {...chartConfigs}
                dataSource={dataSource}
                onRender={getChartRef.bind(this)} />
        </>

    )

}