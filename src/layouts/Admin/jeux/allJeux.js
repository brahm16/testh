import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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

export default function AllJeux({ history }) {
  var [jeux, setJeux] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    nameJeux: "",
    descriptionJeux: "",
    prixJeux: "",
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

  const loadCastronomy = () => {
    Axios.get(`${process.env.REACT_APP_URL}jeux`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setJeux(res.data);
        console.log(res.data);
        //  console.log(images);
      })
      .catch((err) => {
        toast.error(`Error To Your Information `);
      });
  };
  useEffect(() => {
    loadCastronomy();
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
      selector: 'nameJeux',
      sortable: true,
    },
    {
      name: 'DescriPtion',
      selector: 'descriptionJeux',
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
      <button style={{marginRight:"1rem"}}     onClick={() => confirmation(d._id)}
>
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
  //  console.log(formData.nameJeux);
   // console.log("file" + file.);
    // console.log(imagefile.files[0]);
    data.append("image", file);
    data.append("nameJeux", formData.nameJeux);
    data.append("descriptionJeux", formData.descriptionJeux);
    data.append("prixJeux", formData.prixJeux);
   
    toast.success("Jeux added successfully")


    Axios.post(`${process.env.REACT_APP_URL}jeux`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
   //   toast.success("event added successfully")
      window.location.reload();
    });
  };

  const handleUpdate = async (id) => {
   
   // console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    //console.log(modalInfo.image);
  //  console.log("file" + file.nameCastronomy);
    // console.log(imagefile.files[0]);
    data.append("image", modalInfo.image);
    data.append("nameJeux", formData.nameJeux);
    data.append("descriptionJeux", formData.descriptionJeux);
    data.append("prixJeux", formData.prixJeux);
    toast.success("Jeux updated successfully")


    await Axios.patch(`${process.env.REACT_APP_URL}jeux/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.success("product updated successfully")
      window.location.reload();
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setModalInfo({ ...modalInfo, [text]: e.target.value });
  };

  const handleDelete = (id) => {
    // console.log("Delete");
    Axios.delete(`${process.env.REACT_APP_URL}jeux/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("Jeux deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { nameJeux, descriptionJeux, image, prixJeux  } = formData;
  //this methode is wrong
 

  const all = jeux.map((ev) => {
     // console.log(ev.nameCastronomy);
    return (
      <tr>
        <td>{ev.nameJeux}</td>
        <td>{ev.descriptionJeux}</td>
        <td>
          <img
            alt={ev.nameJeux}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${ev.image}`}
            onClick={()=>handleToggle(ev.image)}
          />
        </td>
        <td>{ev.prixJeux}</td>
      
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
                <ModalHeader toggle={isUpdated}>Update jeux</ModalHeader>
                <ModalBody>
                <Form onSubmit={()=>handleUpdate(modalInfo._id)} method="Post">
                <FormGroup>
                  <Label htmlFor="nameJeux">nameJeux</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}

                    id="nameJeux"
                    name="nameJeux"
                    value={modalInfo.nameJeux}
                    onChange={handleChange("nameJeux")}
                  />
                   <Label htmlFor="descriptionJeux">descriptionJeux</Label>                 
                  <Input
                  color="info"
                  type="textarea"
                  style={{color: '#000'}}

                  id="descriptionJeux"
                  name="descriptionJeux"
                  value={modalInfo.descriptionJeux}
                  onChange={handleChange("descriptionJeux")}
                />
                 <Label htmlFor="prixJeux">prixJeux</Label>
                <Input
                    color="info"
                    type="number"
                    style={{color: '#000'}}

                    id="prixJeux"
                    name="prixJeux"
                    value={modalInfo.prixJeux}
                    onChange={handleChange("prixJeux")}
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
            <ModalHeader toggle={isToggled}>Add Jeux</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="nameJeux">nameJeux</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}

                    id="nameJeux"
                    name="nameJeux"
                    value={nameJeux}
                    onChange={handleChange("nameJeux")}
                  />
                   <Label htmlFor="prixJeux">prixJeux</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="prixJeux"
                  name="prixJeux"
                  value={prixJeux}
                  onChange={handleChange("prixJeux")}
                />
                
               
                 <Label htmlFor="descriptionJeux">descriptionJeux</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}

                    id="descriptionJeux"
                    name="descriptionJeux"
                    value={descriptionJeux}
                    onChange={handleChange("descriptionJeux")}
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
                <CardTitle tag="h4">All Activity</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={jeux}
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
