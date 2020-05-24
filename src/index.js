import React from 'react';
import ReactDOM from 'react-dom';
import zxcvbn from 'zxcvbn';

// estilo
import "./styles/index.css";

// assets
import check from "./static/checkmark.png";
import cross from "./static/Xsymbol.png";


class PasswordMeter extends React.Component {
    render() {
        const { pass } = this.props;
        const result = pass === null ? 0 : zxcvbn(pass);
        let label = "Débil";
        switch (result.score) {
        case 0:
            label = "Muy Débil";
            break;
        case 1:
            label = "Débil";
            break;
        case 2:
            label = "Regular";
            break;
        case 3:
            label = "Buena";
            break;
        case 4:
            label = "Fuerte";
            break;
        default:
            label = "Muy Débil";
            break;
        }

        return (
            <div className="password-meter">
              <progress value={result.score} max={4}/>
              <p>{label}</p>
            </div>
        );
    }
}

class PassMatch extends React.Component {
    render() {
        const {pass, confPass} = this.props;
        const texto = pass === confPass
            ? "Las contraseñas coinciden."
            : "Las contraseñas no coinciden.";
        const icono = pass === confPass
              ? check
              : cross;
        const alttext = pass === confPass
              ? "check"
              : "cross";
        return (
            <div className="pass-match">
              <img className="icon" alt={alttext + "mark symbol"} src={icono}/>
              {texto}
            </div>
        );
    }
}


class FancyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre1: null,
            nombre2: null,
            apellido1: null,
            apellido2: null,
            password: "",
            password_conf: "",
            tipoId: null,
            identificacion: null,
            email: null,
        };
        this.actualizar = this.actualizar.bind(this);
    }

    actualizar(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    /**
     * genera una lista de campos de formulario.
     * se le pasa una lista de listas, cada una de las cuales debe tener
     * un primer campo con el ID de la entrada, y un segundo campo con el título
     * y el placeholder.
     */
    formFields(fields) {
        return fields.map(val => {
            let ident = val[0];
            let nombre = val[1];
            return (
                <div className="entrada-formulario">
                  <label className="etiqueta" htmlFor={ident}>
                    {nombre}
                  </label>
                  <input placeholder={nombre}
                         className="casilla-formulario"
                         id={ident} name={ident} type="text"
                         value={this.state.ident}
                         onChange={this.actualizar} />
                </div>
            );
        });
    }

    render() {
        return (
            <div id="base" className="container">
              <div id="form-header">
                <h1 className="title">Regiśtrate</h1>
                <p>
                  Estás a unos pasos de unirte a nuestra web.
                </p>
              </div>
              <form action="/" method="POST">

                {this.formFields([
                    ["nombre1", "Nombre"],
                    ["nombre2", "Segundo Nombre"],
                    ["apellido1", "Apellido"],
                    ["apellido2", "Segundo Apellido"],
                    ["password", "Contraseña"],
                ])}

                <PasswordMeter pass={this.state.password}/>

                {this.formFields([
                    ["password_conf", "Confirmar contraseña"]
                ])}

                <PassMatch pass={this.state.password}
                           confPass={this.state.password_conf}/>

                <div className="entrada-formulario">
                  <label className="etiqueta" htmlFor="tipo-id">
                    Tipo de identificación
                  </label>
                  <input id="tipo-id-cc" name="tipo-id" type="radio"
                         value="C.C." onChange={this.actualizar}/>
                  <label htmlFor="tipo-id-cc">C.C.</label>
                  <input id="tipo-id-ti"name="tipo-id" type="radio"
                         value="T.I." onChange={this.actualizar}/>
                  <label htmlFor="tipo-id-ti">T.I.</label>
                  <input id="tipo-id-ce" name="tipo-id" type="radio"
                         value="C.E." onChange={this.actualizar}/>
                  <label htmlFor="tipo-id-ce">C.E.</label>
                </div>

                {this.formFields([
                    ["identificacion", "# de identificación"],
                    ["email", "Correo electrónico"]
                ])}

                <input id="enviar-formulario" type="submit"
                       value="Registrarse"/>

              </form>
            </div>
        );
    }
}

function App() { return ( <div> <FancyForm /> </div> ); }

ReactDOM.render(<App />, document.getElementById('root'));
