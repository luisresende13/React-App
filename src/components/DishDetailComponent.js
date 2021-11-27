import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';



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
			
			const comment_lst = comments.map( (comment_obj) => {
				return (
					<div>
						<li> {comment_obj.comment} </li>
						<br></br>
						<li>-- {comment_obj.author}, {comment_obj.date.slice(0,10)} </li>
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
				
				<div className='row'>

					<div className='col-12 col-md-5 m-1'>
						{ this.renderDish(this.props.dish) }
					</div>

					<div className='col-12 col-md-5 m-1'>
						<h4>Comments</h4>
						{ this.renderComments(this.props.dish.comments) }
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