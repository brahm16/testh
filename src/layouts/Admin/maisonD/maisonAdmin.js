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

export default function MaisonAdmin({ history }) {
  var [maison, setMaison] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    nameMaison: "",
    descriptionMaison: "",
    pricesMaison: "",
    phoneMaison: "",
    adressMaison: "",
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

  const loadMaison = () => {
    Axios.get(`${process.env.REACT_APP_URL}maison`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setMaison(res.data);
        //console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadMaison();
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
      selector: 'nameMaison',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: 'phoneMaison',
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
      <button style={{marginRight:"1rem"}}  onClick={() => confirmation(d._id)}>
            <i className="tim-icons icon-trash-simple"></i>
          </button>
      </>
      ),


    },
    
   
  ];
 

  const handleSubmit = (e) => {
    e.preventDefault();
  //  console.log("on submit " + formData.name);
 
    const data = new FormData();
  //  console.log(formData.image);
    //console.log("file" + file.name);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("nameMaison", formData.nameMaison);
    data.append("descriptionMaison", formData.descriptionMaison);
    data.append("pricesMaison", formData.pricesMaison);
    data.append("phoneMaison", formData.phoneMaison);
    data.append("adressMaison", formData.adressMaison);
   
    toast.success("Maison added successfully")


    Axios.post(`${process.env.REACT_APP_URL}maison`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
    // toast.success("Place added successfully")
      window.location.reload();
    });
  };

  const handleUpdate = async (id) => {
   
   // console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
  //  console.log(modalInfo.image);
  //  console.log("file" + file.nameCastronomy);
    // console.log(imagefile.files[0]);
    data.append("image", modalInfo.image);
    data.append("nameMaison", formData.nameMaison);
    data.append("descriptionMaison", formData.descriptionMaison);
    data.append("pricesMaison", formData.pricesMaison);
    data.append("phoneMaison", formData.phoneMaison);
    data.append("adressMaison", formData.adressMaison);
    toast.success("Maison updated successfully")


    await Axios.patch(`${process.env.REACT_APP_URL}maison/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   toast.success("maison added successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}maison/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("Maison deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { nameMaison, descriptionMaison,image , pricesMaison ,phoneMaison,adressMaison } = formData;
  //this methode is wrong

  const all = maison.map((ev) => {
    //  console.log(ev.descriptionPlace);
    return (
      <tr>
        <td>{ev.nameMaison}</td>
        <td>{ev.descriptionMaison}</td>
        <td>
          <img
            alt={ev.nameMaison}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${ev.image}`}
            onClick={()=>handleToggle(ev.image)}
          />
        </td>
        <td>{ev.pricesMaison}</td>
        <td>{ev.phoneMaison}</td>
        <td>{ev.adressMaison}</td>
        <td>

            
          <button style={{marginRight:"1rem"}} onClick={()=>handletoggleUpdate(ev)}><i className="tim-icons icon-pencil"></i></button>
         
          <button style={{marginRight:"1rem"}} onClick={() => handleDelete(ev._id)}>
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
                <ModalHeader toggle={isUpdated}>Update Maison</ModalHeader>
                <ModalBody>
                <Form onSubmit={()=>handleUpdate(modalInfo._id)} method="Post">
                <FormGroup>
                  <Label htmlFor="nameMaison">nameMaison</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="nameMaison"
                    name="nameMaison"
                    value={modalInfo.nameMaison}
                    onChange={handleChange("nameMaison")}
                  />
                     <Label htmlFor="descriptionMaison">descriptionMaison</Label>
                <Input
                    color="info"
                    type="textarea"
                    id="descriptionMaison"
                    style={{color: '#000'}}
                    name="descriptionMaison"
                    value={modalInfo.descriptionMaison}
                    onChange={handleChange("descriptionMaison")}
                  />
                   <Label htmlFor="pricesMaison">pricesMaison</Label>                 
                  <Input
                  color="info"
                  type="text"
                  id="pricesMaison"
                  style={{color: '#000'}}
                  name="pricesMaison"
                  value={modalInfo.pricesMaison}
                  onChange={handleChange("pricesMaison")}
                />
                  <Label htmlFor="phoneMaison">phoneMaison</Label>                 
                  <Input
                  color="info"
                  type="text"
                  id="phoneMaison"
                  style={{color: '#000'}}
                  name="phoneMaison"
                  value={modalInfo.phoneMaison}
                  onChange={handleChange("phoneMaison")}
                />
                 <Label htmlFor="adressMaison">adressMaison</Label>                 
                  <Input
                  color="info"
                  type="textarea"
                  id="adressMaison"
                  style={{color: '#000'}}
                  name="adressMaison"
                  value={modalInfo.adressMaison}
                  onChange={handleChange("adressMaison")}
                />
                 
                </FormGroup>
                <FormGroup>
                  <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a image</button>
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
            <ModalHeader toggle={isToggled}>Add Maison</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="nameMaison">nameMaison</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="nameMaison"
                    name="nameMaison"
                    value={nameMaison}
                    onChange={handleChange("nameMaison")}
                  />
                   <Label htmlFor="descriptionMaison">descriptionMaison</Label>                 
                  <Input
                  color="info"
                  type="textarea"
                  style={{color: '#000'}}
                  id="descriptionMaison"
                  name="descriptionMaison"
                  value={descriptionMaison}
                  onChange={handleChange("descriptionMaison")}
                />
                 <Label htmlFor="pricesMaison">pricesMaison</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}
                  id="pricesMaison"
                  name="pricesMaison"
                  value={pricesMaison}
                  onChange={handleChange("pricesMaison")}
                />
               
                 <Label htmlFor="phoneMaison">phoneMaison</Label>
                <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}
                    id="phoneMaison"
                    name="phoneMaison"
                    value={phoneMaison}
                    onChange={handleChange("phoneMaison")}
                  />
                     <Label htmlFor="adressMaison">adressMaison</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}
                    id="adressMaison"
                    name="adressMaison"
                    value={adressMaison}
                    onChange={handleChange("adressMaison")}
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
                <CardTitle tag="h4">List of Houses</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={maison}
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
