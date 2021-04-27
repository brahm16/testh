import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
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

export default function AllCastronomy({ history }) {
  var [castronomy, setCastronomy] = useState([]);
  var [modalInfo, setModalInfo] = useState([]);
  const [file, setFile] = useState("");
  const [img ,setImg] =useState("");
  const [formData, setFormData] = useState({
    nameCastronomy: "",
    descriptionCastronomy: "",
    image: "",
    prixCastronomy: "",
  });
  const [isToggled, setIsToggled] = React.useState(false);
  const [isToggled1, setIsToggled1] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);

  const toggle = React.useCallback(() => setIsToggled(!isToggled));
  const toggle1 = React.useCallback(() => setIsToggled1(!isToggled1));
  const toggleUpdate = React.useCallback(() => setIsUpdated(!isUpdated));

  const loadCastronomy = () => {
    Axios.get(`${process.env.REACT_APP_URL}castronomy`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCastronomy(res.data);
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
      selector: 'nameCastronomy',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'descriptionCastronomy',
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
      <button style={{marginRight:"1rem"}} onClick={() => handleDelete(d._id)}>
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
    data.append("nameCastronomy", formData.nameCastronomy);
    data.append("descriptionCastronomy", formData.descriptionCastronomy);
    data.append("prixCastronomy", formData.prixCastronomy);
   
    toast.success("Castonomy added successfully")


    Axios.post(`${process.env.REACT_APP_URL}castronomy`, data, {
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
   
    console.log("on submit " + modalInfo.name);
 
    const data = new FormData();
    console.log(modalInfo.image);
    console.log("file" + file.nameCastronomy);
    // console.log(imagefile.files[0]);
    data.append("image", modalInfo.image);
    data.append("nameCastronomy", formData.nameCastronomy);
    data.append("descriptionCastronomy", formData.descriptionCastronomy);
    data.append("prixCastronomy", formData.prixCastronomy);
    toast.success("Castronomy updated successfully")


    await Axios.patch(`${process.env.REACT_APP_URL}castronomy/${id}`, data, {
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
    Axios.delete(`${process.env.REACT_APP_URL}castronomy/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      toast.error("Castronomy deleted");
      window.location.reload();
    });
  };
  const handleChangeFile = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    setFile(e.target.files[0]);
  };

  const { nameCastronomy, descriptionCastronomy,image , prixCastronomy } = formData;
  //this methode is wrong
 

  const all = castronomy.map((ev) => {
      console.log(ev.nameCastronomy);
    return (
      <tr>
        <td>{ev.nameCastronomy}</td>
        <td>{ev.descriptionCastronomy}</td>
        <td>
          <img
            alt={ev.nameCastronomy}
            className="avatar"
            src={process.env.PUBLIC_URL + `/uploads/${ev.image}`}
            onClick={()=>handleToggle(ev.image)}
          />
        </td>
        <td>{ev.prixCastronomy}</td>
      
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
                <ModalHeader toggle={isUpdated}>Update castronomy</ModalHeader>
                <ModalBody>
                <Form onSubmit={()=>handleUpdate(modalInfo._id)} method="Post">
                <FormGroup>
                  <Label htmlFor="nameCastronomy">nameCastronomy</Label>
                  <Input
                  
                    color="info"
                    type="text"
                    style={{color: '#000'}}

                    id="nameCastronomy"
                    name="nameCastronomy"
                    value={modalInfo.nameCastronomy}
                    onChange={handleChange("nameCastronomy")}
                  />
                   <Label htmlFor="descriptionCastronomy">descriptionCastronomy</Label>                 
                  <Input
                  color="info"
                  type="textarea"
                  style={{color: '#000'}}

                  id="descriptionCastronomy"
                  name="descriptionCastronomy"
                  value={modalInfo.descriptionCastronomy}
                  onChange={handleChange("descriptionCastronomy")}
                />
                 <Label htmlFor="prixCastronomy">prixCastronomy</Label>
                <Input
                    color="info"
                    type="number"
                    style={{color: '#000'}}

                    id="prixCastronomy"
                    name="prixCastronomy"
                    value={modalInfo.prixCastronomy}
                    onChange={handleChange("prixCastronomy")}
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
            <ModalHeader toggle={isToggled}>Add Castronomy</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} method="Post">
                <FormGroup>
                  <Label htmlFor="nameCastronomy">nameCastronomy</Label>
                  <Input
                    color="info"
                    type="text"
                    style={{color: '#000'}}

                    id="nameCastronomy"
                    name="nameCastronomy"
                    value={nameCastronomy}
                    onChange={handleChange("nameCastronomy")}
                  />
                   <Label htmlFor="prixCastronomy">prixCastronomy</Label>                 
                  <Input
                  color="info"
                  type="number"
                  style={{color: '#000'}}

                  id="prixCastronomy"
                  name="prixCastronomy"
                  value={prixCastronomy}
                  onChange={handleChange("prixCastronomy")}
                />
                
               
                 <Label htmlFor="descriptionCastronomy">descriptionCastronomy</Label>
                <Input
                    color="info"
                    type="textarea"
                    style={{color: '#000'}}

                    id="descriptionCastronomy"
                    name="descriptionCastronomy"
                    value={descriptionCastronomy}
                    onChange={handleChange("descriptionCastronomy")}
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
                <CardTitle tag="h4">List of Castronomy</CardTitle>
              </CardHeader>
              <CardBody>
              <DataTableExtensions
      columns={columns}
      data={castronomy}
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
