import React from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  {
    id: 1,
    tipoMovimiento: "Tranferencia", 
    nombre: "security",
    fecha: "2024-06-12",
    totalMovimiento: 100,
    totalIva: 12, 
  }
];

class Factura extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      tipoMovimiento: "",
      nombre: "",
      fecha: "",
      totalMovimiento: 0,
      totalIva: 0,
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].tipoMovimiento = dato.tipoMovimiento;
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].fecha = dato.fecha;
        arreglo[contador].totalMovimiento = dato.totalMovimiento;
        arreglo[contador].totalIva = dato.totalIva;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("¿Estás Seguro que deseas Eliminar la Factura " + dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear Factura
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo Movimiento</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Total Movimiento</th>
                <th>Total IVA</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.tipoMovimiento}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.fecha}</td>
                  <td>{dato.totalMovimiento}</td>
                  <td>{dato.totalIva}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>    
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                tipo de movimiento: 
              </label>
              <input
                className="form-control"
                name="tipoMovimiento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.tipoMovimiento}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                fecha: 
              </label>
              <input
                className="form-control"
                name="fecha"
                type="datetime-local"
                onChange={this.handleChange}
                value={this.state.form.fecha}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Total movimiento: 
              </label>
              <input
                className="form-control"
                name="totalMovimiento"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.totalMovimiento}
              />
            </FormGroup>

            <FormGroup>
              <label>
                total iva: 
              </label>
              <input
                className="form-control"
                name="totalIva"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.totalIva}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Factura</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                tipo de movimiento: 
              </label>
              <input
                className="form-control"
                name="tipoMovimiento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                fecha: 
              </label>
              <input
                className="form-control"
                name="fecha"
                type="datetime-local"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Total movimiento: 
              </label>
              <input
                className="form-control"
                name="totalMovimiento"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                total iva: 
              </label>
              <input
                className="form-control"
                name="totalIva"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>

            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Factura;

