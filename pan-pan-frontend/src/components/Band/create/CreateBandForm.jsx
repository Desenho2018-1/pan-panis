import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CreateBandForm.css'

class CreateBandForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();
      const formData = new FormData(event.target);
      const user = this.props.permission.user
      user.band = []

      const data = {
          name: formData.get('band-name'),
          genre: formData.get('band-style'),
          members: ["http://localhost:8080/api/users/"+user.id],
          creationDate: new Date(),
          //image: this.state.file,
      }

    axios.post('http://localhost:8080/api/bands/', data)
        .then(response =>{
            console.log(response);
            user.band.push(response.data)
            this.props.addFlashMessage({
                type: 'success',
                text: 'Sua Banda foi criada com sucesso. You Rock!'
            });
            this.props.setUserSession(user);
        }).catch(function(error){
            console.log(error)
            if(error.response){
                console.log(error.status)
                console.log(error.data)
                console.log(error.data)
            }
        })
    }

    handleFileChange(event){
        this.setState({file:event.target.files[0]})
    }

    render() {
        return (
            <div className="container">
                <h1 className="page-title">Cadastre sua banda</h1>
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" className="form-control" name="band-name" required="required" placeholder="Sua banda"/>
                    </div>
                    <div className="form-group">
                        <label>Estilo:</label>
                        <input type="text" className="form-control" name="band-style" required="required" placeholder="Estilo musical"/>
                    </div>
                    <div className="form-group submit-btn">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }
}

CreateBandForm.propTypes = {
    permission: PropTypes.object.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setUserSession: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        permission: state.login
    }
}

export default connect(mapStateToProps, { })(CreateBandForm);
