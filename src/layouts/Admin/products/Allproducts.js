import Axios from "axios";
import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { confirmAlert } from 'react-confirm-alert'; 

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

export default function Allproducts({ history }) {
  var [products, setProducts] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    image: "",
  });
  const  confirmation = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  const toggleUpdate = React.useCallback(() => setIsUpdated(!isUpdated));

  const loadProducts = () => {
    Axios.get(`${process.env.REACT_APP_URL}products`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleToggle = (imag) => {
    setImg(imag);
   toggle1();
   console.log(isToggled1);
   console.log(imag);
  };

  const handletoggleUpdate = (prod) =>{
    setModalInfo(prod);
    console.log(prod);
    console.log(formData);
    console.log(modalInfo);
    
    toggleUpdate();

  };
  const  columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'desc',
      sortable: true,
    },
    {
      name: 'Image',
      selector: 'image',
      sortable: true,
      cell: d =>  <img
      alt={d._id}
      className="avatar" onClick={()=>handleToggle(d.image)} src={process.env.PUBLIC_URL + `/uploads/${d.image}`}
      />,


    },
    {
      name: 'Actions',
      sortable: true,
      cell: d =>  (<><button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(d)}><i className="tim-icons icon-pencil"></i></button>
      <button style={{marginRight:"1rem"}} onClick={() => confirmation(d._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
      </>
      ),


    },
    
   
  ];
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("on submit " + formData.name);
 
    const data = new FormData();
    console.log(formData.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("desc", formData.desc);
    toast.success("product added successfully")


    Axios.post(`${process.env.REACT_APP_URL}products`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("product added successfully")
      window.location.reload();
    });
  };
  

  const handleUpdate = async (id , e) => {
    e.preventDefault();
    console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    console.log(modalInfo.image);
    console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("name", modalInfo.name);
    data.append("price", modalInfo.price);
    data.append("desc", modalInfo.desc);
    toast.success("product updated successfully")

    
    
    console.log("update ok "+modalInfo.name);
     return () => console.log("update ok ");

    await Axios.patch(`${process.env.REACT_APP_URL}products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("product added successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}products/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("product deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };


  const { name, price , desc , image } = formData;
  //this methode is wrong
 

  const all = products.map((p) => {
      console.log(p.name);
    return (
      <tr>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.desc}</td>
        <td>
          <img
            alt={p.name}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${p.image}`}
            onClick={()=>handleToggle(p.image)}
          />
        </td>
        <td>
            
          <button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(p)}><i className="tim-icons icon-pencil"></i></button>
         
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(p._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
        </td>
      </tr>
    );
  });


  return (
    <>

      <div className="content">
      
        <Row>
            <Modal isOpen={isToggled1} toggle={isToggled1}>
                <ModalHeader toggle={isToggled1}>Show Image</ModalHeader>
                <ModalBody>
                <img
                alt={img}
                className="avatar" src={process.env.PUBLIC_URL + `/uploads/${img}`}
                />
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggle1}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </Modal>
            <Modal isOpen={isUpdated} toggle={isUpdated}>
                <ModalHeader toggle={isUpdated}>Update product</ModalHeader>
                <ModalBody>
                <Form onSubmit={(e) => handleUpdate(modalInfo._id , e)} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="name"
                    name="name"
                    value={modalInfo.name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="price">price</Label>                 
                  <Input
                  color="info"
                  type="text"
                  style={{color: '#000'}}
                  id="price"
                  name="price"
                  value={modalInfo.price}
                  onChange={handleChange("price")}
                />
                 <Label htmlFor="desc">description</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}
                    id="desc"
                    name="desc"
                    value={modalInfo.desc}
                    onChange={handleChange("desc")}
                  />
                </FormGroup>
                <FormGroup>
                  <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a file</button>
                    <input
                      color="info"
                      type="file"
                      style={{color: '#000'}}
                      name="image"
                      style={{color: '#000'}}
                      id="image"
                      value={image}
                      onChange={handleChangeFile("image")}
                    />
                  </div>
                </FormGroup>

                <Button type="submit" value="submit" color="primary">
                  Update
                </Button>
              </Form>
                </ModalBody>
                <ModalFooter>
                        <Button className="btn-neutral" color="info" onClick={toggleUpdate}>
                            Cancel
                        </Button>
                </ModalFooter>
            </Modal> 
          <Modal isOpen={isToggled} toggle={isToggled}>
            <ModalHeader toggle={isToggled}>Add Product</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="name"
                    style={{color: '#000'}}
                    name="name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                   <Label htmlFor="price">price</Label>                 
                  <Input
                  color="info"
                  type="text"
                  style={{color: '#000'}}
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleChange("price")}
                />
                 <Label htmlFor="desc">description</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}
                    id="desc"
                    style={{color: '#000'}}
                    name="desc"
                    value={desc}
                    onChange={handleChange("desc")}
                  />
                </FormGroup>
                <FormGroup>
                  <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a file</button>
                    <input
                      color="info"
                      type="file"
                      style={{color: '#000'}}
                      name="image"
                      id="image"
                      value={image}
                      onChange={handleChangeFile("image")}
                    />
                  </div>
                </FormGroup>

                <Button type="submit" value="submit" color="primary">
                  Add
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button className="btn-neutral" color="info" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Col md="12">
            <Button outline onClick={toggle}>
              {" "}
              Add
            </Button>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Products</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={products}
    >
      <DataTable
        noHeader
        defaultSortField="name"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
