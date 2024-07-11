import React, { useEffect, useState } from 'react'
import { Button, Modal, Input, Select, Form, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './Modals.css'

export default function Modals() {
    // api Adress for modals
    const ApiAdress = `https://autoapi.dezinfeksiyatashkent.uz/api/models`

    // api adres for brands
    const ApiAdressBrands = `https://autoapi.dezinfeksiyatashkent.uz/api/brands`

    // token
    const token = localStorage.getItem("access_token")

    // get method
    const [Opkel, setOpkel] = useState([]);
    const getApi = () => {
        fetch(`${ApiAdress}`)
            .then((res) => res.json())
            .then((malumotOl) => setOpkel(malumotOl.data))
    }
    useEffect(() => {
        getApi()
    }, []);

    //get method for select
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch(`${ApiAdressBrands}`)
            .then((res) => res.json())
            .then((item) => setBrands(item.data))
    }, []);

    //post 
    const [name, setName] = useState();
    const [brand, setBrand] = useState();



    const qoshil = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand_id", brand);

        fetch(`${ApiAdress}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then((res) => res.json())
            .then((javohir) => {
                if (javohir.success === true) {
                    setIsModalOpen(false);
                    getApi()
                    message.success(javohir.message)
                }
                else {
                    message.error(javohir.message)
                }
            })
    }

    // delete method
    const [idol, setIdol] = useState();

    const ochir = (e) => {
        e.preventDefault();

        fetch(`${ApiAdress}/${idol}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((ochirilsin) => {
                if (ochirilsin.success === true) {
                    getApi();
                    message.success(ochirilsin.message)
                } else {
                    message.error(ochirilsin.message)
                }
            })
    }

    //edit method put
    const [togirlash, setTogirlash] = useState(false);
    const [editIdOl, setEditIdOl] = useState();
    const getEditData = Opkel?.filter((javohir) => javohir.id === editIdOl)

    const [editName, setEditName] = useState();
    const [editTitle, setEditTitle] = useState();

    const ozgartir = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", editName);
        formData.append("brand_id", editTitle);

        fetch(`${ApiAdress}/${editIdOl}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then((res) => res.json())
            .then((edit) => {
                if (edit.success === true) {
                    getApi();
                    setIsModalOpen(false);
                    message.success(edit.message)
                }
                else {
                    message.error(edit.message)
                }
            })
    }

    //modal js
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (id) => {
        setEditIdOl(id)
        setIsModalOpen(true);
        setTogirlash(false)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // select js
    const handleChange = (value) => {
        setBrand(value)
    };

    const yangiHandleChange = (value) => {
        setEditTitle(value)
    };

    return (
        <div>
            <table id='customers'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>
                            <Button type="primary" onClick={showModal}>
                                Qo'shish
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Opkel.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.brand_title}</td>
                            <td onClick={() => setIdol(item.id)}>
                                <span>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={ochir}
                                    >
                                        <Button danger type='primary'><DeleteOutlined /></Button>
                                    </Popconfirm>
                                </span>
                                <span onClick={() => setTogirlash(true)}>
                                    <Button type="primary" onClick={() => showModal(item.id)}>
                                        <EditOutlined />
                                    </Button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>{
                togirlash === true
                    ?
                    <form>
                        <h1>Tahrirlash uchun</h1>
                        <Input placeholder="Basic usage" defaultValue={getEditData[0]?.name} onChange={(e) => setEditName(e.target.value)} className='modal_input' required />
                        <Form.Item >
                            <Select onChange={yangiHandleChange} className='modal_input' defaultValue={getEditData[0]?.brand_id} required>
                                {brands.map((item, index) => (
                                    <Select.Option value={item.id} key={index}>{item.title}</Select.Option>
                                ))}
                            </Select>
                            <Button onClick={ozgartir} type="primary">Qo'shish</Button>
                        </Form.Item>
                    </form>
                    :
                    <form>
                        <h1>Qo'shish uchun</h1>
                        <Input placeholder="Basic usage" onChange={(e) => setName(e.target.value)} className='modal_input' required />
                        <Form.Item>
                            <Select onChange={handleChange} className='modal_input' required>
                                {brands.map((item, index) => (
                                    <Select.Option value={item.id} key={index}>{item.title}</Select.Option>
                                ))}
                            </Select>
                            <Button onClick={qoshil} type="primary">Qo'shish</Button>
                        </Form.Item>
                    </form>
            }

            </Modal>
        </div>
    )
}
