import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody,Row, Col, Label } from 'reactstrap';

import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
		super(props);
        this.toggleModal = this.toggleModal.bind(this);
		this.state={
			isModelOpen: false
		};
	}

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

	render() {
		return(

			<div>
	        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}><strong>Submit Comment</strong></ModalHeader>
                <ModalBody>
                    
						<LocalForm>
                            
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}><strong>Rating</strong></Label>
                                
                                <Col md={{size: 12, offset: 0}}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12}><strong>Your Name</strong></Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}><strong>Comment</strong></Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:12, offset: 0}}>
                                    <Button type="submit" color="primary">
                                    <strong>Submit</strong>
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                </ModalBody>
            </Modal>
            </div>

		);	
	}

}

function RenderDish({dish}) {
	

	if (dish!=null) 
		{console.log(dish)

		return (
	        <Card>
	            <CardImg top src={dish.image} alt={dish.name} />
	            <CardBody>
	              <CardTitle>{dish.name}</CardTitle>
	              <CardText>{dish.description}</CardText>
	            </CardBody>
	        </Card>
		)}

	else  
		return (
			<div></div>
		)

}

function RenderComments({comments}) {

	if (comments!=null) {
		
		const comment_lst = comments.map( (comment) => {
			return (
				<div>
					<li>{comment.comment}</li>
					<br></br>
					<li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
					<br></br>
				</div>
			);
		} )

		return (
			<ul className='list-unstyled'>
				{comment_lst}
				<CommentForm />
			</ul>
		);		
	}

	else {
		return (
			<div></div>
		)
	}

}

const DishDetail = (props) => {


	if (props.dish!=null)
		
        return (
            <div className="container">

            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );

	else
		return (
			<div></div>
		)
}

export default DishDetail;

/* ----------------------------- Assignment 1 DishDetailComponent.js (Class Component) --------------

class DishDetail extends Component {

	constructor(props) {
		super(props);
	}

	renderDish(dish) {
		return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
		)
	}

	renderComments(comments) {

		if (comments!=null) {
			
			const comment_lst = comments.map( (comment) => {
				return (
					<div>
						<li>{comment.comment}</li>
						<br></br>
						<li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
						<br></br>
					</div>
				);
			} )

			return (
				<ul className='list-unstyled'>
					{comment_lst}
				</ul>
			);		
		}

		else {
			return (
				<div></div>
			)
		}

	}

	render() {
		
		if (this.props.dish!=null)
			return (			

				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-5 m-1'>
							{ this.renderDish(this.props.dish) }
						</div>

						<div className='col-12 col-md-5 m-1'>
							<h4>Comments</h4>
							{ this.renderComments(this.props.dish.comments) }
						</div>
					</div>
				</div>
			)

		else
			return (
				<div></div>
			)
	}

}

export default DishDetail;

---------------------------------------------------------------------------------- */