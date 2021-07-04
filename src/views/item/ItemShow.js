import React, {useEffect, useState} from "react";
// reactstrap components
import {Card, CardBody, CardHeader, Container, Row} from "reactstrap";
import Header from "components/Headers/Header.js";
import {get} from "functions/request";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import BatteryChargingFullOutlinedIcon from '@material-ui/icons/BatteryChargingFullOutlined';
import BatteryCharging90OutlinedIcon from '@material-ui/icons/BatteryCharging90Outlined';
import BatteryCharging60OutlinedIcon from '@material-ui/icons/BatteryCharging60Outlined';
import BatteryCharging30OutlinedIcon from '@material-ui/icons/BatteryCharging30Outlined';
import BatteryCharging20OutlinedIcon from '@material-ui/icons/BatteryCharging20Outlined';


const modelName = 'item';


export default (props) => {
    const [item, setItem] = useState(null);
    const id = props.match.params.id

    useEffect(() => {
        get(`/${modelName}/${id}`)
            .then(response => {
                let res = response.data
                setItem(res)
                console.log(res);
            })
            .catch(err => {
            })
    }, [])


    return item && (
        <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">{item.name}</h3>
                            </CardHeader>
                            <CardBody>

                                {
                                    item.photo.map(photo => {
                                        <img src={photo} width="200" className="img-fluid mb-2 mx-1 "/>
                                    })
                                }

                                <h3 className="mb-0">{item.description}</h3>

                                <h3 className="mb-0">owner: {item.owner.name}</h3>
                                <h3 className="mb-0">category: {item.category.name} ({item.subcategory.name})</h3>


                                <h3 className="mb-0">condition: {item.condition}
                                    {
                                        // ["", "", "", "", "fair"]
                                        item.condition === 'perfect'
                                            ?
                                            <BatteryChargingFullOutlinedIcon/>
                                            :
                                            item.condition === 'very good'
                                                ?
                                                <BatteryCharging90OutlinedIcon/>
                                                :
                                                item.condition === 'descent'
                                                    ?
                                                    <BatteryCharging60OutlinedIcon/>
                                                    :
                                                    item.condition === 'good'
                                                        ?
                                                        <BatteryCharging30OutlinedIcon/>
                                                        :
                                                        <BatteryCharging20OutlinedIcon/>


                                    }

                                </h3>
                                <h3 className="mb-0">stock: {item.stock} </h3>
                                <h3 className="mb-0">cancellation policy: {item.cancellation} </h3>


                                <hr/>

                                <h3 className="text-center"></h3>

                                <table className={`text-center w-100 m-2`}>
                                    <thead>
                                    <td style={{width: '33%'}}>isDeliverable</td>
                                    <td style={{width: '33%'}}>isAvailable</td>
                                    <td style={{width: '33%'}}>isPublished</td>
                                    </thead>
                                    <tbody>
                                    <td>{item.isDeliverable ? <CheckCircleOutlinedIcon color="action"/> :
                                        <HighlightOffOutlinedIcon color="error"/>}</td>
                                    <td>{item.isAvailable ? <CheckCircleOutlinedIcon color="action"/> :
                                        <HighlightOffOutlinedIcon color="error"/>}</td>
                                    <td>{item.isPublished ? <CheckCircleOutlinedIcon color="action"/> :
                                        <HighlightOffOutlinedIcon color="error"/>}</td>
                                    </tbody>
                                </table>

                                <hr/>
                                <h3 className="text-center">Prices</h3>

                                <table style={{textAlign: 'center', width: '100%', margin: '1rem'}}>
                                    <thead>
                                    <td style={{width: '33%'}}>day</td>
                                    <td style={{width: '33%'}}>week</td>
                                    <td style={{width: '33%'}}>month</td>
                                    </thead>
                                    <tbody>
                                    <td>{item.price.day}</td>
                                    <td>{item.price.week}</td>
                                    <td>{item.price.month}</td>
                                    </tbody>
                                </table>

                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

