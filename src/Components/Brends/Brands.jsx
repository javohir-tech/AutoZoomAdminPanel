import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './Brands.css'

export default function Brands() {
  // url 
  const urlAdrees = `https://autoapi.dezinfeksiyatashkent.uz/api/brands`

  // for image

  const startText = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/'

  //token 
  const token = localStorage.getItem("access_token")

  //get method
  const [data, setDAta] = useState([]);
  const getApi = () => {
    fetch(`${urlAdrees}`)
      .then((res) => res.json())
      .then((javohir) => setDAta(javohir.data))
  }

  useEffect(() => {
    getApi()
  }, []);

  //post method
  const [name, setName] = useState()
  const [image, setImage] = useState()

  const Yubor = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", name);
    formData.append("images", image);

    fetch(`${urlAdrees}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((javohir) => {
        if (javohir.success === true) {
          getApi()
          setIsModalOpen(false);
          message.success(javohir.message)
        } else {
          message.error(javohir.message)
        }
      })
  }

  //delete method 

  const [ochir, setOchir] = useState();

  const DeleteButton = (e) => {
    e.preventDefault();

    fetch(`${urlAdrees}/${ochir}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((javohir) => {
        if (javohir.success === true) {
          getApi()
          message.success(javohir.message)
        } else {
          message.error(javohir.message)
        }
      })
  }

  //Put Method
  const [Editname, setEditName] = useState()
  const [Editimage, setEditImage] = useState()
  // get id js 
  const [bosil, setBOsil] = useState(false)
  const [edit, setEdit] = useState();
  const getEditData = data?.filter((data) => data.id === edit)

  const putButton = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", Editname);
    formData.append("images", Editimage);

    fetch(`${urlAdrees}/${edit}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((javohir) => {
        if (javohir.success === true) {
          getApi();
          setIsModalOpen(false);
          message.success(javohir.message);
        } else {
          message.error(javohir.message);
        }
      })
  }

  // modal jsbosil
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setIsModalOpen(true);
    setBOsil(false)
    setEdit(id)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <table id='customers'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brands</th>
            <th>
              <Button type="primary" onClick={showModal}>
                Open Modal
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => setBOsil(true)}>
              <td>{item.title}</td>
              <td><img className='img' src={`${startText}${item.image_src}`} alt="brands images" /></td>
              <td onClick={() => setOchir(item.id)}>
                <span>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={DeleteButton}
                  >
                    <Button danger type='primary'><DeleteOutlined /></Button>
                  </Popconfirm>
                </span>
                <span>
                  <Button type="primary" onClick={() => showModal(item.id)} >
                    <EditOutlined />
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={''}>{
        bosil === true
          ?
          <form>
            <h1>Tahrirlash uchun </h1>
            <input className='brands_input' onChange={(e) => setEditName(e.target.value)} defaultValue={getEditData[0]?.title} type="text" placeholder='name' required />
            <input className='brands_input' type="file" onChange={(e) => setEditImage(e.target.files[0])} required />
            <Button type='primary' onClick={putButton}>Edit</Button>
          </form>
          :
          <form>
            <h1>Qoshish uchun</h1>
            <input className='brands_input' onChange={(e) => setName(e.target.value)} type="text" placeholder='name' required />
            <input className='brands_input' type="file" onChange={(e) => setImage(e.target.files[0])} required />
            <Button type='primary' onClick={Yubor}>Edit</Button>
          </form>}
      </Modal>
    </div>
  )
}
